import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface Props {
  value: string | undefined
  onChange: (date: string | undefined) => void
}

// Format date consistently to avoid hydration mismatch between server and client.
// Using manual formatting instead of toLocaleDateString() which varies by locale.
const formatDate = (date: Date): string => {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const year = date.getFullYear()
  return `${month}/${day}/${year}`
}

export function DatePicker({ value, onChange }: Props) {
  const [open, setOpen] = React.useState(false)

  const valueAsDate = value ? new Date(value) : undefined
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button variant="outline" id="date" className="justify-start font-normal">
            {value ? valueAsDate?.toLocaleDateString() : 'Select date'}
          </Button>
        }
      />
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={valueAsDate}
          defaultMonth={valueAsDate}
          captionLayout="dropdown"
          onSelect={(date) => {
            onChange?.(date ? formatDate(date) : undefined)
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
