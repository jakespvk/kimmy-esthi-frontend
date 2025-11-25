import { format } from "date-fns";
import { columns } from "./columns";
import { DataTable } from "../../booking/appointments/data-table"
import { useCallback, useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const today = new Date(new Date().setHours(0, 0, 0, 0));

export default function ListAppointments() {
  const [data, setData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("booked");
  const [dateFilter, setDateFilter] = useState(null);

  const onSubmit = useCallback(async () => {
    const token = localStorage.getItem("super-secret-token");
    let formattedDate: string | undefined;
    let url = `${baseUrl}/admin/${token}/appointments?` + new URLSearchParams({
      booked: statusFilter === "booked" ? "true" : "false",
    });
    if (dateFilter) {
      formattedDate = format(dateFilter, "MM-dd-yyyy");
      url = `${baseUrl}/admin/${token}/appointments?` + new URLSearchParams({
        booked: statusFilter === "booked" ? "true" : "false",
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
  }, [dateFilter, statusFilter]);

  useEffect(() => {
    onSubmit();
  }, [statusFilter, onSubmit]);

  return (
    <div className="pb-5">
      <h1 className="flex justify-center my-5 text-xl">Appointments List</h1>
      <div className="mb-2">
        <Select value={statusFilter} onValueChange={(e) => setStatusFilter(e)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Show All</SelectItem>
            <SelectItem value="booked">Show Booked Only</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}

