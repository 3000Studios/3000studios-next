export default function AdminRevenue() {
  return (
    <section className="p-10 min-h-screen bg-linear-to-br from-black via-gray-900 to-black">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold gradient-text mb-8">Revenue Control Center</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card-premium border-green-500">
            <h3 className="text-2xl font-bold text-green-400 mb-4">Stripe</h3>
            <p className="text-white text-3xl font-bold mb-2">ACTIVE</p>
            <p className="text-gray-400">Payment processing ready</p>
          </div>

          <div className="card-premium border-blue-500">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">PayPal</h3>
            <p className="text-white text-3xl font-bold mb-2">ACTIVE</p>
            <p className="text-gray-400">Alternative payment ready</p>
          </div>

          <div className="card-premium border-yellow-500">
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">Ads</h3>
            <p className="text-white text-3xl font-bold mb-2">ACTIVE</p>
            <p className="text-gray-400">AdSense integrated</p>
          </div>
        </div>

        <div className="card-premium">
          <h2 className="text-3xl font-bold text-white mb-6">Revenue Metrics</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-gray-700 pb-4">
              <span className="text-gray-300">Total Store Revenue</span>
              <span className="text-2xl font-bold text-green-400">$0.00</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-700 pb-4">
              <span className="text-gray-300">Ad Revenue</span>
              <span className="text-2xl font-bold text-blue-400">$0.00</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-700 pb-4">
              <span className="text-gray-300">Affiliate Commissions</span>
              <span className="text-2xl font-bold text-purple-400">$0.00</span>
            </div>
            <div className="flex justify-between items-center pt-4">
              <span className="text-white font-bold text-xl">Total Revenue</span>
              <span className="text-3xl font-bold gradient-text">$0.00</span>
            </div>
          </div>
        </div>

        <div className="mt-8 card bg-yellow-500/10 border-yellow-500">
          <p className="text-yellow-400 font-bold">
            💰 Revenue tracking active. Connect payment processors to start earning.
          </p>
        </div>
      </div>
    </section>
  );
}
