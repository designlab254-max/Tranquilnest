import React from 'react';
import { motion } from 'motion/react';
import { Utensils, Star, Clock, Heart, ChevronLeft } from 'lucide-react';

interface CateringProps {
  onBack: () => void;
}

export default function Catering({ onBack }: CateringProps) {
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
          Exquisite Service
        </span>
        <h1 className="text-4xl font-medium tracking-tight text-on-surface serif">
          Outside Catering
        </h1>
        <p className="text-on-surface-variant max-w-xs text-sm mt-3 sans leading-relaxed">
          Bringing the culinary excellence of The Tranquil Nest Hotel to your private events and celebrations.
        </p>
      </header>

      <div className="space-y-8">
        <div className="rounded-2xl overflow-hidden shadow-ambient border border-outline-variant/10">
          <img src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80" alt="Catering Service" className="w-full h-48 object-cover" />
          <div className="p-6 bg-white">
            <h3 className="text-xl font-medium text-on-surface serif mb-4">Bespoke Event Menus</h3>
            <p className="text-on-surface-variant text-sm sans leading-relaxed mb-6">
              From intimate garden parties to large-scale corporate galas, our team provides professional service and gourmet menus tailored to your specific needs.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Feature icon={<Star className="w-4 h-4" />} label="Gourmet Menus" />
              <Feature icon={<Heart className="w-4 h-4" />} label="Private Chefs" />
              <Feature icon={<Clock className="w-4 h-4" />} label="On-time Setup" />
              <Feature icon={<Utensils className="w-4 h-4" />} label="Full Service" />
            </div>
            <button className="w-full bg-primary text-white py-3 rounded-lg font-bold text-xs uppercase tracking-widest sans">
              Request a Quote
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
