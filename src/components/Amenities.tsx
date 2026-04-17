import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface AmenitiesProps {
  onSelectAmenity: (id: string) => void;
  settings?: Record<string, string>;
}

export default function Amenities({ onSelectAmenity, settings }: AmenitiesProps) {
  const dynamicAmenities = [
    {
      id: 'accommodation',
      title: 'Sanctuaries',
      description: 'Experience absolute serenity in our masterfully designed suites.',
      image: settings?.amenity_accommodation_image || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
      cta: 'Explore'
    },
    {
      id: 'restaurant',
      title: 'Restaurant',
      description: 'A fusion of local flavors and international techniques.',
      image: settings?.amenity_restaurant_image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'conferencing',
      title: 'Conferencing',
      description: 'State-of-the-art facilities for your business meetings and events.',
      image: settings?.amenity_conferencing_image || 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'catering',
      title: 'Outside Catering',
      description: 'Professional catering services for your private events.',
      image: settings?.amenity_catering_image || 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'pool',
      title: 'Infinity Pool',
      image: settings?.amenity_pool_image || 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=600&q=80',
    }
  ];

  return (
    <section className="px-6 space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-medium tracking-tight text-on-surface serif">
          Our Offerings
        </h3>
        <div className="h-px flex-grow ml-6 bg-outline-variant/20"></div>
      </div>

      <div className="space-y-4">
        {dynamicAmenities.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelectAmenity(item.id)}
            className="relative rounded-xl overflow-hidden group cursor-pointer shadow-ambient aspect-[16/9] active:scale-[0.98] transition-transform"
          >
            <img
              key={item.image}
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            <div className="absolute bottom-0 left-0 p-6 w-full">
              <h4 className="font-medium text-white serif text-xl mb-1">
                {item.title}
              </h4>
              {item.description && (
                <p className="text-white/80 text-xs sans line-clamp-1 mb-3">
                  {item.description}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
