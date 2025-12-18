import { DataTable } from "@/app/booking/appointments/data-table";
import { facialPackages, serviceAddOns, signatureFacials } from "@/app/services/services";
import { serviceEditorColumns } from "./service-editor-columns";

export default function ServicesEditor() {
  return (
    <div>
      <h1 className="flex justify-center my-5 text-xl" id="edit-services">Edit Services</h1>
      <div className="flex flex-col gap-5">
        <DataTable columns={serviceEditorColumns} data={signatureFacials} />
        <DataTable columns={serviceEditorColumns} data={facialPackages} />
        <DataTable columns={serviceEditorColumns} data={serviceAddOns} />
      </div>
    </div >
  )
}

