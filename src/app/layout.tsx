import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "3000 Studios - Digital Art & Creative Innovation",
  description: "Explore digital art, code snippets, live wallpapers, and creative designs at 3000 Studios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
