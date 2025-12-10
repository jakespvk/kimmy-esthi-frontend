import { ScheduledAppointment } from "@/app/types"

export const BookingDetails = ({ scheduledAppointment }: { scheduledAppointment: ScheduledAppointment | undefined }) => {
  function showModal() {
    {/* @ts-ignore */ }
    document.getElementById("appointment-detail-modal")?.showModal();
  }
  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button className="btn" onClick={() => showModal()}>Details</button>
      <dialog id="appointment-detail-modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Booking Details</h3>
          <div className="flex py-4">
            <label className="font-bold">Preferred Name:&nbsp;</label>
            <p>{scheduledAppointment?.preferredName}</p>
          </div>
          <div className="flex py-4">
            <label className="font-bold">Email:&nbsp;</label>
            <p>{scheduledAppointment?.email}</p>
          </div>
          <div className="flex py-4">
            <label className="font-bold">Phone Number:&nbsp;</label>
            <p>{scheduledAppointment?.phoneNumber}</p>
          </div>
          <div className="flex py-4">
            <label className="font-bold">Skin Concerns:&nbsp;</label>
            <p>{scheduledAppointment?.skinConcerns}</p>
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
