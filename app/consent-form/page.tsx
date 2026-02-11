"use client";

import { glassAntiqua } from "@/app/fonts";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { postClientInfo } from "@/app/api";
import { ConsentFormClientInfo } from "@/app/types";
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
import DateOfBirthPicker from "@/components/ui/date-of-birth-picker";
import PhoneInput from "@/components/ui/phone-input";

const clientInfoSchema = z.object({
  fullName: z.string().min(2, "Full name is required").max(100),
  dobDate: z.date({
    required_error: "Date of birth is required",
  }).refine((date) => {
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate());
    return date <= maxDate;
  }, "You must be at least 13 years old"),
  gender: z.string().min(1, "Gender is required"),
  phoneNumber: z.string()
    .transform((val) => val.replace(/\D/g, ""))
    .refine((val) => val.length === 10, "Phone number must be 10 digits"),
  email: z.string()
    .min(5, "Email is required")
    .email("Please enter a valid email address"),
});

export default function ClientDetails() {

  const router = useRouter();
  const form = useForm<z.infer<typeof clientInfoSchema>>({
    resolver: zodResolver(clientInfoSchema),
    defaultValues: {
      fullName: "",
      dobDate: undefined,
      gender: "",
      phoneNumber: "",
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof clientInfoSchema>) {
    const clientInfo: ConsentFormClientInfo = {
      fullName: values.fullName,
      dob: values.dobDate.toISOString(),
      gender: values.gender,
      phoneNumber: values.phoneNumber.replace(/\D/g, ""),
      email: values.email,
    };
    console.log(clientInfo);
    const response = await postClientInfo(clientInfo);
    form.reset();
    router.push("/consent-form/products?" + new URLSearchParams({ clientId: response }));
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mx-3 md:flex flex-col justify-center items-center space-y-4">
          <div className="flex justify-center">
            <h3 id="consent-form--client-info" className={`subheading ${glassAntiqua.className}`}>Personal Information</h3>
          </div>
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <Label className='w-max justify-self-start my-2'>Full Name:</Label>
                <FormControl>
                  <Input className="max-w-96 mb-2" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dobDate"
            render={({ field }) => (
              <FormItem>
                <Label className='w-max justify-self-start my-2'>Date of Birth:</Label>
                <FormControl>
                  <DateOfBirthPicker
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select date"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <Label className='w-max justify-self-start my-2'>Gender:</Label>
                <FormControl>
                  <Input className="max-w-96 mb-2" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <Label className='w-max justify-self-start my-2'>Email Address:</Label>
                <FormControl>
                  <Input className="max-w-96 mb-2" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <Button className="my-2" type="submit">Next</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}


