import { defineRelations } from 'drizzle-orm'
import * as schema from './index'

export const relations = defineRelations(
  {
    ...schema,
  },
  (r) => ({
    user: {
      account: r.one.account({
        from: r.user.id,
        to: r.account.userId,
      }),
      session: r.one.session({
        from: r.user.id,
        to: r.session.userId,
      }),
    },
  }),
)
