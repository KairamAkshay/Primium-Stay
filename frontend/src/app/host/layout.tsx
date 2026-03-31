import DashboardSidebar from "@/components/layout/DashboardSidebar";
import Link from "next/link";
import { User } from "lucide-react";

export default function HostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        {/* Simple top bar for dashboard */}
        <header className="h-20 border-b border-gray-200 dark:border-gray-800 flex items-center justify-end px-10">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:underline">
              Switch to guest
            </Link>
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
              <User size={20} />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-10 flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
