import { reset } from 'drizzle-seed'
import { nanoid } from 'nanoid'
import { faker } from '@faker-js/faker'
import { account, session, user, verification } from '../schema'
import { hashPassword } from '@/lib/scrypt'
import { db } from '@/db'

const userData = [
  {
    name: 'Jang Wonyoung',
    email: 'wonyoung@purwasoft.com',
  },
  {
    name: 'Liz',
    email: 'liz@purwasoft.com',
  },
  {
    name: 'Hanni',
    email: 'hanni@purwasoft.com',
  },
  {
    name: 'Minnie',
    email: 'minnie@purwasoft.com',
  },
]

const main = async () => {
  const userIds = Array.from({ length: 20 }, () => nanoid())

  try {
    // Reset the database before seeding to avoid unique constraint violations
    await reset(db, {
      user,
      account,
      session,
      verification,
    })

    // Seed users
    const users = userIds
      .map((id) => ({
        id,
        name: faker.person.fullName(),
        email: faker.internet.email(),
        emailVerified: true,
      }))
      .concat(
        userData.map((item) => ({
          id: nanoid(),
          name: item.name,
          email: item.email,
          emailVerified: true,
        })),
      )
    const userRes = await db.insert(user).values(users).returning()

    await db.insert(account).values(
      await Promise.all(
        userRes.map(async (item) => ({
          id: nanoid(),
          accountId: item.id,
          providerId: 'credential',
          userId: item.id,
          password: await hashPassword('password'),
        })),
      ),
    )

    console.log('✅ Database seeded successfully')
  } catch (error: unknown) {
    console.error(
      '❌ Error seeding database:',
      error instanceof Error ? error.message : String(error),
    )
    console.error(error)
    process.exit(1)
  }
}

main()
