"use client"

import { useState, useEffect, use, Suspense } from 'react';
import { columns } from "./appointments/columns"
import { DataTable } from "./appointments/data-table"

import { format } from "date-fns"

import { Calendar, CalendarDayButton } from "@/components/ui/calendar"
import { Appointment } from '../types'
import { Dot } from 'lucide-react';
import BookingRequestWarningText from '@/components/ui/booking-request-warning-text';
import { glassAntiqua } from '../fonts';

interface AppointmentDateTimeAndStatus {
  dateTime: Date;
  status: number;
}

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function AppointmentsPage(
  props0:
    {
      searchParams: Promise<{ appointmentType: string, promotionName?: string }>
    }
) {
  return (
    <Suspense fallback={<div>Loading appointments...</div>}>
      <AppointmentsPageInner searchParamsPromise={props0.searchParams} />
    </Suspense>
  )
}

function AppointmentsPageInner({
  searchParamsPromise,
}: {
  searchParamsPromise: Promise<{ appointmentType: string; promotionName?: string }>;
}) {
  const searchParams = use(searchParamsPromise);
  const [today, setToday] = useState<Date | null>(null);
  const [data, setData] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(() => new Date())
  const [appointmentDates, setAppointmentDates] = useState<AppointmentDateTimeAndStatus[] | undefined>([]);

  useEffect(() => {
    setToday(new Date(new Date().setHours(0, 0, 0, 0)));
  }, []);

  const getAppointmentDatesAndStatuses = async () => {

    let res;
    if (searchParams.promotionName) {
      res = await fetch(`${baseUrl}/appointments/promotion/status/${searchParams.promotionName}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } else {
      res = await fetch(`${baseUrl}/appointments/status`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    if (!res.ok) {
      console.error("err:");
    }

    const result = await res.json();
    setAppointmentDates(result);
  };

  const fetchAppointments = async () => {
    if (selectedDate === undefined) return;
    const formattedDate = format(selectedDate, "MM-dd-yyyy");
    try {
      let response;
      if (searchParams.promotionName) {
        response = await fetch(`${baseUrl}/appointments/${formattedDate}/promotion/${searchParams.promotionName}`);
      } else {
        response = await fetch(`${baseUrl}/appointments/${formattedDate}`);
      }

      if (!response.ok) {
        throw new Error("network response was not ok");
      }

      const result = await response.json();
      result.forEach((appointment: Appointment) => appointment.appointmentType = searchParams.appointmentType);
      setData(result);
    } catch (error) {
      console.error("Error posting data: ", error);
    }
  };

  useEffect(() => {
    getAppointmentDatesAndStatuses();
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [selectedDate]);

  return (
    <>
      <div className="flex justify-center">
        <h1 id="booking" className={`scroll-mt-18 headline ${glassAntiqua.className}`}>Booking</h1>
      </div>

      <BookingRequestWarningText />

      <label className='flex items-center justify-center text-center mx-5 mb-2'>Select a date to see available appointments:</label>
      <Suspense fallback={<div>loading...</div>}>
        <div className='flex flex-col md:flex-row space-y-3 items-center md:items-start justify-center'>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date: Date) => today ? date < today : false}
            className="rounded-xl border shadow-sm [--cell-size:--spacing(12)]"
            components={{
              DayButton: ({ children, modifiers, day, ...props }) => {
                const dayWithAppointments = appointmentDates?.find(x => (new Date(x.dateTime)).toLocaleDateString() === day.date.toLocaleDateString());
                const dayWithAppointmentsStatus = dayWithAppointments?.status;

                return (
                  <CalendarDayButton day={day} modifiers={modifiers} {...props}>
                    {children}
                    <span className='absolute top-5'>{dayWithAppointmentsStatus ? <Dot className='size-12 text-amber-300' /> : dayWithAppointments && <Dot className='size-12 text-red-600' />}</span>
                  </CalendarDayButton>
                )
              },
            }}
          />
          <div className='px-5 min-w-full md:min-w-fit'>
            <DataTable columns={columns} data={data} />
          </div>
        </div>
      </Suspense>

      <div className="pb-5"></div>
    </>
  )
}
