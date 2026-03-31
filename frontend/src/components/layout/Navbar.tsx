"use client";

import Link from "next/link";
import { Search, User, Menu, Globe, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "glass shadow-soft py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black font-bold text-xl"
          >
            A
          </motion.div>
          <span className="text-xl font-bold tracking-tight hidden md:block">
            PremiumStays
          </span>
        </Link>

        {/* Center Search Bar (Simplified) */}
        <div className="hidden md:flex items-center gap-3 border border-gray-200 dark:border-gray-800 rounded-full px-4 py-2 hover:shadow-soft transition shadow-sm bg-white dark:bg-black cursor-pointer">
          <span className="text-sm font-medium px-2">Anywhere</span>
          <span className="w-px h-6 bg-gray-200 dark:bg-gray-800"></span>
          <span className="text-sm font-medium px-2">Any week</span>
          <span className="w-px h-6 bg-gray-200 dark:bg-gray-800"></span>
          <span className="text-sm font-light text-gray-500 px-2">Add guests</span>
          <div className="bg-black dark:bg-white p-2 rounded-full text-white dark:text-black">
            <Search size={16} strokeWidth={3} />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition">
            <Globe size={18} />
          </button>
          
          {/* User Menu */}
          <div className="relative">
            <div 
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 border border-gray-200 dark:border-gray-800 rounded-full px-3 py-2 hover:shadow-soft transition cursor-pointer bg-white dark:bg-black"
            >
              <Menu size={18} />
              <div className="bg-gray-500 text-white rounded-full p-1 overflow-hidden h-7 w-7 flex items-center justify-center font-bold text-xs uppercase">
                {user ? user.name.charAt(0) : <User size={16} />}
              </div>
            </div>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute right-0 top-14 w-60 bg-white dark:bg-[#111] rounded-2xl shadow-glass overflow-hidden border border-gray-100 dark:border-gray-800"
                >
                  <div className="py-2 flex flex-col">
                    {user ? (
                      <>
                        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                          <p className="font-semibold text-sm">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                        <Link href="/bookings" className="px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-900 font-medium">Trips</Link>
                        <Link href="/wishlist" className="px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-900 font-medium">Wishlists</Link>
                        {user.role === "provider" && (
                          <Link href="/host/dashboard" className="px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-900 font-medium border-t border-gray-100 dark:border-gray-800">Host Dashboard</Link>
                        )}
                        <button onClick={logout} className="px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-900 text-left font-medium text-red-500 border-t border-gray-100 dark:border-gray-800 flex items-center gap-2">
                          <LogOut size={16} /> Log out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link href="/auth/register" className="px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-900 font-semibold">Sign up</Link>
                        <Link href="/auth/login" className="px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-900 font-medium">Log in</Link>
                        <div className="border-t border-gray-100 dark:border-gray-800 my-1" />
                        <Link href="/auth/register" className="px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-900 font-medium">Gift cards</Link>
                        <Link href="/auth/register" className="px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-900 font-medium">Help Center</Link>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
