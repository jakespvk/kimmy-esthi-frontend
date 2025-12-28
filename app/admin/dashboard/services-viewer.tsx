import { DataTable } from "@/app/booking/appointments/data-table";
import { facialPackages, serviceAddOns, signatureFacials } from "@/app/services/services";
import { serviceViewerColumns } from "./service-viewer-columns";

export default function ServicesViewer() {
  return (
    <div>
      <h1 className="flex justify-center my-5 text-xl" id="edit-services">Edit Services</h1>
      <div className="flex flex-col gap-5">
        <DataTable columns={serviceViewerColumns} data={signatureFacials} />
        <DataTable columns={serviceViewerColumns} data={facialPackages} />
        <DataTable columns={serviceViewerColumns} data={serviceAddOns} />
      </div>
    </div >
  )
}
