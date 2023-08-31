import { currentProfile } from '@/lib/prisma/current-profile'
import { db } from '@/lib/prisma/db'
import { ChannelType } from '@prisma/client'
import { redirect } from 'next/navigation'

export async function useServerSidebar(serverId: string) {
  const data = await currentProfile()

  const profile = data?.profile

  if (!profile) {
    return redirect('/')
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: 'asc',
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: 'asc',
        },
      },
    },
  })

  if (!server) {
    return redirect('/')
  }

  const textChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT,
  )
  const audioChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO,
  )
  const videoChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO,
  )
  const members = server?.members.filter(
    (member) => member.profileId !== profile.id,
  )

  const role = server?.members?.find(
    (member) => member.profileId === profile.id,
  )?.role

  return {
    server,
    textChannels,
    audioChannels,
    videoChannels,
    members,
    role,
  }
}
