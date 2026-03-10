"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eraser, Save } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Control, DefaultValues, useForm } from "react-hook-form";
import { z } from "zod";

import {
  postClientInfo,
  saveConsentAndAcknowledgement,
  saveEmergencyContact,
  saveProductsUsed,
  sendSkincareHistoryQuestionnaire,
  submitConsentForm,
} from "@/app/api";
import { glassAntiqua } from "@/app/fonts";
import {
  Base64URLString,
  ConsentFormClientInfo,
  ConsentFormStatement,
  EmergencyContactDetails,
  SkincareHistoryQuestionnaire,
} from "@/app/types";
import DateOfBirthPicker from "@/components/ui/date-of-birth-picker";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PhoneInput from "@/components/ui/phone-input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import SignaturePad from "@/components/ui/signature-pad";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useActiveConsentFormStatements } from "@/hooks/useServices";
import { useSearchParams } from "next/navigation";

const consentFormSchema = z.object({
  fullName: z.string().min(2, "Full name is required").max(100),
  dobDate: z
    .date({
      required_error: "Date of birth is required",
    })
    .refine((date) => {
      const today = new Date();
      const maxDate = new Date(
        today.getFullYear() - 13,
        today.getMonth(),
        today.getDate(),
      );
      return date <= maxDate;
    }, "You must be at least 13 years old"),
  gender: z.string().min(1, "Gender is required"),
  phoneNumber: z.string().transform((val) => val.replace(/\D/g, "")).refine(
    (val) => val.length === 10,
    "Phone number must be 10 digits",
  ),
  email: z.string().min(5, "Email is required").email("Please enter a valid email address"),
  products: z.string().min(5, "Please list at least one product you're currently using").max(500, "Please keep your answer under 500 characters"),
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
  emergencyName: z.string().min(2, "Emergency contact name is required"),
  emergencyPhone: z.string().transform((val) => val.replace(/\D/g, "")).refine(
    (val) => val.length === 10,
    "Phone number must be 10 digits",
  ),
  relationship: z.string().min(2, "Relationship is required"),
  acknowledgementSignature: z.string().nullable().refine(
    (val) => val !== null && val.length > 100,
    "Please provide or click the save icon on your signature",
  ),
  printedName: z.string().min(2, "Please print your full name"),
  initials: z.string().nullable().refine(
    (val) => val !== null && val.length > 50,
    "Please provide or click the save icon on your initials",
  ),
  signature: z.string().nullable().refine(
    (val) => val !== null && val.length > 100,
    "Please provide or click the save icon on your final signature",
  ),
  statementsInitialed: z.array(z.string()),
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

type ConsentFormValues = z.infer<typeof consentFormSchema>;

type YesNoQuestionName =
  | "everReceivedFacial"
  | "retinol"
  | "chemPeel"
  | "hairRemoval"
  | "medicalConditions"
  | "allergies"
  | "botox"
  | "negativeReaction"
  | "pregnant"
  | "smoke";

const sectionClasses = "rounded-[2rem] border border-border/80 bg-background/80 p-4 shadow-sm backdrop-blur-sm sm:p-6";
const sectionTitleClasses = `subheading text-center ${glassAntiqua.className}`;

const defaultValues: DefaultValues<ConsentFormValues> = {
  fullName: "",
  dobDate: undefined,
  gender: "",
  phoneNumber: "",
  email: "",
  products: "",
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
  emergencyName: "",
  emergencyPhone: "",
  relationship: "",
  acknowledgementSignature: null,
  printedName: "",
  initials: null,
  signature: null,
  statementsInitialed: [],
};

function buildSearchParams(searchParams: URLSearchParams) {
  const nextParams = new URLSearchParams();
  const clientId = searchParams.get("clientId");
  const appointmentId = searchParams.get("appointmentId");

  if (clientId) nextParams.set("clientId", clientId);
  if (appointmentId) nextParams.set("appointmentId", appointmentId);

  return nextParams.toString();
}

function resolveClientId(result: unknown, fallbackClientId: string | null) {
  if (typeof result === "string") return result;
  if (result && typeof result === "object" && "id" in result && typeof result.id === "string") {
    return result.id;
  }
  return fallbackClientId;
}

function YesNoQuestion({
  control,
  name,
  label,
  yesId,
  noId,
}: {
  control: Control<ConsentFormValues>;
  name: YesNoQuestionName;
  label: string;
  yesId: string;
  noId: string;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="rounded-3xl border border-border/70 bg-muted/25 p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
            <Label className="text-base leading-6 md:max-w-[65%]">{label}</Label>
            <FormControl>
              <RadioGroup
                defaultValue={field.value}
                onValueChange={field.onChange}
                name={name}
                className="grid grid-cols-2 gap-3 sm:w-auto sm:min-w-40"
              >
                <div className="flex items-center gap-3 rounded-full border border-border/70 px-4 py-2">
                  <RadioGroupItem value="yes" id={yesId} />
                  <Label htmlFor={yesId}>Yes</Label>
                </div>
                <div className="flex items-center gap-3 rounded-full border border-border/70 px-4 py-2">
                  <RadioGroupItem value="no" id={noId} />
                  <Label htmlFor={noId}>No</Label>
                </div>
              </RadioGroup>
            </FormControl>
          </div>
          <FormMessage className="mt-2" />
        </FormItem>
      )}
    />
  );
}

