import NavAdmin from '@/components/NavAdmin'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavAdmin />
      {children}
    </>
  )
}
