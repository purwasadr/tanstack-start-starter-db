import { createMiddleware } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'
import { auth } from '@/lib/auth'
import { ServerFnError } from '@/lib/server-fn-error'

const authFnMiddleware = createMiddleware({ type: 'function' }).server(
  async ({ next }) => {
    // Don't use request.headers, because it is not the same as the headers of the request
    // i think it is because request.headers is trying get headers from client side middleware
    // although this middleware is not 'function' type middleware, so cannot get client-side header
    // when i set this middleware in server function, which middleware server function can run
    // client-side logic, it's not work properly. maybe it's bug
    // Use getRequest() to get the headers of the request
    const session = await auth.api.getSession({ headers: getRequest().headers })
    if (!session) {
      throw new ServerFnError('UNAUTHORIZED', 'You are not authenticated')
    }
    return next({
      context: {
        session,
      },
    })
  },
)

export default authFnMiddleware
