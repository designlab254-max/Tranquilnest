import React from 'react';
import { MenuItem } from '@/src/types';
import { motion } from 'motion/react';
import { ChevronLeft, Plus, Clock, Flame, Info } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface MenuDetailProps {
  item: MenuItem;
  onBack: () => void;
}

export default function MenuDetail({ item, onBack }: MenuDetailProps) {
  return (
    <div className="pb-12">
      {/* Header Image */}
      <div className="relative h-[40vh] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <button 
          onClick={onBack}
          className="absolute top-6 left-6 w-10 h-10 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center active:scale-90 transition-transform"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="px-6 -mt-10 relative z-10">
        <div className="bg-surface rounded-t-[32px] pt-8 pb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-primary font-bold tracking-[0.2em] uppercase block mb-1 text-[10px] sans">
                {item.category}
              </span>
              <h1 className="text-3xl font-medium tracking-tight text-on-surface serif">
                {item.name}
              </h1>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-primary sans">
                KES {item.price.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex gap-6 mb-8 py-4 border-y border-outline-variant/10">
            {item.calories && (
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium sans text-on-surface-variant">{item.calories} kcal</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium sans text-on-surface-variant">15-20 min</span>
            </div>
          </div>

          <div className="space-y-6 mb-10">
            <p className="text-on-surface-variant text-sm leading-relaxed sans">
              {item.description}
            </p>

            {item.allergens && item.allergens.length > 0 && (
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface mb-3 flex items-center gap-2 sans">
                  <Info className="w-4 h-4 text-primary" />
                  Allergens
                </h3>
                <div className="flex flex-wrap gap-2">
                  {item.allergens.map((allergen, idx) => (
                    <span key={idx} className="text-[10px] px-3 py-1 bg-surface-container-highest text-on-surface-variant rounded-full uppercase font-bold tracking-wider sans">
                      {allergen}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button className="w-full bg-primary text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest sans shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" />
            Add to Order
          </button>
        </div>
      </div>
    </div>
  );
}
