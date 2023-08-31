import { useModal } from '@/hooks/use-modal-store'
import { useOrigin } from '@/hooks/use-origin'
import axios from 'axios'
import { useState } from 'react'

export function useInviteModal() {
  const [isCopied, setIsCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    onOpen,
    onClose,
    isOpen,
    type,
    data: { server },
  } = useModal()

  const origin = useOrigin()

  const isModalOpen = isOpen && type === 'invite'
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`

  function onCopy() {
    navigator.clipboard.writeText(inviteUrl)
    setIsCopied(true)

    setTimeout(() => {
      setIsCopied(false)
    }, 1000)
  }

  async function onNewInvite() {
    try {
      setIsLoading(true)
      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`,
      )

      onOpen('invite', { server: response.data })
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isModalOpen,
    onClose,
    isLoading,
    inviteUrl,
    isCopied,
    onCopy,
    onNewInvite,
  }
}
