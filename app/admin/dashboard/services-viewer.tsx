import { DataTable } from "@/app/booking/appointments/data-table";
import { serviceViewerColumns } from "./service-viewer-columns";
import { useContext } from "react";
import { ServicesContext } from "@/context/ServicesContext";

export default function ServicesViewer() {
  const services = useContext(ServicesContext);
  return (
    <div>
      <h1 className="flex justify-center my-5 text-xl scroll-mt-24" id="edit-services">Edit Services</h1>
      <div className="flex flex-col gap-5">
        <DataTable columns={serviceViewerColumns} data={services.signatureFacials} />
        <DataTable columns={serviceViewerColumns} data={services.facialPackages} />
        <DataTable columns={serviceViewerColumns} data={services.serviceAddOns} />
      </div>
    </div >
  )
}
