import React from 'react';
import { wellnessServices } from '@/src/data';
import { motion } from 'motion/react';
import { Plus, Clock } from 'lucide-react';

export default function WellnessMenu() {
  return (
    <div className="px-6 pb-12">
      <header className="mb-10">
        <span className="text-primary font-bold tracking-[0.2em] uppercase block mb-2 text-[10px] sans">
          Rejuvenation
        </span>
        <h1 className="text-4xl font-medium tracking-tight text-on-surface serif">
          Wellness Menu
        </h1>
        <p className="text-on-surface-variant max-w-xs text-sm mt-3 sans leading-relaxed">
          Curated treatments designed to restore balance and architectural silence to your body.
        </p>
      </header>

      <div className="space-y-6">
        {wellnessServices.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-ambient border border-outline-variant/10 flex flex-col"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-medium text-on-surface serif">
                  {service.name}
                </h3>
                <span className="text-primary font-bold sans text-sm">
                  KES {service.priceKES.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant text-[10px] uppercase tracking-widest font-bold mb-4 sans">
                <Clock className="w-3 h-3" />
                {service.duration}
              </div>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-6 sans">
                {service.description}
              </p>
              <button className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-primary-dark transition-all active:scale-[0.98] sans">
                <Plus className="w-4 h-4" />
                Add to Booking
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
