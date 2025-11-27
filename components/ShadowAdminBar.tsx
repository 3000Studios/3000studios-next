"use client";
export default function ShadowAdminBar() {
  return (
    <div className="fixed top-0 left-0 w-full bg-black/70 text-white p-2 text-center z-[9999] backdrop-blur-md border-b border-white/20">
      <div className="flex gap-4 justify-center text-sm">
        <a href="/dashboard" className="hover:text-cyan-400">Dashboard</a>
        <a href="/shadow" className="hover:text-cyan-400">Shadow Control</a>
        <a href="/projects" className="hover:text-cyan-400">Projects</a>
        <a href="/experience" className="hover:text-cyan-400">Experience</a>
      </div>
    </div>
  );
}
