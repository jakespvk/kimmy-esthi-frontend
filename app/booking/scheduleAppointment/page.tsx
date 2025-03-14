"use client"

import Headline from "@/app/about/headline"

import { useState } from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
// import { format } from "date-fns"

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

export default function ScheduleAppointment({ searchParams }: {
    searchParams: {
        appointmentDate: string;
        appointmentTime: string;
    };
}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            preferredName: "",
            email: "",
            phoneNumber: "",
            skinConcerns: "",
        },
    })

    const [result, setResult] = useState('');
    const [isEnabled, setIsEnabled] = useState(false);
    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(JSON.stringify(values));
        try {
            const response = await fetch('http://localhost:5102/api/appointment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ values }),
            });

            if (!response.ok) {
                throw new Error("network response was not ok");
            }

            let result = await response.text();
            setResult(result.replace(/"/g, ""));
            setIsEnabled(true);
            console.log(result);
        } catch (error) {
            console.error("Error posting data: ", error);
        }
    }

    return (
        <>

            <Headline text={"Schedule Appointment"} />

            <div className="flex justify-center">
                <p className="">Scheduling {searchParams.time} appointment on {searchParams.date}</p>
            </div>
            <div className="flex justify-center p-3">
                <a type="button" href="javascript:history.back()" className="btn p-1 mx-1 max-w-32 w-32 min-w-fit text-white bg-gradient-to-r 
                from-amber-400 to-amber-600 border-amber-500 hover:from-amber-300 hover:to-amber-500 hover:border-amber-400">
                    Go Back
                </a>
            </div>

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
                                        <FormDescription>
                                            Whatever name you&apos;re most comfortable using in my swamp :)
                                        </FormDescription>
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
                                            Used for confirmation only, unless you elect to receive promotions
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
                                        <FormDescription>
                                            Not gonna spam yo ass
                                        </FormDescription>
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
                    focused:border-amber-800 focus-visible:ring-1 ring-amber-700 focus:outline-none shadow-sm rounded-sm p-2.5"
                                                {...field}></textarea>
                                        </FormControl>
                                        <FormDescription>
                                        </FormDescription>
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
            {isEnabled && <p disabled className="text-center pt-5 text-green-600">{result}!</p>}

            <div className="pb-5"></div>
        </>
    )
}

