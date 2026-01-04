import { createMiddleware } from '@tanstack/react-start'
import { isNotFound, isRedirect } from '@tanstack/react-router'
import { ServerFnError } from '@/lib/server-fn-error'

export const errorFnMiddleware = createMiddleware({ type: 'function' }).server(
  async ({ next }) => {
    try {
      return await next()
    } catch (error) {
      // Re-throw TanStack Router special errors (redirects, not found)
      if (isRedirect(error) || isNotFound(error)) {
        throw error
      }
      // Re-throw our custom ServerFnError
      if (error instanceof ServerFnError) {
        throw error
      }
      // Log unexpected errors for debugging
      console.error('Unexpected server function error:', error)
      // Convert unknown errors to ServerFnError
      throw new ServerFnError('INTERNAL_ERROR', 'Internal server error', 500)
    }
  },
)
