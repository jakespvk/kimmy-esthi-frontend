"use client";

import { saveEmergencyContact } from "@/app/api";
import { glassAntiqua } from "@/app/fonts";
import { EmergencyContactDetails } from "@/app/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
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
import PhoneInput from "@/components/ui/phone-input";

const emergencyContactSchema = z.object({
  name: z.string().min(2, "Emergency contact name is required"),
  phone: z.string()
    .transform((val) => val.replace(/\D/g, ''))
    .refine((val) => val.length === 10, "Phone number must be 10 digits"),
  relationship: z.string().min(2, "Relationship is required"),
});

export default function EmergencyContact(props: { searchParams: Promise<{ clientId: string }> }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof emergencyContactSchema>>({
    resolver: zodResolver(emergencyContactSchema),
    defaultValues: {
      name: "",
      phone: "",
      relationship: "",
    },
  });

  async function handleSubmit(values: z.infer<typeof emergencyContactSchema>) {
    const emergencyContact: EmergencyContactDetails = {
      name: values.name,
      phone: values.phone.replace(/\D/g, ''),
      relationship: values.relationship,
    }
    await saveEmergencyContact((await props.searchParams).clientId, emergencyContact);
    form.reset();
    router.push("/consent-form/consent-and-acknowledgement?" + new URLSearchParams({ clientId: (await props.searchParams).clientId }));
  }
  return (
    <div className="w-full md:flex justify-center items-center mb-5">
      <div className="flex justify-center">
        <h3 id="consent-form--consent-and-acknowledgement" className={`subheading ${glassAntiqua.className}`}>Emergency Contact</h3>
      </div>
      <Form {...form}>
        <form className="max-w-3xl mx-5 md:mx-0 space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <Label className='w-max justify-self-start my-2'>Full Name:</Label>
                <FormControl>
                  <Input className="max-w-96 mb-2" type="text" placeholder="Emergency contact name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <Label className='w-max justify-self-start my-2'>Phone Number:</Label>
                <FormControl>
                  <PhoneInput
                    value={field.value}
                    onChange={field.onChange}
                    className="max-w-96 mb-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="relationship"
            render={({ field }) => (
              <FormItem>
                <Label className='w-max justify-self-start my-2'>Relationship:</Label>
                <FormControl>
                  <Input className="max-w-96 mb-2" type="text" placeholder="Spouse / Parent / Friend" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center my-5">
            <Button type="submit">Next</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

