import { MapPin, Star, ChevronDown } from 'lucide-react';
import SearchBar from './SearchBar';
import { SearchFilters } from '../types';
import { Country, City } from 'country-state-city';
import { useState, useEffect } from 'react';

interface HeroProps {
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
}

export default function Hero({ filters, onFilterChange }: HeroProps) {
  const allCountries = Country.getAllCountries();
  const [cities, setCities] = useState<any[]>([]);

  useEffect(() => {
    if (filters.countryIsoCode) {
      setCities(City.getCitiesOfCountry(filters.countryIsoCode) || []);
    }
  }, [filters.countryIsoCode]);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const isoCode = e.target.value;
    const country = Country.getCountryByCode(isoCode);
    
    const newCities = City.getCitiesOfCountry(isoCode) || [];
    const firstCityName = newCities.length > 0 ? newCities[0].name : '';

    onFilterChange({
      ...filters,
      countryIsoCode: isoCode,
      location: firstCityName,
      currencyCode: country?.currency || 'USD'
    });
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      location: e.target.value
    });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-400" />
            <select
              value={filters.countryIsoCode || ''}
              onChange={handleCountryChange}
              className="bg-transparent text-amber-400 text-sm font-medium tracking-widest uppercase border-b border-amber-400/30 focus:outline-none focus:border-amber-400 pb-1 cursor-pointer max-w-[200px]"
            >
              <option value="" className="bg-gray-900">Select Country</option>
              {allCountries.map(c => (
                <option key={c.isoCode} value={c.isoCode} className="bg-gray-900">{c.name}</option>
              ))}
            </select>
          </div>
          
          {filters.countryIsoCode && cities.length > 0 && (
            <div className="flex items-center gap-2">
              <select
                value={filters.location}
                onChange={handleCityChange}
                className="bg-transparent text-amber-400 text-sm font-medium tracking-widest uppercase border-b border-amber-400/30 focus:outline-none focus:border-amber-400 pb-1 cursor-pointer max-w-[200px]"
              >
                {cities.map(c => (
                  <option key={c.name} value={c.name} className="bg-gray-900">{c.name}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Where Luxury
          <br />
          <span className="text-amber-400">Meets Serenity</span>
        </h1>

        <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto mb-4 leading-relaxed">
          Discover an unparalleled sanctuary of elegance and tranquility. Every detail crafted for your perfect escape.
        </p>

        <div className="flex items-center justify-center gap-6 mb-12">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
            ))}
          </div>
          <span className="text-white/60 text-sm">Forbes Five-Star Award 2024</span>
        </div>

        <SearchBar filters={filters} onFilterChange={onFilterChange} />
      </div>

      <a
        href="#rooms"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors animate-bounce"
      >
        <ChevronDown className="w-6 h-6" />
      </a>
    </section>
  );
}
