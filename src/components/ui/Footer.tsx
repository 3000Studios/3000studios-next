import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-void py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 font-sans tracking-widest uppercase">
            <p>© 2024 3000 STUDIOS.</p>
            <div className="flex gap-8 mt-4 md:mt-0">
                <Link href="#" className="hover:text-hologram transition-colors">Twitter</Link>
                <Link href="#" className="hover:text-hologram transition-colors">LinkedIn</Link>
                <Link href="#" className="hover:text-hologram transition-colors">Instagram</Link>
            </div>
        </div>
    </footer>
  );
};
