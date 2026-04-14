import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { Room, Booking, SearchFilters } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import RoomCard from './components/RoomCard';
import RoomModal from './components/RoomModal';
import BookingForm from './components/BookingForm';
import BookingConfirmation from './components/BookingConfirmation';
import UserPage from './components/UserPage';
import LoginPage from './components/LoginPage';
import AmenitiesSection from './components/AmenitiesSection';
import Footer from './components/Footer';
import { SlidersHorizontal } from 'lucide-react';

type ModalState =
  | { type: 'none' }
  | { type: 'room'; room: Room }
  | { type: 'booking'; room: Room }
  | { type: 'confirmation'; booking: Booking; room: Room }
  | { type: 'myBookings' };

const today = new Date().toISOString().split('T')[0];
const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

function getNights(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return 0;
  return Math.max(0, Math.floor((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000));
}

const typeOptions = ['all', 'standard', 'deluxe', 'suite', 'penthouse'];

const mockRooms: Room[] = [
  {
    id: '1',
    name: 'Standard Room',
    type: 'standard',
    description: 'A cozy standard room with essential amenities for a comfortable stay.',
    price_per_night: 299,
    max_guests: 2,
    amenities: ['Wi-Fi', 'TV', 'Air Conditioning'],
    image_url: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
    size_sqft: 400,
    bed_type: 'Queen',
    available: true,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Deluxe Suite',
    type: 'deluxe',
    description: 'Luxurious deluxe room featuring premium bedding and a beautiful view.',
    price_per_night: 499,
    max_guests: 3,
    amenities: ['Wi-Fi', 'TV', 'Minibar', 'Room Service'],
    image_url: 'https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg',
    size_sqft: 600,
    bed_type: 'King',
    available: true,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Penthouse Suite',
    type: 'penthouse',
    description: 'The ultimate luxury experience with panoramic views and a private terrace.',
    price_per_night: 1299,
    max_guests: 4,
    amenities: ['Wi-Fi', 'Smart TV', 'Private Pool', 'Butler Service', 'Ocean View'],
    image_url: 'https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg',
    size_sqft: 1500,
    bed_type: 'King',
    available: true,
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Ocean View Studio',
    type: 'standard',
    description: 'A spectacular studio offering uninterrupted views of the deep blue ocean.',
    price_per_night: 349,
    max_guests: 2,
    amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Balcony'],
    image_url: 'https://images.pexels.com/photos/2506988/pexels-photo-2506988.jpeg',
    size_sqft: 450,
    bed_type: 'Queen',
    available: true,
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Family Connected Suite',
    type: 'suite',
    description: 'Spacious interconnected rooms perfect for large families on vacation.',
    price_per_night: 699,
    max_guests: 6,
    amenities: ['Wi-Fi', '2 TVs', 'Kitchenette', 'Room Service'],
    image_url: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg',
    size_sqft: 900,
    bed_type: '2 Kings',
    available: true,
    created_at: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Honeymoon Retreat',
    type: 'deluxe',
    description: 'An elegant and romantic retreat featuring a private jacuzzi and champagne service.',
    price_per_night: 899,
    max_guests: 2,
    amenities: ['Wi-Fi', 'Smart TV', 'Jacuzzi', 'Room Service', 'Welcome Champagne'],
    image_url: 'https://images.pexels.com/photos/1329711/pexels-photo-1329711.jpeg',
    size_sqft: 750,
    bed_type: 'King',
    available: true,
    created_at: new Date().toISOString()
  },
  {
    id: '7',
    name: 'Presidential Villa',
    type: 'penthouse',
    description: 'An exclusive multi-story villa reserved for the most elite guests.',
    price_per_night: 2499,
    max_guests: 8,
    amenities: ['Wi-Fi', 'Premium Cinema', 'Private Pool', '24/7 Butler Service', 'Chef Kitchen'],
    image_url: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
    size_sqft: 3500,
    bed_type: '4 Kings',
    available: true,
    created_at: new Date().toISOString()
  },
  {
    id: '8',
    name: 'Business Executive Room',
    type: 'standard',
    description: 'Optimized for productivity with a dedicated workspace and high-speed fiber internet.',
    price_per_night: 279,
    max_guests: 2,
    amenities: ['Fiber Wi-Fi', 'Smart TV', 'Ergonomic Desk', 'Coffee Machine'],
    image_url: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg',
    size_sqft: 380,
    bed_type: 'Queen',
    available: true,
    created_at: new Date().toISOString()
  },
  {
    id: '9',
    name: 'Grand Royal Suite',
    type: 'suite',
    description: 'Majestic interior design blended with modern luxury appliances and vast seating area.',
    price_per_night: 1099,
    max_guests: 4,
    amenities: ['Wi-Fi', 'Smart TV', 'Lounge Area', 'Mini Bar', 'Premium Bath'],
    image_url: 'https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg',
    size_sqft: 1200,
    bed_type: 'King',
    available: true,
    created_at: new Date().toISOString()
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'user'>('home');
  const [currentUser, setCurrentUser] = useState<string | null>(localStorage.getItem('currentUser'));
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<ModalState>({ type: 'none' });
  const [filters, setFilters] = useState<SearchFilters>({
    location: 'Malibu',
    countryIsoCode: 'US',
    currencyCode: 'USD',
    checkIn: today,
    checkOut: tomorrow,
    guests: 2,
    type: 'all',
  });

  useEffect(() => {
    async function fetchRooms() {
      try {
        const { data } = await supabase
          .from('rooms')
          .select('*')
          .order('price_per_night');
        setRooms(data && data.length > 0 ? (data as Room[]) : mockRooms);
      } catch (err) {
        console.error("Supabase connection error:", err);
        setRooms(mockRooms);
      } finally {
        setLoading(false);
      }
    }
    fetchRooms();
  }, []);

  const getCurrencySymbol = (currencyCode: string) => {
    try {
      const format = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
      const parts = format.formatToParts(0);
      const symbolPart = parts.find(part => part.type === 'currency');
      return symbolPart ? symbolPart.value : currencyCode;
    } catch (e) {
      return '$';
    }
  };

  const currency = filters.currencyCode ? getCurrencySymbol(filters.currencyCode) : '$';
  const locCity = filters.location;

  const filteredRooms = rooms.filter((r) => {
    if (filters.type !== 'all' && r.type !== filters.type) return false;
    if (r.max_guests < filters.guests) return false;
    return true;
  }).map(r => ({
    ...r,
    name: locCity ? `${locCity} ${r.name}` : r.name
  }));

  const nights = getNights(filters.checkIn, filters.checkOut);

  const handleBookingSuccess = async (bookingId: string, bookingData?: any) => {
    const room = modal.type === 'booking' ? modal.room : null;
    if (!room) return;

    if (bookingId.startsWith('mock-') && bookingData) {
      const newBooking = {
          id: bookingId,
          room_id: room.id,
          guest_name: bookingData.guest_name,
          guest_email: bookingData.guest_email,
          guest_phone: bookingData.guest_phone,
          check_in: bookingData.check_in,
          check_out: bookingData.check_out,
          guests: bookingData.guests,
          total_price: room.price_per_night * getNights(bookingData.check_in, bookingData.check_out),
          status: 'confirmed',
          special_requests: bookingData.special_requests,
          created_at: new Date().toISOString(),
          rooms: { name: room.name, image_url: room.image_url }
      };

      const existing = JSON.parse(localStorage.getItem('mockBookings') || '[]');
      localStorage.setItem('mockBookings', JSON.stringify([...existing, newBooking]));

      setModal({
        type: 'confirmation',
        booking: newBooking as unknown as Booking,
        room
      });
      return;
    }

    const { data } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', bookingId)
      .maybeSingle();

    if (data) {
      setModal({ type: 'confirmation', booking: data as Booking, room });
    }
  };

  if (!currentUser) {
    return (
      <LoginPage
        onLoginSuccess={(email) => {
          localStorage.setItem('currentUser', email);
          setCurrentUser(email);
          setCurrentPage('home');
        }}
      />
    );
  }

  if (currentPage === 'user') {
    return (
      <UserPage
        onBack={() => setCurrentPage('home')}
        onSignOut={() => {
          localStorage.removeItem('currentUser');
          setCurrentUser(null);
          setCurrentPage('home');
        }}
        currency={currency}
        currentUserEmail={currentUser}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header onViewBookings={() => setCurrentPage('user')} />

      <Hero filters={filters} onFilterChange={setFilters} />

      <section id="rooms" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-amber-600 text-sm font-medium uppercase tracking-widest mb-2">Our Accommodations</p>
              <h2 className="text-4xl font-bold text-gray-900">Rooms & Suites</h2>
              {nights > 0 && (
                <p className="text-gray-500 mt-2">
                  {filteredRooms.length} room{filteredRooms.length !== 1 ? 's' : ''} available
                  {' · '}{nights} night{nights !== 1 ? 's' : ''}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <SlidersHorizontal className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-500 mr-1">Filter:</span>
              {typeOptions.map((t) => (
                <button
                  key={t}
                  onClick={() => setFilters((f) => ({ ...f, type: t }))}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                    filters.type === t
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {t === 'all' ? 'All' : t}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-2xl h-80 animate-pulse" />
              ))}
            </div>
          ) : filteredRooms.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl font-bold text-gray-900 mb-2">No rooms found</p>
              <p className="text-gray-500">Try adjusting your filters or guest count.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  nights={nights}
                  currency={currency}
                  onSelect={(r) => setModal({ type: 'room', room: r })}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <AmenitiesSection />
      <Footer />

      {modal.type === 'room' && (
        <RoomModal
          room={modal.room}
          nights={nights}
          currency={currency}
          onClose={() => setModal({ type: 'none' })}
          onBook={() => setModal({ type: 'booking', room: modal.room })}
        />
      )}

      {modal.type === 'booking' && (
        <BookingForm
          room={modal.room}
          initialCheckIn={filters.checkIn}
          initialCheckOut={filters.checkOut}
          initialGuests={filters.guests}
          currency={currency}
          currentUserEmail={currentUser}
          onClose={() => setModal({ type: 'none' })}
          onSuccess={handleBookingSuccess}
        />
      )}

      {modal.type === 'confirmation' && (
        <BookingConfirmation
          booking={modal.booking}
          room={modal.room}
          currency={currency}
          onClose={() => setModal({ type: 'none' })}
        />
      )}

    </div>
  );
}
