import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  Settings, 
  Bell, 
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  Edit2,
  Save,
  X,
  Plus,
  Image as ImageIcon,
  Trash2
} from 'lucide-react';
import { Room, MenuItem } from '@/src/types';

interface AdminDashboardProps {
  rooms: Room[];
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  settings: Record<string, string>;
  setSettings: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

export default function AdminDashboard({ rooms, setRooms, menuItems, setMenuItems, settings, setSettings }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'inventory' | 'menu' | 'branding' | 'home'>('overview');
  const [editingItem, setEditingItem] = useState<{ type: 'room' | 'menu', id: string } | null>(null);

  const handleUpdateSetting = async (key: string, value: string) => {
    try {
      const res = await fetch(`/api/settings/${key}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Failed to update setting');
      setSettings(prev => ({ ...prev, [key]: value }));
    } catch (err) {
      throw err;
    }
  };

  const handleUpdateRoom = async (id: string, updates: Partial<Room>) => {
    try {
      const res = await fetch(`/api/rooms/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (!res.ok) throw new Error('Failed to update room');
      setRooms(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
      setEditingItem(null);
    } catch (err) {
      throw err;
    }
  };

  const handleUpdateMenu = async (id: string, updates: Partial<MenuItem>) => {
    try {
      const res = await fetch(`/api/menu/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (!res.ok) throw new Error('Failed to update menu item');
      setMenuItems(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
      setEditingItem(null);
    } catch (err) {
      throw err;
    }
  };

  const handleAddRoom = async () => {
    const newRoom = { name: 'New Sanctuary', price: 15000, description: '...', image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80' };
    const res = await fetch('/api/rooms', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newRoom) });
    const data = await res.json();
    setRooms(prev => [...prev, data.room]);
    setEditingItem({ type: 'room', id: data.room.id });
  };

  const handleAddMenu = async () => {
    const newItem = { name: 'New Dish', price: 1200, description: '...', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80', category: 'Main Course' };
    const res = await fetch('/api/menu', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newItem) });
    const data = await res.json();
    setMenuItems(prev => [...prev, data.item]);
    setEditingItem({ type: 'menu', id: data.item.id });
  };

  const handleDeleteRoom = async (id: string) => {
    if (!confirm('Delete room?')) return;
    await fetch(`/api/rooms/${id}`, { method: 'DELETE' });
    setRooms(prev => prev.filter(r => r.id !== id));
  };

  const handleDeleteMenu = async (id: string) => {
    if (!confirm('Delete menu item?')) return;
    await fetch(`/api/menu/${id}`, { method: 'DELETE' });
    setMenuItems(prev => prev.filter(m => m.id !== id));
  };

  const handleResetBranding = async () => {
    const defaults = { hotel_icon: "https://images.unsplash.com/photo-1551219059-b5f8e7acee56?auto=format&fit=crop&w=200&q=80", hotel_avatar: "N", hero_background: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80" };
    for (const [key, value] of Object.entries(defaults)) await handleUpdateSetting(key, value);
  };

  return (
    <div className="px-6 pb-24">
      {/* ... (Keep your Header and Tabs structure exactly as it was) ... */}
      <AnimatePresence mode="wait">
        {/* ... (Keep your activeTab views) ... */}
        {activeTab === 'branding' && (
          // ... (Ensure BrandingItem components are rendered here)
        )}
      </AnimatePresence>
    </div>
  );
}

// ... (Keep TabButton, StatCard, ActivityItem components) ...

function BrandingItem({ label, value, onSave }: { label: string; value: string; onSave: (val: string) => Promise<void> }) {
  const [val, setVal] = useState(value);
  const [isUploading, setIsUploading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  React.useEffect(() => { setVal(value); setHasChanges(false); }, [value]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await res.json();
    if (data.imageUrl) {
      setVal(data.imageUrl);
      setHasChanges(true);
    }
    setIsUploading(false);
  };

  // ... (Keep handleSave and handleCancel) ...

  const isImage = val?.length > 2 && (val.startsWith('http') || val.startsWith('/uploads') || val.startsWith('data:'));

  return (
    <div className="bg-white p-6 rounded-2xl border border-outline-variant/10 shadow-sm space-y-4">
      {/* ... (Keep header UI) ... */}
      
      {/* --- THIS IS THE CRITICAL LINE 640 --- */}
      <div className="relative rounded-xl overflow-hidden border border-outline-variant/10 aspect-video bg-surface-variant/10 flex items-center justify-center">
        {isImage ? (
          <img 
            key={val + Date.now()} 
            src={val + (val.includes('?') ? '&' : '?') + 't=' + Date.now()} 
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer"
            onError={(e) => console.error(`Preview failed to load: ${val}`, e)}
          />
        ) : (
          <span className="text-4xl font-light serif text-primary">{val}</span>
        )}
        {/* ... */}
      </div>
    </div>
  );
}

// ... (Keep EditForm component, ensure similar cache-busting IMG tag) ...
