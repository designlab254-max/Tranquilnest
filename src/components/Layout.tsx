import React from 'react';
import { Home, Bed, Utensils, User } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Screen } from '@/src/types';
import { motion } from 'motion/react';

interface LayoutProps {
  children: React.ReactNode;
  activeScreen: Screen;
  onScreenChange: (screen: Screen) => void;
  settings?: Record<string, string>;
}

export default function Layout({ children, activeScreen, onScreenChange, settings }: LayoutProps) {
  const hotelIcon = settings?.hotel_icon || "https://images.unsplash.com/photo-1551219059-b5f8e7acee56?auto=format&fit=crop&w=200&q=80";

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 glass flex justify-between items-center px-6 h-16 max-w-[430px] left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant/30">
            <img
              key={hotelIcon}
              alt="Hotel Icon"
              className="w-full h-full object-cover"
              src={hotelIcon}
              referrerPolicy="no-referrer"
              onError={(e) => console.error(`Header Icon failed to load: ${hotelIcon}`, e)}
            />
          </div>
          <h1 className="text-lg font-bold tracking-tight text-on-surface serif">
            THE TRANQUIL NEST
          </h1>
        </div>
        <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant/30">
          <img
            alt="Guest Profile"
            className="w-full h-full object-cover"
            src={settings?.guest_profile || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100"}
            referrerPolicy="no-referrer"
          />
        </div>
      </header>

      <main className="flex-grow pt-20 pb-32">
        {children}
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-6 pb-6 pt-3 flex justify-around items-center glass rounded-t-[24px] z-50 shadow-[0_-8px_32px_rgba(45,45,45,0.04)]">
        <NavItem
          icon={<Home strokeWidth={1.5} className="w-6 h-6" />}
          label="Home"
          active={activeScreen === 'home'}
          onClick={() => onScreenChange('home')}
        />
        <NavItem
          icon={<Bed strokeWidth={1.5} className="w-6 h-6" />}
          label="Rooms"
          active={activeScreen === 'rooms' || activeScreen === 'room-detail'}
          onClick={() => onScreenChange('rooms')}
        />
        <NavItem
          icon={<Utensils strokeWidth={1.5} className="w-6 h-6" />}
          label="Restaurant"
          active={activeScreen === 'restaurant'}
          onClick={() => onScreenChange('restaurant')}
        />
        <NavItem
          icon={<User strokeWidth={1.5} className="w-6 h-6" />}
          label="Admin"
          active={activeScreen === 'account'}
          onClick={() => onScreenChange('account')}
        />
      </nav>
    </div>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

function NavItem({ icon, label, active, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center transition-all duration-300 px-2 py-1 rounded-xl",
        active 
          ? "text-primary" 
          : "text-on-surface/40 hover:text-on-surface/60"
      )}
    >
      <div className="relative">
        {icon}
        {active && (
          <motion.div
            layoutId="nav-active-dot"
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
          />
        )}
      </div>
      <span className="text-[10px] font-medium uppercase tracking-wider mt-1 sans">
        {label}
      </span>
    </button>
  );
}
