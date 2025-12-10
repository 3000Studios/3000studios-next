/**
 * Root Layout Component
 * Main layout wrapper for the entire application
 * Includes: Global metadata, navigation, footer, and common UI elements
 * This layout wraps all pages in the application
 */

import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "3000 Studios - Professional Creative Studio",
  description: "Cutting-edge digital experiences, creative projects, and innovative solutions",
  keywords: "creative studio, digital agency, web development, design, innovation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

