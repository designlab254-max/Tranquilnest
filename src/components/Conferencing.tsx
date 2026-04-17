import React from 'react';
import { motion } from 'motion/react';
import { Users, Presentation, Wifi, Coffee, ChevronLeft } from 'lucide-react';

interface ConferencingProps {
  onBack: () => void;
}

export default function Conferencing({ onBack }: ConferencingProps) {
  return (
    <div className="px-6 pb-12">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest sans"
      >
        <ChevronLeft className="w-4 h-4" />
        Back
      </button>

      <header className="mb-10">
        <span className="text-primary font-bold tracking-[0.2em] uppercase block mb-2 text-[10px] sans">
          Professional Spaces
        </span>
        <h1 className="text-4xl font-medium tracking-tight text-on-surface serif">
          Conferencing
        </h1>
        <p className="text-on-surface-variant max-w-xs text-sm mt-3 sans leading-relaxed">
          Inspiring environments designed for collaboration, innovation, and successful business outcomes.
        </p>
      </header>

      <div className="space-y-8">
        <div className="rounded-2xl overflow-hidden shadow-ambient border border-outline-variant/10">
          <img src="https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=800&q=80" alt="Conference Room" className="w-full h-48 object-cover" />
          <div className="p-6 bg-white">
            <h3 className="text-xl font-medium text-on-surface serif mb-4">The Grand Boardroom</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Feature icon={<Users className="w-4 h-4" />} label="Up to 50 Guests" />
              <Feature icon={<Presentation className="w-4 h-4" />} label="4K Projection" />
              <Feature icon={<Wifi className="w-4 h-4" />} label="Dedicated Fiber" />
              <Feature icon={<Coffee className="w-4 h-4" />} label="Catering Options" />
            </div>
            <button className="w-full bg-primary text-white py-3 rounded-lg font-bold text-xs uppercase tracking-widest sans">
              Inquire Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 text-on-surface-variant">
      <span className="text-primary">{icon}</span>
      <span className="text-[10px] font-bold uppercase tracking-widest sans">{label}</span>
    </div>
  );
}
