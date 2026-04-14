import { Search, Calendar, Users } from 'lucide-react';
import { SearchFilters } from '../types';

interface SearchBarProps {
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
}

const today = new Date().toISOString().split('T')[0];

export default function SearchBar({ filters, onFilterChange }: SearchBarProps) {
  const set = (key: keyof SearchFilters, value: string | number) =>
    onFilterChange({ ...filters, [key]: value });

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2 flex flex-col md:flex-row gap-2 max-w-3xl mx-auto shadow-2xl">
      <div className="flex-1 flex items-center gap-3 bg-white rounded-xl px-4 py-3">
        <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
        <div className="flex-1 min-w-0">
          <label className="block text-xs text-gray-400 font-medium">Check-in</label>
          <input
            type="date"
            min={today}
            value={filters.checkIn}
            onChange={(e) => set('checkIn', e.target.value)}
            className="w-full text-sm text-gray-800 font-semibold outline-none bg-transparent"
          />
        </div>
      </div>

      <div className="flex-1 flex items-center gap-3 bg-white rounded-xl px-4 py-3">
        <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
        <div className="flex-1 min-w-0">
          <label className="block text-xs text-gray-400 font-medium">Check-out</label>
          <input
            type="date"
            min={filters.checkIn || today}
            value={filters.checkOut}
            onChange={(e) => set('checkOut', e.target.value)}
            className="w-full text-sm text-gray-800 font-semibold outline-none bg-transparent"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3">
        <Users className="w-4 h-4 text-gray-400 shrink-0" />
        <div>
          <label className="block text-xs text-gray-400 font-medium">Guests</label>
          <select
            value={filters.guests}
            onChange={(e) => set('guests', parseInt(e.target.value))}
            className="text-sm text-gray-800 font-semibold outline-none bg-transparent cursor-pointer"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
            ))}
          </select>
        </div>
      </div>

      <button className="bg-amber-500 hover:bg-amber-400 text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2 transition-colors shrink-0">
        <Search className="w-4 h-4" />
        <span>Search</span>
      </button>
    </div>
  );
}
