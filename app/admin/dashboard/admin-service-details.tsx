import { Service } from "@/app/types";

export default function AdminServiceDetails({ service }: { service: Service }) {
  function showModal() {
    {/* @ts-ignore */ }
    document.getElementById("service-detail-modal")?.showModal();
  }
  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button className="btn" onClick={() => showModal()}>Details</button>
      <dialog id="service-detail-modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Booking Details</h3>
          <div className="flex py-4">
            <label className="font-bold">Service Name:&nbsp;</label>
            <p>{service.serviceName}</p>
          </div>
          <div className="flex py-4">
            <label className="font-bold">Service Type:&nbsp;</label>
            <p>{service.serviceType}</p>
          </div>
          <div className="flex py-4">
            <label className="font-bold">Card Title:&nbsp;</label>
            <p>{service.cardTitle}</p>
          </div>
          <div className="flex py-4">
            <label className="font-bold">Card Content:&nbsp;</label>
            <p>{service.cardContent}</p>
          </div>
          <div className="flex py-4">
            <label className="font-bold">Card Image (URL):&nbsp;</label>
            <p>{service.cardImgSrc}</p>
          </div>
          <div className="flex py-4">
            <label className="font-bold">Card Overlay Content:&nbsp;</label>
            <p>{service.cardOverlayContent}</p>
          </div>
          <div className="flex py-4">
            <label className="font-bold">Tags:&nbsp;</label>
            <p>{service.tags}</p>
          </div>
          <div className="flex py-4">
            <label className="font-bold">Price:&nbsp;</label>
            <p>{service.price}</p>
          </div>
          <div className="modal-action">
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
