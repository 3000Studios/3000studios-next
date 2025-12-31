import Link from "next/link";

export const metadata = {
  title: "Admin",
};

export default function AdminPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-red-400 mb-8">Admin Panel</h1>
      <p className="text-gray-300 mb-6">Select a section from the navigation above or choose below:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/admin/dashboard" className="block bg-red-950/30 border border-red-500/20 rounded-xl p-6 hover:bg-red-950/50 transition-colors">
          <h3 className="text-xl font-bold text-red-300">Dashboard</h3>
        </Link>
        <Link href="/admin/revenue" className="block bg-red-950/30 border border-red-500/20 rounded-xl p-6 hover:bg-red-950/50 transition-colors">
          <h3 className="text-xl font-bold text-red-300">Revenue</h3>
        </Link>
        <Link href="/admin/content" className="block bg-red-950/30 border border-red-500/20 rounded-xl p-6 hover:bg-red-950/50 transition-colors">
          <h3 className="text-xl font-bold text-red-300">Content</h3>
        </Link>
        <Link href="/admin/settings" className="block bg-red-950/30 border border-red-500/20 rounded-xl p-6 hover:bg-red-950/50 transition-colors">
          <h3 className="text-xl font-bold text-red-300">Settings</h3>
        </Link>
      </div>
    </div>
  );
}
