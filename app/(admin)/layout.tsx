import Navigation from '@/app/components/Navigation'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
}
