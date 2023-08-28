import { ModeToggle } from '@/components/mode-toggle'
import { UserButton } from '@clerk/nextjs'

export default function Home() {
  return (
    <p className="">
      Hello Discord Clone
      <ModeToggle />
      <UserButton afterSignOutUrl="/" />
    </p>
  )
}
