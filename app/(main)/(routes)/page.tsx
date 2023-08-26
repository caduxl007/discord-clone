import { UserButton } from '@clerk/nextjs'

export default function Home() {
  return (
    <p className="">
      Hello Discord Clone
      <UserButton afterSignOutUrl="/" />
    </p>
  )
}
