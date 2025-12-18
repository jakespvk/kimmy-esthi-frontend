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

  const timeInputsInitialState = [
    {
      type: "time",
      id: 1,
      value: "09:00"
    }
  ];

  const [selectedTimes, setSelectedTimes] = useState(timeInputsInitialState);

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
    const token = localStorage.getItem("super-secret-token");
    const response = await fetch(`${baseUrl}/admin/${token}/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointments),
    });

    if (!response.ok) {
      setResponseText("Error adding appointments: " + response.statusText);
      setTimeout(() => setResponseText(''), 30000);
      console.error("err:", response);
      return;
    }

    setSelectedDates(undefined);
    setSelectedTimes(timeInputsInitialState);
    setResponseText("Successfully created new appointments!");
    setTimeout(() => setResponseText(''), 10000);
  }

  const addTimeInput = () => {
    setSelectedTimes((s: any) => {
      return [
        ...s,
        {
          type: "time",
          value: "09:00"
        }
      ];
    });
  };

  const handleChangeTime = (e: any) => {
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
      <div className="flex flex-col items-center justify-center my-5">
        <h1 className="text-xl" id="create-appointments">Create New Appointments</h1>
      </div>

      <form onSubmit={onSubmit}>
        <div className="flex flex-col items-center justify-center">
          <div className="md:flex md:flex-row md:w-[500px] w-full items-center justify-center md:border rounded-xl">
            <div className="flex flex-col space-y-3 mx-3">
              {selectedTimes.map((timeInput, idx) => {
                return (
                  <input
                    onChange={handleChangeTime}
                    value={timeInput.value}
                    id={idx.toString()}
                    type={timeInput.type}
                    key={idx}
                    step={1800}
                    className="border rounded-full px-4 py-2 bg-background"
                  />
                );
              })}
              <div className="flex justify-center">
                <button className="rounded-full border w-fit py-2 px-4" type="button" onClick={addTimeInput}>Add another time</button>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <Calendar
                mode="multiple"
                selected={selectedDates}
                onSelect={setSelectedDates}
                disabled={(date) =>
                  date < today
                }
                className="px-5 md:rounded-r-xl md:border-l"
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center py-2">
            <button className="rounded-full border px-4 py-2 my-5 hover:bg-accent-content hover:text-base-content" type="submit">submit</button>
            <p className={responseText.startsWith("Error") ? "text-red-700" : "text-green-700"}>{responseText}</p>
          </div>
        </div>
      </form>
    </>
  )
}
