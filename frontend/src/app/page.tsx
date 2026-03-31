import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FiltersBar from "@/components/ui/FiltersBar";
import ListingCard from "@/components/ui/ListingCard";
import WelcomeOverlay from "@/components/ui/WelcomeOverlay";

// Fetch from backend, passing category if available
async function fetchListings(category?: string) {
  try {
    const url = category ? `http://127.0.0.1:5001/listings?category=${encodeURIComponent(category)}` : "http://127.0.0.1:5001/listings";
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return [];
    const json = await res.json();
    return json.success ? json.listings : [];
  } catch (err) {
    console.error("Fetch DB error:", err);
    return [];
  }
}

export default async function Home({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const resolvedParams = await searchParams;
  const listings = await fetchListings(resolvedParams.category);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <WelcomeOverlay />
      <main className="flex-grow pt-28 pb-16 container mx-auto px-6 md:px-12 lg:px-24">
        <FiltersBar />
        
        {/* Listing Grid */}
        {listings.length === 0 ? (
          <div className="text-center py-32">
             <h2 className="text-2xl font-bold mb-4">No properties found.</h2>
             <p className="text-gray-500">Make sure your MongoDB backend is connected and try creating a listing first!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
            {listings.map((listing: any) => (
              <ListingCard 
                key={listing._id} 
                id={listing._id}
                image={listing.images && listing.images.length > 0 ? `http://127.0.0.1:5001${listing.images[0]}` : "https://picsum.photos/seed/placeholder/800/800"}
                title={listing.title}
                location={listing.location}
                price={listing.price}
                rating={4.8}
              />
            ))}
          </div>
        )}

      {/* Show more button */}
      <div className="flex justify-center mt-12 mb-20 gap-4">
        {listings.length > 0 && (
          <button className="bg-black text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-900 transition shadow-lg hover:shadow-xl">
            Show more
          </button>
        )}
      </div>

      <Footer />
      </main>
    </div>
  );
}
