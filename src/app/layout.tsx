import "./globals.css";
import MobileNav from "@/components/ui/MobileNav";

export const metadata = {
  title: "3000 Studios",
  description: "Premium AI systems built for scale and automation",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="page">
        <MobileNav />
        {children}
      </body>
    </html>
  );
}
