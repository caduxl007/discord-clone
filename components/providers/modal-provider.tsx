'use client'

import { CreateServerModal } from '@/components/modals/create-server-modal'
import { useIsMounted } from '@/hooks/use-is-mounted'
import { InviteModal } from '../modals/invite-modal'
import { EditServerModal } from '../modals/edit-server-modal'

export const ModalProvider = () => {
  useIsMounted()

  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
    </>
  )
}
