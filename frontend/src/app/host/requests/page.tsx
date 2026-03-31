"use client";

import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";

export default function HostRequestsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5001/dashboard", {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success && data.dashboard) {
          setBookings(data.dashboard.bookings);
        }
      } catch (err) {
        // Silently fail if server is down
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <div className="animate-pulse p-8">Loading requests logs...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 tracking-tight">Booking Requests & Log</h1>
      
      <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-3xl shadow-soft overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-[#111111] border-b border-gray-200 dark:border-gray-800 text-sm text-gray-500 uppercase tracking-wider">
              <th className="px-6 py-4 font-semibold">Guest</th>
              <th className="px-6 py-4 font-semibold">Listing</th>
              <th className="px-6 py-4 font-semibold">Dates</th>
              <th className="px-6 py-4 font-semibold text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {bookings.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  You have no bookings to show yet.
                </td>
              </tr>
            )}
            {bookings.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50 dark:hover:bg-[#111111] transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center font-bold text-gray-400 bg-gray-200 dark:bg-gray-800 rounded-full">
                      {item.user?.name ? item.user.name.charAt(0).toUpperCase() : "?"}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{item.user?.name || "Unknown Guest"}</p>
                      <p className="text-gray-500 text-xs text-light">Via PremiumStays</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{item.listing?.title || "Property"}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(item.checkIn).toLocaleDateString(undefined, { month: 'short', day: 'numeric'})} - {new Date(item.checkOut).toLocaleDateString(undefined, { month: 'short', day: 'numeric'})}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex justify-end gap-2">
                    <span className="px-4 py-2 bg-green-50 text-green-700 font-semibold rounded-lg uppercase text-xs flex items-center">
                      {item.status}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
