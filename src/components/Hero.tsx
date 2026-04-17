import React from 'react';
import { Phone, Calendar, MessageCircle, Share2, Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.672 1.433 5.662 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function Hero({ settings }: { settings?: Record<string, string> }) {
  const hotelIcon = settings?.hotel_icon || "https://images.unsplash.com/photo-1551219059-b5f8e7acee56?auto=format&fit=crop&w=200&q=80";
  const hotelAvatar = settings?.hotel_avatar || "N";
  const heroBackground = settings?.hero_background || "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80";

  const isAvatarImage = hotelAvatar.startsWith('http') || hotelAvatar.startsWith('/uploads') || hotelAvatar.startsWith('data:');
  const phoneNumber = "+254740836940";

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'The Tranquil Nest Hotel',
          text: 'Check out this beautiful hotel!',
          url: window.location.href,
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <section className="relative mb-12 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-ambient relative border border-outline-variant/10"
      >
        {/* Top Right Bird Icon */}
        <div className="absolute top-4 right-4 z-20 w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-lg">
          <img 
            key={hotelIcon}
            src={hotelIcon} 
            alt="Hotel Icon" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => console.error(`Failed to load Hotel Icon: ${hotelIcon}`, e)}
          />
        </div>

        {/* Header Image with Overlay */}
        <div className="relative h-[280px] overflow-hidden">
          <img
            key={heroBackground}
            src={heroBackground}
            alt="Hero Background"
            className="w-full h-full object-cover brightness-90"
            referrerPolicy="no-referrer"
            onError={(e) => console.error(`Failed to load Hero Background: ${heroBackground}`, e)}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-surface-container-lowest"></div>
          
          {/* Central Identity */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
            <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white text-4xl font-light serif shadow-2xl border-4 border-white/20 overflow-hidden">
              {isAvatarImage ? (
                <img 
                  key={hotelAvatar} 
                  src={hotelAvatar} 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer" 
                  onError={(e) => console.error(`Failed to load Hotel Avatar: ${hotelAvatar}`, e)}
                />
              ) : (
                hotelAvatar
              )}
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="px-6 pb-8 pt-10 text-center">
          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            <ActionButton 
              icon={<Phone strokeWidth={1.5} className="w-5 h-5" />} 
              label="Call" 
              onClick={() => window.location.href = `tel:${phoneNumber}`}
              className="hover:bg-blue-50 text-blue-600"
            />
            <ActionButton 
              icon={<WhatsAppIcon />} 
              label="WhatsApp" 
              onClick={() => window.open(`https://wa.me/${phoneNumber.replace('+', '')}`, '_blank')}
              className="hover:bg-green-50 text-green-600"
            />
            <ActionButton 
              icon={<Share2 strokeWidth={1.5} className="w-5 h-5" />} 
              label="Share" 
              onClick={handleShare}
              className="hover:bg-purple-50 text-purple-600"
            />
          </div>

          {/* Name and Designation */}
          <div className="space-y-2">
            <h2 className="text-3xl font-medium tracking-tight text-on-surface serif">
              The Tranquil Nest Hotel
            </h2>
            <p className="text-on-surface-variant font-medium tracking-[0.2em] text-[10px] uppercase sans italic">
              "Every nest has its tale"
            </p>
          </div>

          {/* Social Media Icons Row */}
          <div className="flex justify-center gap-4 mt-8">
            <SocialIcon icon={<Instagram className="w-5 h-5" />} />
            <SocialIcon icon={<Facebook className="w-5 h-5" />} />
            <SocialIcon icon={<XIcon />} />
          </div>

          {/* Person Info Section */}
          <div className="mt-6 pt-6 border-t border-outline-variant/10">
            <h3 className="text-lg font-medium text-on-surface serif">Chrispeter Limbe</h3>
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary sans">Sales & Marketing</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function ActionButton({ icon, label, onClick, className }: { icon: React.ReactNode; label: string; onClick?: () => void; className?: string }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center transition-all duration-300 active:scale-95 space-y-2 group p-2 rounded-2xl",
        className || "text-primary"
      )}
    >
      <div className={cn(
        "w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300",
        className ? "bg-current/10 group-hover:bg-current/20" : "bg-primary/5 group-hover:bg-primary/10"
      )}>
        {icon}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-widest sans">{label}</span>
    </button>
  );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <a
      href="#"
      className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-md hover:bg-primary-dark transition-all hover:scale-110 active:scale-90"
    >
      {icon}
    </a>
  );
}
