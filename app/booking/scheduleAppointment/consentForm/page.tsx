"use client";

import { useContext, useState } from 'react';

import { Base64URLString, ConsentFormStatement } from '@/app/types';
import SignaturePad from '@/components/ui/signature-pad';
import { Eraser, Save } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { submitConsentForm } from '@/app/api';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { ServicesContext } from '@/context/ServicesContext';
import { glassAntiqua } from '@/app/fonts';

const ConsentForm = (props: {
  searchParams: Promise<{
    appointmentId: string;
    clientId?: string;
  }>;
}) => {
  const [printedName, setPrintedName] = useState<string>('');
  const [initials, setInitials] = useState<Base64URLString>(null);
  const [signature, setSignature] = useState<Base64URLString>(null);
  const initialConsentFormStatements = useContext(ServicesContext).activeConsentFormStatements;
  const [consentFormStatements, setConsentFormStatements] = useState<ConsentFormStatement[]>(initialConsentFormStatements);
  const [response, setResponse] = useState('');

  const router = useRouter();

  function updateStatement(idx: number) {
    if (consentFormStatements[idx]?.initialed) consentFormStatements[idx].initialed = false;
    else consentFormStatements[idx].initialed = true;
    setConsentFormStatements([...consentFormStatements]);
  }

  async function onSubmit() {
    if (consentFormStatements.filter(s => s.initialed).length !== consentFormStatements.length) {
      alert("must initial them all");
    }
    const result = await submitConsentForm(
      printedName,
      consentFormStatements.filter((s) => s.initialed).map((s) => s.statement),
      initials,
      signature,
      (await props.searchParams).clientId
    );

    if (result) {
      setResponse("Thank you for filling out the consent form!");
      setTimeout(() => setResponse(""), 10000);
      router.push("/services");
    } else {
      setResponse("Something went wrong... please try again");
      setTimeout(() => setResponse(""), 30000);
    }
  }

  return (
    <div>
      <div className="flex justify-center">
        <h1 id="consent-form" className={`scroll-mt-18 headline ${glassAntiqua.className}`}>Consent Form</h1>
      </div>
      <div className='mx-5 lg:flex flex-col justify-center items-center'>
        <Label className='w-max justify-self-start'>Print Name:</Label>
        <Input className="max-w-96" type="text" value={printedName} onChange={(e) => setPrintedName(e.target.value)} />
        <div className='mt-5 flex flex-col justify-center items-center'>
          <Label className=''>Please enter your initials here. To apply them, check the boxes:</Label>
          <SignaturePad
            className="w-36 my-3"
            penColor="hsl(var(--foreground))"
            size="xsm"
            showButtons={true}
            saveButtonIcon={<Save />}
            clearButtonIcon={<Eraser />}
            onSave={setInitials}
          />
        </div>
        <ul>
          {consentFormStatements.map((stmt, idx) =>
            <li className='flex items-center my-2' key={idx}> <div className='absolute'>
              {(stmt.initialed && initials)
                ?
                <img onClick={() => updateStatement(idx)} className='w-6 h-4 bg-contain bg-left border border-accent rounded-sm' height={8} src={initials} alt="initials" />
                :
                <Checkbox id={idx.toString()} checked={stmt.initialed ?? false} onCheckedChange={() => updateStatement(idx)} className="data-[state=unchecked]:border-accent data-[state=checked]:border-accent data-[state=checked]:bg-accent data-[state=checked]:text-accent-content" />
              }
            </div>
              <Label htmlFor={idx.toString()} className='ml-7'>{stmt.statement}</Label>
            </li>
          )}
        </ul>
        <div className='mt-5 flex flex-col justify-center items-center'>
          <Label className=''>By signing...</Label>
          <SignaturePad
            className="my-3"
            penColor="hsl(var(--foreground))"
            size="sm"
            showButtons={true}
            saveButtonIcon={<Save />}
            clearButtonIcon={<Eraser />}
            onSave={setSignature}
          />
          <button className="btn" onClick={onSubmit}>Submit</button>
          <p>{response}</p>
        </div>
      </div>
    </div >
  )
}

export default ConsentForm;
