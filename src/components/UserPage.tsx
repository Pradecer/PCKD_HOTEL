import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, BedDouble, CheckCircle, Utensils } from 'lucide-react';
import FoodOrderModal from './FoodOrderModal';
import { Booking } from '../types';

interface UserPageProps {
  onBack: () => void;
  onSignOut: () => void;
  currency: string;
  currentUserEmail: string;
}

function formatDate(dateStr: string) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function UserPage({ onBack, onSignOut, currency, currentUserEmail }: UserPageProps) {
  const [bookings, setBookings] = useState<(Booking & { rooms: { name: string; image_url: string } })[]>([]);
  const [foodOrders, setFoodOrders] = useState<any[]>([]);
  const [orderingFoodFor, setOrderingFoodFor] = useState<string | null>(null);

  const loadData = () => {
    const mockBookings = JSON.parse(localStorage.getItem('mockBookings') || '[]');
    const myBookings = mockBookings.filter((b: any) => b.guest_email.toLowerCase() === currentUserEmail.toLowerCase());
    setBookings(myBookings.reverse());

    const allFoodOrders = JSON.parse(localStorage.getItem('mockFoodOrders') || '[]');
    setFoodOrders(allFoodOrders);
  };

  useEffect(() => {
    loadData();
  }, [currentUserEmail]);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
          
          <button
            onClick={onSignOut}
            className="text-red-500 hover:text-red-600 font-bold text-sm transition-colors"
          >
            Sign Out
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gray-900 p-8 text-white relative">
            <h1 className="text-3xl font-bold mb-2">My Reservations</h1>
            <p className="text-white/70">Welcome back, {currentUserEmail}</p>
          </div>

          <div className="p-8 border-b border-gray-100 bg-emerald-50">
            <p className="text-sm font-semibold text-emerald-800 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              You are securely logged in. Only you can view your bookings.
            </p>
          </div>

          <div className="p-8">
            {bookings.length === 0 ? (
              <div className="text-center py-16">
                <Calendar className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-1">No bookings found</h3>
                <p className="text-gray-500">You haven't made any reservations yet.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {bookings.map((b) => (
                  <div key={b.id} className="flex flex-col sm:flex-row gap-6 bg-white border border-gray-100 shadow-sm rounded-2xl p-6 transition-transform hover:-translate-y-1">
                    <img
                      src={b.rooms.image_url}
                      alt={b.rooms.name}
                      className="w-full sm:w-40 h-40 sm:h-32 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{b.rooms.name}</h3>
                          <p className="text-sm text-gray-500">Guest: {b.guest_name}</p>
                        </div>
                        <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                          <CheckCircle className="w-3 h-3" />
                          {b.status.toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-6 mt-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <BedDouble className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">{formatDate(b.check_in)} – {formatDate(b.check_out)}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                        <span className="text-xs font-mono text-gray-400">ID: {b.id.toUpperCase()}</span>
                        
                        <div className="flex items-end gap-6 text-right">
                          <button
                            onClick={() => setOrderingFoodFor(b.id)}
                            className="bg-amber-100 hover:bg-amber-200 text-amber-800 text-sm font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                          >
                            <Utensils className="w-4 h-4" />
                            Order Room Service
                          </button>

                          <div>
                            <span className="text-sm text-gray-500 mr-2">Room Total:</span>
                            <span className="text-xl font-bold text-gray-900">{currency}{b.total_price.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      {/* Food Orders Section */}
                      {foodOrders.filter(o => o.bookingId === b.id).length > 0 && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                          <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <Utensils className="w-4 h-4 text-amber-500" />
                            Room Service Ordered
                          </h4>
                          <div className="space-y-2">
                            {foodOrders.filter(o => o.bookingId === b.id).map((order) => (
                              <div key={order.id} className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">
                                  {order.items.reduce((s: number, i: any) => s + i.quantity, 0)} items ({order.status})
                                </span>
                                <span className="font-bold text-gray-900">+{currency}{order.total}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {orderingFoodFor && (
        <FoodOrderModal
          bookingId={orderingFoodFor}
          currency={currency}
          onClose={() => setOrderingFoodFor(null)}
          onOrderSuccess={() => {
            setOrderingFoodFor(null);
            loadData();
          }}
        />
      )}
    </div>
  );
}
