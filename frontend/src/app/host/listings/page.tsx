"use client";

import { useEffect, useState } from "react";
import ListingCard from "@/components/ui/ListingCard";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function MyListingsPage() {
  const [listings, setListings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMyListings() {
      try {
        const res = await fetch("http://localhost:5001/dashboard", {
          credentials: "include"
        });
        const data = await res.json();
        
        if (res.ok && data.success) {
          setListings(data.dashboard.listings || []);
        } else {
          // If unauthorized or error
          if (res.status === 401 || res.status === 403) {
             setError("You need to be logged in as a Host to view this page.");
          } else {
             setError(data.message || "Failed to load listings");
          }
        }
      } catch (err: any) {
        setError("Error connecting to server. Is the backend running?");
      } finally {
        setIsLoading(false);
      }
    }
    fetchMyListings();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-8 tracking-tight">
        <h1 className="text-3xl font-bold">My Listed Stays</h1>
        <Link href="/host/create">
          <button className="flex items-center gap-2 px-6 py-3 bg-black text-white dark:bg-white dark:text-black rounded-xl font-bold shadow-md hover:shadow-lg transition hover:-translate-y-0.5">
            <Plus size={18} /> Create New
          </button>
        </Link>
      </div>

      <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-soft min-h-[500px]">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
             <div className="w-8 h-8 border-4 border-gray-200 dark:border-gray-800 border-t-black dark:border-t-white rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-20 font-medium">
            {error}
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center py-24 px-4 flex flex-col items-center">
             <div className="w-20 h-20 bg-gray-50 dark:bg-[#111] rounded-full flex items-center justify-center mb-4">
               <Plus size={32} className="text-gray-400" />
             </div>
             <h3 className="text-xl font-bold mb-2">No listings yet!</h3>
             <p className="text-gray-500 max-w-sm mb-6">Looks like you haven't uploaded any properties. Become a host and start earning today.</p>
             <Link href="/host/create">
                <button className="px-6 py-3 bg-black text-white dark:bg-white dark:text-black rounded-xl font-semibold shadow hover:scale-105 transition">Create your first listing</button>
             </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {listings.map((listing: any) => (
              <div key={listing._id} className="relative group">
                <ListingCard 
                  id={listing._id}
                  image={listing.images && listing.images.length > 0 ? `http://localhost:5001${listing.images[0]}` : "https://picsum.photos/seed/placeholder/800/800"}
                  title={listing.title}
                  location={listing.location}
                  price={listing.price}
                  rating={4.9}
                />
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/90 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide backdrop-blur-sm z-10 hidden group-hover:block transition shadow-soft cursor-pointer">
                  Manage Listing
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
