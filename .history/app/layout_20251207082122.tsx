// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

import NavBar from "@/components/ui/NavBar";
import WorldEngine from "@/components/world/WorldEngine";
import "./globals.css";

export const metadata = {
  title: "3000 Studios - Shadow PRIME OS",
  description: "Elite AI-Powered Web Experiences. The Future. Built. Alive.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden bg-black text-white selection:bg-gold/40 antialiased">
        {/* Shadow PRIME OS - World Engine */}
        <WorldEngine />
        
        {/* Navigation */}
        <NavBar />
        
        {/* Main Content */}
        <div className="relative z-10">{children}</div>
        
        {/* Footer */}
        <footer className="relative z-10 border-t border-gold/20 bg-black/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 py-12 text-center">
            <p className="text-sapphire/60">
              © 2025 3000 Studios. Powered by Shadow PRIME OS.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

