import { ReactNode } from "react";
import AdminNav from "../ui/AdminNav";

export const metadata = {
  title: "Admin Panel",
  description: "3000 Studios Administration",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AdminNav />
      <div className="pt-16 min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950">
        {children}
      </div>
    </>
  );
}
