import "./globals.css";

export const metadata = {
  title: "3000 Studios",
  description: "Premium AI systems built for scale"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="page">
        {children}
      </body>
    </html>
  );
}
