import React, { useState } from 'react';
import { Lock, LogIn, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface AdminLoginProps {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      if (res.ok) {
        onLogin();
      } else {
        const text = await res.text();
        try {
          const data = JSON.parse(text);
          setError(data.error || 'Invalid password');
        } catch {
          setError(`Server error (${res.status}). Please check your connection or redeploy the app.`);
        }
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-6 flex flex-col items-center justify-center min-h-[60vh]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm bg-white p-8 rounded-3xl shadow-ambient border border-outline-variant/10 text-center"
      >
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-8 h-8" />
        </div>
        
        <h2 className="text-2xl font-medium text-on-surface serif mb-2">Admin Access</h2>
        <p className="text-on-surface-variant text-sm sans mb-8">
          Please enter the administrator password.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2 text-primary text-[10px] font-bold uppercase tracking-wider sans bg-primary/5 p-3 rounded-lg text-left"
            >
              <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin Password"
            className="w-full px-4 py-3 rounded-xl border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all sans text-sm"
            required
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest sans mt-4 shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-3"
          >
            {isSubmitting ? "Verifying..." : (
              <>
                <LogIn className="w-4 h-4" />
                Login
              </>
            )}
          </button>
        </form>
      </motion.div>
      
      <p className="mt-8 text-[10px] text-on-surface-variant uppercase tracking-widest font-bold sans">
        Management Portal v1.0
      </p>
    </div>
  );
}
