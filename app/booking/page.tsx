"use client"
 
import { useState, useEffect } from 'react'
import Headline from '../about/headline'
import { Appointment, columns } from "./appointments/columns"
import { DataTable } from "./appointments/data-table"

import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
 
const FormSchema = z.object({
  appointmentDate: z.date({
    required_error: "A date is required.",
  }),
})
 
export default function DatePickerForm() {
    const [data, setData] = useState([]);
    const [popoverOpen, setPopoverOpen] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    useEffect(() => {
        const today = new Date(new Date().setHours(0,0,0,0));
        form.setValue("appointmentDate", today);
        onSubmit({ appointmentDate: today });
    }, [form]);

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        const formattedDate = format(data.appointmentDate, "MM/dd/yyyy");
        try {
            const response = await fetch('http://localhost:5102/api/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formattedDate),
            });

            if (!response.ok) {
                throw new Error("network response was not ok");
            }

            let result = await response.json();
            result.forEach((each: Appointment) => each.date = format(data.appointmentDate, "PPP"));
            setData(result);
        } catch (error) {
            console.error("Error posting data: ", error);
        }
    }

  return (
    <>
    <Headline text={"Booking"} />

    <div className="flex flex-col items-center justify-center gap-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="appointmentDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Select a date to see available appointments:</FormLabel>
                  <Popover>
                    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(selectedDate) => {
                            field.onChange(selectedDate);
                            onSubmit({ appointmentDate: selectedDate });
                            setPopoverOpen(false);
                        }}
                        //disabled={(date) =>
                          //date < new Date(new Date().setHours(0,0,0,0))
                        //}
                        initialFocus
                      />
                    </PopoverContent>
                    </Popover>
                  </Popover>
                  <FormDescription>
                  </FormDescription>
                  <FormMessage />
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
