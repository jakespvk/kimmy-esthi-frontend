"use client";

import AdminNavbar from "./admin-navbar";
import ListAppointments from "./list-appointments";
import NewAppointments from "./new-appointments";
import ServicesEditor from "./services-editor";

export default function AdminDashboard() {
  return (
    <div className="pb-5">
      <AdminNavbar />
      <div className="md:flex justify-center items-start">
        <div className="flex-col">
          <NewAppointments />
        </div>
        <div className="flex-col mx-3 md:mx-10 border-t md:border-0 pb-10">
          <ListAppointments />
        </div>
        <div className="flex-col mx-3 md:mx-10 border-t md:border-0">
          <ServicesEditor />
        </div>
      </div>
    </div>
  )
}
