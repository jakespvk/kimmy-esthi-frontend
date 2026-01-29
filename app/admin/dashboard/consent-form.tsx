import { useContext, useState } from "react";
import { ServicesContext } from "@/context/ServicesContext";
import { ConsentFormStatementComponent } from "./consent-form-statement";
import { Button } from "@/components/ui/button";
import { fetchConsentFormStatements } from "@/app/api";
import { Plus, PlusIcon } from "lucide-react";

export default function ConsentForm() {
  const initialConsentFormStatements = useContext(ServicesContext).consentFormStatements;
  const [consentFormStatements, setConsentFormStatements] = useState(initialConsentFormStatements);
  const [showAddStatement, setShowAddStatement] = useState(false);
  const newStatement = { statement: "", isActive: true };

  async function refreshStatements() {
    const tempStatements = await fetchConsentFormStatements();
    setConsentFormStatements(tempStatements);
  }

  return (
    <div className="min-w-[200px] max-w-[350px]">
      <div className="flex relative justify-center items-center">
        <h1 className="flex justify-center my-5 text-xl scroll-mt-24" id="consent-form">Edit Consent Form</h1>
        <Button className="absolute top-5 right-2 bg-accent h-8 w-8 hover:bg-accent/90" onClick={() => setShowAddStatement(showAddStatement ? false : true)}><PlusIcon className="bg-accent text-accent-content hover:bg-accent/90" /></Button>
      </div>
      <div className="divide-y space-y-3 border rounded-2xl p-5 pb-2">
        {consentFormStatements.map((cfs) =>
          <ConsentFormStatementComponent key={cfs.id} consentFormStatement={cfs} editMode={false} refreshStatements={refreshStatements} />
        )}
      </div>
      {showAddStatement && <ConsentFormStatementComponent consentFormStatement={newStatement} editMode={true} refreshStatements={refreshStatements} />}
    </div>
  )
}
