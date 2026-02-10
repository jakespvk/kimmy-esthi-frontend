"use client";

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { glassAntiqua } from '@/app/fonts';
import { useState } from 'react';
import { sendSkincareHistoryQuestionnaire } from '@/app/api';
import { SkincareHistoryQuestionnaire } from '@/app/types';
import { useRouter } from 'next/navigation';

export default function SkincareHistory(props: { searchParams: Promise<{ clientId: string }> }) {
  const router = useRouter();

  const [everReceivedFacial, setEverReceivedFacial] = useState("no");
  const [chemPeel, setChemPeel] = useState("no");

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const skincareHistoryQuestionnaire: SkincareHistoryQuestionnaire = {
      everReceivedFacial: formData.get("everReceivedFacial") as string,
      lastFacialDate: formData.get("lastFacialDate") as string,
      retinol: formData.get("retinol") as string,
      chemPeel: formData.get("chemPeel") as string,
      lastChemPeelDate: formData.get("lastChemPeelDate") as string,
      hairRemoval: formData.get("hairRemoval") as string,
      medicalConditions: formData.get("medicalConditions") as string,
      allergies: formData.get("allergies") as string,
      botox: formData.get("botox") as string,
      negativeReaction: formData.get("negativeReaction") as string,
      skinType: formData.get("skinType") as string,
    }
    await sendSkincareHistoryQuestionnaire((await props.searchParams).clientId, skincareHistoryQuestionnaire);
    router.push("/consent-form/emergency-contact?" + new URLSearchParams({ clientId: (await props.searchParams).clientId }));
  }

  return (
    <div className="mx-5 md:mx-0 mb-5 max-w-full md:flex justify-center">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center">
          <h3 id="consent-form--skincare-history" className={`subheading ${glassAntiqua.className}`}>Evolution of Skincare</h3>
        </div>
        <div className="max-w-3xl flex flex-col max-md:flex-wrap justify-center items-start">
          <div className="flex justify-center">
            <RadioGroup defaultValue={everReceivedFacial} onValueChange={setEverReceivedFacial} name="everReceivedFacial" className="flex-1 flex gap-4 mr-2">
              <div className="flex items-center gap-3">
                <RadioGroupItem value="yes" id="r1" />
                <Label htmlFor="r1">Yes</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="no" id="r2" />
                <Label htmlFor="r2">No</Label>
              </div>
            </RadioGroup>
            <Label className='grow my-2 text-base pl-2 border-primary border-l'>Have you ever received a facial?</Label>
          </div>
          <div className={`flex justify-center items-baseline transition-all duration-150 slide-in-from-top slide-out-to-top overflow-hidden ${everReceivedFacial === "yes" ? "opacity-100 max-h-20" : "opacity-0 max-h-0"}`}>
            <Label className="mr-2">When?</Label>
            <Input className="flex-1 max-w-96 mb-2" type="text" name="lastFacialDate" />
          </div>
          <div className="flex justify-center">
            <RadioGroup defaultValue="no" name="retinol" className="flex-1 flex gap-4 mr-2">
              <div className="flex items-center gap-3">
                <RadioGroupItem value="yes" id="r3" />
                <Label htmlFor="r3">Yes</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="no" id="r4" />
                <Label htmlFor="r4">No</Label>
              </div>
            </RadioGroup>
            <Label className='grow my-2 text-base pl-2 border-primary border-l'>Do you use retinol, AHAs, BHAs, or acne medications (like Accutane)?</Label>
          </div>
          <div className="flex justify-center">
            <RadioGroup defaultValue={chemPeel} onValueChange={setChemPeel} name="chemPeel" className="flex-1 flex gap-4 mr-2">
              <div className="flex items-center gap-3">
                <RadioGroupItem value="yes" id="r5" />
                <Label htmlFor="r5">Yes</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="no" id="r6" />
                <Label htmlFor="r6">No</Label>
              </div>
            </RadioGroup>
            <Label className='grow my-2 text-base pl-2 border-primary border-l'>Have you had chemical peels, microneedling, or laser treatments recently?</Label>
          </div>
          <div className={`flex justify-center items-baseline transition-all duration-150 slide-in-from-top slide-out-to-top overflow-hidden ${chemPeel === "yes" ? "opacity-100 max-h-20" : "opacity-0 max-h-0"}`}>
            <Label className="mr-2">When?</Label>
            <Input className="flex-1 max-w-96 mb-2" type="text" name="lastChemPeelDate" />
          </div>
          <div className="flex justify-center">
            <RadioGroup defaultValue="no" name="hairRemoval" className="flex-1 flex gap-4 mr-2">
              <div className="flex items-center gap-3">
                <RadioGroupItem value="yes" id="r7" />
                <Label htmlFor="r7">Yes</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="no" id="r8" />
                <Label htmlFor="r8">No</Label>
              </div>
            </RadioGroup>
            <Label className='grow my-2 text-base pl-2 border-primary border-l'>Have you had any recent hair removal in the area(s) being treated today?</Label>
          </div>
          <div className="flex justify-center">
            <RadioGroup defaultValue="no" name="medicalConditions" className="flex-1 flex gap-4 mr-2">
              <div className="flex items-center gap-3">
                <RadioGroupItem value="yes" id="r9" />
                <Label htmlFor="r9">Yes</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="no" id="r10" />
                <Label htmlFor="r10">No</Label>
              </div>
            </RadioGroup>
            <Label className='grow my-2 text-base pl-2 border-primary border-l'>Any medical conditions? (Diabetes, Epilepsy, etc.)</Label>
          </div>
          <div className="flex justify-center">
            <RadioGroup defaultValue="no" name="allergies" className="flex-1 flex gap-4 mr-2">
              <div className="flex items-center gap-3">
                <RadioGroupItem value="yes" id="r11" />
                <Label htmlFor="r11">Yes</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="no" id="r12" />
                <Label htmlFor="r12">No</Label>
              </div>
            </RadioGroup>
            <Label className='grow my-2 text-base pl-2 border-primary border-l'>Any known allergies? (Latex, Aspirin, Essential oils, Ingredients, etc.)</Label>
          </div>
          <div className="flex justify-center">
            <RadioGroup defaultValue="no" name="botox" className="flex-1 flex gap-4 mr-2">
              <div className="flex items-center gap-3">
                <RadioGroupItem value="yes" id="r13" />
                <Label htmlFor="r13">Yes</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="no" id="r14" />
                <Label htmlFor="r14">No</Label>
              </div>
            </RadioGroup>
            <Label className='grow my-2 text-base pl-2 border-primary border-l'>Have you had an Botox, fillers, or other cosmetic treatments in the past 2 weeks?</Label>
          </div>
          <div className="flex justify-center">
            <RadioGroup defaultValue="no" name="negativeReaction" className="flex-1 flex gap-4 mr-2">
              <div className="flex items-center gap-3">
                <RadioGroupItem value="yes" id="r15" />
                <Label htmlFor="r15">Yes</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="no" id="r16" />
                <Label htmlFor="r16">No</Label>
              </div>
            </RadioGroup>
            <Label className='grow my-2 text-base pl-2 border-primary border-l'>Have you ever had a negative reaction to a skincare service?</Label>
          </div>
          <div className="flex flex-wrap justify-center py-5">
            <Label className='grow py-2 text-base pr-2 border-primary md:border-r mr-2'>How would you describe your skin type?</Label>
            <RadioGroup defaultValue="no" name="skinType" className="flex-1 flex max-md:flex-col gap-4">
              <div className="flex items-center gap-3">
                <RadioGroupItem value="normal" id="r17" />
                <Label htmlFor="r17">Normal</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="dry" id="r18" />
                <Label htmlFor="r18">Dry</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="oily" id="r19" />
                <Label htmlFor="r19">Oily</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="combination" id="r20" />
                <Label htmlFor="r20">Combination</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex justify-center">
            <RadioGroup defaultValue="no" name="pregnant" className="flex-1 flex gap-4 mr-2">
              <div className="flex items-center gap-3">
                <RadioGroupItem value="yes" id="r21" />
                <Label htmlFor="r21">Yes</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="no" id="r22" />
                <Label htmlFor="r22">No</Label>
              </div>
            </RadioGroup>
            <Label className='grow my-2 text-base pl-2 border-primary border-l'>Pregnant or Nursing?</Label>
          </div>
          <div className="flex justify-center">
            <RadioGroup defaultValue="no" name="smoke" className="flex-1 flex gap-4 mr-2">
              <div className="flex items-center gap-3">
                <RadioGroupItem value="yes" id="r23" />
                <Label htmlFor="r23">Yes</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="no" id="r24" />
                <Label htmlFor="r24">No</Label>
              </div>
            </RadioGroup>
            <Label className='grow my-2 text-base pl-2 border-primary border-l'>Do you smoke or consume alcohol?</Label>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Button className="mt-5" type="submit">Next</Button>
        </div>
      </form>
    </div>
  )
}
