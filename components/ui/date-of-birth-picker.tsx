"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DateOfBirthPickerProps {
  value: Date | undefined
  onChange: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export default function DateOfBirthPicker({
  value,
  onChange,
  placeholder = "Select date",
  disabled = false,
  className,
}: DateOfBirthPickerProps) {
  const [open, setOpen] = React.useState(false)
  const [maxDate, setMaxDate] = React.useState<Date | null>(null)

  React.useEffect(() => {
    setMaxDate(new Date())
  }, [])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!value}
          className={cn(
            "data-[empty=true]:text-muted-foreground max-w-full w-[280px] justify-start text-left font-normal",
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => {
            onChange(date)
            setOpen(false)
          }}
          disabled={(date) => {
            if (!maxDate) return false
            return date > maxDate || date < new Date("1900-01-01")
          }}
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  )
}
