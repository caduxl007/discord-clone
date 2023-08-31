import { ServerSidebar } from '@/components/server/server-sidebar'
import { useLayoutServerId } from './hooks/use-layout-server-id'

async function LayoutServerId({
  children,
  params,
}: {
  children: React.ReactNode
  params: { serverId: string }
}) {
  const { server } = await useLayoutServerId(params.serverId)

  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <ServerSidebar serverId={server.id} />
      </div>

      <main className="h-full md:pl-60">{children}</main>
    </div>
  )
}

export default LayoutServerId
