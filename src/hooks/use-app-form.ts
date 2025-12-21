import { createFormHook, createFormHookContexts } from '@tanstack/react-form'

import {
  InputField,
  Select,
  SubscribeButton,
  TextArea,
} from '@/components/app-form-components'

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts()

export const { useAppForm } = createFormHook({
  fieldComponents: {
    InputField,
    Select,
    TextArea,
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext,
  formContext,
})
