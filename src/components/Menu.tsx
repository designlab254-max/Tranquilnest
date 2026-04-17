import React from 'react';
import { MenuItem } from '@/src/types';
import { menuItems } from '@/src/data';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

interface MenuProps {
  onItemClick: (item: MenuItem) => void;
}

export default function Menu({ onItemClick }: MenuProps) {
  const categories = ['Appetizers', 'Main Course', 'Desserts', 'Drinks'] as const;

  return (
    <div className="px-4 md:px-8 max-w-5xl mx-auto">
      <header className="mb-12">
        <span className="text-primary-container font-bold tracking-widest uppercase block mb-2 text-sm">
          Gastronomy
        </span>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-on-surface mb-4">
          The Nest Kitchen
        </h1>
        <p className="text-on-surface-variant max-w-md text-lg">
          A curated selection of artisanal flavors, sourced locally and prepared with architectural precision.
        </p>
      </header>

      <div className="space-y-12">
        {categories.map((category) => (
          <section key={category}>
            <h3 className="text-xl font-bold text-on-surface uppercase tracking-widest mb-6 border-b border-surface-container-high pb-2">
              {category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {menuItems
                .filter((item) => item.category === category)
                .map((item) => (
                  <motion.button
                    key={item.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onItemClick(item)}
                    className="flex items-center gap-4 p-4 bg-surface-container-lowest rounded-xl shadow-ambient hover:shadow-lg transition-all text-left group"
                  >
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-bold text-on-surface group-hover:text-primary transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-xs text-on-surface-variant line-clamp-1 mb-1">
                        {item.description}
                      </p>
                      <span className="text-sm font-bold text-primary-container">
                        ${item.price}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-on-surface/20 group-hover:text-primary transition-colors" />
                  </motion.button>
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
