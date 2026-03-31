"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface BookingCardProps {
  listingId: string;
  price: number;
  rating: number;
  reviews: number;
}

export default function BookingCard({ listingId, price, rating, reviews }: BookingCardProps) {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [reservedDates, setReservedDates] = useState<any[]>([]);

  useEffect(() => {
    const fetchReservedDates = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:5001/listings/${listingId}/reserved-dates`, {
          credentials: "include"
        });
        const data = await res.json();
        if (data.success) {
          setReservedDates(data.reservedDates);
        }
      } catch (err) {
        // Silently swallow fetch errors so Next.js doesn't pop an overlay
      }
    };
    if (listingId) fetchReservedDates();
  }, [listingId]);

  useEffect(() => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const days = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
      if (days > 0) {
        setTotalPrice(days * price);
        setError("");
      } else {
        setTotalPrice(0);
        setError("Check-out must be after Check-in");
      }
    } else {
      setTotalPrice(0);
    }
  }, [checkIn, checkOut, price]);

  const handleReserve = async () => {
    if (!checkIn || !checkOut) {
      setError("Please select dates first.");
      return;
    }
    if (totalPrice === 0) return; // Invalid dates

    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://127.0.0.1:5001/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Essential for auth session!
        body: JSON.stringify({ listingId, checkIn, checkOut })
      });
      const data = await res.json();
      
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to reserve property.");
      }

      // Success!
      router.push("/bookings");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-soft sticky top-28"
    >
      <div className="flex justify-between items-baseline mb-6">
        <div>
          <span className="text-2xl font-bold">₹{price}</span>
          <span className="text-gray-500 font-medium">/night</span>
        </div>
        <div className="flex items-center gap-1 font-semibold text-sm underline cursor-pointer">
          <Star size={14} className="fill-black dark:fill-white text-black dark:text-white" />
          <span>{rating}</span>
          <span className="text-gray-400">({reviews} reviews)</span>
        </div>
      </div>

      {error && <div className="mb-4 text-sm text-red-500 font-medium bg-red-50 p-2 rounded-xl text-center">{error}</div>}

      <div className="border border-gray-300 dark:border-gray-700 rounded-2xl mb-4 overflow-hidden divide-y divide-gray-300 dark:divide-gray-700">
        <div className="flex divide-x divide-gray-300 dark:divide-gray-700 h-14">
          <div className="w-1/2 p-3 text-xs font-bold uppercase tracking-wider flex flex-col justify-center bg-transparent">
            <label className="text-gray-400 mb-1">Check-in</label>
            <input 
              type="date" 
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="bg-transparent focus:outline-none w-full cursor-pointer text-gray-900 dark:text-white"
            />
          </div>
          <div className="w-1/2 p-3 text-xs font-bold uppercase tracking-wider flex flex-col justify-center bg-transparent">
            <label className="text-gray-400 mb-1">Checkout</label>
            <input 
              type="date" 
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="bg-transparent focus:outline-none w-full cursor-pointer text-gray-900 dark:text-white"
            />
          </div>
        </div>
        <div className="h-14 p-3 text-xs font-bold uppercase tracking-wider flex flex-col justify-center hover:bg-gray-50 dark:hover:bg-gray-900 transition cursor-pointer">
          <label className="text-gray-400 flex justify-between w-full">
            <span>Guests</span>
          </label>
          <span>1 guest</span>
        </div>
      </div>

      {reservedDates.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Reserved Dates</p>
          <div className="space-y-2">
            {reservedDates.map((rd, i) => (
              <div 
                key={i} 
                className={`text-sm px-3 py-2 rounded-xl flex items-center gap-2 ${rd.isCurrentUser ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}
              >
                <div className={`w-2 h-2 rounded-full ${rd.isCurrentUser ? 'bg-green-500' : 'bg-red-500'}`} />
                {rd.isCurrentUser ? 'Your Reservation:' : 'Unavailable:'} 
                <span className="font-medium ml-1">
                  {new Date(rd.checkIn).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} - {new Date(rd.checkOut).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {totalPrice > 0 && !error && (
        <div className="flex justify-between items-center py-4 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-800 mb-4">
          <span>₹{price} x {totalPrice / price} nights</span>
          <span className="font-semibold text-black dark:text-white">₹{totalPrice}</span>
        </div>
      )}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleReserve}
        disabled={loading}
        className="w-full bg-black text-white dark:bg-white dark:text-black py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transition duration-200 disabled:opacity-50"
      >
        {loading ? "Confirming..." : "Reserve"}
      </motion.button>
      <p className="text-center text-sm text-gray-500 mt-4">You won't be charged yet</p>
    </motion.div>
  );
}
