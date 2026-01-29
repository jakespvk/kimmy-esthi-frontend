import { useContext, useState } from "react";
import { ServicesContext } from "@/context/ServicesContext";
import { ConsentFormStatementComponent } from "./consent-form-statement";
import { Button } from "@/components/ui/button";

export default function ConsentForm() {
  const consentFormStatements = useContext(ServicesContext).consentFormStatements;
  const [showAddStatement, setShowAddStatement] = useState(false);
  const newStatement = { statement: "", isActive: true };

  return (
    <div>
      <h1 className="flex justify-center my-5 text-xl scroll-mt-24" id="consent-form">Edit Consent Form</h1>
      {consentFormStatements.map((cfs) =>
        <ConsentFormStatementComponent key={cfs.id} consentFormStatement={cfs} editMode={false} statementsList={consentFormStatements} />
      )}
      <Button onClick={() => setShowAddStatement(showAddStatement ? false : true)}>+ Add Statement</Button>
      {showAddStatement && <ConsentFormStatementComponent consentFormStatement={newStatement} editMode={true} statementsList={consentFormStatements} />}
    </div>
  )
}
