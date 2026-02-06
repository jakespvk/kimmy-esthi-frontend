import { useContext, useState } from "react";
import { ServicesContext } from "@/context/ServicesContext";
import { ConsentFormStatementComponent } from "./consent-form-statement";
import { Button } from "@/components/ui/button";
import { fetchConsentFormStatements } from "@/app/api";
import { PlusIcon } from "lucide-react";

export default function ConsentForm() {
  const initialConsentFormStatements = useContext(ServicesContext).consentFormStatements;
  const [consentFormStatements, setConsentFormStatements] = useState(initialConsentFormStatements);
  const [showAddStatement, setShowAddStatement] = useState(false);
  const newStatement = { statement: "", isActive: true };

  async function refreshStatements() {
    const tempStatements = await fetchConsentFormStatements();
    setConsentFormStatements(tempStatements);
  }

  function openPreview() {
    window.open("/booking/scheduleAppointment/consentForm", "_blank");
  }

  return (
    <div className="min-w-50 max-w-87.5">
      <div className="flex relative justify-center items-center">
        <h1 className="flex justify-center my-5 text-xl scroll-mt-24" id="consent-form">Edit Consent Form</h1>
        <div className="flex items-center justify-end ml-2">
          <Button className="" onClick={() => openPreview()}>Preview</Button>
          <Button className="bg-accent h-8 w-8 hover:bg-accent/90" onClick={() => setShowAddStatement(showAddStatement ? false : true)}><PlusIcon className="bg-accent text-accent-content hover:bg-accent/90" /></Button>
        </div>
      </div>
      <div className="divide-y space-y-3 border rounded-2xl p-5 pb-2">
        {consentFormStatements.map((cfs) =>
          <ConsentFormStatementComponent key={cfs.id} consentFormStatement={cfs} editMode={false} setShowAddStatement={setShowAddStatement} refreshStatements={refreshStatements} />
        )}
      </div>
      {showAddStatement && <ConsentFormStatementComponent consentFormStatement={newStatement} editMode={true} setShowAddStatement={setShowAddStatement} refreshStatements={refreshStatements} />}
    </div>
  )
}
