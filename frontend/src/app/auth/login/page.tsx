"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Lock, Sparkles } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to login");
      }

      setUser(data.user);
      router.push(data.user.role === "provider" ? "/host/dashboard" : "/");
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex text-[var(--foreground)] bg-white dark:bg-[#0a0a0a]">
      {/* Left Panel - Image Cover */}
      <div className="hidden lg:flex lg:w-3/5 relative overflow-hidden bg-black">
        <motion.img 
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2640&auto=format&fit=crop" 
          alt="Luxury living room"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute bottom-16 left-16 z-10 w-full max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2 w-fit rounded-full mb-6">
              <span className="flex items-center gap-2 text-white text-xs font-semibold px-4 tracking-wider uppercase">
                <Sparkles size={14} /> Premium Experiences
              </span>
            </div>
            <h1 className="text-5xl font-bold text-white leading-tight mb-4 tracking-tight">
              Unlock extraordinary stays.
            </h1>
            <p className="text-gray-300 text-lg font-light leading-relaxed">
              Log in to uncover a curated collection of the world's most spectacular homes, villas, and retreats.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-2/5 flex flex-col relative bg-white dark:bg-[#0a0a0a]">
        {/* Back Button */}
        <div className="absolute top-8 left-8 sm:left-12">
          <Link href="/">
            <button className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-50 dark:bg-[#111] hover:bg-gray-100 dark:hover:bg-[#222] transition-colors border border-gray-100 dark:border-gray-800 text-black dark:text-white">
              <ArrowLeft size={20} />
            </button>
          </Link>
        </div>

        <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 md:px-24 w-full max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-4xl font-extrabold tracking-tight mb-3 text-black dark:text-white">Welcome back.</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-10 text-lg font-light">
              Enter your credentials to access your account.
            </p>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/50 p-4 rounded-2xl mb-6 text-sm font-medium flex items-center gap-3"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2 relative group">
                <label className="text-sm font-semibold text-gray-900 dark:text-gray-100 pl-1">Email Address</label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-4 text-gray-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" size={20} />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-[#111] border border-transparent focus:border-gray-300 dark:focus:border-gray-700 focus:bg-white dark:focus:bg-[#151515] rounded-2xl outline-none transition-all placeholder:text-gray-400 text-black dark:text-white text-base" 
                    required 
                  />
                </div>
              </div>

              <div className="space-y-2 relative group">
                <div className="flex justify-between items-center pl-1">
                  <label className="text-sm font-semibold text-gray-900 dark:text-gray-100">Password</label>
                  <Link href="#" className="text-xs font-semibold text-gray-500 hover:text-black dark:hover:text-white transition-colors">Forgot password?</Link>
                </div>
                <div className="relative flex items-center">
                  <Lock className="absolute left-4 text-gray-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" size={20} />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-[#111] border border-transparent focus:border-gray-300 dark:focus:border-gray-700 focus:bg-white dark:focus:bg-[#151515] rounded-2xl outline-none transition-all placeholder:text-gray-400 text-black dark:text-white text-base tracking-widest" 
                    required 
                  />
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                disabled={isLoading}
                className="w-full relative mt-4 py-4 rounded-2xl font-bold bg-black text-white dark:bg-white dark:text-black tracking-wide overflow-hidden transition shadow-[0_8px_30px_rgb(0,0,0,0.12)] disabled:opacity-70 flex justify-center items-center h-14"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 dark:border-black/30 border-t-white dark:border-t-black rounded-full animate-spin" />
                ) : (
                  "Log In"
                )}
              </motion.button>
            </form>

            <div className="mt-10 text-center flex items-center justify-center gap-2">
              <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">New to PremiumStays?</span>
              <Link href="/auth/register" className="text-black dark:text-white font-bold text-sm hover:underline decoration-2 underline-offset-4">
                Create an account
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
