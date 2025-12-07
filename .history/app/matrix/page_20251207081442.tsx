/**
 * THE MATRIX - Master Control Page
 * God-mode admin interface for 3000Studios.com
 */

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import VoiceEditor from "@/components/matrix/VoiceEditor";
import AnalyticsPanel from "@/components/matrix/AnalyticsPanel";
import LiveVisitors from "@/components/matrix/LiveVisitors";
import SystemHealth from "@/components/matrix/SystemHealth";
import QuickActions from "@/components/matrix/QuickActions";
import MatrixLog from "@/components/matrix/MatrixLog";

export default async function MatrixPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("matrix-session");

  if (session?.value !== "active") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-black text-white p-10 pb-32">
      <div className="max-w-[1800px] mx-auto">
        
        <h1 className="text-7xl font-black text-center mb-4 bg-gradient-to-r from-gold via-sapphire to-gold bg-clip-text text-transparent drop-shadow-2xl animate-pulse">
          THE MATRIX
        </h1>
        
        <p className="text-center text-sapphire/60 text-xl mb-16">
          Shadow PRIME OS — Command Center
        </p>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
          
          {/* COLUMN 1 - Voice & Quick Actions */}
          <div className="space-y-12">
            <VoiceEditor />
            <QuickActions />
          </div>

          {/* COLUMN 2 - Analytics & Health */}
          <div className="space-y-12">
            <AnalyticsPanel />
            <SystemHealth />
          </div>

          {/* COLUMN 3 - Live Activity */}
          <div className="space-y-12">
            <LiveVisitors />
          </div>
        </div>

        {/* Full-width event log */}
        <div className="mt-16">
          <MatrixLog />
        </div>
      </div>
    </div>
  );
}
