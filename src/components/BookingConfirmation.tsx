import { CheckCircle, Calendar, Home, Mail } from 'lucide-react';
import { Room, Booking } from '../types';

interface BookingConfirmationProps {
  booking: Booking;
  room: Room;
  currency: string;
  onClose: () => void;
}

function formatDate(dateStr: string) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function getNights(checkIn: string, checkOut: string) {
  return Math.floor(
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)
  );
}

export default function BookingConfirmation({ booking, room, currency, onClose }: BookingConfirmationProps) {
  const nights = getNights(booking.check_in, booking.check_out);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-white rounded-3xl overflow-hidden max-w-lg w-full shadow-2xl">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 text-center text-white">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-9 h-9 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-1">Booking Confirmed!</h2>
          <p className="text-white/80 text-sm">Your reservation has been successfully made</p>
          <div className="mt-4 bg-white/10 rounded-xl px-4 py-2 inline-block">
            <p className="text-xs text-white/60 uppercase tracking-widest">Confirmation ID</p>
            <p className="font-mono font-bold text-lg">{booking.id.slice(0, 8).toUpperCase()}</p>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
              <Home className="w-4 h-4 text-gray-600" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">Room</p>
              <p className="font-semibold text-gray-900">{room.name}</p>
              <p className="text-sm text-gray-500">{room.bed_type} · {room.size_sqft} sq ft</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
              <Calendar className="w-4 h-4 text-gray-600" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">Stay</p>
              <p className="font-semibold text-gray-900">{formatDate(booking.check_in)}</p>
              <p className="text-sm text-gray-500">to {formatDate(booking.check_out)} · {nights} nights</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
              <Mail className="w-4 h-4 text-gray-600" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">Guest</p>
              <p className="font-semibold text-gray-900">{booking.guest_name}</p>
              <p className="text-sm text-gray-500">{booking.guest_email}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between">
            <span className="font-semibold text-gray-700">Total Charged</span>
            <span className="text-2xl font-bold text-gray-900">{currency}{booking.total_price.toLocaleString()}</span>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-gray-900 hover:bg-amber-500 text-white font-bold py-3.5 rounded-xl transition-colors"
          >
            Done
          </button>
          <p className="text-center text-xs text-gray-400">
            A confirmation email will be sent to {booking.guest_email}
          </p>
        </div>
      </div>
    </div>
  );
}
