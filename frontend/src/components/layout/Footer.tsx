export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-[#0a0a0a] border-t border-gray-200 dark:border-gray-800 pt-12 pb-8">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-semibold mb-4 text-sm">Support</h4>
          <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
            <li><a href="#" className="hover:text-black dark:hover:text-white transition">Help Center</a></li>
            <li><a href="#" className="hover:text-black dark:hover:text-white transition">Anti-discrimination</a></li>
            <li><a href="#" className="hover:text-black dark:hover:text-white transition">Disability support</a></li>
            <li><a href="#" className="hover:text-black dark:hover:text-white transition">Cancellation options</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-sm">Hosting</h4>
          <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
            <li><a href="#" className="hover:text-black dark:hover:text-white transition">AirCover for Hosts</a></li>
            <li><a href="#" className="hover:text-black dark:hover:text-white transition">Hosting resources</a></li>
            <li><a href="#" className="hover:text-black dark:hover:text-white transition">Community forum</a></li>
            <li><a href="#" className="hover:text-black dark:hover:text-white transition">Hosting responsibly</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-sm">PremiumStays</h4>
          <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
            <li><a href="#" className="hover:text-black dark:hover:text-white transition">Newsroom</a></li>
            <li><a href="#" className="hover:text-black dark:hover:text-white transition">New features</a></li>
            <li><a href="#" className="hover:text-black dark:hover:text-white transition">Careers</a></li>
            <li><a href="#" className="hover:text-black dark:hover:text-white transition">Investors</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-sm">Legal & Privacy</h4>
          <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
            <li><a href="#" className="hover:text-black dark:hover:text-white transition">Terms of Service</a></li>
            <li><a href="#" className="hover:text-black dark:hover:text-white transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-black dark:hover:text-white transition">Sitemap</a></li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-6 md:px-12 mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
        <p>© 2026 PremiumStays, Inc. All rights reserved.</p>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <span>English (US)</span>
          <span>₹ INR</span>
        </div>
      </div>
    </footer>
  );
}
