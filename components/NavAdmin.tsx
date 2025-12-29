import Link from 'next/link'

export default function NavAdmin() {
  return (
    <nav className="admin-nav">
      <Link href="/home">Home</Link>
      <Link href="/admin">Dashboard</Link>
      <Link href="/admin/live">Live</Link>
      <Link href="/admin/command-center">Command Center</Link>
      <Link href="/admin/store-manager">Store Manager</Link>
    </nav>
  )
}
