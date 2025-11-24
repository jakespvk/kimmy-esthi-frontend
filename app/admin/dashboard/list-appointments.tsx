import { format } from "date-fns";
import { columns } from "./columns";
import { DataTable } from "../../booking/appointments/data-table"
import { useEffect, useState } from "react";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const today = new Date(new Date().setHours(0, 0, 0, 0));

export default function ListAppointments() {
  const [data, setData] = useState([]);

  const onSubmit = async (data: { statusFilter: "Available" | "Booked"; appointmentDate?: Date }) => {
    let formattedDate: string | undefined;
    let url = `${baseUrl}/admin/appointments?` + new URLSearchParams({
      booked: "Booked", // FIX THIS
    });
    if (data.appointmentDate) {
      formattedDate = format(data.appointmentDate, "MM-dd-yyyy");
      url = `${baseUrl}/admin/appointments?` + new URLSearchParams({
        booked: data.statusFilter === "Booked" ? "true" : "false",
        date: formattedDate
      });
    }
    try {

      const response = await fetch(url,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

      if (!response.ok) {
        throw new Error("network response was not ok");
      }

      let result = await response.json();
      // result.forEach((appointment: Appointment) => appointment.appointmentType = searchParams.appointmentType);
      setData(result);
    } catch (error) {
      console.error("Error posting data: ", error);
    }
  }

  useEffect(() => {
    onSubmit({ statusFilter: "Booked", appointmentDate: today });
  }, []);

  return (
    <div>
      <h1 className="flex justify-center my-5 text-xl">Appointments List</h1>
      <DataTable columns={columns} data={data} />
    </div>
  )
}

