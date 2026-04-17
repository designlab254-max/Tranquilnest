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
    console.log(`Attempting to update setting: ${key} = ${value}`);
    try {
      const res = await fetch(`/api/settings/${key}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Failed to update setting');
      console.log('Update successful');
      setSettings(prev => ({ ...prev, [key]: value }));
    } catch (err) {
      console.error('Update failed with error:', err);
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
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Failed to update room');
      setRooms(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
      setEditingItem(null);
    } catch (err) {
      console.error('Update failed:', err);
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
      console.error('Update failed:', err);
      throw err;
    }
  };

  const handleAddRoom = async () => {
    const newRoom = {
      name: 'New Sanctuary',
      price: 15000,
      description: 'A beautiful new space for our guests.',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    };

    try {
      const res = await fetch('/api/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRoom)
      });
      if (!res.ok) throw new Error('Failed to add room');
      const data = await res.json();
      setRooms(prev => [...prev, data.room]);
      setEditingItem({ type: 'room', id: data.room.id });
    } catch (err) {
      console.error('Add failed:', err);
      throw err;
    }
  };

  const handleAddMenu = async () => {
    const newItem = {
      name: 'New Dish',
      price: 1200,
      description: 'A delicious new addition to our menu.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      category: 'Main Course'
    };

    try {
      const res = await fetch('/api/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      });
      if (!res.ok) throw new Error('Failed to add menu item');
      const data = await res.json();
      setMenuItems(prev => [...prev, data.item]);
      setEditingItem({ type: 'menu', id: data.item.id });
    } catch (err) {
      console.error('Add failed:', err);
      throw err;
    }
  };

  const handleDeleteRoom = async (id: string) => {
    if (!confirm('Are you sure you want to delete this room?')) return;
    try {
      const res = await fetch(`/api/rooms/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete room');
      setRooms(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
      throw err;
    }
  };

  const handleDeleteMenu = async (id: string) => {
    if (!confirm('Are you sure you want to delete this menu item?')) return;
    try {
      const res = await fetch(`/api/menu/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete menu item');
      setMenuItems(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
      throw err;
    }
  };

  const handleResetBranding = async () => {
    const defaults = {
      hotel_icon: "https://images.unsplash.com/photo-1551219059-b5f8e7acee56?auto=format&fit=crop&w=200&q=80",
      hotel_avatar: "N",
      hero_background: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
    };

    try {
      for (const [key, value] of Object.entries(defaults)) {
        await handleUpdateSetting(key, value);
      }
    } catch (err) {
      console.error('Reset failed:', err);
    }
  };

  return (
    <div className="px-6 pb-24">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <span className="text-primary font-bold tracking-[0.2em] uppercase block mb-1 text-[10px] sans">
            Management
          </span>
          <h1 className="text-3xl font-medium tracking-tight text-on-surface serif">
            Admin Portal
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => window.location.reload()}
            className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline sans"
          >
            Refresh App
          </button>
          <button className="relative w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center">
            <Bell className="w-5 h-5 text-on-surface-variant" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-surface"></span>
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-outline-variant/10 pb-2 overflow-x-auto no-scrollbar">
        <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} label="Overview" />
        <TabButton active={activeTab === 'inventory'} onClick={() => setActiveTab('inventory')} label="Rooms" />
        <TabButton active={activeTab === 'menu'} onClick={() => setActiveTab('menu')} label="Menu" />
        <TabButton active={activeTab === 'home'} onClick={() => setActiveTab('home')} label="Home Page" />
        <TabButton active={activeTab === 'branding'} onClick={() => setActiveTab('branding')} label="Branding" />
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <StatCard icon={<Calendar className="w-4 h-4 text-primary" />} label="Bookings" value="24" trend="+12%" />
              <StatCard icon={<Users className="w-4 h-4 text-primary" />} label="Guests" value="58" trend="+5%" />
              <StatCard icon={<TrendingUp className="w-4 h-4 text-primary" />} label="Revenue" value="KES 1.2M" trend="+18%" />
              <StatCard icon={<Settings className="w-4 h-4 text-primary" />} label="Occupancy" value="85%" trend="+2%" />
              <StatCard icon={<Users className="w-4 h-4 text-primary" />} label="Capacity" value="120" trend="Max" />
            </div>

            {/* Recent Activity */}
            <section className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface mb-4 sans">
                Recent Activity
              </h3>
              <div className="space-y-3">
                <ActivityItem icon={<CheckCircle2 className="w-4 h-4 text-green-500" />} title="New Booking" desc="John Doe - Executive Suite" time="2 mins ago" />
                <ActivityItem icon={<Clock className="w-4 h-4 text-amber-500" />} title="Check-out Pending" desc="Sarah Smith - Zen Studio" time="15 mins ago" />
                <ActivityItem icon={<AlertCircle className="w-4 h-4 text-primary" />} title="Maintenance Alert" desc="Room 104 - AC Service" time="1 hour ago" />
              </div>
            </section>
          </motion.div>
        )}

        {activeTab === 'inventory' && (
          <motion.div
            key="inventory"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface sans">Manage Rooms</h3>
              <button 
                onClick={handleAddRoom}
                className="text-primary flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest sans"
              >
                <Plus className="w-3 h-3" /> Add Room
              </button>
            </div>
            {rooms.map(room => (
              <div key={room.id} className="bg-white p-4 rounded-2xl border border-outline-variant/10 shadow-sm">
                {editingItem?.id === room.id ? (
                  <EditForm 
                    item={room} 
                    onSave={(updates) => handleUpdateRoom(room.id, updates)} 
                    onCancel={() => setEditingItem(null)} 
                  />
                ) : (
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <img src={room.image} className="w-12 h-12 rounded-lg object-cover" referrerPolicy="no-referrer" />
                      <div>
                        <h4 className="text-sm font-medium serif">{room.name}</h4>
                        <p className="text-[10px] text-on-surface-variant sans">KES {room.price.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => setEditingItem({ type: 'room', id: room.id })} className="p-2 text-on-surface-variant hover:text-primary">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDeleteRoom(room.id)} className="p-2 text-on-surface-variant hover:text-error">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'menu' && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface sans">Manage Menu</h3>
              <button 
                onClick={handleAddMenu}
                className="text-primary flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest sans"
              >
                <Plus className="w-3 h-3" /> Add Item
              </button>
            </div>
            {menuItems.map(item => (
              <div key={item.id} className="bg-white p-4 rounded-2xl border border-outline-variant/10 shadow-sm">
                {editingItem?.id === item.id ? (
                  <EditForm 
                    item={item} 
                    onSave={(updates) => handleUpdateMenu(item.id, updates)} 
                    onCancel={() => setEditingItem(null)} 
                  />
                ) : (
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <img src={item.image} className="w-12 h-12 rounded-lg object-cover" referrerPolicy="no-referrer" />
                      <div>
                        <h4 className="text-sm font-medium serif">{item.name}</h4>
                        <p className="text-[10px] text-on-surface-variant sans">KES {item.price.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => setEditingItem({ type: 'menu', id: item.id })} className="p-2 text-on-surface-variant hover:text-primary">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDeleteMenu(item.id)} className="p-2 text-on-surface-variant hover:text-error">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface sans">Home Page Images</h3>
            
            <BrandingItem 
              label="Accommodation Image" 
              value={settings.amenity_accommodation_image || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'} 
              onSave={(val) => handleUpdateSetting('amenity_accommodation_image', val)} 
            />
            
            <BrandingItem 
              label="Restaurant Image" 
              value={settings.amenity_restaurant_image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'} 
              onSave={(val) => handleUpdateSetting('amenity_restaurant_image', val)} 
            />
            
            <BrandingItem 
              label="Conferencing Image" 
              value={settings.amenity_conferencing_image || 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=600&q=80'} 
              onSave={(val) => handleUpdateSetting('amenity_conferencing_image', val)} 
            />

            <BrandingItem 
              label="Outside Catering Image" 
              value={settings.amenity_catering_image || 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80'} 
              onSave={(val) => handleUpdateSetting('amenity_catering_image', val)} 
            />

            <BrandingItem 
              label="Infinity Pool Image" 
              value={settings.amenity_pool_image || 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=600&q=80'} 
              onSave={(val) => handleUpdateSetting('amenity_pool_image', val)} 
            />
          </motion.div>
        )}

        {activeTab === 'branding' && (
          <motion.div
            key="branding"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface sans">Hotel Branding</h3>
              <div className="flex gap-4">
                <button 
                  onClick={handleResetBranding}
                  className="text-[8px] font-bold uppercase tracking-widest text-primary hover:underline sans"
                >
                  Reset to Defaults
                </button>
                <button 
                  onClick={async () => {
                    try {
                      const res = await fetch('/api/rooms');
                      const text = await res.text();
                      alert(`Server Status: ${res.status}\nResponse: ${text.substring(0, 100)}...`);
                    } catch (e) {
                      alert(`Server Unreachable: ${e instanceof Error ? e.message : String(e)}`);
                    }
                  }}
                  className="text-[8px] font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary sans"
                >
                  Check Server Status
                </button>
                <button 
                  onClick={() => console.log('Current Settings State:', settings)}
                  className="text-[8px] font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary sans"
                >
                  Log Settings to Console
                </button>
              </div>
            </div>
            
            <BrandingItem 
              label="Hotel Icon" 
              value={settings.hotel_icon || ''} 
              onSave={(val) => handleUpdateSetting('hotel_icon', val)} 
            />
            
            <BrandingItem 
              label="Hotel Avatar (Text or Image)" 
              value={settings.hotel_avatar || ''} 
              onSave={(val) => handleUpdateSetting('hotel_avatar', val)} 
            />
            
            <BrandingItem 
              label="Hero Background" 
              value={settings.hero_background || ''} 
              onSave={(val) => handleUpdateSetting('hero_background', val)} 
            />

            <BrandingItem 
              label="Guest Profile Image" 
              value={settings.guest_profile || ''} 
              onSave={(val) => handleUpdateSetting('guest_profile', val)} 
            />

            <div className="p-4 bg-surface-variant/10 rounded-xl border border-outline-variant/10">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2 sans">Raw Settings Data (Debug)</h4>
              <pre className="text-[8px] font-mono overflow-auto max-h-32 p-2 bg-black/5 rounded">
                {JSON.stringify(settings, null, 2)}
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TabButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`text-[10px] font-bold uppercase tracking-widest sans pb-2 transition-all ${active ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant border-b-2 border-transparent'}`}
    >
      {label}
    </button>
  );
}

function BrandingItem({ label, value, onSave }: { label: string; value: string; onSave: (val: string) => Promise<void> }) {
  const [val, setVal] = useState(value);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditingText, setIsEditingText] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  React.useEffect(() => {
    console.log(`BrandingItem [${label}] received new value:`, value);
    setVal(value);
    setHasChanges(false);
    setError(null);
  }, [value, label]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 4.5 * 1024 * 1024) {
      setError('Upload failed: Image must be less than 4.5MB');
      return;
    }

    setIsUploading(true);
    setError(null);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!res.ok) {
        const text = await res.text();
        console.error('[ADMIN] Upload failed with status:', res.status, text);
        let errorMsg = `Upload failed: ${res.status}`;
        try {
          const errorData = JSON.parse(text);
          errorMsg = `Upload failed: ${errorData.details || errorData.error || res.status}`;
        } catch (e) {
          // If not JSON, check if it's an HTML error page
          if (text.includes('<!DOCTYPE html>')) {
            errorMsg = 'Upload failed: Server returned HTML (possible proxy error)';
          }
        }
        setError(errorMsg);
        return;
      }

      const text = await res.text();
      
      // Check if the response is HTML even though it was a 200 OK
      if (text.trim().startsWith('<')) {
        console.error('[ADMIN] Server returned HTML instead of JSON. This usually means the backend endpoint is missing.');
        setError('Upload failed: Please Deploy the app to update the backend');
        return;
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error('[ADMIN] Failed to parse JSON response. Raw text:', text);
        setError('Upload failed: Invalid server response format');
        return;
      }

      console.log('[ADMIN] Upload response:', data);
      if (data.imageUrl) {
        setVal(data.imageUrl);
        setHasChanges(true);
        setIsEditingText(false);
      } else {
        setError('Upload failed: No URL');
        console.error('[ADMIN] Upload failed: No imageUrl in response', data);
      }
    } catch (err) {
      setError('Upload failed: Network error');
      console.error('[ADMIN] Upload failed with error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    try {
      await onSave(val);
      setHasChanges(false);
      setIsEditingText(false);
    } catch (err) {
      setError('Save failed');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setVal(value);
    setHasChanges(false);
    setIsEditingText(false);
  };

  const isImage = val?.length > 2 && (val.startsWith('http') || val.startsWith('/uploads') || val.startsWith('data:'));

  return (
    <div className="bg-white p-6 rounded-2xl border border-outline-variant/10 shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant sans">{label}</label>
          {error && <span className="text-[10px] text-error font-bold uppercase sans">{error}</span>}
        </div>
        <div className="flex gap-3">
          {hasChanges ? (
            <div className="flex gap-2">
              <button 
                onClick={handleCancel}
                disabled={isSaving}
                className="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest sans hover:underline disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="text-primary text-[10px] font-bold uppercase tracking-widest sans hover:underline flex items-center gap-1 disabled:opacity-50"
              >
                {isSaving ? (
                  <div className="w-3 h-3 border border-primary border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Save className="w-3 h-3" />
                )}
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          ) : (
            <>
              <button 
                onClick={() => setIsEditingText(!isEditingText)}
                className="text-primary text-[10px] font-bold uppercase tracking-widest sans hover:underline"
              >
                {isEditingText ? "Cancel" : "Edit Text"}
              </button>
              <label className="cursor-pointer text-primary text-[10px] font-bold uppercase tracking-widest sans hover:underline">
                Upload Image
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>
            </>
          )}
        </div>
      </div>
      
      {isEditingText ? (
        <div className="flex gap-2">
          <input 
            className="flex-grow text-sm font-medium serif border-b border-outline-variant/20 focus:outline-none focus:border-primary pb-1"
            value={val}
            onChange={(e) => {
              setVal(e.target.value);
              setHasChanges(e.target.value !== value);
            }}
            autoFocus
          />
        </div>
      ) : (
        <div className="relative rounded-xl overflow-hidden border border-outline-variant/10 aspect-video bg-surface-variant/10 flex items-center justify-center">
          {isImage ? (
            <img 
              key={val} 
              src={val} 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer"
              onError={(e) => console.error(`Preview failed to load: ${val}`, e)}
            />
          ) : (
            <span className="text-4xl font-light serif text-primary">{val}</span>
          )}
          {isUploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function EditForm({ item, onSave, onCancel }: { item: any; onSave: (updates: any) => void; onCancel: () => void }) {
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.price);
  const [desc, setDesc] = useState(item.description);
  const [category, setCategory] = useState(item.category || 'Main Course');
  const [imageUrl, setImageUrl] = useState(item.image || item.image_url);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isMenuItem = 'category' in item || item.id.startsWith('menu');

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 4.5 * 1024 * 1024) {
      setError('Upload failed: Image must be less than 4.5MB');
      return;
    }

    setIsUploading(true);
    setError(null);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!res.ok) {
        const text = await res.text();
        console.error('[ADMIN] EditForm upload failed:', res.status, text);
        let errorMsg = `Upload failed: ${res.status}`;
        try {
          const errorData = JSON.parse(text);
          errorMsg = errorData.details || errorData.error || errorMsg;
        } catch (e) {}
        setError(errorMsg);
        return;
      }

      const text = await res.text();
      
      // Check if the response is HTML even though it was a 200 OK
      if (text.trim().startsWith('<')) {
        console.error('[ADMIN] Server returned HTML instead of JSON. This usually means the backend endpoint is missing.');
        setError('Please Deploy the app to update the backend');
        return;
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error('[ADMIN] EditForm failed to parse JSON:', err);
        setError('Invalid server response');
        return;
      }

      if (data.imageUrl) {
        setImageUrl(data.imageUrl);
      } else {
        setError('No image URL returned');
      }
    } catch (err) {
      console.error('Upload failed:', err);
      setError('Network error');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4 mb-2">
        <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-outline-variant/20 bg-surface-variant/10">
          {imageUrl ? (
            <img key={imageUrl} src={imageUrl} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-on-surface-variant">
              <ImageIcon className="w-6 h-6" />
            </div>
          )}
          {isUploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="cursor-pointer bg-primary/10 text-primary px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest sans hover:bg-primary/20 transition-colors inline-block">
            Change Image
            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
          </label>
          {error && <span className="text-[8px] text-error font-bold sans">{error}</span>}
        </div>
      </div>
      <input 
        className="w-full text-sm font-medium serif border-b border-outline-variant/20 focus:outline-none focus:border-primary pb-1"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input 
        type="number"
        className="w-full text-[10px] sans border-b border-outline-variant/20 focus:outline-none focus:border-primary pb-1"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        placeholder="Price"
      />
      <textarea 
        className="w-full text-[10px] sans border border-outline-variant/20 p-2 rounded-lg focus:outline-none focus:border-primary"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Description"
        rows={2}
      />
      {isMenuItem && (
        <select 
          className="w-full text-[10px] sans border border-outline-variant/20 p-2 rounded-lg focus:outline-none focus:border-primary bg-white"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Appetizers">Appetizers</option>
          <option value="Main Course">Main Course</option>
          <option value="Desserts">Desserts</option>
          <option value="Drinks">Drinks</option>
        </select>
      )}
      <div className="flex justify-end gap-2 pt-2">
        <button onClick={onCancel} className="p-2 text-on-surface-variant hover:text-on-surface">
          <X className="w-4 h-4" />
        </button>
        <button onClick={() => onSave({ name, price, description: desc, image: imageUrl, image_url: imageUrl, category })} className="p-2 text-primary hover:text-primary-dark">
          <Save className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, trend }: { icon: React.ReactNode; label: string; value: string; trend: string }) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-outline-variant/10 shadow-ambient">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant sans">{label}</span>
      </div>
      <div className="flex items-baseline justify-between">
        <span className="text-lg font-bold text-on-surface sans">{value}</span>
        <span className="text-[8px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded sans">{trend}</span>
      </div>
    </div>
  );
}

function ActivityItem({ icon, title, desc, time }: { icon: React.ReactNode; title: string; desc: string; time: string }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-outline-variant/5 shadow-sm">
      <div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center">
        {icon}
      </div>
      <div className="flex-grow">
        <h4 className="text-xs font-bold text-on-surface sans">{title}</h4>
        <p className="text-[10px] text-on-surface-variant sans">{desc}</p>
      </div>
      <span className="text-[8px] text-on-surface-variant sans whitespace-nowrap">{time}</span>
    </div>
  );
}
