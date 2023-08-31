import { useServerSidebar } from './hooks/use-server-sidebar'
import { ServerHeader } from './server-header'

interface ServerSidebarProps {
  serverId: string
}

export async function ServerSidebar({ serverId }: ServerSidebarProps) {
  const { server, role } = await useServerSidebar(serverId)

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader server={server} role={role} />
    </div>
  )
}
