'use client'

import Link from 'next/link'

export default function NavPublic() {
  return (
    <nav className="nav">
      <Link href="/home">Home</Link>
      <Link href="/projects/ready-apps">Projects</Link>
      <Link href="/store/3000-store">Store</Link>
      <Link href="/live">Live</Link>
      <Link href="/posts/todays-posts">Posts</Link>
      <Link href="/admin">Admin</Link>
    </nav>
  )
}
