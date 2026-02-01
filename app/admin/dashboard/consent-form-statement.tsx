import { addOrUpdateStatement } from "@/app/api"
import { ConsentFormStatement } from "@/app/types"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import { Edit, Save } from "lucide-react"
import { useState } from "react"

export const ConsentFormStatementComponent = (props: { consentFormStatement: ConsentFormStatement, editMode: boolean, refreshStatements: Function }) => {
  const [editMode, setEditMode] = useState(props.editMode);
  const [statement, setStatement] = useState(props.consentFormStatement.statement);
  const [isActive, setIsActive] = useState(props.consentFormStatement.isActive);

  if (editMode) return (
    <div className="flex flex-wrap justify-between items-center my-3">
      <InputGroup className="max-w-xs">
        <InputGroupInput autoFocus defaultValue={statement} onChange={(e) => setStatement(e.target.value)} />
        <InputGroupAddon align="inline-end">
          <Button className="ml-2 bg-accent h-8 w-8 hover:bg-accent/90" onClick={() => { addOrUpdateStatement(statement, isActive, props.consentFormStatement.id); props.refreshStatements(); setEditMode(false); }}><Save className="text-accent-content bg-accent" /></Button>
        </InputGroupAddon>
      </InputGroup>
      <Checkbox className="m-2 ml-0" id="isActiveConsentFormStatement" defaultChecked={isActive} onCheckedChange={() => setIsActive(isActive ? false : true)} />
      <Label className="my-2" htmlFor="isActiveConsentFormStatement">Set active Consent Form statement</Label>
    </div >
  )

  else return (
    <div className="flex justify-between items-start *:mb-3">
      <p className={`flex-wrap text-pretty ` + (!isActive && "text-red-700 line-through")}>{statement}</p>
      <Button className="ml-2 h-8 w-8 bg-accent hover:bg-accent/90" onClick={() => setEditMode(true)}><Edit className="text-accent-content bg-accent" /></Button>
    </div>
  )
}
