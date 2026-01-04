import { createStart } from '@tanstack/react-start'
import { errorFnMiddleware } from './middleware/fn/error-fn-middleware'

export const startInstance = createStart(() => {
  return {
    functionMiddleware: [errorFnMiddleware],
  }
})
