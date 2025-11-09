"use client"

import { useState, useEffect } from 'react'
import Headline from '../about/headline'
import { columns } from "./appointments/columns"
import { DataTable } from "./appointments/data-table"

import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Appointment } from '../types'

const FormSchema = z.object({
  appointmentDate: z.date({
    required_error: "A date is required.",
  }),
})

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const today = new Date(new Date().setHours(0, 0, 0, 0));

export default function DatePickerForm({ searchParams }:
  {
    searchParams:
    { appointmentType: string }
  }) {
  const [data, setData] = useState([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  useEffect(() => {
    form.setValue("appointmentDate", today);
    onSubmit({ appointmentDate: today });
  }, [form]);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const formattedDate = format(data.appointmentDate, "MM-dd-yyyy");
    try {
      const response = await fetch(`${baseUrl}/appointments/${formattedDate}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error("network response was not ok");
      }

      let result = await response.json();
      result.forEach((appointment: Appointment) => appointment.appointmentType = searchParams.appointmentType);
      setData(result);
    } catch (error) {
      console.error("Error posting data: ", error);
    }
  }

  return (
    <>
      <Headline text={"Booking"} />

      <div className="flex flex-col justify-center items-center text-lg">
        <p className="">Selecting a date and time sends a request, not a confirmed appointment.</p>
        <p className="pb-5">You’ll receive a message or email once your booking has been approved.</p>
      </div>

      <div className="flex flex-row items-start justify-center gap-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="appointmentDate"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center">
                  <FormLabel>Select a date to see available appointments:</FormLabel>
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(selectedDate) => {
                      field.onChange(selectedDate);
                      onSubmit({ appointmentDate: selectedDate ?? today });
                    }}
                    disabled={(date) =>
                      date < today
                    }
                    className="bg-(--color-base-100)"
                    initialFocus
                  />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DataTable columns={columns} data={data} />
      </div>

      <div className="pb-5"></div>
    </>
  )
}
