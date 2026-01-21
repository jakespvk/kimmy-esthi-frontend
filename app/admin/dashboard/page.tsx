"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import AdminNavbar from "./admin-navbar";
import ListAppointments from "./list-appointments";
import NewAppointments from "./new-appointments";
import ServicesViewer from "./services-viewer";
import ConsentForm from "./consent-form";

const queryClient = new QueryClient();

export default function AdminDashboard() {
  return (
    <div className="pb-5">
      <QueryClientProvider client={queryClient}>
        <AdminNavbar />
        <div className="relative md:flex justify-center items-start flex-wrap *:mx-3 *:flex-col *:md:mx-10 *:border-t *:not-first:my-10 *:md:border-0 *:md:not-first:mt-5 *:md:mt-0">
          <div className="">
            <NewAppointments />
          </div>
          <div className="">
            <ListAppointments />
          </div>
          <div className="">
            <ServicesViewer />
          </div>
          <div className="">
            <ConsentForm />
          </div>
        </div>
      </QueryClientProvider>
    </div>
  )
}
