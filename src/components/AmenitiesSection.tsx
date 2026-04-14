import { Waves, UtensilsCrossed, Dumbbell, Sparkles, Car, Wifi } from 'lucide-react';

const amenities = [
  {
    icon: Waves,
    title: 'Infinity Pool',
    description: 'Olympic-sized infinity pool overlooking the Pacific Ocean with private cabanas.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Fine Dining',
    description: 'Three Michelin-starred restaurants helmed by world-renowned chefs.',
  },
  {
    icon: Sparkles,
    title: 'Luxury Spa',
    description: '12,000 sq ft spa featuring holistic treatments and a thermal circuit.',
  },
  {
    icon: Dumbbell,
    title: 'Fitness Center',
    description: 'State-of-the-art equipment with personal trainers available 24/7.',
  },
  {
    icon: Car,
    title: 'Valet & Transfers',
    description: 'Complimentary valet parking and private airport transfers on request.',
  },
  {
    icon: Wifi,
    title: 'Ultra-Fast WiFi',
    description: 'Gigabit fiber connection throughout all areas of the property.',
  },
];

export default function AmenitiesSection() {
  return (
    <section id="amenities" className="py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-amber-400 text-sm font-medium uppercase tracking-widest mb-3">World-Class Facilities</p>
          <h2 className="text-4xl font-bold text-white">Everything You Need</h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            From the moment you arrive, every detail is thoughtfully curated for an exceptional experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenities.map((item) => (
            <div
              key={item.title}
              className="group bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors">
                <item.icon className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
