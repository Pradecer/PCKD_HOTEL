import { useState } from 'react';
import { ArrowLeft, Lock, Mail, Hotel } from 'lucide-react';

interface LoginPageProps {
  onBack?: () => void;
  onLoginSuccess: (email: string) => void;
}

export default function LoginPage({ onBack, onLoginSuccess }: LoginPageProps) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmedEmail = email.trim().toLowerCase();
    const mockUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');

    if (isRegistering) {
      if (mockUsers.some((u: any) => u.email === trimmedEmail)) {
        setError('An account with this email already exists.');
        return;
      }
      mockUsers.push({ email: trimmedEmail, password });
      localStorage.setItem('mockUsers', JSON.stringify(mockUsers));
      onLoginSuccess(trimmedEmail);
    } else {
      const user = mockUsers.find((u: any) => u.email === trimmedEmail && u.password === password);
      if (!user) {
        setError('Invalid email or password.');
        return;
      }
      onLoginSuccess(trimmedEmail);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {onBack && (
        <div className="absolute top-8 left-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-md w-full">
        <div className="bg-gray-900 p-8 text-center text-white relative">
          <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Hotel className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-2">
            {isRegistering ? 'Create an Account' : 'Welcome Back'}
          </h1>
          <p className="text-white/70 text-sm">
            {isRegistering ? 'Sign up to manage your PCKD reservations' : 'Sign in to access your bookings'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                required
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                required
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-400 text-white font-bold py-3.5 rounded-xl transition-colors"
          >
            {isRegistering ? 'Sign Up' : 'Sign In'}
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError('');
              }}
              className="text-amber-600 font-semibold hover:underline"
            >
              {isRegistering ? 'Sign In' : 'Create one'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
