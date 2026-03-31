"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Globe } from "lucide-react";

export default function WelcomeOverlay() {
  const [show, setShow] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Check if we already showed it this session
    if (sessionStorage.getItem("welcomeShown")) {
      setShow(false);
    }
  }, []);

  const handleEnter = () => {
    sessionStorage.setItem("welcomeShown", "true");
    setShow(false);
  };

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100vh", opacity: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-black text-white"
        >
          {/* Background image */}
          <motion.img
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.5 }}
            transition={{ duration: 2, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop"
            alt="Welcome Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="mb-6 inline-flex items-center justify-center p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                 <Globe size={24} className="text-white" />
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
                Welcome to <br /> PremiumStays.
              </h1>
              
              <p className="text-lg md:text-2xl text-gray-300 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
                Discover spectacular luxury homes and world-class retreats designed for unforgettable experiences.
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEnter}
                className="group relative inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold text-lg overflow-hidden transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)]"
              >
                Start Exploring
                <motion.div 
                  className="bg-black text-white rounded-full p-1"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <ArrowRight size={18} />
                </motion.div>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
