"use client"

import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { FormEvent, useState } from "react"

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

interface Appointment {
  datetime: string;
  status: number;
}

const today = new Date(new Date().setHours(0, 0, 0, 0));

export default function NewAppointments() {

  const [selectedDates, setSelectedDates] = useState<Date[] | undefined>();
  const [responseText, setResponseText] = useState('');

  const inputArr = [
    {
      type: "time",
      id: 1,
      value: ""
    }
  ];

  const [selectedTimes, setSelectedTimes] = useState(inputArr);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    let appointments: Appointment[] = [];
    for (const time of selectedTimes) {
      if (!selectedDates) {
        return;
      }
      selectedDates.map((date) => {
        const hours = parseInt(time.value.substring(0, 2));
        const minutes = parseInt(time.value.substring(3, 5));
        const datetime = format(new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes), "yyyy-MM-dd'T'HH:mm:ss");
        appointments.push({ datetime: datetime, status: 0 });
      });
    }
    const response = await fetch(`${baseUrl}/admin/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointments),
    });

    if (!response.ok) {
      setResponseText("Error adding appointments: " + response.statusText);
    }

    setSelectedDates(undefined);
    setSelectedTimes(inputArr);
    setResponseText("Successfully created new appointments!");
    setTimeout(() => setResponseText(''), 10000);
  }

  const addInput = () => {
    setSelectedTimes((s: any) => {
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
    setSelectedTimes(s => {
      const newArr = s.slice();
      newArr[index].value = e.target.value;

      return newArr;
    });
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col items-center justify-center mt-10">
          <div className="flex flex-row items-center justify-center border rounded-xl">
            <div className="flex flex-col space-y-3 mx-3">
              {selectedTimes.map((item, i: number) => {
                return (
                  <div className="border rounded-full px-4 py-2">
                    <input
                      onChange={handleChange}
                      value={item.value}
                      id={i.toString()}
                      type={item.type}
                      key={i}
                    />
                  </div>
                );
              })}
              <button onClick={addInput}>+</button>
            </div>
            <Calendar
              mode="multiple"
              selected={selectedDates}
              onSelect={setSelectedDates}
              disabled={(date) =>
                date < today
              }
              className="bg-(--color-base-100) rounded-r-xl border-l"
              initialFocus
            />
          </div>
          <div className="flex flex-col items-center justify-center py-2">
            <button className="rounded-full border px-4 py-2 my-5 hover:bg-accent-content hover:text-base-content" type="submit">submit</button>
            <p className="text-green-700">{responseText}</p>
          </div>
        </div>
      </form>
    </>
  )
}
