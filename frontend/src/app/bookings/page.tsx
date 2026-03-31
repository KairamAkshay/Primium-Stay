"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ListingCard from "@/components/ui/ListingCard";
import { useEffect, useState } from "react";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("http://localhost:5001/bookings", {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          setBookings(data.bookings);
        }
      } catch (err) {
        console.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <main className="min-h-screen pt-28 pb-12 flex flex-col">
      <Navbar />
      <div className="container mx-auto px-6 md:px-12 flex-grow">
        <h1 className="text-3xl font-bold mb-8">Trips</h1>
        
        {loading ? (
          <div className="mb-12 animate-pulse">
            <h2 className="text-2xl font-semibold mb-6">Loading reservations...</h2>
          </div>
        ) : (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Upcoming reservations</h2>
            
            {bookings.length === 0 ? (
              <div className="p-8 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-3xl text-center">
                <p className="text-gray-500 mb-4">You have no upcoming trips.</p>
                <button className="bg-black text-white dark:bg-white dark:text-black px-6 py-2 rounded-xl font-medium">
                  Start exploring
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {bookings.map((booking) => {
                  const listing = booking.listing;
                  const imageUrl = listing.images && listing.images.length > 0 
                    ? `http://localhost:5001${listing.images[0]}` 
                    : "https://picsum.photos/seed/guest/800/800";
                    
                  return (
                    <div key={booking._id} className="relative">
                      <div className="absolute top-2 left-2 z-10 bg-white dark:bg-black px-2 py-1 rounded shadow-sm text-xs font-bold text-green-600">
                        CONFIRMED
                      </div>
                      <ListingCard 
                        id={listing._id}
                        image={imageUrl}
                        title={listing.title}
                        location={new Date(booking.checkIn).toLocaleDateString() + ' - ' + new Date(booking.checkOut).toLocaleDateString()}
                        price={listing.price}
                        rating={5.0} // Fallback rating
                        isFavorite={false}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
