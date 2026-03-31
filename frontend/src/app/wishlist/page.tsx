import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ListingCard from "@/components/ui/ListingCard";

export default function WishlistPage() {
  const MOCK_WISHLIST = Array.from({ length: 4 }).map((_, i) => ({
    id: `wishlist-${i}`,
    image: `https://picsum.photos/seed/${i + 300}/800/800`,
    title: "Saved Property",
    location: "Lake Como, Italy",
    price: 850,
    rating: 5.0,
    isFavorite: true, // Always true for wishlist
  }));

  return (
    <main className="min-h-screen pt-28 pb-12 flex flex-col">
      <Navbar />
      <div className="container mx-auto px-6 md:px-12 flex-grow">
        <h1 className="text-3xl font-bold mb-8">Wishlists</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_WISHLIST.map((item) => (
            <ListingCard key={item.id} {...item} />
          ))}
        </div>
      </div>
      <div className="mt-20">
        <Footer />
      </div>
    </main>
  );
}
