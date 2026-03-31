"use client";

import { UploadCloud } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateListingPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "", description: "", price: "", location: "", guests: "", amenities: "Wifi, Air conditioning", category: "Beachfront"
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // In a real app we'd append files via FormData, here we send json for simplicity assuming backend accepts json
    try {
      const res = await fetch("http://localhost:5001/listings/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
           title: formData.title,
           description: formData.description,
           price: Number(formData.price),
           location: formData.location,
           amenities: formData.amenities,
           category: formData.category
        })
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Error creating listing");
      
      router.push("/host/listings");
    } catch (err: any) {
      setError(err.message);
    }
  };
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-8 tracking-tight">Tell us about your place</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl font-medium">{error}</div>}
        
        {/* Block 1 */}
        <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-soft">
          <h2 className="text-xl font-semibold mb-6">Basic Info</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} type="text" placeholder="e.g. Cozy Beachfront Cottage" className="w-full border border-gray-300 dark:border-gray-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-transparent" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={4} placeholder="Describe the space..." className="w-full border border-gray-300 dark:border-gray-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-transparent" required></textarea>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Price per night</label>
                <input value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} type="number" placeholder="₹0.00" className="w-full border border-gray-300 dark:border-gray-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-transparent" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} type="text" placeholder="City, Country" className="w-full border border-gray-300 dark:border-gray-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-transparent" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Property Category</label>
              <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full border border-gray-300 dark:border-gray-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-transparent" required>
                <option value="Beachfront">🌊 Beachfront</option>
                <option value="Cabins">🪵 Cabins</option>
                <option value="Trending">🔥 Trending</option>
                <option value="Mansions">🏛️ Mansions</option>
                <option value="Amazing pools">🏊‍♂️ Amazing pools</option>
                <option value="Design">📐 Design</option>
                <option value="Lakefront">🛶 Lakefront</option>
                <option value="Castles">🏰 Castles</option>
                <option value="Treehouses">🌲 Treehouses</option>
                <option value="Farms">🚜 Farms</option>
                <option value="Tiny homes">🛖 Tiny homes</option>
              </select>
            </div>
          </div>
        </div>

        {/* Block 2 */}
        <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-soft">
          <h2 className="text-xl font-semibold mb-6">Photos</h2>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-12 flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition">
            <UploadCloud size={48} className="mb-4 text-gray-400" />
            <p className="font-medium text-black dark:text-white mb-1">Drag and drop photos here</p>
            <p className="text-sm">or click to browse</p>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button type="button" onClick={() => router.back()} className="px-8 py-3 rounded-xl font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition border border-gray-300 dark:border-gray-700">Cancel</button>
          <button type="submit" className="px-8 py-3 bg-black text-white dark:bg-white dark:text-black rounded-xl font-medium shadow-lg hover:shadow-xl transition">Publish Listing</button>
        </div>
      </form>
    </div>
  );
}
