"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import SignaturePad from "@/components/ui/signature-pad";
import { Base64URLString } from "@/app/types";
import { Save, Eraser } from "lucide-react";
import { useState } from "react";
import { saveConsentAndAcknowledgement } from "@/app/api";
import { useRouter } from "next/navigation";
import { glassAntiqua } from "@/app/fonts";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

const consentSchema = z.object({
  signature: z.string().nullable().refine(
    (val) => val !== null && val.length > 100,
    "Please provide your signature"
  ),
});

export default function ConsentAndAcknowledgement(props: { searchParams: Promise<{ clientId: string }> }) {
  const router = useRouter();
  const [signature, setSignature] = useState<Base64URLString>(null);

  const form = useForm<z.infer<typeof consentSchema>>({
    resolver: zodResolver(consentSchema),
    defaultValues: {
      signature: null,
    },
  });

  async function handleSubmit() {
    await saveConsentAndAcknowledgement((await props.searchParams).clientId, signature);
    form.reset();
    router.push("/consent-form/initial-statements?" + new URLSearchParams({ clientId: (await props.searchParams).clientId }));
  }

  return (
    <div className="w-full md:flex justify-center items-center mb-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="max-w-3xl flex flex-col justify-center items-center mx-5 md:mx-0 space-y-4">
            <div className="flex flex-wrap justify-center items-center">
              <h3 id="consent-form--consent-and-acknowledgement" className={`subheading text-center pretty ${glassAntiqua.className}`}>Consent and Acknowledgement</h3>
            </div>
            <p className="mb-5">
              By signing below, I acknowledge that I have been informed about the nature of the facial treatment
              and give my consent to receive it. I understand that while the treatment is intended to improve my
              skin's condition, individual results may vary. I have disclosed all relevant medical information and
              agree to follow any aftercare instructions provided.
            </p>
            <div className="Form">
              <Label className='flex justify-center items-center'>Client's Signature:</Label>
              <FormField
                control={form.control}
                name="signature"
                render={({ field }) => (
                  <FormItem>
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
              <div className='flex justify-center items-center'>
                <Button className="my-2" type="submit">Next</Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}

