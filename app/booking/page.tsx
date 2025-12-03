"use client"
// if keys includes date, show, if date has available show green
// in other words
// if keys includes date, but no available show red, includes date with available show green

import { useState, useEffect, useCallback, use } from 'react';
import Headline from '../about/headline'
import { columns } from "./appointments/columns"
import { DataTable } from "./appointments/data-table"

import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Calendar, CalendarDayButton } from "@/components/ui/calendar"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Appointment } from '../types'
import { Dot } from 'lucide-react';

interface AppointmentDateTimeAndStatus {
  dateTime: Date;
  status: number;
}

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const today = new Date(new Date().setHours(0, 0, 0, 0));

export default function DatePickerForm(
  props0:
    {
      searchParams: Promise<{ appointmentType: string }>
    }
) {
  const searchParams = use(props0.searchParams);
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [appointmentDates, setAppointmentDates] = useState<AppointmentDateTimeAndStatus[] | undefined>([]);

  const fetchAppointments = useCallback(async () => {
    if (selectedDate === undefined) return;
    const formattedDate = format(selectedDate, "MM-dd-yyyy");
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
  }, [selectedDate, searchParams.appointmentType]);

  const getAppointmentDatesAndStatuses = async () => {
    const res = await fetch(`${baseUrl}/appointments/status`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      console.error("err:");
    }

    let result = await res.json();
    setAppointmentDates(result);
  };

  useEffect(() => {
    fetchAppointments();
    getAppointmentDatesAndStatuses();
  }, [selectedDate, fetchAppointments]);

  return (
    <>
      <Headline text={"Booking"} />

      <div className="md:flex flex-col justify-center items-center text-lg mx-5">
        <p className="font-bold md:font-normal">Selecting a date and time sends a request, not a confirmed appointment.</p>
        <p className="pt-1 pb-5 font-bold md:font-normal">You’ll receive a message or email once your booking has been approved.</p>
      </div>

      <label className='flex items-center justify-center text-center mb-2'>Select a date to see available appointments:</label>
      <div className='flex flex-col md:flex-row space-y-3 items-center md:items-start justify-center'>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          disabled={(date: Date) => date < today}
          className="rounded-xl border shadow-sm"
          components={{
            DayButton: ({ children, modifiers, day, ...props }) => {
              const dayWithAppointments = appointmentDates?.find(x => (new Date(x.dateTime)).getDate() == day.date.getDate());
              const dayWithAppointmentsStatus = dayWithAppointments?.status;

              return (
                <CalendarDayButton className='text-2xl' day={day} modifiers={modifiers} {...props}>
                  {children}
                  <span className='absolute top-4'>{dayWithAppointmentsStatus ? <Dot className='size-8' color="#ffa348" /> : dayWithAppointments && <Dot className='size-8' color="#a51d2d" />}</span>
                </CalendarDayButton>
              )
            },
          }}
        />
        <div className='px-5'>
          <DataTable columns={columns} data={data} />
        </div>
      </div>

      <div className="pb-5"></div>
    </>
  )
}
