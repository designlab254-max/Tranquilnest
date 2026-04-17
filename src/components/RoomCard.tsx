import React from 'react';
import { Ruler, Bed as BedIcon, Bath, Plus } from 'lucide-react';
import { Room } from '@/src/types';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface RoomCardProps {
  room: Room;
  index: number;
  key?: string | number;
  onClick?: (room: Room) => void;
}

export default function RoomCard({ room, index, onClick }: RoomCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={() => onClick?.(room)}
      className="group relative bg-surface-container-lowest rounded-xl overflow-hidden shadow-ambient transition-all duration-500 border border-outline-variant/10 cursor-pointer active:scale-[0.98]"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        {room.isBestSeller && (
          <div className="absolute top-4 left-4">
            <span className="bg-primary text-white px-3 py-1 rounded-lg text-[10px] font-bold tracking-widest uppercase sans">
              Popular
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h2 className="text-2xl font-medium text-on-surface tracking-tight serif">
            {room.name}
          </h2>
          <div className="text-right">
            <span className="text-[10px] font-bold text-on-surface-variant tracking-widest uppercase block sans">
              From
            </span>
            <span className="text-lg font-bold text-primary sans">
              KES {room.price.toLocaleString()}
            </span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 mb-4 opacity-60">
          <Feature icon={<Ruler className="w-3 h-3" />} label={room.size} />
          <Feature icon={<BedIcon className="w-3 h-3" />} label={room.bed} />
        </div>

        <p className="text-on-surface-variant text-sm leading-relaxed mb-6 sans line-clamp-2">
          {room.description}
        </p>

        <button className="w-full flex items-center justify-center gap-2 bg-primary/5 text-primary py-3 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all active:scale-[0.98] sans">
          View Sanctuary
        </button>
      </div>
    </motion.div>
  );
}

function Feature({ icon, label }: { icon?: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 text-on-surface-variant">
      {icon && <span className="text-primary">{icon}</span>}
      <span className="text-[10px] font-bold uppercase tracking-widest sans">{label}</span>
    </div>
  );
}
