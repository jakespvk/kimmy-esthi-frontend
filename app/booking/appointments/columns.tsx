"use client";

import Link from "next/link"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import StatusIndicator from "./statusIndicator"

export type Appointment = {
    id: number
    date: string
    time: string
    status: string
}

export const columns: ColumnDef<Appointment>[] = [
    {
        accessorKey: "time",
        header: () => <div className="p-3 mx-3 mr-5 text-center w-max-fit">Time</div>,
        cell: ({ row }) => {
            const apptDateTime: string = row.getValue("time")

            return <div className="p-3 mx-3 mr-5 text-center font-medium">{apptDateTime}</div>
        },
    },
    {
        accessorKey: "status",
        header: () => <div className="p-3 mx-3 text-center w-max-fit">Status</div>,
        cell: ({ row }) => {
            const apptStatus: string = row.getValue("status")

            if (apptStatus === "Available") {
                return <div className="p-3 mx-3 text-center text-green-500 font-medium">
                        {apptStatus}
                    </div>
            } else if (apptStatus === "Booked") {
                return <div className="p-3 mx-3 text-center text-red-500 font-medium">
                        {apptStatus}
                    </div>
            }
            return <div className="p-3 mx-3 text-center font-medium">{apptStatus}</div>
        },
    },
    //{
    //    id: "statusIndicator",
    //    header: () => <div className="p-3 text-3xl">&#9675;</div>,
    //    cell: ({ row }) => {
    //        const appointment = row.original

    //        if (appointment.status === "Available") {
    //            return <div><img src="https://png.pngtree.com/png-clipart/20201029/ourmid/pngtree-circle-clipart-green-circle-png-image_2382000.jpg" 
    //                alt="green" className="p-3 h-5 w-5"></img></div>
    //        } else if (appointment.status === "Booked") {
    //            return <div><img src="https://www.citypng.com/public/uploads/preview/red-dot-circle-icon-transparent-background-701751694972430m9tnpqnwnd.png" 
    //                alt="red" className="p-3 h-5 w-5"></img></div>
    //        } else {
    //            return <div className="p-3 text-xl">&#9679;</div>
    //        }
    //    },
    //},
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

            if (appointment.status == "Booked") {
                {/*return <div><button disabled className="btn">Book Now!</button></div>*/}
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
                                    date: appointment.date,
                                    time: appointment.time,
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


