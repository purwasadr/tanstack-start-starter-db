import { useStore } from '@tanstack/react-form'

import { useFieldContext, useFormContext } from '../hooks/use-app-form'

import { Field, FieldError, FieldLabel } from './ui/field'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea as ShadcnTextarea } from '@/components/ui/textarea'
import * as ShadcnSelect from '@/components/ui/select'
import { Switch as ShadcnSwitch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
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

function ErrorMessages({
  errors,
}: {
  errors: Array<string | { message: string }>
}) {
  return (
    <>
      {errors.map((error) => (
        <div
          key={typeof error === 'string' ? error : error.message}
          className="text-red-500 mt-1 text-sm"
        >
          {typeof error === 'string' ? error : error.message}
        </div>
      ))}
    </>
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

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <Field data-invalid={isInvalid} className={cn(className)}>
      <FieldLabel htmlFor={field.name} className="mb-2">
        {label}
      </FieldLabel>
      <Input
        id={field.name}
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

export function TextArea({
  label,
  ...props
}: {
  label: string
} & React.ComponentProps<'textarea'>) {
  const field = useFieldContext<string>()
  const errors = useStore(field.store, (state) => state.meta.errors)

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name} className="mb-2">
        {label}
      </FieldLabel>
      <ShadcnTextarea
        id={field.name}
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

export function Select({
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

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <Field className={cn(className)}>
      <FieldLabel htmlFor={field.name} className="mb-2">
        {label}
      </FieldLabel>
      <ShadcnSelect.Select
        id={field.name}
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

export function Switch({ label }: { label: string }) {
  const field = useFieldContext<boolean>()
  const errors = useStore(field.store, (state) => state.meta.errors)

  return (
    <div>
      <div className="flex items-center gap-2">
        <ShadcnSwitch
          id={label}
          onBlur={field.handleBlur}
          checked={field.state.value}
          onCheckedChange={(checked) => field.handleChange(checked)}
        />
        <Label htmlFor={label}>{label}</Label>
      </div>
      {field.state.meta.isTouched && <ErrorMessages errors={errors} />}
    </div>
  )
}
