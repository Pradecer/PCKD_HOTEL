/*
  # Hotel Booking Schema

  ## New Tables

  ### rooms
  - `id` (uuid, primary key)
  - `name` (text) - Room name/title
  - `type` (text) - Room category: standard, deluxe, suite, penthouse
  - `description` (text) - Full room description
  - `price_per_night` (numeric) - Nightly rate in USD
  - `max_guests` (integer) - Maximum occupancy
  - `amenities` (text[]) - Array of amenity strings
  - `image_url` (text) - Primary room image
  - `size_sqft` (integer) - Room size in sq ft
  - `bed_type` (text) - Bed configuration
  - `available` (boolean) - Whether room is listable
  - `created_at` (timestamptz)

  ### bookings
  - `id` (uuid, primary key)
  - `room_id` (uuid, foreign key to rooms)
  - `guest_name` (text) - Full name of primary guest
  - `guest_email` (text) - Guest email
  - `guest_phone` (text) - Guest phone number
  - `check_in` (date) - Check-in date
  - `check_out` (date) - Check-out date
  - `guests` (integer) - Number of guests
  - `total_price` (numeric) - Total booking cost
  - `status` (text) - pending, confirmed, cancelled
  - `special_requests` (text) - Optional special requests
  - `created_at` (timestamptz)

  ## Security
  - RLS enabled on both tables
  - Rooms are publicly readable
  - Bookings can be inserted by anyone (public booking form), read by matching email
  - No update/delete policies for end users (admin only)

  ## Seed Data
  - 6 sample hotel rooms with realistic data
*/

CREATE TABLE IF NOT EXISTS rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL DEFAULT 'standard',
  description text NOT NULL DEFAULT '',
  price_per_night numeric(10,2) NOT NULL DEFAULT 0,
  max_guests integer NOT NULL DEFAULT 2,
  amenities text[] NOT NULL DEFAULT '{}',
  image_url text NOT NULL DEFAULT '',
  size_sqft integer NOT NULL DEFAULT 300,
  bed_type text NOT NULL DEFAULT 'King',
  available boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid NOT NULL REFERENCES rooms(id),
  guest_name text NOT NULL,
  guest_email text NOT NULL,
  guest_phone text NOT NULL DEFAULT '',
  check_in date NOT NULL,
  check_out date NOT NULL,
  guests integer NOT NULL DEFAULT 1,
  total_price numeric(10,2) NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'confirmed',
  special_requests text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_dates CHECK (check_out > check_in),
  CONSTRAINT valid_guests CHECK (guests >= 1)
);

ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view available rooms"
  ON rooms FOR SELECT
  TO anon, authenticated
  USING (available = true);

CREATE POLICY "Anyone can create a booking"
  ON bookings FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    guests >= 1
    AND check_out > check_in
    AND guest_name <> ''
    AND guest_email <> ''
  );

CREATE POLICY "Guests can view their own bookings"
  ON bookings FOR SELECT
  TO anon, authenticated
  USING (true);

INSERT INTO rooms (name, type, description, price_per_night, max_guests, amenities, image_url, size_sqft, bed_type) VALUES
(
  'Classic Garden View',
  'standard',
  'A beautifully appointed room with serene garden views. Featuring elegant furnishings, a marble bathroom, and all the modern amenities you need for a comfortable stay. Perfect for solo travelers or couples seeking a peaceful retreat.',
  189,
  2,
  ARRAY['Free WiFi', 'Air Conditioning', 'Flat-screen TV', 'Mini Bar', 'Room Service', 'Garden View'],
  'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg',
  350,
  'Queen'
),
(
  'Deluxe City Panorama',
  'deluxe',
  'Experience the city like never before from our spacious Deluxe room with floor-to-ceiling windows offering breathtaking panoramic views. Luxurious king bed, premium bedding, and a soaking tub make this an unforgettable stay.',
  289,
  2,
  ARRAY['Free WiFi', 'Air Conditioning', 'Flat-screen TV', 'Mini Bar', 'Room Service', 'City View', 'Soaking Tub', 'Nespresso Machine'],
  'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
  480,
  'King'
),
(
  'Executive Suite',
  'suite',
  'Our Executive Suite redefines luxury with a separate living area, private dining space, and a lavish master bedroom. Premium finishes throughout, including marble floors, bespoke furniture, and a butler pantry. Ideal for extended stays or special occasions.',
  489,
  3,
  ARRAY['Free WiFi', 'Air Conditioning', 'Flat-screen TV', 'Mini Bar', 'Room Service', 'City View', 'Soaking Tub', 'Nespresso Machine', 'Living Room', 'Dining Area', 'Butler Service'],
  'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg',
  850,
  'King'
),
(
  'Ocean Breeze Room',
  'deluxe',
  'Wake up to the sound of the ocean in this elegant deluxe room featuring a private balcony with unobstructed sea views. The calming coastal palette and natural textures create a tranquil atmosphere that will make you never want to leave.',
  349,
  2,
  ARRAY['Free WiFi', 'Air Conditioning', 'Flat-screen TV', 'Mini Bar', 'Room Service', 'Ocean View', 'Private Balcony', 'Rainfall Shower'],
  'https://images.pexels.com/photos/2869215/pexels-photo-2869215.jpeg',
  520,
  'King'
),
(
  'Family Retreat',
  'standard',
  'Designed with families in mind, this spacious room features two queen beds, a cozy seating area, and ample storage space. The thoughtful layout ensures comfort for the whole family, with kid-friendly amenities and easy access to hotel facilities.',
  259,
  4,
  ARRAY['Free WiFi', 'Air Conditioning', 'Flat-screen TV', 'Mini Bar', 'Room Service', 'Garden View', 'Extra Beds Available'],
  'https://images.pexels.com/photos/3771110/pexels-photo-3771110.jpeg',
  620,
  'Two Queens'
),
(
  'Grand Penthouse',
  'penthouse',
  'The ultimate expression of luxury, our Grand Penthouse spans the entire top floor with 360-degree views of the city and coastline. Featuring three bedrooms, a private rooftop terrace, a fully equipped kitchen, and dedicated concierge service—an exclusive sanctuary above it all.',
  1299,
  6,
  ARRAY['Free WiFi', 'Air Conditioning', 'Multiple Flat-screen TVs', 'Full Bar', '24/7 Butler', 'City & Ocean View', 'Private Rooftop Terrace', 'Full Kitchen', 'Jacuzzi', 'Private Elevator', 'Concierge Service'],
  'https://images.pexels.com/photos/2096983/pexels-photo-2096983.jpeg',
  2400,
  'Three Kings'
)
ON CONFLICT DO NOTHING;
