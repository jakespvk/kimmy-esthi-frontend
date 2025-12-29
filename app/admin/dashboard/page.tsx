"use client";

import AdminNavbar from "./admin-navbar";
import ListAppointments from "./list-appointments";
import NewAppointments from "./new-appointments";
import ServicesViewer from "./services-viewer";

export default function AdminDashboard() {
  return (
    <div className="pb-5">
      <AdminNavbar />
      <div className="md:flex justify-center items-start flex-wrap">
        <div className="flex-col mx-3 md:mx-10 border-t md:border-0 mt-5 md:mt-0">
          <NewAppointments />
        </div>
        <div className="flex-col mx-3 md:mx-10 border-t md:border-0 pb-10">
          <ListAppointments />
        </div>
        <div className="flex-col mx-3 md:mx-10 border-t md:border-0">
          <ServicesViewer />
        </div>
      </div>
    </div>
  )
}
