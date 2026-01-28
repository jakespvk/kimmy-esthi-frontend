import { updateStatement } from "@/app/api"
import { ConsentFormStatement } from "@/app/types"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Edit, Save } from "lucide-react"
import { useState } from "react"

export const ConsentFormStatementComponent = (props: { consentFormStatement: ConsentFormStatement }) => {
  const [editMode, setEditMode] = useState(false);
  const [statement, setStatement] = useState(props.consentFormStatement.statement);
  const [isActive, setIsActive] = useState(props.consentFormStatement.isActive);

  if (editMode) return (
    <div className="flex justify-between items-start">
      <Input defaultValue={statement} onChange={(e) => setStatement(e.target.value)} />
      <Checkbox defaultChecked={isActive} onCheckedChange={() => setIsActive(isActive ? false : true)} />
      <Button onClick={() => updateStatement(props.consentFormStatement.id, statement, isActive)}><Save className="fill-accent-content text-accent bg-accent-content" /></Button>
    </div>
  )

  else return (
    <div className="flex justify-between items-start">
      <p>{props.consentFormStatement.statement}</p>
      <Button onClick={() => setEditMode(true)}><Edit className="fill-accent-content text-accent bg-accent-content" /></Button>
    </div>
  )
}
