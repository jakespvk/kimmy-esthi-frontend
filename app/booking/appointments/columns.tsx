"use client";

import Link from "next/link"

import { ColumnDef } from "@tanstack/react-table"
import { Appointment } from "@/app/types";
// import { MoreHorizontal } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import StatusIndicator from "./statusIndicator"

export const columns: ColumnDef<Appointment>[] = [
  {
    accessorKey: "dateTime",
    header: () => <div className="p-3 mx-3 mr-5 text-center w-max-fit">Time</div>,
    cell: ({ row }) => {
      return <div className="p-3 mx-3 mr-5 text-center font-medium">
        {new Date(row.getValue("dateTime")).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
      </div>
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="p-3 mx-3 text-center w-max-fit">Status</div>,
    cell: ({ row }) => {
      return (
        <div className="p-3 mx-3 text-center font-medium">
          {row.getValue("status") ? <p className="text-red-600">Booked</p> : <p className="text-green-600">Available</p>}
        </div>
      )
    },
  },
  {
    id: "actions",
    header: () => <div className="p-3 mx-3 text-center w-max-fit">Book</div>,
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
        {/*return <div><button disabled className="btn">Book Now!</button></div>*/ }
        // @ts-ignore
        return <div>
          <a type="button" disabled
            className="disabled:bg-slate-50 p-3 mx-3 my-1 btn">
            Book Now!
          </a>
        </div>
      } else {
        return <div>
          <Link
            href={{
              pathname: "/booking/scheduleAppointment",
              query: {
                id: appointment.id,
              },
            }}
            type="button"
            className="p-3 mx-3 my-1 btn text-white 
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


