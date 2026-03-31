"use client";

import { motion } from "framer-motion";
import { Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ListingCardProps {
  id: string;
  image: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  isFavorite?: boolean;
}

export default function ListingCard({
  id,
  image,
  title,
  location,
  price,
  rating,
  isFavorite = false,
}: ListingCardProps) {
  return (
    <Link href={`/rooms/${id}`} className="group cursor-pointer block">
      <div className="relative aspect-square overflow-hidden rounded-3xl mb-4 bg-gray-200 dark:bg-gray-800">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <button className="absolute top-4 right-4 p-2 z-10 hover:scale-110 transition">
          <Heart
            className={`w-6 h-6 ${isFavorite ? "fill-red-500 text-red-500" : "text-white stroke-[2px]"}`}
          />
        </button>
      </div>

      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg hover:underline decoration-2 underline-offset-4">{location}</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{title}</p>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="font-semibold text-base">₹{price}</span>
            <span className="text-gray-500 text-sm">night</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-sm font-medium">
          <Star className="fill-black dark:fill-white text-black dark:text-white w-4 h-4" />
          <span>{rating.toFixed(2)}</span>
        </div>
      </div>
    </Link>
  );
}
