"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import SignaturePad from "@/components/ui/signature-pad";
import { Base64URLString } from "@/app/types";
import { Save, Eraser } from "lucide-react";
import { useState } from "react";
import { saveConsentAndAcknowledgement } from "@/app/api";
import { useRouter } from "next/navigation";
import { glassAntiqua } from "@/app/fonts";

export default function ConsentAndAcknowledgement(props: { searchParams: Promise<{ clientId: string }> }) {
  const router = useRouter();

  const [signature, setSignature] = useState<Base64URLString>(null);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    await saveConsentAndAcknowledgement((await props.searchParams).clientId, signature);
    router.push("/consent-form/initial-statements?" + new URLSearchParams({ clientId: (await props.searchParams).clientId }));
  }

  return (
    <div className="w-full flex justify-center items-center mb-5">
      <form onSubmit={handleSubmit}>
        <div className="max-w-3xl flex flex-col justify-center items-center">
          <div className="flex justify-center">
            <h3 id="consent-form--consent-and-acknowledgement" className={`subheading ${glassAntiqua.className}`}>Consent and Acknowledgement</h3>
          </div>
          <p className="mb-5">
            By signing below, I acknowledge that I have been informed about the nature of the facial treatment
            and give my consent to receive it. I understand that while the treatment is intended to improve my
            skin’s condition, individual results may vary. I have disclosed all relevant medical information and
            agree to follow any aftercare instructions provided.
          </p>
          <Label>Client's Signature:</Label>
          <SignaturePad
            className="my-3 max-w-112"
            penColor="hsl(var(--foreground))"
            size="sm"
            showButtons={true}
            saveButtonIcon={<Save />}
            clearButtonIcon={<Eraser />}
            onSave={setSignature}
          />
          <Button className="my-2">Submit</Button>
        </div>
      </form>
    </div>
  )
}

