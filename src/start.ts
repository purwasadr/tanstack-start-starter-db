import { createStart } from '@tanstack/react-start'
import { errorFnMiddleware } from './middlewares/fn/error-fn-middleware'

export const startInstance = createStart(() => {
  return {
    functionMiddleware: [errorFnMiddleware],
  }
})
