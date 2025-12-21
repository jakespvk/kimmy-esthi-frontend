"use client";

import type React from 'react';
import { useState } from 'react';

import SignaturePad, { Base64URLString } from '@/components/ui/signature-pad';
import { Eraser, Save } from 'lucide-react';
import { initialedStatements, InitialedStatement } from './initialed-statements';
import Headline from '@/app/about/headline';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const ConsentForm: React.FC = () => {
  const [signature, setSignature] = useState<Base64URLString>(null);
  const [statements, setStatements] = useState<InitialedStatement[]>(initialedStatements);

  function updateStatement(idx: number) {
    console.log(signature);
    if (statements[idx]?.initialed) statements[idx].initialed = false;
    else statements[idx].initialed = true;
    setStatements([...statements]);
  }

  return (
    <div>
      <div>
        <Headline text="Consent Form" />
      </div>
      <div className='mx-5 lg:flex flex-col justify-center items-center'>
        <div className='mt-5 flex flex-col justify-center items-center'>
          <Label className=''>Please enter your initials here. To apply them, check the boxes:</Label>
          <SignaturePad
            className="w-36 my-3"
            penColor="hsl(var(--foreground))"
            size="xsm"
            showButtons={true}
            saveButtonIcon={<Save />}
            clearButtonIcon={<Eraser />}
            onSave={setSignature}
          />
        </div>
        <ul>
          {statements.map((stmt, idx) =>
            <li className='flex items-center my-2' key={idx}> <div className='absolute'>
              {(stmt.initialed && signature)
                ?
                <img onClick={() => updateStatement(idx)} className='w-6 h-4 bg-contain bg-left border border-accent rounded-sm' height={8} src={signature} alt="initials" />
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
        </div>
      </div>
    </div >
  )
}

export default ConsentForm;
