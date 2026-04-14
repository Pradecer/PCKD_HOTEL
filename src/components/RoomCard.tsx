import { Users, Maximize2, BedDouble, Star } from 'lucide-react';
import { Room } from '../types';

interface RoomCardProps {
  room: Room;
  nights: number;
  currency: string;
  onSelect: (room: Room) => void;
}

const typeLabels: Record<string, string> = {
  standard: 'Standard',
  deluxe: 'Deluxe',
  suite: 'Suite',
  penthouse: 'Penthouse',
};

const typeColors: Record<string, string> = {
  standard: 'bg-slate-100 text-slate-700',
  deluxe: 'bg-blue-50 text-blue-700',
  suite: 'bg-amber-50 text-amber-700',
  penthouse: 'bg-rose-50 text-rose-700',
};

export default function RoomCard({ room, nights, currency, onSelect }: RoomCardProps) {
  const total = nights > 0 ? room.price_per_night * nights : null;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
      <div className="relative overflow-hidden h-56">
        <img
          src={room.image_url}
          alt={room.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${typeColors[room.type]}`}>
            {typeLabels[room.type]}
          </span>
        </div>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
          <span className="text-xs font-bold text-gray-800">4.9</span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 text-lg mb-1">{room.name}</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{room.description}</p>

        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            <span>Up to {room.max_guests}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize2 className="w-4 h-4" />
            <span>{room.size_sqft} sq ft</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BedDouble className="w-4 h-4" />
            <span>{room.bed_type}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {room.amenities.slice(0, 4).map((a) => (
            <span key={a} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{a}</span>
          ))}
          {room.amenities.length > 4 && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">+{room.amenities.length - 4} more</span>
          )}
        </div>

        <div className="flex items-end justify-between mt-auto pt-4 border-t border-gray-100">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-gray-900">{currency}{room.price_per_night.toLocaleString()}</span>
              <span className="text-gray-400 text-sm">/night</span>
            </div>
            {total && (
              <span className="text-xs text-gray-400">{currency}{total.toLocaleString()} total for {nights} nights</span>
            )}
          </div>
          <button
            onClick={() => onSelect(room)}
            className="bg-gray-900 hover:bg-amber-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
