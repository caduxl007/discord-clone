'use client'

import { useSocket } from '@/components/providers/socket-provider'
import { Badge } from '@/components/ui/badge'

export function SocketIndicator() {
  const { isConnected } = useSocket()

  if (!isConnected) {
    return (
      <Badge
        variant="outline"
        className="bg-yellow-600 text-white border-none h-6 w-6"
      ></Badge>
    )
  }

  return (
    <Badge
      variant="outline"
      className="bg-emerald-600 text-white border-none h-6 w-6"
    ></Badge>
  )
}
