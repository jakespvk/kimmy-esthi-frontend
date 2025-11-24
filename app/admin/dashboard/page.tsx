"use client";

import ListAppointments from "./list-appointments";
import NewAppointments from "./new-appointments";

export default function AdminDashboard() {
  return (
    <div className="md:flex justify-center items-start">
      <div className="flex-col">
        <NewAppointments />
      </div>
      <div className="flex-col mx-3 md:mx-10 border-t md:border-0">
        <ListAppointments />
      </div>
    </div>
  )
}
