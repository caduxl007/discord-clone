import { redirect } from 'next/navigation'

import { db } from '@/lib/prisma/db'
import { initialProfile } from '@/lib/prisma/initial-profile'
import { InitialModal } from '@/components/modals/initial-modal'

async function SetupPage() {
  const profile = await initialProfile()

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  })

  if (server) {
    return redirect(`/servers/${server.id}`)
  }

  return <InitialModal />
}

export default SetupPage
