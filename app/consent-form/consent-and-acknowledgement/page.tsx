"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import SignaturePad from "@/components/ui/signature-pad";
import { Base64URLString } from "@/app/types";
import { Save, Eraser } from "lucide-react";
import { useState } from "react";
import { saveConsentAndAcknowledgement } from "@/app/api";
import { useRouter } from "next/navigation";

export default function ConsentAndAcknowledgement(props: { searchParams: Promise<{ clientId: string }> }) {
  const router = useRouter();

  const [signature, setSignature] = useState<Base64URLString>(null);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    await saveConsentAndAcknowledgement((await props.searchParams).clientId, signature);
    router.push("/consent-form/initial-statements?" + new URLSearchParams({ clientId: (await props.searchParams).clientId }));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Consent and Acknowledgement</h1>
        <p>
          By signing below, I acknowledge that I have been informed about the nature of the facial treatment
          and give my consent to receive it. I understand that while the treatment is intended to improve my
          skin’s condition, individual results may vary. I have disclosed all relevant medical information and
          agree to follow any aftercare instructions provided.
        </p>
        <Label>Client's Signature:</Label>
        <SignaturePad
          className="my-3"
          penColor="hsl(var(--foreground))"
          size="sm"
          showButtons={true}
          saveButtonIcon={<Save />}
          clearButtonIcon={<Eraser />}
          onSave={setSignature}
        />
        <Button>Submit</Button>
      </form>
    </div>
  )
}

