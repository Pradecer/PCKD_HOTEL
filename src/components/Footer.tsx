import { Hotel, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-amber-500 rounded-lg flex items-center justify-center">
                <Hotel className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-white font-bold text-lg leading-none">PCKD</span>
                <span className="text-amber-400 text-xs block leading-none tracking-widest uppercase">Grand Hotel</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              A sanctuary of elegance perched above the Pacific coast. Forbes Five-Star, family owned since 1962.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest text-gray-400 mb-4">Hotel</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#rooms" className="hover:text-white transition-colors">Rooms & Suites</a></li>
              <li><a href="#amenities" className="hover:text-white transition-colors">Dining</a></li>
              <li><a href="#amenities" className="hover:text-white transition-colors">Spa & Wellness</a></li>
              <li><a href="#amenities" className="hover:text-white transition-colors">Events</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest text-gray-400 mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" />
                <span>+1 (800) 555-0190</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                <span>reservations@pckd.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                <span>1 Coastal Drive, Malibu, CA 90265</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          <span>© {new Date().getFullYear()} PCKD Grand Hotel. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
