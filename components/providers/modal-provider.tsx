'use client'

import { CreateServerModal } from '@/components/modals/create-server-modal'
import { useIsMounted } from '@/hooks/use-is-mounted'
import { InviteModal } from '../modals/invite-modal'
import { EditServerModal } from '../modals/edit-server-modal'
import { MembersModal } from '../modals/members-modal'
import { CreateChannelModal } from '../modals/create-channel-modal'
import { LeaveServerModal } from '../modals/leave-server-modal/inde'

export const ModalProvider = () => {
  useIsMounted()

  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MembersModal />
      <CreateChannelModal />
      <LeaveServerModal />
    </>
  )
}
