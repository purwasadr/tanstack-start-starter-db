import { db } from '@/db'

export const getUser = async (userId: string) => {
  const user = await db.query.user.findFirst({
    where: {
      id: userId,
    },
  })

  if (!user) {
    throw new Error('User not found')
  }

  return user
}
