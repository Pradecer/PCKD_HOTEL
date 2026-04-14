import { useState } from 'react';
import { X, UtensilsCrossed, Plus, Minus, ShoppingBag } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

const MOCK_MENU: MenuItem[] = [
  { id: 'f1', name: 'Avocado Toast', description: 'Smashed avocado, poached eggs, cherry tomatoes on sourdough sourdough', price: 22, category: 'Breakfast', image: 'https://images.pexels.com/photos/1351440/pexels-photo-1351440.jpeg' },
  { id: 'f2', name: 'Truffle Mushroom Risotto', description: 'Creamy arborio rice, wild mushrooms, parmesan, truffle oil', price: 32, category: 'Main', image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg' },
  { id: 'f3', name: 'Wagyu Beef Burger', description: 'Brioche bun, cheddar, caramelized onions, fries', price: 45, category: 'Main', image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg' },
  { id: 'f4', name: 'Caesar Salad', description: 'Romaine lettuce, croutons, parmesan, grilled chicken', price: 24, category: 'Starter', image: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg' },
  { id: 'f5', name: 'Chocolate Lava Cake', description: 'Warm center, vanilla bean ice cream', price: 18, category: 'Dessert', image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg' },
  { id: 'f6', name: 'Fresh Morning Juice', description: 'Orange, carrot, and ginger blend', price: 12, category: 'Drinks', image: 'https://images.pexels.com/photos/158053/fresh-orange-juice-squeezed-refreshing-citrus-158053.jpeg' },
];

interface FoodOrderModalProps {
  bookingId: string;
  currency: string;
  onClose: () => void;
  onOrderSuccess: () => void;
}

export default function FoodOrderModal({ bookingId, currency, onClose, onOrderSuccess }: FoodOrderModalProps) {
  const [cart, setCart] = useState<{ item: MenuItem; quantity: number }[]>([]);
  const [isOrdering, setIsOrdering] = useState(false);

  const categories = Array.from(new Set(MOCK_MENU.map(i => i.category)));

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(p => p.item.id === item.id);
      if (existing) {
        return prev.map(p => p.item.id === item.id ? { ...p, quantity: p.quantity + 1 } : p);
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => {
      const existing = prev.find(p => p.item.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map(p => p.item.id === itemId ? { ...p, quantity: p.quantity - 1 } : p);
      }
      return prev.filter(p => p.item.id !== itemId);
    });
  };

  const cartTotal = cart.reduce((sum, cartItem) => sum + (cartItem.item.price * cartItem.quantity), 0);

  const handlePlaceOrder = () => {
    setIsOrdering(true);
    setTimeout(() => {
      const newOrder = {
        id: 'ord-' + Math.random().toString(36).substr(2, 9),
        bookingId,
        items: cart,
        total: cartTotal,
        status: 'preparing',
        created_at: new Date().toISOString()
      };

      const existingOrders = JSON.parse(localStorage.getItem('mockFoodOrders') || '[]');
      localStorage.setItem('mockFoodOrders', JSON.stringify([...existingOrders, newOrder]));
      
      setIsOrdering(false);
      onOrderSuccess();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-3xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 shrink-0 bg-gray-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
              <UtensilsCrossed className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">In-Room Dining</h2>
              <p className="text-white/60 text-sm">Order fresh food straight to your room</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Menu Section */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
            {categories.map(category => (
              <div key={category} className="mb-8 last:mb-0">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {MOCK_MENU.filter(i => i.category === category).map(item => {
                    const cartItem = cart.find(c => c.item.id === item.id);
                    return (
                      <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl shrink-0" />
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="font-bold text-gray-900 truncate pr-2">{item.name}</h4>
                              <span className="font-bold text-amber-600 shrink-0">{currency}{item.price}</span>
                            </div>
                            <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>
                          </div>
                          
                          <div className="mt-3 flex justify-end">
                            {cartItem ? (
                              <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 border border-gray-200">
                                <button onClick={() => removeFromCart(item.id)} className="w-7 h-7 flex items-center justify-center bg-white rounded shadow-sm hover:bg-gray-50">
                                  <Minus className="w-3 h-3 text-gray-600" />
                                </button>
                                <span className="text-sm font-bold w-4 text-center">{cartItem.quantity}</span>
                                <button onClick={() => addToCart(item)} className="w-7 h-7 flex items-center justify-center bg-amber-500 text-white rounded shadow-sm hover:bg-amber-400">
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => addToCart(item)}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white text-xs font-bold rounded-lg hover:bg-gray-800 transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                                Add
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Cart Section */}
          <div className="w-full md:w-80 bg-white border-l border-gray-100 flex flex-col shrink-0 sticky top-0 h-full">
            <div className="p-6 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-500" />
                Your Try
              </h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center text-gray-400 py-10">
                  <UtensilsCrossed className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <p className="text-sm">Your tray is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(c => (
                    <div key={c.item.id} className="flex justify-between items-start gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded">x{c.quantity}</span>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{c.item.name}</p>
                          <p className="text-xs text-gray-500">{currency}{c.item.price} each</p>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-gray-900">{currency}{c.item.price * c.quantity}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 bg-gray-50 border-t border-gray-100 mt-auto">
                <div className="flex justify-between items-center mb-4 text-sm">
                  <span className="text-gray-500">Service Fee</span>
                  <span className="font-medium text-gray-900 truncate">{currency}5</span>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <span className="font-bold text-gray-900 text-lg">Total</span>
                  <span className="font-black text-amber-600 text-xl">{currency}{cartTotal + 5}</span>
                </div>
                <button
                  onClick={handlePlaceOrder}
                  disabled={isOrdering}
                  className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-amber-300 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {isOrdering ? 'Placing Order...' : 'Place Order Now'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
