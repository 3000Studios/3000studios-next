import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "3000 Studios",
  description: "3000 Studios - Creative Production Studio",
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
