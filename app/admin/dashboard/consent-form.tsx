import { useContext } from "react";
import { ServicesContext } from "@/context/ServicesContext";
import { ConsentFormStatementComponent } from "./consent-form-statement";

export default function ConsentForm() {
  const consentFormStatements = useContext(ServicesContext).consentFormStatements;
  return (
    <div>
      <h1 className="flex justify-center my-5 text-xl scroll-mt-24" id="consent-form">Edit Consent Form</h1>
      {consentFormStatements.map((cfs) =>
        <ConsentFormStatementComponent consentFormStatement={cfs} />
      )}
    </div>
  )
}
