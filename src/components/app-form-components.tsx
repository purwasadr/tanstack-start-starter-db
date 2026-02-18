import { useStore } from '@tanstack/react-form'

import { useId } from 'react'
import { useFieldContext, useFormContext } from '../hooks/use-app-form'

import { Field, FieldError, FieldLabel } from './ui/field'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea as ShadcnTextarea } from '@/components/ui/textarea'
import * as ShadcnSelect from '@/components/ui/select'
import { cn } from '@/lib/utils'

export function SubscribeButton({
  label,
  className,
  ...props
}: React.ComponentProps<'button'> & {
  label: string
  className?: string
}) {
  const form = useFormContext()
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button
          className={className}
          type="submit"
          disabled={isSubmitting}
          {...props}
        >
          {label}
        </Button>
      )}
    </form.Subscribe>
  )
}

export function InputField({
  label,
  className,
  ...props
}: React.ComponentProps<'input'> & {
  label: string
}) {
  const field = useFieldContext<string>()
  const errors = useStore(field.store, (state) => state.meta.errors)
  const fieldId = useId()

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <Field data-invalid={isInvalid} className={cn(className)}>
      <FieldLabel htmlFor={fieldId}>
        {label}
      </FieldLabel>
      <Input
        id={fieldId}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        {...props}
      />
      {isInvalid && <FieldError errors={errors} />}
    </Field>
  )
}

export function TextAreaField({
  label,
  ...props
}: {
  label: string
} & React.ComponentProps<'textarea'>) {
  const field = useFieldContext<string>()
  const errors = useStore(field.store, (state) => state.meta.errors)
  const fieldId = useId()

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={fieldId} className="mb-2">
        {label}
      </FieldLabel>
      <ShadcnTextarea
        id={fieldId}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        aria-invalid={isInvalid}
        onChange={(e) => field.handleChange(e.target.value)}
        {...props}
      />
      {isInvalid && <FieldError errors={errors} />}
    </Field>
  )
}

export function SelectField({
  label,
  options,
  className,
}: {
  label: string
  options: Array<{ label: string; value: string }>
  className?: string
}) {
  const field = useFieldContext<string>()
  const errors = useStore(field.store, (state) => state.meta.errors)
  const fieldId = useId()

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <Field className={cn(className)}>
      <FieldLabel htmlFor={fieldId}>
        {label}
      </FieldLabel>
      <ShadcnSelect.Select
        id={fieldId}
        name={field.name}
        value={field.state.value}
        onValueChange={(value) => field.handleChange(value ?? '')}
        data-invalid={isInvalid}
      >
        <ShadcnSelect.SelectTrigger className="w-full">
          <ShadcnSelect.SelectValue />
        </ShadcnSelect.SelectTrigger>
        <ShadcnSelect.SelectContent>
          <ShadcnSelect.SelectGroup>
            <ShadcnSelect.SelectLabel>{label}</ShadcnSelect.SelectLabel>
            {options.map((option) => (
              <ShadcnSelect.SelectItem key={option.value} value={option.value}>
                {option.label}
              </ShadcnSelect.SelectItem>
            ))}
          </ShadcnSelect.SelectGroup>
        </ShadcnSelect.SelectContent>
      </ShadcnSelect.Select>
      {isInvalid && <FieldError errors={errors} />}
    </Field>
  )
}
