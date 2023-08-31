import { currentProfile } from '@/lib/prisma/current-profile'
import { db } from '@/lib/prisma/db'
import { NextResponse } from 'next/server'

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } },
) {
  try {
    const { profile } = await currentProfile()
    const { name, imageUrl } = await req.json()

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        name,
        imageUrl,
      },
    })

    console.log(server)

    return NextResponse.json(server)
  } catch (e) {
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
