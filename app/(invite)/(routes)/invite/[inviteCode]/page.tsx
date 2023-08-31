import { currentProfile } from '@/lib/prisma/current-profile'
import { db } from '@/lib/prisma/db'
import { redirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

interface InviteCodeProps {
  params: {
    inviteCode: string
  }
}

async function InviteCodePage({ params }: InviteCodeProps) {
  const { profile } = await currentProfile()

  if (!profile) {
    return redirectToSignIn()
  }

  if (!params.inviteCode) {
    return redirect('/')
  }

  const existingServerByInviteCode = await db.server.findUnique({
    where: {
      inviteCode: params.inviteCode,
    },
  })

  if (!existingServerByInviteCode) {
    return redirect('/')
  }

  const existingServer = await db.server.findFirst({
    where: {
      id: existingServerByInviteCode.id,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  })

  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`)
  }

  const server = await db.server.update({
    where: {
      id: existingServerByInviteCode.id,
    },
    data: {
      members: {
        create: [
          {
            profileId: profile.id,
          },
        ],
      },
    },
  })

  if (server) {
    return redirect(`/servers/${server.id}`)
  }

  return null
}

export default InviteCodePage
