"use client"

import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { FormEvent, useState, useEffect } from "react"
import { PromotionsSelector } from "./promotions-selector";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

interface Appointment {
  datetime: string;
  status: boolean;
  promotion?: Object;
}

export default function NewAppointments() {
  const [selectedDates, setSelectedDates] = useState<Date[] | undefined>();
  const [responseText, setResponseText] = useState('');
  const [promotionName, setPromotionName] = useState('');
  const [selectedPromotionId, setSelectedPromotionId] = useState("0");
  const [statusBooked, setStatusBooked] = useState(false);

  const getToday = () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  };

  const [today, setToday] = useState<Date | null>(null);

  useEffect(() => {
    setToday(getToday());
  }, []);

  const timeInputsInitialState = [
    {
      type: "time",
      id: 1,
      value: "09:00"
    }
  ];

  const [selectedTimes, setSelectedTimes] = useState(timeInputsInitialState);

  const onSubmit = async (e: SubmitEvent) => {
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
        if (selectedPromotionId === "1") {
          if (promotionName === "") {
            alert("Are you sure you want to create an empty promotion?");
            return;
          }
          appointments.push({ datetime: datetime, status: statusBooked, promotion: { name: promotionName } });
        } else if (selectedPromotionId === "0") {
          appointments.push({ datetime: datetime, status: statusBooked });
        } else {
          appointments.push({ datetime: datetime, status: statusBooked, promotion: { id: selectedPromotionId } });
        }
      });
    }
    const token = localStorage.getItem("super-secret-token");
    let response;
    if (selectedPromotionId !== "0") {
      response = await fetch(`${baseUrl}/admin/${token}/appointments/promotion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointments),
      });
    } else {
      response = await fetch(`${baseUrl}/admin/${token}/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointments),
      });
    }

    if (!response.ok) {
      setResponseText("Error adding appointments: " + response.statusText);
      setTimeout(() => setResponseText(''), 30000);
      console.error("err:", response.json());
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

  const removeTimeInput = () => {
    setSelectedTimes(selectedTimes.slice(0, -1));
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
        <h1 className="text-xl scroll-mt-24" id="create-appointments">Create New Appointments</h1>
      </div>

      <form onSubmit={onSubmit}>
        <div className="flex flex-col items-center justify-center">
          <div className="md:flex md:flex-row md:w-[500px] w-full items-center justify-center md:border rounded-xl">
            <div className="flex flex-col space-y-3 mx-3">
              <div className="flex justify-center">
                <button className="btn rounded-full border w-fit py-2 px-4" type="button" onClick={removeTimeInput}>Remove last time</button>
              </div>
              <div className="flex justify-center">
                <button className="btn rounded-full border w-fit py-2 px-4" type="button" onClick={addTimeInput}>Add another time</button>
              </div>
              {selectedTimes.map((timeInput, idx) => {
                return (
                  <input
                    onChange={handleChangeTime}
                    value={timeInput.value}
                    id={idx.toString()}
                    type={timeInput.type}
                    key={idx}
                    step={1800}
                    className="border rounded-full px-4 py-2 bg-background max-w-[150px] mx-auto"
                  />
                );
              })}
            </div>
            <div className="flex justify-center items-center">
              <Calendar
                mode="multiple"
                selected={selectedDates}
                onSelect={setSelectedDates}
                disabled={(date) =>
                  today ? date < today : false
                }
                className="px-5 md:rounded-r-xl md:border-l"
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center py-2">
            <PromotionsSelector selectedPromotionId={selectedPromotionId} setSelectedPromotionId={setSelectedPromotionId} setNewPromotionName={setPromotionName} />
            <div className="flex items-center justify-center mx-2">
              <Checkbox defaultChecked={statusBooked} onCheckedChange={() => setStatusBooked} className="checked:bg-accent checked:text-accent-content ring-accent" id="booked-checkbox" />
              <Label className="ml-2 wrap" htmlFor="booked-checkbox">Set status of created appointments to booked</Label>
            </div>
            <button className="rounded-full border px-4 py-2 my-5 hover:bg-accent-content hover:text-base-content" type="submit">submit</button>
            <p className={responseText.startsWith("Error") ? "text-red-700" : "text-green-700"}>{responseText}</p>
          </div>
        </div>
      </form>
    </>
  )
}