export default function ConsentFormPage() {
  const searchParams = useSearchParams();
  const fallbackClientId = searchParams.get("clientId");
  const queryString = useMemo(() => buildSearchParams(searchParams), [searchParams]);
  const [initialsImage, setInitialsImage] = useState<Base64URLString>(null);
  const [response, setResponse] = useState("");
  const { data: activeStatements, isLoading } = useActiveConsentFormStatements();
  const [consentFormStatements, setConsentFormStatements] = useState<ConsentFormStatement[]>([]);

  const form = useForm<ConsentFormValues>({
    resolver: zodResolver(consentFormSchema),
    defaultValues,
  });

  const everReceivedFacial = form.watch("everReceivedFacial");
  const chemPeel = form.watch("chemPeel");

  useEffect(() => {
    if (!activeStatements) return;
    const nextStatements = activeStatements.map((statement) => ({
      ...statement,
      initialed: false,
    }));
    setConsentFormStatements(nextStatements);
    form.setValue("statementsInitialed", []);
  }, [activeStatements, form]);

  function resetStatementState() {
    setInitialsImage(null);
    setConsentFormStatements(
      (activeStatements ?? []).map((statement) => ({
        ...statement,
        initialed: false,
      })),
    );
    form.setValue("statementsInitialed", []);
  }

  function updateStatement(idx: number) {
    const nextStatements = consentFormStatements.map((statement, statementIdx) => (
      statementIdx === idx
        ? { ...statement, initialed: !statement.initialed }
        : statement
    ));

    setConsentFormStatements(nextStatements);
    form.setValue(
      "statementsInitialed",
      nextStatements.filter((statement) => statement.initialed).map((statement) => statement.statement),
      { shouldValidate: true },
    );
    form.clearErrors("statementsInitialed");
  }

  async function onSubmit(values: ConsentFormValues) {
    if (consentFormStatements.length === 0) {
      setResponse("Consent statements are still loading. Please try again.");
      return;
    }

    if (consentFormStatements.some((statement) => !statement.initialed)) {
      form.setError("statementsInitialed", {
        message: "Please initial all statements before submitting",
      });
      return;
    }

    setResponse("");

    try {
      const clientInfo: ConsentFormClientInfo = {
        fullName: values.fullName,
        dob: values.dobDate.toISOString(),
        gender: values.gender,
        phoneNumber: values.phoneNumber.replace(/\D/g, ""),
        email: values.email,
      };

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
      };

      const emergencyContact: EmergencyContactDetails = {
        name: values.emergencyName,
        phone: values.emergencyPhone.replace(/\D/g, ""),
        relationship: values.relationship,
      };

      const clientInfoResponse = await postClientInfo(clientInfo);
      const clientId = resolveClientId(clientInfoResponse, fallbackClientId);

      if (!clientId) {
        throw new Error("missing client id");
      }

      const productsResult = await saveProductsUsed(clientId, values.products);
      const skincareResult = await sendSkincareHistoryQuestionnaire(clientId, skincareHistoryQuestionnaire);
      const emergencyResult = await saveEmergencyContact(clientId, emergencyContact);
      const acknowledgementResult = await saveConsentAndAcknowledgement(clientId, values.acknowledgementSignature);
      const finalResult = await submitConsentForm(
        values.printedName,
        consentFormStatements.map((statement) => statement.statement),
        values.initials,
        values.signature,
        clientId,
      );

      if (!productsResult || !skincareResult || !emergencyResult || !acknowledgementResult || !finalResult) {
        throw new Error("submission failed");
      }

      setResponse("Thank you for filling out the consent form!");
      form.reset(defaultValues);
      resetStatementState();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error(error);
      setResponse("Something went wrong... please try again");
    }
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-10 pt-4 sm:px-6 lg:px-8">
      <div className="mb-6 text-center sm:mb-8">
        <h1 id="consent-form" className={`scroll-mt-18 m-0 p-0 ${sectionTitleClasses}`}>
          Consent Form
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
          Everything is on one page so it is easy to review, complete, and submit from your phone or desktop.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
          <section className={sectionClasses}>
            <div className="mb-5 text-center">
              <h2 id="consent-form--client-info" className={sectionTitleClasses}>Personal Information</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <Label className="mb-2 block">Full Name:</Label>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dobDate"
                render={({ field }) => (
                  <FormItem>
                    <Label className="mb-2 block">Date of Birth:</Label>
                    <FormControl>
                      <DateOfBirthPicker
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select date"
                        className="w-full sm:w-[280px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <Label className="mb-2 block">Gender:</Label>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <Label className="mb-2 block">Phone Number:</Label>
                    <FormControl>
                      <PhoneInput value={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <Label className="mb-2 block">Email Address:</Label>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </section>

          <section className={sectionClasses}>
            <div className="mb-5 text-center">
              <h2 id="consent-form--products-used" className={sectionTitleClasses}>
                Products Used At Home
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
                Share the products you are currently using so treatment can be tailored safely.
              </p>
            </div>
            <FormField
              control={form.control}
              name="products"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="Versed Light Moisturizer, Dermalogica Toner Pads..."
                      className="min-h-28"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>

          <section className={sectionClasses}>
            <div className="mb-5 text-center">
              <h2 id="consent-form--skincare-history" className={sectionTitleClasses}>Evolution of Skincare</h2>
            </div>
            <div className="space-y-4">
              <YesNoQuestion
                control={form.control}
                name="everReceivedFacial"
                label="Have you ever received a facial?"
                yesId="r1"
                noId="r2"
              />
              <FormField
                control={form.control}
                name="lastFacialDate"
                render={({ field }) => (
                  <FormItem className={everReceivedFacial === "yes" ? "block" : "hidden"}>
                    <Label className="mb-2 block">When?</Label>
                    <FormControl>
                      <Input type="text" placeholder="YYYY-MM-DD" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <YesNoQuestion
                control={form.control}
                name="retinol"
                label="Do you use retinol, AHAs, BHAs, or acne medications (like Accutane)?"
                yesId="r3"
                noId="r4"
              />
              <YesNoQuestion
                control={form.control}
                name="chemPeel"
                label="Have you had chemical peels, microneedling, or laser treatments recently?"
                yesId="r5"
                noId="r6"
              />
              <FormField
                control={form.control}
                name="lastChemPeelDate"
                render={({ field }) => (
                  <FormItem className={chemPeel === "yes" ? "block" : "hidden"}>
                    <Label className="mb-2 block">When?</Label>
                    <FormControl>
                      <Input type="text" placeholder="YYYY-MM-DD" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <YesNoQuestion
                control={form.control}
                name="hairRemoval"
                label="Have you had any recent hair removal in the area(s) being treated today?"
                yesId="r7"
                noId="r8"
              />
              <YesNoQuestion
                control={form.control}
                name="medicalConditions"
                label="Any medical conditions? (Diabetes, Epilepsy, etc.)"
                yesId="r9"
                noId="r10"
              />
              <YesNoQuestion
                control={form.control}
                name="allergies"
                label="Any known allergies? (Latex, Aspirin, Essential oils, Ingredients, etc.)"
                yesId="r11"
                noId="r12"
              />
              <YesNoQuestion
                control={form.control}
                name="botox"
                label="Have you had Botox, fillers, or other cosmetic treatments in the past 2 weeks?"
                yesId="r13"
                noId="r14"
              />
              <YesNoQuestion
                control={form.control}
                name="negativeReaction"
                label="Have you ever had a negative reaction to a skincare service?"
                yesId="r15"
                noId="r16"
              />

              <FormField
                control={form.control}
                name="skinType"
                render={({ field }) => (
                  <FormItem className="rounded-3xl border border-border/70 bg-muted/25 p-4">
                    <Label className="mb-3 block text-base">How would you describe your skin type?</Label>
                    <FormControl>
                      <RadioGroup
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        name="skinType"
                        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
                      >
                        <div className="flex items-center gap-3 rounded-full border border-border/70 px-4 py-2">
                          <RadioGroupItem value="normal" id="r17" />
                          <Label htmlFor="r17">Normal</Label>
                        </div>
                        <div className="flex items-center gap-3 rounded-full border border-border/70 px-4 py-2">
                          <RadioGroupItem value="dry" id="r18" />
                          <Label htmlFor="r18">Dry</Label>
                        </div>
                        <div className="flex items-center gap-3 rounded-full border border-border/70 px-4 py-2">
                          <RadioGroupItem value="oily" id="r19" />
                          <Label htmlFor="r19">Oily</Label>
                        </div>
                        <div className="flex items-center gap-3 rounded-full border border-border/70 px-4 py-2">
                          <RadioGroupItem value="combination" id="r20" />
                          <Label htmlFor="r20">Combination</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage className="mt-2" />
                  </FormItem>
                )}
              />

              <YesNoQuestion
                control={form.control}
                name="pregnant"
                label="Pregnant or Nursing?"
                yesId="r21"
                noId="r22"
              />
              <YesNoQuestion
                control={form.control}
                name="smoke"
                label="Do you smoke or consume alcohol?"
                yesId="r23"
                noId="r24"
              />
            </div>
          </section>

          <section className={sectionClasses}>
            <div className="mb-5 text-center">
              <h2 id="consent-form--emergency-contact" className={sectionTitleClasses}>Emergency Contact</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="emergencyName"
                render={({ field }) => (
                  <FormItem>
                    <Label className="mb-2 block">Full Name:</Label>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emergencyPhone"
                render={({ field }) => (
                  <FormItem>
                    <Label className="mb-2 block">Phone Number:</Label>
                    <FormControl>
                      <PhoneInput value={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="relationship"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <Label className="mb-2 block">Relationship:</Label>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </section>

          <section className={sectionClasses}>
            <div className="mb-5 text-center">
              <h2 id="consent-form--consent-and-acknowledgement" className={sectionTitleClasses}>
                Consent and Acknowledgement
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-sm leading-6 text-foreground/85 sm:text-base">
                By signing below, I acknowledge that I have been informed about the nature of the facial treatment
                and give my consent to receive it. I understand that while the treatment is intended to improve my
                skin&apos;s condition, individual results may vary. I have disclosed all relevant medical information and
                agree to follow any aftercare instructions provided.
              </p>
              <FormField
                control={form.control}
                name="acknowledgementSignature"
                render={({ field }) => (
                  <FormItem>
                    <Label className="mb-2 flex justify-center">Client&apos;s Signature:</Label>
                    <FormControl>
                      <SignaturePad
                        className="mx-auto my-3 w-full max-w-xl"
                        penColor="hsl(var(--foreground))"
                        size="sm"
                        showButtons={true}
                        saveButtonIcon={<Save />}
                        clearButtonIcon={<Eraser />}
                        onSave={field.onChange}
                        onChange={(signature) => {
                          if (!signature) {
                            field.onChange(null);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-center" />
                  </FormItem>
                )}
              />
            </div>
          </section>

          <section className={sectionClasses}>
            <div className="mb-5 text-center">
              <h2 id="consent-form--terms" className={sectionTitleClasses}>Terms and Agreements</h2>
            </div>

            <div className="space-y-5">
              <div className="flex flex-col items-center rounded-3xl border border-border/70 bg-muted/25 p-4 text-center">
                <Label>Please enter your initials here. To apply them, check the boxes:</Label>
                <FormField
                  control={form.control}
                  name="initials"
                  render={({ field }) => (
                    <FormItem className="mt-3 w-full max-w-sm">
                      <FormControl>
                        <SignaturePad
                          className="w-full"
                          penColor="hsl(var(--foreground))"
                          size="sm"
                          showButtons={true}
                          saveButtonIcon={<Save />}
                          clearButtonIcon={<Eraser />}
                          onSave={(signature) => {
                            setInitialsImage(signature);
                            field.onChange(signature);
                          }}
                          onChange={(signature) => {
                            if (!signature) {
                              setInitialsImage(null);
                              field.onChange(null);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {form.formState.errors.statementsInitialed && (
                <p className="text-center text-sm text-red-500">
                  {form.formState.errors.statementsInitialed.message}
                </p>
              )}

              <div className="space-y-3">
                {isLoading && consentFormStatements.length === 0 ? (
                  <p className="text-center text-sm text-muted-foreground">Loading consent form statements...</p>
                ) : (
                  consentFormStatements.map((statement, idx) => (
                    <div
                      className="flex items-start gap-3 rounded-3xl border border-border/70 bg-muted/20 p-4"
                      key={statement.id ?? idx}
                    >
                      <div className="pt-1">
                        {(statement.initialed && initialsImage)
                          ? (
                            <img
                              onClick={() => updateStatement(idx)}
                              className="h-5 w-8 rounded-sm border border-accent bg-contain bg-left object-contain"
                              height={10}
                              src={initialsImage}
                              alt="initials"
                            />
                          )
                          : (
                            <Checkbox
                              id={idx.toString()}
                              checked={statement.initialed ?? false}
                              onCheckedChange={() => updateStatement(idx)}
                              className="data-[state=unchecked]:border-accent data-[state=checked]:border-accent data-[state=checked]:bg-accent data-[state=checked]:text-accent-content"
                            />
                          )}
                      </div>
                      <Label htmlFor={idx.toString()} className="text-base leading-6">
                        {statement.statement}
                      </Label>
                    </div>
                  ))
                )}
              </div>

              <div className="rounded-3xl border border-warning/30 bg-warning/10 p-4">
                <h3 className="text-center text-xl text-warning-content">Client Declaration</h3>
                <p className="mt-2 text-sm leading-6 text-warning-content sm:text-base">
                  I confirm that the above information is accurate and complete to the best of my knowledge. I
                  understand the nature of the facial treatment and agree to proceed voluntarily. I have had the
                  opportunity to ask questions and understand the risks and benefits. I give my full consent to receive
                  this service from the esthetician listed below.
                </p>
              </div>

              <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-start">
                <FormField
                  control={form.control}
                  name="printedName"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="mb-2 block">Print Name:</Label>
                      <FormControl>
                        <Input type="text" placeholder="Jane Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="signature"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="mb-2 block">Signature:</Label>
                      <FormControl>
                        <SignaturePad
                          className="w-full"
                          penColor="hsl(var(--foreground))"
                          size="sm"
                          showButtons={true}
                          saveButtonIcon={<Save />}
                          clearButtonIcon={<Eraser />}
                          onSave={field.onChange}
                          onChange={(signature) => {
                            if (!signature) {
                              field.onChange(null);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </section>

          <div className="flex flex-col items-center gap-3 pt-2">
            <Button className="min-w-40" type="submit" disabled={form.formState.isSubmitting || isLoading}>
              {form.formState.isSubmitting ? "Submitting..." : "Submit Consent Form"}
            </Button>
            <p className={response.includes("wrong") ? "text-center text-red-500" : "text-center text-green-600"}>
              {response}
            </p>
            {queryString ? (
              <p className="text-center text-xs text-muted-foreground">
                Existing booking details are preserved while you complete this form.
              </p>
            ) : null}
          </div>
        </form>
      </Form>
    </div>
  );
}
