"use client"

import Headline from "@/app/about/headline"

import { useEffect, useState, use } from 'react';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import BookingRequestWarningText from "@/components/ui/booking-request-warning-text";

const formSchema = z.object({
  preferredName: z.string(),
  email: z.string().min(2, {
    message: "Must be valid email address",
  }),
  phoneNumber: z.string().min(10, {
    message: "Must be valid phone number",
  }),
  skinConcerns: z.string().min(2, {
    message: "We need to know a bit about why you are coming in to prepare \
        the best possible experience for you when you get here.",
  }),
})

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function ScheduleAppointment(
  props: {
    searchParams: Promise<{
      appointmentId: string;
      appointmentType: string;
      preferredName?: string;
      email?: string;
      phoneNumber?: string;
      skinConcerns?: string;
    }>;
  }
) {
  const searchParams = use(props.searchParams);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      preferredName: searchParams.preferredName ?? "",
      email: searchParams.email ?? "",
      phoneNumber: searchParams.phoneNumber ?? "",
      skinConcerns: searchParams.skinConcerns ?? "",
    },
  })

  const [result, setResult] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState("...");
  const [appointmentTime, setAppointmentTime] = useState("...");

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await fetch(`${baseUrl}/appointment/${searchParams.appointmentId}`);
        const data = await response.json();
        setAppointmentDate(format(data.date, "EEEE, MMMM d, yyyy"));
        setAppointmentTime(format(data.time, "h:mm a"));
      } catch (err) {
        console.error("Error getting appointment data: ", err);
        return (
          <div>
            <Headline text={"Schedule Appointment"} />

            <div className="flex justify-center">
              <p className="text-red-900">Error: appointment is no longer available :/</p>
            </div>
          </div>
        )
      }
    };

    fetchAppointment();
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch(`${baseUrl}/appointment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          appointmentId: searchParams.appointmentId,
          scheduledAppointment: {
            serviceName: searchParams.appointmentType,
            ...values
          },
        }),
      });

      if (!response.ok) {
        throw new Error("network response was not ok");
      }

      let result = await response.text();
      setResult(result.replace(/"/g, ""));
      setIsEnabled(true);
      form.reset();
      console.log(result);
    } catch (error) {
      console.error("Error posting data: ", error);
      return;
    }
  }

  return (
    <>

      <Headline text={"Schedule Appointment"} />

      <BookingRequestWarningText />

      <div className="flex justify-center mx-5">
        <p className="">Scheduling {appointmentTime} appointment on {appointmentDate}</p>
      </div>
      <div className="flex justify-center p-3">
        <Button type="button" onClick={() => router.back()} className="btn w-32 min-w-fit text-base-100 bg-gradient-to-r 
                from-amber-400 to-amber-600 border-amber-500 hover:from-amber-300 hover:to-amber-500 hover:border-amber-400">
          Go Back
        </Button>
      </div >

      <div className="w-full flex justify-center content-center">
        <div className="w-[400px] max-w-4/5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="preferredName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jane Doe" className="border-amber-500 focused:border-amber-800 focus-visible:ring-1 ring-amber-700" {...field} />
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
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="info@dermalogica.com" className="border-amber-500 focused:border-amber-800 focus-visible:ring-1 ring-amber-700" {...field} />
                    </FormControl>
                    <FormDescription>
                      Used for confirmation only!
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="(562) 555-1234" className="border-amber-500 focused:border-amber-800 focus-visible:ring-1 ring-amber-700" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="skinConcerns"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skin Concerns</FormLabel>
                    <FormControl>
                      <textarea rows={2} placeholder="Dry patches/pigmentation" className="field-sizing-content text-sm min-w-full border border-amber-500 
                    focused:border-amber-800 focus-visible:ring-1 ring-amber-700 focus:outline-none shadow-sm rounded-sm p-2.5 resize-none"
                        {...field}></textarea>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full flex justify-center">
                <Button type="submit" className="btn p-1 mx-1 max-w-32 w-32 min-w-fit text-white bg-gradient-to-r from-amber-400 to-amber-600 
                border-amber-500 hover:from-amber-300 hover:to-amber-500 hover:border-amber-400">
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      {isEnabled && <p className="text-center pt-5 text-green-600">{result}</p>}

      <div className="pb-5"></div>
    </>
  )
}

