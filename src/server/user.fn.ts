import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import { getUser } from './user.server'

export const getUserFn = createServerFn({ method: 'GET' })
  .inputValidator(
    z.object({
      id: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    // Your server-side logic here
    // For example, you could fetch the user from a database
    const user = await getUser(data.id)

    return user
  })
