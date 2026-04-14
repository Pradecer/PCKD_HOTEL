import { X, Users, Maximize2, BedDouble, Star, Check } from 'lucide-react';
import { Room } from '../types';

interface RoomModalProps {
  room: Room;
  nights: number;
  currency: string;
  onClose: () => void;
  onBook: () => void;
}

export default function RoomModal({ room, nights, currency, onClose, onBook }: RoomModalProps) {
  const total = nights > 0 ? room.price_per_night * nights : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-3xl overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-md transition-colors"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        <div className="relative h-72">
          <img src={room.image_url} alt={room.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              <p className="text-white/80 text-sm capitalize mb-1">{room.type} Room</p>
              <h2 className="text-white text-2xl font-bold">{room.name}</h2>
            </div>
            <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="text-white font-bold">4.9</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap gap-6 mb-6 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Guests</p>
                <p className="text-sm font-semibold text-gray-800">Up to {room.max_guests}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center">
                <Maximize2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Room Size</p>
                <p className="text-sm font-semibold text-gray-800">{room.size_sqft} sq ft</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center">
                <BedDouble className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Bed Type</p>
                <p className="text-sm font-semibold text-gray-800">{room.bed_type}</p>
              </div>
            </div>
          </div>

          <h3 className="font-semibold text-gray-900 mb-2">About This Room</h3>
          <p className="text-gray-600 leading-relaxed mb-6">{room.description}</p>

          <h3 className="font-semibold text-gray-900 mb-3">Amenities</h3>
          <div className="grid grid-cols-2 gap-2 mb-8">
            {room.amenities.map((amenity) => (
              <div key={amenity} className="flex items-center gap-2">
                <div className="w-5 h-5 bg-amber-50 rounded-full flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-amber-600" />
                </div>
                <span className="text-sm text-gray-600">{amenity}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-4">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-gray-900">{currency}{room.price_per_night.toLocaleString()}</span>
                <span className="text-gray-400">/night</span>
              </div>
              {total ? (
                <p className="text-sm text-gray-500">{currency}{total.toLocaleString()} total · {nights} nights</p>
              ) : (
                <p className="text-sm text-gray-400">Select dates to see total</p>
              )}
            </div>
            <button
              onClick={onBook}
              className="bg-amber-500 hover:bg-amber-400 text-white font-bold px-8 py-3.5 rounded-xl transition-colors"
            >
              Reserve Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
