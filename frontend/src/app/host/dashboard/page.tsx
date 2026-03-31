"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ totalEarnings: 0, totalBookings: 0, totalListings: 0 });
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5001/dashboard", {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success && data.dashboard) {
          setStats({
            totalEarnings: data.dashboard.totalEarnings || 0,
            totalBookings: data.dashboard.totalBookings || 0,
            totalListings: data.dashboard.totalListings || 0,
          });
          setRecentBookings(data.dashboard.bookings.slice(0, 5)); // Keep recent ones
        }
      } catch (err) {
        // Silently fail if server is down
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <div className="animate-pulse p-8">Loading dashboard...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 tracking-tight">Welcome back, {user?.name || "Host"}</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-soft">
          <p className="text-gray-500 text-sm font-medium mb-2">Total Earnings</p>
          <span className="text-4xl font-semibold">₹{stats.totalEarnings.toLocaleString()}</span>
        </div>
        <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-soft">
          <p className="text-gray-500 text-sm font-medium mb-2">Total Bookings</p>
          <span className="text-4xl font-semibold">{stats.totalBookings}</span>
        </div>
        <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-soft">
          <p className="text-gray-500 text-sm font-medium mb-2">Active Listings</p>
          <span className="text-4xl font-semibold">{stats.totalListings}</span>
        </div>
      </div>

      {/* Requests Preview */}
      <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-soft">
        <h2 className="text-2xl font-semibold mb-6">Recent booking requests</h2>
        <div className="divide-y border border-gray-100 dark:border-gray-900 rounded-xl overflow-hidden">
          {recentBookings.length === 0 ? (
            <p className="p-6 text-gray-500 text-center">No recent bookings at this time.</p>
          ) : (
            recentBookings.map((b) => (
              <div key={b._id} className="p-4 flex justify-between items-center text-sm hover:bg-gray-50 dark:hover:bg-[#111] transition">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center font-bold text-gray-400">
                    {b.user?.name ? b.user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div>
                    <p className="font-semibold text-base">{b.user?.name || "Unknown User"}</p>
                    <p className="text-gray-500">
                      {new Date(b.checkIn).toLocaleDateString(undefined, { month: 'short', day: 'numeric'})} - {new Date(b.checkOut).toLocaleDateString(undefined, { month: 'short', day: 'numeric'})} • {b.listing?.title || "Property"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="px-4 py-2 bg-green-50 text-green-700 font-semibold rounded-lg uppercase text-xs flex items-center">{b.status}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
