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
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

const skincareHistorySchema = z.object({
  everReceivedFacial: z.enum(["yes", "no"]),
  lastFacialDate: z.string().optional(),
  retinol: z.enum(["yes", "no"]),
  chemPeel: z.enum(["yes", "no"]),
  lastChemPeelDate: z.string().optional(),
  hairRemoval: z.enum(["yes", "no"]),
  medicalConditions: z.enum(["yes", "no"]),
  allergies: z.enum(["yes", "no"]),
  botox: z.enum(["yes", "no"]),
  negativeReaction: z.enum(["yes", "no"]),
  skinType: z.enum(["normal", "dry", "oily", "combination"]),
  pregnant: z.enum(["yes", "no"]),
  smoke: z.enum(["yes", "no"]),
}).refine((data) => {
  if (data.everReceivedFacial === "yes" && !data.lastFacialDate) {
    return false;
  }
  return true;
}, {
  message: "Please provide the date when answering 'Yes'",
  path: ["lastFacialDate"],
}).refine((data) => {
  if (data.chemPeel === "yes" && !data.lastChemPeelDate) {
    return false;
  }
  return true;
}, {
  message: "Please provide the date when answering 'Yes'",
  path: ["lastChemPeelDate"],
});

export default function SkincareHistory(props: { searchParams: Promise<{ clientId: string }> }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof skincareHistorySchema>>({
    resolver: zodResolver(skincareHistorySchema),
    defaultValues: {
      everReceivedFacial: "no",
      lastFacialDate: "",
      retinol: "no",
      chemPeel: "no",
      lastChemPeelDate: "",
      hairRemoval: "no",
      medicalConditions: "no",
      allergies: "no",
      botox: "no",
      negativeReaction: "no",
      skinType: "normal",
      pregnant: "no",
      smoke: "no",
    },
  });

  const everReceivedFacial = form.watch("everReceivedFacial");
  const chemPeel = form.watch("chemPeel");

  async function handleSubmit(values: z.infer<typeof skincareHistorySchema>) {
    const skincareHistoryQuestionnaire: SkincareHistoryQuestionnaire = {
      everReceivedFacial: values.everReceivedFacial,
      lastFacialDate: values.lastFacialDate ?? "",
      retinol: values.retinol,
      chemPeel: values.chemPeel,
      lastChemPeelDate: values.lastChemPeelDate ?? "",
      hairRemoval: values.hairRemoval,
      medicalConditions: values.medicalConditions,
      allergies: values.allergies,
      botox: values.botox,
      negativeReaction: values.negativeReaction,
      skinType: values.skinType,
      pregnant: values.pregnant,
      smoke: values.smoke,
    }
    await sendSkincareHistoryQuestionnaire((await props.searchParams).clientId, skincareHistoryQuestionnaire);
    form.reset();
    router.push("/consent-form/emergency-contact?" + new URLSearchParams({ clientId: (await props.searchParams).clientId }));
  }

  return (
    <div className="mx-5 md:mx-0 mb-5 max-w-full md:flex justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="flex justify-center">
            <h3 id="consent-form--skincare-history" className={`subheading ${glassAntiqua.className}`}>Evolution of Skincare</h3>
          </div>
          <div className="max-w-3xl flex flex-col max-md:flex-wrap justify-center items-start">
          <FormField
            control={form.control}
            name="everReceivedFacial"
            render={({ field }) => (
              <FormItem className="flex justify-center w-full">
                <FormControl>
                  <RadioGroup defaultValue={field.value} onValueChange={field.onChange} name="everReceivedFacial" className="flex-1 flex gap-4 mr-2">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="yes" id="r1" />
                      <Label htmlFor="r1">Yes</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="no" id="r2" />
                      <Label htmlFor="r2">No</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <Label className='grow my-2 text-base pl-2 border-primary border-l'>Have you ever received a facial?</Label>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastFacialDate"
            render={({ field }) => (
              <FormItem>
                <div className={`flex justify-center items-baseline transition-all duration-150 slide-in-from-top slide-out-to-top overflow-hidden ${everReceivedFacial === "yes" ? "opacity-100 max-h-20" : "opacity-0 max-h-0"}`}>
                  <Label className="mr-2">When?</Label>
                  <FormControl>
                    <Input className="flex-1 max-w-96 mb-2" type="text" placeholder="YYYY-MM-DD" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="retinol"
            render={({ field }) => (
              <FormItem className="flex justify-center w-full">
                <FormControl>
                  <RadioGroup defaultValue={field.value} onValueChange={field.onChange} name="retinol" className="flex-1 flex gap-4 mr-2">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="yes" id="r3" />
                      <Label htmlFor="r3">Yes</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="no" id="r4" />
                      <Label htmlFor="r4">No</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <Label className='grow my-2 text-base pl-2 border-primary border-l'>Do you use retinol, AHAs, BHAs, or acne medications (like Accutane)?</Label>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="chemPeel"
            render={({ field }) => (
              <FormItem className="flex justify-center w-full">
                <FormControl>
                  <RadioGroup defaultValue={field.value} onValueChange={field.onChange} name="chemPeel" className="flex-1 flex gap-4 mr-2">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="yes" id="r5" />
                      <Label htmlFor="r5">Yes</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="no" id="r6" />
                      <Label htmlFor="r6">No</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <Label className='grow my-2 text-base pl-2 border-primary border-l'>Have you had chemical peels, microneedling, or laser treatments recently?</Label>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastChemPeelDate"
            render={({ field }) => (
              <FormItem>
                <div className={`flex justify-center items-baseline transition-all duration-150 slide-in-from-top slide-out-to-top overflow-hidden ${chemPeel === "yes" ? "opacity-100 max-h-20" : "opacity-0 max-h-0"}`}>
                  <Label className="mr-2">When?</Label>
                  <FormControl>
                    <Input className="flex-1 max-w-96 mb-2" type="text" placeholder="YYYY-MM-DD" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hairRemoval"
            render={({ field }) => (
              <FormItem className="flex justify-center w-full">
                <FormControl>
                  <RadioGroup defaultValue={field.value} onValueChange={field.onChange} name="hairRemoval" className="flex-1 flex gap-4 mr-2">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="yes" id="r7" />
                      <Label htmlFor="r7">Yes</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="no" id="r8" />
                      <Label htmlFor="r8">No</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <Label className='grow my-2 text-base pl-2 border-primary border-l'>Have you had any recent hair removal in the area(s) being treated today?</Label>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="medicalConditions"
            render={({ field }) => (
              <FormItem className="flex justify-center w-full">
                <FormControl>
                  <RadioGroup defaultValue={field.value} onValueChange={field.onChange} name="medicalConditions" className="flex-1 flex gap-4 mr-2">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="yes" id="r9" />
                      <Label htmlFor="r9">Yes</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="no" id="r10" />
                      <Label htmlFor="r10">No</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <Label className='grow my-2 text-base pl-2 border-primary border-l'>Any medical conditions? (Diabetes, Epilepsy, etc.)</Label>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="allergies"
            render={({ field }) => (
              <FormItem className="flex justify-center w-full">
                <FormControl>
                  <RadioGroup defaultValue={field.value} onValueChange={field.onChange} name="allergies" className="flex-1 flex gap-4 mr-2">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="yes" id="r11" />
                      <Label htmlFor="r11">Yes</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="no" id="r12" />
                      <Label htmlFor="r12">No</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <Label className='grow my-2 text-base pl-2 border-primary border-l'>Any known allergies? (Latex, Aspirin, Essential oils, Ingredients, etc.)</Label>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="botox"
            render={({ field }) => (
              <FormItem className="flex justify-center w-full">
                <FormControl>
                  <RadioGroup defaultValue={field.value} onValueChange={field.onChange} name="botox" className="flex-1 flex gap-4 mr-2">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="yes" id="r13" />
                      <Label htmlFor="r13">Yes</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="no" id="r14" />
                      <Label htmlFor="r14">No</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <Label className='grow my-2 text-base pl-2 border-primary border-l'>Have you had an Botox, fillers, or other cosmetic treatments in the past 2 weeks?</Label>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="negativeReaction"
            render={({ field }) => (
              <FormItem className="flex justify-center w-full">
                <FormControl>
                  <RadioGroup defaultValue={field.value} onValueChange={field.onChange} name="negativeReaction" className="flex-1 flex gap-4 mr-2">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="yes" id="r15" />
                      <Label htmlFor="r15">Yes</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="no" id="r16" />
                      <Label htmlFor="r16">No</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <Label className='grow my-2 text-base pl-2 border-primary border-l'>Have you ever had a negative reaction to a skincare service?</Label>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="skinType"
            render={({ field }) => (
              <FormItem className="flex flex-wrap justify-center py-5 w-full">
                <label className='grow py-2 text-base pr-2 border-primary md:border-r mr-2'>How would you describe your skin type?</label>
                <FormControl>
                  <RadioGroup defaultValue={field.value} onValueChange={field.onChange} name="skinType" className="flex-1 flex max-md:flex-col gap-4">
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
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pregnant"
            render={({ field }) => (
              <FormItem className="flex justify-center w-full">
                <FormControl>
                  <RadioGroup defaultValue={field.value} onValueChange={field.onChange} name="pregnant" className="flex-1 flex gap-4 mr-2">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="yes" id="r21" />
                      <Label htmlFor="r21">Yes</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="no" id="r22" />
                      <Label htmlFor="r22">No</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <Label className='grow my-2 text-base pl-2 border-primary border-l'>Pregnant or Nursing?</Label>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="smoke"
            render={({ field }) => (
              <FormItem className="flex justify-center w-full">
                <FormControl>
                  <RadioGroup defaultValue={field.value} onValueChange={field.onChange} name="smoke" className="flex-1 flex gap-4 mr-2">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="yes" id="r23" />
                      <Label htmlFor="r23">Yes</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="no" id="r24" />
                      <Label htmlFor="r24">No</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <Label className='grow my-2 text-base pl-2 border-primary border-l'>Do you smoke or consume alcohol?</Label>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-center items-center">
          <Button className="mt-5" type="submit">Next</Button>
        </div>
      </form>
      </Form>
    </div>
  )
}
