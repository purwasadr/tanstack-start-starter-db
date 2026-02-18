import { createFormHook, createFormHookContexts } from '@tanstack/react-form'

import {
  InputField,
  SelectField,
  SubscribeButton,
  TextAreaField,
} from '@/components/app-form-components'

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts()

export const { useAppForm } = createFormHook({
  fieldComponents: {
    InputField,
    Select: SelectField,
    TextAreaField,
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext,
  formContext,
})
