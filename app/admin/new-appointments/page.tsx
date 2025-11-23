"use client"

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
import { Appointment } from '../../types'
import { FormEvent, useState } from "react"

const FormSchema = z.object({
  appointmentDates: z.object({
    Item: z.date({
      required_error: "A date is required.",
    }),
  }),
})

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const today = new Date(new Date().setHours(0, 0, 0, 0));

export default function NewAppointments({ searchParams }:
  {
    searchParams:
    { appointmentType: string }
  }) {

  const [selectedDates, setSelectedDates] = useState<Date[] | undefined>();
  const [selectedTimes, setSelectedTimes] = useState();
  const [testTime, setTestTime] = useState();
  const [count, setCount] = useState<number>(1);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const onSubmit = async (data: z.infer<typeof FormSchema> | undefined) => {
    if (data === undefined) {
      // HANDLE THROW ERROR
    } else {
      const response = await fetch(`${baseUrl}/admin/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data.appointmentDates }),
      });

      if (!response.ok) {
        // HANDLE ERROR RESPONSE
      }

      let result = await response.json();
    }
  }

  const inputArr = [
    {
      type: "time",
      id: 1,
      value: ""
    }
  ];

  const [arr, setArr] = useState(inputArr);

  const addInput = () => {
    setArr((s: any) => {
      return [
        ...s,
        {
          type: "time",
          value: ""
        }
      ];
    });
  };

  const handleChange = (e: any) => {
    e.preventDefault();

    const index = e.target.id;
    setArr(s => {
      const newArr = s.slice();
      newArr[index].value = e.target.value;

      return newArr;
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let appointmentsList: Appointment[] = [];
    if (selectedDates === undefined) {
      return;
    } else {
      for (let i = 0; i < selectedDates.length; i++) {
        inputArr.map((time) => {
          console.log(time.value);
          let apptTime = new Date(time.value);
          console.log(apptTime);
          let apptDate = new Date(
            selectedDates[i].getFullYear(),
            selectedDates[i].getMonth(),
            selectedDates[i].getDay(),
            apptTime.getHours(),
            apptTime.getMinutes()
          );
          appointmentsList.push({
            dateTime: apptDate,
            status: false,
          });
        })
      }
      await createAppointments(appointmentsList);
    }
  }

  async function createAppointments(appointments: Appointment[]) {
    console.log(appointments);
    const response = await fetch(`${baseUrl}/admin/appointments`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ appointments }),
    });
    console.log(response.json());
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row items-start justify-center gap-10">
          <div className="flex flex-col space-y-3">
            <button onClick={addInput}>+</button>
            {arr.map((item, i) => {
              return (
                <input
                  onChange={handleChange}
                  value={item.value}
                  id={i.toString()}
                  type={item.type}
                  key={i}
                />
              );
            })}
          </div>
          <Calendar
            mode="multiple"
            selected={selectedDates}
            onSelect={setSelectedDates}
            disabled={(date) =>
              date < today
            }
            className="bg-(--color-base-100)"
            initialFocus
          />
          <button type="submit">submit</button>
          <input type="time" value={testTime} onChange={setTestTime((e: FormEvent<HTMLFormElement>) => e.target)} />
        </div>
      </form>
    </>
  )
}
