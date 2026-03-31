"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface ImageCarouselProps {
  images: string[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[21/9] overflow-hidden rounded-3xl group bg-gray-100 dark:bg-gray-900">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          src={images[index]}
          alt={`Gallery image ${index + 1}`}
          className="w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition duration-300">
        <button
          onClick={prevSlide}
          className="bg-white/80 dark:bg-black/80 backdrop-blur text-black dark:text-white p-2 rounded-full hover:scale-110 shadow-soft transition"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="bg-white/80 dark:bg-black/80 backdrop-blur text-black dark:text-white p-2 rounded-full hover:scale-110 shadow-soft transition"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === index ? "bg-white scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
