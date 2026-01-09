export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-black text-white font-mono p-10">
      <h1 className="text-2xl font-bold tracking-widest mb-6">
        ADMIN DASHBOARD
      </h1>

      <ul className="space-y-4">
        <li>✅ Site status: ONLINE</li>
        <li>✅ Deploy pipeline: CONNECTED</li>
        <li>✅ Voice API: READY</li>
        <li>✅ VIP UI: ENABLED</li>
      </ul>
    </div>
  )
}
