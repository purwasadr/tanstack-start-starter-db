import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { tanstackStartCookies } from 'better-auth/tanstack-start'

import { db } from '@/db'

import { hashPassword, verifyPassword } from './scrypt'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  plugins: [tanstackStartCookies()],
  emailAndPassword: {
    enabled: true,
    password: {
      hash: (password) => {
        return hashPassword(password)
      },
      verify: ({ hash, password }) => {
        return verifyPassword({ password, hash })
      },
    },
  },
})
