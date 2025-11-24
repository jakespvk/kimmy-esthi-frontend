"use client";

import ListAppointments from "./list-appointments";
import NewAppointments from "./new-appointments";

export default function AdminDashboard() {
  return (
    <div className="flex justify-center items-start">
      <div className="flex-col mx-10">
        <ListAppointments />
      </div>
      <div className="flex-col">
        <NewAppointments />
      </div>
    </div>
  )
}
