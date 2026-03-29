import { createMiddleware } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'

import { auth } from '@/lib/auth'
import { ServerFnError } from '@/lib/server-fn-error'

const authFnMiddleware = createMiddleware({ type: 'function' }).server(async ({ next }) => {
  const session = await auth.api.getSession({ headers: getRequest().headers })
  if (!session) {
    throw new ServerFnError('UNAUTHORIZED', 'You are not authenticated')
  }
  return next({
    context: {
      session,
    },
  })
})

export default authFnMiddleware
