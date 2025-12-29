"use client";

import { Service } from "@/app/types";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function AdminServiceDetails({ service }: { service: Service }) {
  const [isEditing, setIsEditing] = useState(false);

  function toggleIsEditing() {
    setIsEditing(!isEditing);
  }

  function saveChanges() {
  }

  return (
    <div>
      {/* @ts-ignore */}
      <button className="btn" onClick={() => document.getElementById("service-detail-modal").showModal()}>Details</button>
      <dialog id="service-detail-modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Booking Details</h3>
          {Object.entries(service).map((field, index) => (
            <div className="my-5" key={index}>
              <label className="font-bold">{field[0]}:&nbsp;</label>
              {isEditing ? <Input defaultValue={field[1]} /> : <p>{field[1]}</p>}
            </div>
          ))}
          <div className="modal-action">
            {isEditing 
              ? 
              <button className="btn" onClick={() => { toggleIsEditing(); saveChanges(); }}>Save Changes</button> 
              : 
              <button className="btn" onClick={toggleIsEditing}>Edit</button>
            }
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
    </div >
  )
}
