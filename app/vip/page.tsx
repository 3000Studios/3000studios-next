export default function VIPPage() {
  return (
    <div className="min-h-screen bg-black text-white font-mono p-10">
      <h1 className="text-3xl font-bold tracking-widest mb-6">
        VIP COMMAND CENTER
      </h1>

      <p className="mb-6 text-neutral-400">
        Live voice + command execution interface.
      </p>

      <a
        href="/admin/login"
        className="inline-block px-6 py-3 bg-white text-black font-bold tracking-widest"
      >
        ENTER VIP
      </a>
    </div>
  )
}
