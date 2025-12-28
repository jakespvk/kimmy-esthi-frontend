import { Service } from "@/app/types";
import { ServiceEditor } from "./service-editor";

export default function AdminServiceDetails({ service }: { service: Service }) {
  function showModal() {
    {/* @ts-ignore */ }
    document.getElementById("service-detail-modal")?.showModal();
  }

  function editService() {
    console.log("edit service")
    return <ServiceEditor service={service} />
  }

  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button className="btn" onClick={() => showModal()}>Details</button>
      <dialog id="service-detail-modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Booking Details</h3>
          {Object.entries(service).map((field, index) => (
            <div className="my-5" key={index}>
              <label className="font-bold">{field[0]}:&nbsp;</label>
              <p>{field[1]}</p>
            </div>
          ))}
          <div className="modal-action">
            <button className="btn" onClick={() => editService()}>Edit</button>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  )
}
