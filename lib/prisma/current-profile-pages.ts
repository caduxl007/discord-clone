import { NextApiRequest } from 'next'
import { db } from './db'
import { getAuth } from '@clerk/nextjs/server'

export async function currentProfilePages(req: NextApiRequest) {
  const { userId } = getAuth(req)

  if (!userId) {
    return {
      profile: null,
    }
  }

  const profile = await db.profile.findUnique({
    where: { userId },
  })

  return {
    profile,
  }
}
