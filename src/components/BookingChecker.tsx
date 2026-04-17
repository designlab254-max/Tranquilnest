import React from 'react';
import { Calendar, Search } from 'lucide-react';
import { motion } from 'motion/react';

export default function BookingChecker() {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-28 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-[382px] z-40"
    >
      <div className="bg-primary text-white p-5 rounded-xl shadow-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold opacity-60 sans">
              Check Availability
            </p>
            <p className="text-sm font-medium serif">
              Select your dates
            </p>
          </div>
        </div>
        <button className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center shadow-lg active:scale-90 transition-transform">
          <Search className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}
