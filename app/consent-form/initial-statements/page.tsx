"use client";

import { useState, useEffect } from 'react';

import { Base64URLString, ConsentFormStatement } from '@/app/types';
import SignaturePad from '@/components/ui/signature-pad';
import { Eraser, Save } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { submitConsentForm } from '@/app/api';
import { Input } from '@/components/ui/input';
import { useActiveConsentFormStatements } from '@/hooks/useServices';
import { glassAntiqua } from '@/app/fonts';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

const initialStatementsSchema = z.object({
  printedName: z.string().min(2, "Please print your full name"),
  initials: z.string().nullable().refine(
    (val) => val !== null && val.length > 50,
    "Please provide your initials"
  ),
  signature: z.string().nullable().refine(
    (val) => val !== null && val.length > 100,
    "Please provide your final signature"
  ),
  statementsInitialed: z.array(z.string()),
}).refine((data) => data.statementsInitialed && data.statementsInitialed.length > 0, {
  message: "Please initial all statements before submitting",
  path: ["statementsInitialed"],
});

const ConsentForm = (props: {
  searchParams: Promise<{
    appointmentId?: string;
    clientId?: string;
  }>;
}) => {
  const [initials, setInitials] = useState<Base64URLString>(null);
  const [signature, setSignature] = useState<Base64URLString>(null);
  const { data: activeStatements, isLoading } = useActiveConsentFormStatements();
  const [consentFormStatements, setConsentFormStatements] = useState<ConsentFormStatement[]>(activeStatements ?? []);
  const [response, setResponse] = useState('');

  const form = useForm<z.infer<typeof initialStatementsSchema>>({
    resolver: zodResolver(initialStatementsSchema),
    defaultValues: {
      printedName: "",
      initials: null,
      signature: null,
      statementsInitialed: [],
    },
  });

  useEffect(() => {
    if (activeStatements) {
      setConsentFormStatements(activeStatements);
    }
  }, [activeStatements]);

  if (isLoading) return <div>Loading consent form statements...</div>;

  function updateStatement(idx: number) {
    if (consentFormStatements[idx]?.initialed) consentFormStatements[idx].initialed = false;
    else consentFormStatements[idx].initialed = true;
    setConsentFormStatements([...consentFormStatements]);
    const initialedStatements = consentFormStatements.filter((s) => s.initialed).map((s) => s.statement);
    form.setValue("statementsInitialed", initialedStatements as any);
    form.clearErrors("statementsInitialed");
  }

  async function onSubmit(values: z.infer<typeof initialStatementsSchema>) {
    if (consentFormStatements.filter(s => s.initialed).length !== consentFormStatements.length) {
      form.setError("statementsInitialed", { message: "Please initial all statements before submitting" });
      return;
    }
    const result = await submitConsentForm(
      values.printedName,
      consentFormStatements.filter((s) => s.initialed).map((s) => s.statement),
      values.initials,
      values.signature,
      (await props.searchParams).clientId
    );

    if (result) {
      setResponse("Thank you for filling out the consent form!");
      setTimeout(() => setResponse(""), 10000);
      form.reset();
    } else {
      setResponse("Something went wrong... please try again");
      setTimeout(() => setResponse(""), 30000);
    }
  }

  return (
    <div className='md:flex justify-center'>
      <div className="pb-5 max-w-3xl">
        <div className="flex justify-center">
          <h1 id="consent-form" className={`scroll-mt-18 subheading m-0 p-0 ${glassAntiqua.className}`}>Terms and Agreements</h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='mx-5 lg:flex flex-col justify-center items-center space-y-4'>
            <div className='flex flex-col justify-center items-center'>
              <Label className=''>Please enter your initials here. To apply them, check the boxes:</Label>
              <FormField
                control={form.control}
                name="initials"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <SignaturePad
                        className="w-64 max-w-full my-3"
                        penColor="hsl(var(--foreground))"
                        size="sm"
                        showButtons={true}
                        saveButtonIcon={<Save />}
                        clearButtonIcon={<Eraser />}
                        onSave={(initials) => {
                          setInitials(initials);
                          field.onChange(initials);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {form.formState.errors.statementsInitialed && (
              <p className="text-red-500 text-sm text-center mb-2">{form.formState.errors.statementsInitialed.message}</p>
            )}
            <ul>
              {consentFormStatements.map((stmt, idx) =>
                <li className='flex items-start my-5' key={idx}>
                  <div className='absolute'>
                    {(stmt.initialed && initials)
                      ?
                      <img onClick={() => updateStatement(idx)} className='w-6 h-4 bg-contain bg-left border border-accent rounded-sm' height={8} src={initials} alt="initials" />
                      :
                      <Checkbox id={idx.toString()} checked={stmt.initialed ?? false} onCheckedChange={() => updateStatement(idx)} className="data-[state=unchecked]:border-accent data-[state=checked]:border-accent data-[state=checked]:bg-accent data-[state=checked]:text-accent-content" />
                    }
                  </div>
                  <Label htmlFor={idx.toString()} className='ml-7 text-base/5'>{stmt.statement}</Label>
                </li>
              )}
            </ul>
            <div className='mt-5 flex flex-col justify-center items-center'>
              <h3 className="text-center text-warning-content text-xl">Client Declaration</h3>
              <p className="text-warning-content">I confirm that the above information is accurate and complete to the
                best of my knowledge. I understand the nature of the facial treatment
                and agree to proceed voluntarily. I have had the opportunity to ask
                questions and understand the risks and benefits. I give my full consent
                to receive this service from the esthetician listed below.</p>
              <FormField
                control={form.control}
                name="printedName"
                render={({ field }) => (
                  <FormItem>
                    <Label className='w-max justify-self-start my-2'>Print Name:</Label>
                    <FormControl>
                      <Input className="max-w-96" type="text" placeholder="Jane Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="signature"
                render={({ field }) => (
                  <FormItem>
                    <Label className='w-max justify-self-start mt-2'>Signature:</Label>
                    <FormControl>
                      <SignaturePad
                        className="my-3 max-w-full w-112"
                        penColor="hsl(var(--foreground))"
                        size="sm"
                        showButtons={true}
                        saveButtonIcon={<Save />}
                        clearButtonIcon={<Eraser />}
                        onSave={(sig) => {
                          setSignature(sig);
                          field.onChange(sig);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="my-2" type="submit">Submit</Button>
              <p className={response.includes("wrong") ? "text-red-500" : "text-green-500"}>{response}</p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default ConsentForm;
