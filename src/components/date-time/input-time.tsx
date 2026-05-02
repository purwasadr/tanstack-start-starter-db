'use client'

import { useState } from 'react'

import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

// -------------------------------------------------------------------------------------------------
// Types
// -------------------------------------------------------------------------------------------------

/** Time unit options */
type TimeUnit = 'seconds' | 'minutes' | 'hours'

export interface InputTimeProps {
  /** Value in total seconds */
  value?: number
  /** Callback when value changes (value is always in seconds) */
  onChange?: (seconds: number) => void
  /** Default unit to display (default: "seconds") */
  defaultUnit?: TimeUnit | 'auto'
  /** Whether the input is disabled */
  disabled?: boolean
  /** Additional class name for the container */
  className?: string
  /** Placeholder for the input */
  placeholder?: string
}

// -------------------------------------------------------------------------------------------------
// Constants
// -------------------------------------------------------------------------------------------------

/** Conversion multipliers from each unit to seconds */
const UNIT_TO_SECONDS: Record<TimeUnit, number> = {
  seconds: 1,
  minutes: 60,
  hours: 3600,
}

/** Display labels for each unit */
const UNIT_LABELS: Record<TimeUnit, string> = {
  seconds: 'Seconds',
  minutes: 'Minutes',
  hours: 'Hours',
}

// -------------------------------------------------------------------------------------------------
// Helper Functions
// -------------------------------------------------------------------------------------------------

/**
 * Converts seconds to the specified unit
 */
function secondsToUnit(seconds: number, unit: TimeUnit): number {
  return seconds / UNIT_TO_SECONDS[unit]
}

/**
 * Converts a value in the specified unit to seconds
 */
function unitToSeconds(value: number, unit: TimeUnit): number {
  return value * UNIT_TO_SECONDS[unit]
}

const getDefaultUnit = (value: number) => {
  if (value === 0) {
    return 'minutes'
  }
  if (value % 3600 === 0) {
    return 'hours'
  } else if (value % 60 === 0) {
    return 'minutes'
  } else {
    return 'seconds'
  }
}

// -------------------------------------------------------------------------------------------------
// Component
// -------------------------------------------------------------------------------------------------

/**
 * InputTime component with a single input and unit dropdown.
 * User enters a number and selects the unit (seconds, minutes, hours).
 * The output value is always in seconds.
 *
 * Example usage:
 * ```tsx
 * <InputTime
 *   value={3600} // 3600 seconds = 1 hour
 *   onChange={(seconds) => console.log(seconds)}
 *   defaultUnit="minutes"
 * />
 * ```
 */
export function InputTime({
  value = 0,
  onChange,
  defaultUnit = 'auto',
  disabled = false,
  className,
  placeholder = '0',
}: InputTimeProps) {
  // Track the selected unit (user can switch between units)
  const [unit, setUnit] = useState<TimeUnit>(
    defaultUnit === 'auto' ? getDefaultUnit(value) : defaultUnit,
  )

  // Convert the seconds value to display value based on current unit (rounded)
  const displayValue = Math.round(secondsToUnit(value, unit))

  /**
   * Handles input change.
   * Converts the input value to seconds and calls onChange.
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value

    // Allow empty input (treat as 0)
    if (inputValue === '') {
      onChange?.(0)
      return
    }

    // Parse the input as an integer (rounded)
    const numValue = parseInt(inputValue, 10)

    // Ignore invalid numbers
    if (isNaN(numValue)) return

    // Convert to seconds and call onChange
    const seconds = unitToSeconds(numValue, unit)
    onChange?.(Math.round(seconds)) // Round to avoid floating point issues
  }

  /**
   * Handles unit change.
   * The value stays the same (in seconds), but display updates.
   */
  const handleUnitChange = (newUnit: TimeUnit | null) => {
    if (newUnit !== null) {
      setUnit(newUnit)
    }
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {/* Number Input */}
      <Input
        type="number"
        value={displayValue || ''}
        onChange={handleInputChange}
        disabled={disabled}
        placeholder={placeholder}
        className="w-24"
        min={0}
        step={1}
      />

      {/* Unit Dropdown */}
      <Select value={unit} onValueChange={handleUnitChange} disabled={disabled}>
        <SelectTrigger className="w-[110px]" aria-label="Time unit">
          <SelectValue render={() => <span>{UNIT_LABELS[unit]}</span>} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="seconds">{UNIT_LABELS.seconds}</SelectItem>
          <SelectItem value="minutes">{UNIT_LABELS.minutes}</SelectItem>
          <SelectItem value="hours">{UNIT_LABELS.hours}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

// Export helper functions for external use if needed
export { secondsToUnit, unitToSeconds, UNIT_TO_SECONDS, UNIT_LABELS }
export type { TimeUnit }
