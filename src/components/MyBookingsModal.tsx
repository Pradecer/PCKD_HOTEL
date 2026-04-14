import { useState } from 'react';
import { X, Search, Loader2, Calendar, BedDouble, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Booking } from '../types';

interface MyBookingsModalProps {
  onClose: () => void;
}

function formatDate(dateStr: string) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function MyBookingsModal({ onClose }: MyBookingsModalProps) {
  const [email, setEmail] = useState('');
  const [bookings, setBookings] = useState<(Booking & { rooms: { name: string; image_url: string } })[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);

    const { data } = await supabase
      .from('bookings')
      .select('*, rooms(name, image_url)')
      .eq('guest_email', email.trim().toLowerCase())
      .order('created_at', { ascending: false });

    setBookings((data as (Booking & { rooms: { name: string; image_url: string } })[]) || []);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-3xl overflow-hidden max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-1">My Bookings</h2>
          <p className="text-sm text-gray-500 mb-4">Enter your email address to retrieve your reservations</p>
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              required
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-gray-900 hover:bg-amber-500 text-white px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-colors"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              <span>Search</span>
            </button>
          </form>
        </div>

        <div className="overflow-y-auto flex-1 p-6">
          {!searched && (
            <div className="text-center py-12 text-gray-400">
              <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Search with your email to see bookings</p>
            </div>
          )}

          {searched && !loading && bookings.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-medium text-gray-600">No bookings found</p>
              <p className="text-sm mt-1">No reservations found for {email}</p>
            </div>
          )}

          {bookings.length > 0 && (
            <div className="space-y-4">
              {bookings.map((b) => (
                <div key={b.id} className="flex gap-4 bg-gray-50 rounded-2xl p-4">
                  <img
                    src={b.rooms.image_url}
                    alt={b.rooms.name}
                    className="w-20 h-20 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-gray-900 truncate">{b.rooms.name}</h3>
                      <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0">
                        <CheckCircle className="w-3 h-3" />
                        {b.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-1">
                      <BedDouble className="w-3.5 h-3.5" />
                      <span>{formatDate(b.check_in)} – {formatDate(b.check_out)}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-400">#{b.id.slice(0, 8).toUpperCase()}</span>
                      <span className="font-bold text-gray-900">${b.total_price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
