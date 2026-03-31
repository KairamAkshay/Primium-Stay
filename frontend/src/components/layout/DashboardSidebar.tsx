"use client";

import Link from "next/link";
import { LayoutDashboard, List, PlusSquare, Inbox, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

export default function DashboardSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/host/dashboard" },
    { name: "My Listings", icon: List, href: "/host/listings" },
    { name: "Create Listing", icon: PlusSquare, href: "/host/create" },
    { name: "Booking Requests", icon: Inbox, href: "/host/requests" },
    { name: "Settings", icon: Settings, href: "/host/settings" },
  ];

  return (
    <aside className="w-64 border-r border-gray-200 dark:border-gray-800 min-h-screen p-6 hidden md:block">
      <h2 className="text-2xl font-bold mb-10 tracking-tight">Host Panel</h2>
      <nav className="space-y-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition duration-200 ${
                isActive
                  ? "bg-black text-white dark:bg-white dark:text-black font-medium"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <item.icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
