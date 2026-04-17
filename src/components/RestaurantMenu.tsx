import React, { useState } from 'react';
import { MenuItem } from '@/src/types';
import { motion } from 'motion/react';
import { Plus, Search, Filter } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface RestaurantMenuProps {
  onItemClick: (item: MenuItem) => void;
  items: MenuItem[];
}

export default function RestaurantMenu({ onItemClick, items }: RestaurantMenuProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const categories = ['All', 'Appetizers', 'Main Course', 'Desserts', 'Drinks'];

  const filteredItems = activeCategory === 'All' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  return (
    <div className="pb-12">
      {/* Restaurant Header Image */}
      <div className="relative h-64 mb-8 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80"
          alt="Restaurant Interior"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
      </div>

      <div className="px-6">
        <header className="mb-8">
          <span className="text-primary font-bold tracking-[0.2em] uppercase block mb-2 text-[10px] sans">
            Culinary Excellence
          </span>
          <h1 className="text-4xl font-medium tracking-tight text-on-surface serif">
            Restaurant Menu
          </h1>
          <p className="text-on-surface-variant max-w-xs text-sm mt-3 sans leading-relaxed">
            A fusion of local flavors and international techniques, served in an atmosphere of refined elegance.
          </p>
        </header>

        {/* Category Filter - WP-Cafe Style */}
        <div className="flex overflow-x-auto gap-2 mb-8 no-scrollbar pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all sans border",
              activeCategory === cat 
                ? "bg-primary text-white border-primary shadow-md" 
                : "bg-white text-on-surface-variant border-outline-variant/30 hover:border-primary/30"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Items List - WP-Cafe Style */}
      <div className="space-y-4">
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onItemClick(item)}
            className="bg-white rounded-2xl p-4 flex gap-4 shadow-[0_4px_20px_rgba(45,45,45,0.03)] border border-outline-variant/5 group active:scale-[0.98] transition-transform cursor-pointer"
          >
            <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-grow flex flex-col justify-between py-1">
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-on-surface serif leading-tight">
                    {item.name}
                  </h3>
                  <span className="text-primary font-bold sans text-sm ml-2">
                    KES {item.price.toLocaleString()}
                  </span>
                </div>
                <p className="text-on-surface-variant text-[11px] leading-relaxed mt-1 sans line-clamp-2">
                  {item.description}
                </p>
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="flex gap-1">
                  {item.allergens?.map(allergen => (
                    <span key={allergen} className="text-[8px] px-1.5 py-0.5 bg-surface-container-highest text-on-surface-variant rounded uppercase font-bold tracking-tighter sans">
                      {allergen}
                    </span>
                  ))}
                </div>
                <button 
                  className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:bg-primary-dark transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Add to order logic could go here
                  }}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* WP-Cafe Style Footer Info */}
      <div className="mt-12 p-6 bg-primary/5 rounded-2xl border border-primary/10 text-center">
        <p className="text-xs text-on-surface-variant sans leading-relaxed italic">
          "All our ingredients are locally sourced from sustainable farms in the region."
        </p>
      </div>
    </div>
    </div>
  );
}
