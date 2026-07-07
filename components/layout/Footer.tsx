import Link from "next/link";
import { SocialIcons } from "./SocialIcons";

export function Footer() {
  return (
    <footer className="bg-secondary text-white py-12 px-6 md:px-12 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-6">Filters</h3>
          <ul className="space-y-3 text-gray-300">
            <li><Link href="#" className="hover:text-white transition-colors">All</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Electronics</Link></li>
          </ul>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-6">About Us</h3>
          <ul className="space-y-3 text-gray-300">
            <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-6">Follow Us</h3>
          <SocialIcons />
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 text-gray-400 text-sm">
        <p>© 2024 American</p>
      </div>
    </footer>
  );
}
