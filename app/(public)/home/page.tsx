import NavPublic from '@/components/NavPublic'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <NavPublic />
      <div className="p-8">
        <h1 className="text-4xl font-bold">Home</h1>
        <p className="mt-4 text-slate-400">Welcome to 3000 Studios.</p>
      </div>
    </div>
  )
}
