"use client";

import { glassAntiqua } from "@/app/fonts";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { postClientInfo } from "@/app/api";
import { ConsentFormClientInfo } from "@/app/types";
import { useRouter } from "next/navigation";

export default function ClientDetails() {

  const router = useRouter();

  async function submitClientInfo(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const clientInfo: ConsentFormClientInfo = {
      fullName: formData.get('full-name') as string,
      dob: new Date(Date.parse(formData.get('date-of-birth') as string)).toISOString(),
      gender: formData.get('gender') as string,
      phoneNumber: formData.get('phone-number') as string,
      email: formData.get('email') as string,
    };
    console.log(clientInfo);
    const response = await postClientInfo(clientInfo);
    router.push("/consent-form/products?" + new URLSearchParams({ clientId: response }));
  }

  return (
    <div>
      <form onSubmit={submitClientInfo} className="mx-3">
        <div className="flex justify-center">
          <h3 id="consent-form--client-info" className={`subheading ${glassAntiqua.className}`}>Personal Information</h3>
        </div>
        <Label className='w-max justify-self-start my-2'>Full Name:</Label>
        <Input className="max-w-96 mb-2" type="text" name="full-name" />
        <Label className='w-max justify-self-start my-2'>Date of Birth:</Label>
        <Input className="max-w-96 mb-2" type="text" name="date-of-birth" />
        <Label className='w-max justify-self-start my-2'>Gender:</Label>
        <Input className="max-w-96 mb-2" type="text" name="gender" />
        <Label className='w-max justify-self-start my-2'>Phone Number:</Label>
        <Input className="max-w-96 mb-2" type="text" name="phone-number" />
        <Label className='w-max justify-self-start my-2'>Email Address:</Label>
        <Input className="max-w-96 mb-2" type="text" name="email" />
        <div className="flex justify-center">
          <Button className="my-2" type="submit">Next</Button>
        </div>
      </form>
    </div>
  )
}


