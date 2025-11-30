"use client"

import { useState, useEffect, useCallback } from 'react'
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

interface AppointmentDateTimeAndStatus {
  dateTime: Date;
  status: number;
}

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const today = new Date(new Date().setHours(0, 0, 0, 0));

export default function DatePickerForm({ searchParams }:
  {
    searchParams:
    { appointmentType: string }
  }) {
  const [data, setData] = useState([]);
  let bookedDates: Date[] = [];

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const onSubmit = useCallback(async (data: z.infer<typeof FormSchema>) => {
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
  }, [searchParams.appointmentType]);

  const getAppointmentDatesAndStatuses = async (monthDateTime: Date) => {
    const formattedMonthDateTime = format(monthDateTime, "MM-dd-yyyy");
    const res = await fetch(`${baseUrl}/appointments?` + new URLSearchParams({ monthDateTime: formattedMonthDateTime }), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      console.error("err:");
    }

    let result = await res.json();
    console.log(result);
    bookedDates = Array.from(result.map((item: AppointmentDateTimeAndStatus) => (item.dateTime)));
    console.log(bookedDates);
    return result;
  };

  useEffect(() => {
    form.setValue("appointmentDate", today);
    onSubmit({ appointmentDate: today });
    getAppointmentDatesAndStatuses(today);
  }, [form, onSubmit]);

  return (
    <>
      <Headline text={"Booking"} />

      <div className="md:flex flex-col justify-center items-center text-lg mx-5">
        <p className="font-bold md:font-normal">Selecting a date and time sends a request, not a confirmed appointment.</p>
        <p className="pt-1 pb-5 font-bold md:font-normal">You’ll receive a message or email once your booking has been approved.</p>
      </div>

      <div className="md:flex flex-row items-start justify-center gap-10">
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
                    disabled={(date: Date) => date < today}
                    modifiers={{
                      booked: bookedDates,
                    }}
                    modifiersClassNames={{
                      booked: "[&>button]:line-through bg-red-500 opacity-100",
                    }}
                    className="bg-(--color-base-100)"
                  />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className='flex mx-2 items-center justify-center'>
          <DataTable columns={columns} data={data} />
        </div>
      </div>

      <div className="pb-5"></div>
    </>
  )
}
