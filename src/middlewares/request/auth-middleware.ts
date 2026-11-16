import { redirect } from '@tanstack/react-router'
import { createMiddleware } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'

import { auth } from '@/lib/auth'

export const authMiddleware = createMiddleware().server(async ({ next }) => {
  const session = await auth.api.getSession({ headers: getRequest().headers })
  if (!session) {
    throw redirect({ to: '/login' })
  }
  return next({
    context: {
      session,
    },
  })
})
