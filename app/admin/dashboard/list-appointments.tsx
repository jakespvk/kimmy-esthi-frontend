import { format } from "date-fns";
import { columns } from "./columns";
import { DataTable } from "../../booking/appointments/data-table"
import { useCallback, useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@radix-ui/react-label";
import { AdminAppointment, Appointment } from "@/app/types";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const today = new Date(new Date().setHours(0, 0, 0, 0));

export default function ListAppointments() {
  const [data, setData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("booked");
  const [includeArchived, setIncludeArchived] = useState(false);
  const [dateFilter, setDateFilter] = useState(null);

  function toggleIncludeArchived() {
    if (includeArchived) setIncludeArchived(false);
    else setIncludeArchived(true);
  }

  const onSubmit = useCallback(async () => {
    const token = localStorage.getItem("super-secret-token");
    let formattedDate: string | undefined;
    let url = `${baseUrl}/admin/${token}/appointments?` + new URLSearchParams({
      booked: statusFilter === "booked" ? "true" : "false",
      includeArchived: includeArchived.toString(),
    });
    if (dateFilter) {
      formattedDate = format(dateFilter, "MM-dd-yyyy");
      url = `${baseUrl}/admin/${token}/appointments?` + new URLSearchParams({
        booked: statusFilter === "booked" ? "true" : "false",
        includeArchived: includeArchived.toString(),
        date: formattedDate
      });
    }
    try {
      console.log(url);

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
      result.forEach((appointment: AdminAppointment) => {
        appointment.date = appointment.dateTime;
        appointment.time = appointment.dateTime;
      });
      setData(result);
    } catch (error) {
      console.error("Error posting data: ", error);
    }
  }, [dateFilter, statusFilter, includeArchived]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="">
      <h1 className="flex justify-center my-5 text-xl" id="appointments-list">Appointments List</h1>
      <div className="flex mb-2">
        <Select value={statusFilter} onValueChange={(e) => setStatusFilter(e)}>
          <SelectTrigger className="w-[180px] mr-3">
            <SelectValue placeholder="Status Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Show All</SelectItem>
            <SelectItem value="booked">Show Booked Only</SelectItem>
          </SelectContent>
        </Select>
        <div className="self-center flex items-center gap-1">
          <Checkbox checked={includeArchived} onCheckedChange={() => toggleIncludeArchived()} className="data-[state=unchecked]:border-accent data-[state=checked]:border-accent data-[state=checked]:bg-accent data-[state=checked]:text-accent-content" id="archivedToggle" />
          <Label htmlFor="archivedToggle">Include Archived</Label>
        </div>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}

