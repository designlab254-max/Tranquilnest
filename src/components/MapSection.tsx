import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation } from 'lucide-react';

export default function MapSection() {
  return (
    <section className="px-6 py-16 bg-surface-variant/30">
      <div className="mb-8">
        <span className="text-primary font-bold tracking-[0.2em] uppercase block mb-2 text-[10px] sans">
          Location
        </span>
        <h2 className="text-3xl font-medium tracking-tight text-on-surface serif">
          Find Your Way Home
        </h2>
        <p className="text-on-surface-variant max-w-xs text-sm mt-3 sans leading-relaxed">
          Nestled in the heart of tranquility, where the city's pulse fades into the song of the birds.
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative rounded-3xl overflow-hidden border border-outline-variant/20 shadow-xl shadow-primary/5 h-[300px] bg-surface"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.277435123456!2d34.2881!3d0.1747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1780000000000001%3A0x0!2sUgunja%2C%20Kenya!5e0!3m2!1sen!2ske!4v1713083103000!5m2!1sen!2ske"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale contrast-125 opacity-80"
        />
        
        <div className="absolute bottom-4 left-4 right-4">
          <a 
            href="https://maps.app.goo.gl/V2xJNzZQGDcmUmnq8"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between bg-surface/90 backdrop-blur-md p-4 rounded-2xl border border-outline-variant/20 shadow-lg group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary sans">The Tranquil Nest</p>
                <p className="text-xs text-on-surface-variant sans">Ugunja Town, Siaya County</p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center group-hover:scale-110 transition-transform">
              <Navigation className="w-5 h-5" />
            </div>
          </a>
        </div>
      </motion.div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-surface border border-outline-variant/10">
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary sans mb-1">Location</p>
          <p className="text-sm font-medium serif leading-tight">Kisumu - Busia Road</p>
        </div>
        <div className="p-4 rounded-2xl bg-surface border border-outline-variant/10">
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary sans mb-1">Airport</p>
          <p className="text-sm font-medium serif leading-tight">80km from Kisumu Intl</p>
        </div>
      </div>
    </section>
  );
}
