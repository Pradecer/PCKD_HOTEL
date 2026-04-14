import { Hotel, Phone, MapPin } from 'lucide-react';

interface HeaderProps {
  onViewBookings: () => void;
}

export default function Header({ onViewBookings }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-amber-500 rounded-lg flex items-center justify-center">
                <Hotel className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-white font-bold text-lg leading-none">PCKD</span>
                <span className="text-amber-400 text-xs block leading-none tracking-widest uppercase">Grand Hotel</span>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#rooms" className="text-white/80 hover:text-white text-sm font-medium transition-colors">Rooms</a>
              <a href="#amenities" className="text-white/80 hover:text-white text-sm font-medium transition-colors">Amenities</a>
              <a href="#contact" className="text-white/80 hover:text-white text-sm font-medium transition-colors">Contact</a>
            </nav>

            <div className="flex items-center gap-3">
              <div className="hidden lg:flex items-center gap-1.5 text-white/70 text-sm">
                <Phone className="w-3.5 h-3.5" />
                <span>+1 (800) 555-0190</span>
              </div>
              <button
                onClick={onViewBookings}
                className="bg-amber-500 hover:bg-amber-400 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                My Bookings
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
