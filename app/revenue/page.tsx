export default function Revenue() {
  return (
    <section className="p-10 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 gradient-text">Premium Access</h1>
      <p className="text-gray-400 mb-8">Unlock exclusive content and features</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-premium hover-lift">
          <h3 className="text-2xl font-bold mb-2">Monthly</h3>
          <p className="text-4xl font-bold text-yellow-400 mb-4">$29<span className="text-lg">/mo</span></p>
          <ul className="space-y-2 text-gray-400 mb-6">
            <li>✓ All features</li>
            <li>✓ Priority support</li>
            <li>✓ Early access</li>
          </ul>
          <button className="w-full bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors">
            Subscribe Monthly
          </button>
        </div>
        
        <div className="card-premium hover-lift border-yellow-500">
          <div className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block">POPULAR</div>
          <h3 className="text-2xl font-bold mb-2">Yearly</h3>
          <p className="text-4xl font-bold text-yellow-400 mb-4">$299<span className="text-lg">/yr</span></p>
          <ul className="space-y-2 text-gray-400 mb-6">
            <li>✓ All features</li>
            <li>✓ Priority support</li>
            <li>✓ Early access</li>
            <li>✓ 2 months free</li>
          </ul>
          <button className="w-full bg-gradient-to-r from-yellow-600 to-yellow-400 text-black px-6 py-3 rounded-lg font-bold hover:scale-105 transition-transform">
            Subscribe Yearly
          </button>
        </div>
        
        <div className="card-premium hover-lift">
          <h3 className="text-2xl font-bold mb-2">Lifetime</h3>
          <p className="text-4xl font-bold text-yellow-400 mb-4">$999<span className="text-lg"></span></p>
          <ul className="space-y-2 text-gray-400 mb-6">
            <li>✓ All features</li>
            <li>✓ Priority support</li>
            <li>✓ Early access</li>
            <li>✓ Lifetime updates</li>
          </ul>
          <button className="w-full bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors">
            Buy Lifetime
          </button>
        </div>
      </div>
    </section>
  );
}
