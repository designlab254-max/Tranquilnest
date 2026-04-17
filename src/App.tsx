/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Amenities from './components/Amenities';
import RoomCard from './components/RoomCard';
import RestaurantMenu from './components/RestaurantMenu';
import RoomDetail from './components/RoomDetail';
import MenuDetail from './components/MenuDetail';
import Conferencing from './components/Conferencing';
import Catering from './components/Catering';
import MapSection from './components/MapSection';
import { Screen, Room, MenuItem } from './types';
import { rooms, menuItems } from './data';
import { motion, AnimatePresence } from 'motion/react';

import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('home');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  
  // Dynamic data state
  const [currentRooms, setCurrentRooms] = useState<Room[]>(rooms);
  const [currentMenuItems, setCurrentMenuItems] = useState<MenuItem[]>(menuItems);
  const [settings, setSettings] = useState<Record<string, string>>({
    hotel_icon: "https://images.unsplash.com/photo-1551219059-b5f8e7acee56?auto=format&fit=crop&w=200&q=80",
    hotel_avatar: "N",
    hero_background: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [roomsRes, menuRes, settingsRes] = await Promise.all([
        fetch('/api/rooms'),
        fetch('/api/menu'),
        fetch('/api/settings')
      ]);

      if (roomsRes.ok) {
        const data = await roomsRes.json();
        if (data.length > 0) setCurrentRooms(data);
      }
      if (menuRes.ok) {
        const data = await menuRes.json();
        if (data.length > 0) setCurrentMenuItems(data);
      }
      if (settingsRes.ok) {
        const data = await settingsRes.json();
        if (Object.keys(data).length > 0) {
          setSettings(prev => ({ ...prev, ...data }));
        }
      }
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room);
    setActiveScreen('room-detail');
  };

  const handleMenuItemClick = (item: MenuItem) => {
    setSelectedMenuItem(item);
    setActiveScreen('menu-detail');
  };

  const handleAmenitySelect = (id: string) => {
    if (id === 'accommodation') setActiveScreen('rooms');
    if (id === 'restaurant') setActiveScreen('restaurant');
    if (id === 'conferencing') setActiveScreen('conferencing');
    if (id === 'catering') setActiveScreen('catering');
  };

  return (
    <Layout activeScreen={activeScreen} onScreenChange={setActiveScreen} settings={settings}>
      <AnimatePresence mode="wait">
        {activeScreen === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Hero settings={settings} />
            <Amenities onSelectAmenity={handleAmenitySelect} settings={settings} />
            <MapSection />
          </motion.div>
        )}

        {activeScreen === 'rooms' && (
          <motion.div
            key="rooms"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6"
          >
            <header className="mb-10">
              <span className="text-primary font-bold tracking-[0.2em] uppercase block mb-2 text-[10px] sans">
                Sanctuaries
              </span>
              <h1 className="text-4xl font-medium tracking-tight text-on-surface serif">
                Our Rooms
              </h1>
              <p className="text-on-surface-variant max-w-xs text-sm mt-3 sans leading-relaxed">
                Discover spaces designed for deep rest and architectural silence.
              </p>
            </header>

            <div className="flex flex-col gap-8">
              {currentRooms.map((room, index) => (
                <RoomCard key={room.id} room={room} index={index} onClick={handleRoomClick} />
              ))}
            </div>
          </motion.div>
        )}

        {activeScreen === 'room-detail' && selectedRoom && (
          <motion.div
            key="room-detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <RoomDetail room={selectedRoom} onBack={() => setActiveScreen('rooms')} />
          </motion.div>
        )}

        {activeScreen === 'restaurant' && (
          <motion.div
            key="restaurant"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <RestaurantMenu 
              onItemClick={handleMenuItemClick} 
              items={currentMenuItems}
            />
          </motion.div>
        )}

        {activeScreen === 'menu-detail' && selectedMenuItem && (
          <motion.div
            key="menu-detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <MenuDetail item={selectedMenuItem} onBack={() => setActiveScreen('restaurant')} />
          </motion.div>
        )}

        {activeScreen === 'conferencing' && (
          <motion.div
            key="conferencing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Conferencing onBack={() => setActiveScreen('home')} />
          </motion.div>
        )}

        {activeScreen === 'catering' && (
          <motion.div
            key="catering"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Catering onBack={() => setActiveScreen('home')} />
          </motion.div>
        )}

        {activeScreen === 'account' && (
          <motion.div
            key="account"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {isAdminAuthenticated ? (
              <AdminDashboard 
                rooms={currentRooms} 
                setRooms={setCurrentRooms}
                menuItems={currentMenuItems}
                setMenuItems={setCurrentMenuItems}
                settings={settings}
                setSettings={setSettings}
              />
            ) : (
              <AdminLogin onLogin={() => setIsAdminAuthenticated(true)} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
