"use client";

import type React from 'react';
import { useState } from 'react';

import SignaturePad from '@/components/ui/signature-pad';
import { Eraser, Save } from 'lucide-react';
import { initialedStatements } from './initialed-statements';
import Headline from '@/app/about/headline';

const ConsentForm: React.FC = () => {
  const [signature, setSignature] = useState("");

  console.log(signature);
  return (
    <div className='mx-5 lg:flex justify-center'>
      <Headline text="Consent Form" />
      <ul>
        {initialedStatements.map((stmt, idx) =>
          <li key={idx}>{stmt}</li>
        )}
      </ul>
      <SignaturePad
        className="max-w-64"
        penColor="hsl(var(--foreground))"
        size="md"
        showButtons={true}
        saveButtonIcon={<Save />}
        clearButtonIcon={<Eraser />}
        onSave={setSignature}
      />
    </div>
  )
}

export default ConsentForm;
