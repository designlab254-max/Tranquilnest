import React, { useState } from 'react';
import { Room } from '@/src/types';
import { motion } from 'motion/react';
import { ChevronLeft, Ruler, Bed as BedIcon, Check, Calendar, Users, Mail, User, MessageCircle } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface RoomDetailProps {
  room: Room;
  onBack: () => void;
}

export default function RoomDetail({ room, onBack }: RoomDetailProps) {
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooking(true);
    // Simulate API call
    setTimeout(() => {
      setIsBooking(false);
      setBookingSuccess(true);
    }, 1500);
  };

  const handleWhatsAppConfirm = () => {
    const phoneNumber = "254740836940";
    const message = `Hello, I would like to confirm my stay at The Tranquil Nest Hotel.\n\nRoom: ${room.name}\nPrice: KES ${room.price.toLocaleString()}\n\nPlease let me know the next steps.`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (bookingSuccess) {
    return (
      <div className="px-6 flex flex-col items-center justify-center min-h-[70vh] text-center">
        <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
          <Check className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-medium text-on-surface serif mb-4">Booking Confirmed</h2>
        <p className="text-on-surface-variant sans text-sm leading-relaxed mb-8">
          Thank you for choosing The Tranquil Nest Hotel. A confirmation email has been sent to your inbox.
        </p>
        <button 
          onClick={onBack}
          className="w-full bg-primary text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest sans"
        >
          Back to Rooms
        </button>
      </div>
    );
  }

  return (
    <div className="pb-12">
      {/* Header Image */}
      <div className="relative h-[40vh] overflow-hidden">
        <img
          src={room.image}
          alt={room.name}
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
                Sanctuary
              </span>
              <h1 className="text-3xl font-medium tracking-tight text-on-surface serif">
                {room.name}
              </h1>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-primary sans">
                KES {room.price.toLocaleString()}
              </span>
              <span className="text-[10px] text-on-surface-variant uppercase block sans">per night</span>
            </div>
          </div>

          <div className="flex gap-6 mb-8 py-4 border-y border-outline-variant/10">
            <div className="flex items-center gap-2">
              <Ruler className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium sans text-on-surface-variant">{room.size}</span>
            </div>
            <div className="flex items-center gap-2">
              <BedIcon className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium sans text-on-surface-variant">{room.bed}</span>
            </div>
          </div>

          <div className="space-y-6 mb-10">
            <p className="text-on-surface-variant text-sm leading-relaxed sans">
              {room.longDescription || room.description}
            </p>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface mb-4 sans">Amenities</h3>
              <div className="grid grid-cols-2 gap-y-3">
                {(room.amenities || room.features).map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                    <span className="text-xs text-on-surface-variant sans">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/10 shadow-ambient">
            <h3 className="text-xl font-medium text-on-surface serif mb-6">Confirm Your Stay</h3>
            <form onSubmit={handleBooking} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant sans ml-1">Check In</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                    <input type="date" required className="w-full bg-surface border border-outline-variant/20 rounded-lg py-2.5 pl-10 pr-3 text-xs sans focus:outline-none focus:border-primary" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant sans ml-1">Check Out</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                    <input type="date" required className="w-full bg-surface border border-outline-variant/20 rounded-lg py-2.5 pl-10 pr-3 text-xs sans focus:outline-none focus:border-primary" />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant sans ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                  <input type="text" placeholder="John Doe" required className="w-full bg-surface border border-outline-variant/20 rounded-lg py-2.5 pl-10 pr-3 text-xs sans focus:outline-none focus:border-primary" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant sans ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                  <input type="email" placeholder="john@example.com" required className="w-full bg-surface border border-outline-variant/20 rounded-lg py-2.5 pl-10 pr-3 text-xs sans focus:outline-none focus:border-primary" />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isBooking}
                className={cn(
                  "w-full bg-primary text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest sans mt-4 transition-all active:scale-[0.98]",
                  isBooking && "opacity-70 cursor-not-allowed"
                )}
              >
                {isBooking ? "Processing..." : "Confirm Booking"}
              </button>

              <div className="relative flex items-center gap-4 my-4">
                <div className="h-px flex-grow bg-outline-variant/20"></div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant sans">or</span>
                <div className="h-px flex-grow bg-outline-variant/20"></div>
              </div>

              <button 
                type="button"
                onClick={handleWhatsAppConfirm}
                className="w-full bg-[#25D366] text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest sans flex items-center justify-center gap-2 transition-all active:scale-[0.98] hover:bg-[#20ba5a]"
              >
                <MessageCircle className="w-4 h-4" />
                Confirm via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
