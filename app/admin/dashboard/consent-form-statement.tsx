import { addOrUpdateStatement } from "@/app/api"
import { ConsentFormStatement } from "@/app/types"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Edit, Save } from "lucide-react"
import { useState } from "react"

export const ConsentFormStatementComponent = (props: { consentFormStatement: ConsentFormStatement, editMode: boolean }) => {
  const [editMode, setEditMode] = useState(props.editMode);
  const [statement, setStatement] = useState(props.consentFormStatement.statement);
  const [isActive, setIsActive] = useState(props.consentFormStatement.isActive);

  if (editMode) return (
    <div className="flex justify-between items-start">
      <Input autoFocus defaultValue={statement} onChange={(e) => setStatement(e.target.value)} />
      <Checkbox defaultChecked={isActive} onCheckedChange={() => setIsActive(isActive ? false : true)} />
      <Button onClick={() => addOrUpdateStatement(statement, isActive, props.consentFormStatement.id)}><Save className="fill-accent-content text-accent bg-accent-content" /></Button>
    </div>
  )

  else return (
    <div className="flex justify-between items-start">
      <p>{props.consentFormStatement.statement}</p>
      <Button onClick={() => setEditMode(true)}><Edit className="fill-accent-content text-accent bg-accent-content" /></Button>
    </div>
  )
}
