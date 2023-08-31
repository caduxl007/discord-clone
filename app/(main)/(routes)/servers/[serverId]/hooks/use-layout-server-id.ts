import { currentProfile } from '@/lib/prisma/current-profile'
import { db } from '@/lib/prisma/db'
import { redirectToSignIn } from '@clerk/nextjs'
import { Server } from '@prisma/client'
import { redirect } from 'next/navigation'

export async function useLayoutServerId(serverId: string): Promise<{
  server: Server
}> {
  const data = await currentProfile()
  const profile = data?.profile

  if (!profile) {
    return redirectToSignIn()
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  })

  if (!server) {
    return redirect('/')
  }

  return {
    server,
  }
}
