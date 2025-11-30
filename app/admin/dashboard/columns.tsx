"use client";

import Link from "next/link"

import { ColumnDef } from "@tanstack/react-table"
import { Appointment } from "@/app/types";

export const columns: ColumnDef<Appointment>[] = [
  {
    accessorKey: "dateTime",
    header: () => <div className="text-center">Date</div>,
    cell: ({ row }) => {
      return <div className="ml-2 text-center w-max">
        {new Date(row.getValue("dateTime")).toLocaleDateString()}
      </div>
    },
  },
  {
    accessorKey: "dateTime",
    header: () => <div className="text-center">Time</div>,
    cell: ({ row }) => {
      return <div className="text-center w-max">
        {new Date(row.getValue("dateTime")).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
      </div>
    },
  },
  {
    accessorKey: "appointmentType",
    header: () => <div className="text-center">Appointment Type</div>,
    cell: ({ row }) => {
      const serviceName = row.original.scheduledAppointment?.serviceName;
      return (
        <div className="text-center w-max">
          {serviceName}
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center">
          {row.getValue("status") ? <p className="text-red-600">Booked</p> : <p className="text-green-600">Available</p>}
        </div>
      )
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center">Book</div>,
    cell: ({ row }) => {
      // need to potentially make functionality where:
      // appointments are listed every half hour
      // BUT obviously facials take longer than a half hour
      // so booking an appointment will need to block off 
      // the next hour and a half or so
      // would be cleanest to remove those "extra booked appts"
      // ALSO run into the issue of people booking at the same
      // time but that's a problem for later down the road...
      //
      // for now need a way to include the date and time selected
      // and carry it over to the scheduling form...
      const appointment = row.original

      if (appointment.status == true) {
        return <div>
          {/* @ts-ignore */}
          <a type="button" disabled
            className="disabled:bg-slate-50 mx-2 w-max btn">
            Book Now!
          </a>
        </div>
      } else {
        return <div>
          <Link
            href={{
              pathname: "/booking/scheduleAppointment",
              query: {
                appointmentId: appointment.id,
                appointmentType: "blah",
                preferredName: "blah",
                email: "blah",
                phoneNumber: "0000000000",
                skinConcerns: "blah",
              },
            }}
            type="button"
            className="w-max btn mx-2 text-white 
                            bg-gradient-to-r from-amber-400 to-amber-600 border-amber-500 
                            hover:from-amber-300 hover:to-amber-500 hover:border-amber-400"
          >
            Book Now!
          </Link>
        </div>
      }

    }
  }
]


