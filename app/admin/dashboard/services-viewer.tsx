import { DataTable } from "@/app/booking/appointments/data-table";
import { serviceViewerColumns } from "./service-viewer-columns";
import { useServices } from "@/hooks/useServices";

export default function ServicesViewer() {
  const { signatureFacials, facialPackages, serviceAddOns } = useServices();

  if (signatureFacials.isLoading) return <div>Loading...</div>;
  if (signatureFacials.isError) return <div>Error loading services</div>;

  return (
    <div>
      <h1 className="flex justify-center my-5 text-xl scroll-mt-24" id="edit-services">Edit Services</h1>
      <div className="flex flex-col gap-5">
        <DataTable columns={serviceViewerColumns} data={signatureFacials.data ?? []} />
        <DataTable columns={serviceViewerColumns} data={facialPackages.data ?? []} />
        <DataTable columns={serviceViewerColumns} data={serviceAddOns.data ?? []} />
      </div>
    </div >
  )
}
