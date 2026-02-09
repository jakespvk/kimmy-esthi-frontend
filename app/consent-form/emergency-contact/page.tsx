"use client";

import { saveEmergencyContact } from "@/app/api";
import { glassAntiqua } from "@/app/fonts";
import { EmergencyContactDetails } from "@/app/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function EmergencyContact(props: { searchParams: Promise<{ clientId: string }> }) {
  const router = useRouter();

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const emergencyContact: EmergencyContactDetails = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      relationship: formData.get("relationship") as string,
    }
    await saveEmergencyContact((await props.searchParams).clientId, emergencyContact);
    router.push("/consent-form/consent-and-acknowledgement?" + new URLSearchParams({ clientId: (await props.searchParams).clientId }));
  }
  return (
    <div className="w-full flex flex-col justify-center items-center mb-5">
      <div className="flex justify-center">
        <h3 id="consent-form--consent-and-acknowledgement" className={`subheading ${glassAntiqua.className}`}>Emergency Contact</h3>
      </div>
      <form className="max-w-3xl flex flex-col justify-center items-center *:my-2" onSubmit={handleSubmit}>
        <Label>Full Name:</Label>
        <Input name="name" type="text" />
        <Label>Phone Number:</Label>
        <Input name="phone" type="text" />
        <Label>Relationship:</Label>
        <Input name="relationship" type="text" />
        <Button>Submit</Button>
      </form>
    </div>
  )
}

