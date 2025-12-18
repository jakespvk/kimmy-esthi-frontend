"use client";

import { ColumnDef } from "@tanstack/react-table"
import { Service } from "@/app/types";
import AdminServiceDetails from "./admin-service-details";

export const serviceEditorColumns: ColumnDef<Service>[] = [
  {
    accessorKey: "cardTitle",
    header: () => <div className="ml-2 text-center w-max">Name</div>,
    cell: ({ row }) => {
      return <div className="ml-2 text-center w-max">
        {row.getValue("cardTitle")}
      </div>
    },
  },
  {
    accessorKey: "details",
    header: () => <div className="flex grow justify-end mr-2">Show Details</div>,
    cell: ({ row }) => {
      return (
        <div className="flex grow justify-end mr-3">
          <AdminServiceDetails service={row.original} />
        </div>
      )
    },
  }
]
