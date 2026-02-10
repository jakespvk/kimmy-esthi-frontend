"use client"

import { PatternFormat } from "react-number-format"
import { Input } from "@/components/ui/input"

interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
  className?: string
  placeholder?: string
  onBlur?: () => void
}

export default function PhoneInput({ value, onChange, className = "", placeholder = "", onBlur }: PhoneInputProps) {
  return (
    <PatternFormat
      format="(###) ###-####"
      mask="_"
      value={value}
      onValueChange={(values) => onChange(values.value)}
      onBlur={onBlur}
      placeholder={placeholder}
      customInput={Input}
      type="tel"
      className={className}
    />
  )
}
