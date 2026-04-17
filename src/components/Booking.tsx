import React, { useState } from 'react';
import { rooms } from '@/src/data';
import { motion } from 'motion/react';
import { Calendar, Users, Bed, CheckCircle2 } from 'lucide-react';

export default function Booking() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center px-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6"
        >
          <CheckCircle2 className="w-10 h-10" />
        </motion.div>
        <h2 className="text-3xl font-bold text-on-surface mb-4 uppercase tracking-tight">
          Reservation Received
        </h2>
        <p className="text-on-surface-variant max-w-xs mb-8">
          Your sanctuary is being prepared. A confirmation email has been sent to your inbox.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="bg-primary-container text-white px-8 py-3 rounded-full font-bold tracking-tight"
        >
          Make Another Booking
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 max-w-2xl mx-auto">
      <header className="mb-12">
        <span className="text-primary-container font-bold tracking-widest uppercase block mb-2 text-sm">
          Reservations
        </span>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-on-surface mb-4">
          Book Your Stay
        </h1>
        <p className="text-on-surface-variant text-lg">
          Secure your place in our digital sanctuary.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-ambient border border-outline-variant/10 space-y-6">
          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-on-surface-variant tracking-widest flex items-center gap-2">
                <Calendar className="w-3 h-3" /> Check In
              </label>
              <input
                type="date"
                required
                className="w-full bg-surface-container-low border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary-container/30"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-on-surface-variant tracking-widest flex items-center gap-2">
                <Calendar className="w-3 h-3" /> Check Out
              </label>
              <input
                type="date"
                required
                className="w-full bg-surface-container-low border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary-container/30"
              />
            </div>
          </div>

          {/* Guests & Room */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-on-surface-variant tracking-widest flex items-center gap-2">
                <Users className="w-3 h-3" /> Guests
              </label>
              <select className="w-full bg-surface-container-low border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary-container/30">
                <option>1 Guest</option>
                <option>2 Guests</option>
                <option>3 Guests</option>
                <option>4 Guests</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-on-surface-variant tracking-widest flex items-center gap-2">
                <Bed className="w-3 h-3" /> Room Type
              </label>
              <select className="w-full bg-surface-container-low border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary-container/30">
                {rooms.map(room => (
                  <option key={room.id} value={room.id}>{room.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4 pt-4 border-t border-surface-container-high">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-on-surface-variant tracking-widest">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="John Doe"
                className="w-full bg-surface-container-low border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary-container/30"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-on-surface-variant tracking-widest">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="john@example.com"
                className="w-full bg-surface-container-low border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary-container/30"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-primary-container text-white py-4 rounded-2xl font-bold text-lg shadow-lg active:scale-[0.98] transition-all"
        >
          Confirm Reservation
        </button>
      </form>
    </div>
  );
}
