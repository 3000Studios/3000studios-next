export default function Live() {
  return (
    <section className="p-10 min-h-screen">
      <h1 className="text-4xl font-bold text-white mb-6">LIVE STREAM</h1>
      <p className="text-gray-400 mb-6">Watch exclusive live content and broadcasts</p>
      
      <div className="aspect-video w-full bg-black/50 rounded-lg border border-yellow-500/30 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📡</div>
          <p className="text-white text-xl font-bold">Stream Offline</p>
          <p className="text-gray-400 mt-2">Check back later for live content</p>
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <h3 className="text-white font-bold mb-2">Upcoming Streams</h3>
          <p className="text-gray-400 text-sm">Schedule TBA</p>
        </div>
        <div className="card">
          <h3 className="text-white font-bold mb-2">Past Broadcasts</h3>
          <p className="text-gray-400 text-sm">View archive</p>
        </div>
        <div className="card">
          <h3 className="text-white font-bold mb-2">Live Chat</h3>
          <p className="text-gray-400 text-sm">Join the conversation</p>
        </div>
      </div>
    </section>
  );
}
