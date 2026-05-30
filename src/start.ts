import { createCsrfMiddleware, createStart } from '@tanstack/react-start'

import { errorFnMiddleware } from './middlewares/fn/error-fn-middleware'

const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === 'serverFn',
})

export const startInstance = createStart(() => {
  return {
    functionMiddleware: [errorFnMiddleware],
    requestMiddleware: [csrfMiddleware],
  }
})
