import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ImageCarousel from "@/components/ui/ImageCarousel";
import BookingCard from "@/components/ui/BookingCard";
import { Share, Heart, MapPin, Wifi, Car, Tv, Wind } from "lucide-react";
import { notFound } from "next/navigation";

async function getListing(id: string) {
  try {
    const res = await fetch(`http://127.0.0.1:5001/listings/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    const json = await res.json();
    return json.listing;
  } catch (err) {
    return null;
  }
}

export default async function RoomDetails({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const listing = await getListing(resolvedParams.id);

  if (!listing) {
    return notFound();
  }

  const images = listing.images && listing.images.length > 0 
    ? listing.images.map((img: string) => `http://localhost:5001${img}`)
    : ["https://picsum.photos/seed/100/1200/800", "https://picsum.photos/seed/101/1200/800"];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-16 container mx-auto px-6 md:px-12 lg:px-24">
        {/* Header */}
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
              {listing.title}
            </h1>
            <div className="flex items-center gap-2 text-sm font-medium">
              <span className="underline cursor-pointer">{listing.location}</span>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-xl transition">
              <Share size={18} />
              <span className="underline text-sm font-medium">Share</span>
            </button>
            <button className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-xl transition">
              <Heart size={18} />
              <span className="underline text-sm font-medium">Save</span>
            </button>
          </div>
        </div>

        {/* Gallery */}
        <div className="mb-10 w-full overflow-hidden rounded-3xl">
          <ImageCarousel images={images} />
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12">
          {/* Main Info */}
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">
                Entire home hosted by {listing.provider ? listing.provider.name : "Unknown"}
              </h2>
            </div>

            <hr className="border-gray-200 my-8" />

            <div className="mb-8">
              <div className="flex gap-4 mb-6">
                <MapPin size={24} className="mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Great location</h3>
                  <p className="text-gray-500 font-light">100% of recent guests gave the location a 5-star rating.</p>
                </div>
              </div>
            </div>

            <hr className="border-gray-200 my-8" />

            {/* Description */}
            <div className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">About this space</h2>
              <p className="text-gray-600 font-light leading-relaxed whitespace-pre-wrap">
                {listing.description}
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="mb-10">
              <h2 className="text-2xl font-semibold mb-6">What this place offers</h2>
              <div className="grid grid-cols-2 gap-4">
                {listing.amenities && listing.amenities.map((amenity: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-4 text-gray-700 font-light capitalize">
                    <div className="w-2 h-2 bg-gray-400 rounded-full" /> {amenity}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Booking Widget */}
          <div className="relative">
            <BookingCard listingId={listing._id} price={listing.price} rating={4.95} reviews={24} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
