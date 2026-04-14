export interface Room {
  id: string;
  name: string;
  type: 'standard' | 'deluxe' | 'suite' | 'penthouse';
  description: string;
  price_per_night: number;
  max_guests: number;
  amenities: string[];
  image_url: string;
  size_sqft: number;
  bed_type: string;
  available: boolean;
  created_at: string;
}

export interface Booking {
  id: string;
  room_id: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  check_in: string;
  check_out: string;
  guests: number;
  total_price: number;
  status: string;
  special_requests: string;
  created_at: string;
}

export interface BookingFormData {
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  check_in: string;
  check_out: string;
  guests: number;
  special_requests: string;
}

export interface SearchFilters {
  location: string;
  countryIsoCode?: string;
  currencyCode?: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  type: string;
}
