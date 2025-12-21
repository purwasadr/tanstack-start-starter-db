import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { hashPassword, verifyPassword } from './scrypt'
import { db } from '@/db'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
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
