import { Room, MenuItem, WellnessService } from './types';

export const rooms: Room[] = [
  {
    id: 'executive-suite',
    name: 'Executive Suite',
    description: 'A masterpiece of understated luxury. Neutral tones and premium materials converge to create a space that breathes.',
    longDescription: 'Our Executive Suite is designed for the discerning traveler who appreciates the finer things in life. Featuring a spacious living area, a dedicated workspace, and a master bedroom with a plush king-sized bed, this suite offers the perfect blend of comfort and functionality. The bathroom is a sanctuary in itself, equipped with a deep stone soaking tub and premium organic toiletries.',
    price: 45000, // KES
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80',
    features: ['Stone Tub'],
    size: '650 sq ft',
    bed: 'King Bed',
    isBestSeller: true,
    amenities: ['High-speed Wi-Fi', 'Smart TV', 'Mini-bar', 'Nespresso machine', '24-hour room service', 'Premium linens']
  },
  {
    id: 'garden-terrace',
    name: 'Garden Terrace',
    description: 'Harmonize with nature. This room opens directly into our hidden courtyard.',
    longDescription: 'The Garden Terrace room offers a unique indoor-outdoor living experience. Large floor-to-ceiling windows flood the room with natural light and lead directly to a private patio overlooking our lush, manicured gardens. It is the ideal choice for those seeking a peaceful retreat and a direct connection to nature.',
    price: 32000, // KES
    image: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=800&q=80',
    features: ['Private Terrace', 'High Speed Wifi'],
    size: '500 sq ft',
    bed: 'Queen Bed',
    amenities: ['Private patio', 'Garden views', 'Wi-Fi', 'Coffee maker', 'Luxury bathrobes']
  },
  {
    id: 'zen-studio',
    name: 'Zen Studio',
    description: 'A sanctuary for the solo traveler or those seeking absolute quiet.',
    longDescription: 'The Zen Studio is a masterclass in minimalist design. Every element has been carefully chosen to promote mindfulness and tranquility. From the soft, ambient lighting to the natural wood finishes, this room provides a clutter-free environment where you can truly disconnect and recharge.',
    price: 27500, // KES
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
    features: ['Yoga Mat Provided'],
    size: '350 sq ft',
    bed: 'Full Bed',
    amenities: ['Yoga mat', 'Meditation cushion', 'Aromatherapy diffuser', 'Wi-Fi', 'Organic tea selection']
  }
];

export const wellnessServices: WellnessService[] = [
  {
    id: 'swedish-massage',
    name: 'Swedish Massage',
    description: 'A classic full-body massage using long, gliding strokes to promote relaxation and circulation.',
    priceKES: 8500,
    image: 'https://images.unsplash.com/photo-1544161515-4af6b1d46af0?auto=format&fit=crop&w=800&q=80',
    duration: '60 min'
  },
  {
    id: 'deep-tissue',
    name: 'Deep Tissue Massage',
    description: 'Targets deep layers of muscle and connective tissue to release chronic tension.',
    priceKES: 10500,
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80',
    duration: '90 min'
  },
  {
    id: 'sauna-session',
    name: 'Infrared Sauna',
    description: 'Detoxify and relax in our state-of-the-art infrared sauna suite.',
    priceKES: 4500,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    duration: '45 min'
  },
  {
    id: 'steam-room',
    name: 'Aromatherapy Steam',
    description: 'Clear your mind and skin with our eucalyptus-infused steam experience.',
    priceKES: 3500,
    image: 'https://images.unsplash.com/photo-1532347922424-c652d9b7208e?auto=format&fit=crop&w=800&q=80',
    duration: '30 min'
  }
];

export const menuItems: MenuItem[] = [
  // Main Dishes
  {
    id: 'ugali-nyama',
    name: 'Ugali & Nyama (Beef/Goat)',
    category: 'Main Course',
    description: 'A firm maize flour staple (ugali) served with tender beef or goat meat cooked either in a rich tomato-onion gravy or dry-fried (nyama choma style). Often accompanied by sukuma wiki or kachumbari.',
    price: 850,
    image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=600&q=80',
    allergens: ['None']
  },
  {
    id: 'ugali-sukuma',
    name: 'Ugali & Sukuma Wiki',
    category: 'Main Course',
    description: 'A simple, everyday Kenyan dish featuring ugali paired with sukuma wiki (collard greens) sautéed with onions, tomatoes, and mild spices.',
    price: 450,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
    allergens: ['None']
  },
  {
    id: 'pilau',
    name: 'Pilau (Beef or Chicken)',
    category: 'Main Course',
    description: 'Fragrant rice dish cooked in pilau masala, garlic, ginger, and stock, with tender chunks of beef or chicken. A coastal-influenced favorite.',
    price: 950,
    image: 'https://images.unsplash.com/photo-1596797038558-9da50b1a73ce?auto=format&fit=crop&w=600&q=80',
    allergens: ['Spices']
  },
  {
    id: 'biryani',
    name: 'Biryani (Chicken/Beef)',
    category: 'Main Course',
    description: 'Rich and aromatic dish with basmati rice layered with marinated meat, fried onions, and spices. Served with kachumbari.',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80',
    allergens: ['Dairy', 'Spices']
  },
  {
    id: 'githeri',
    name: 'Githeri',
    category: 'Main Course',
    description: 'Traditional Kikuyu dish made with boiled maize and beans, fried with onions, tomatoes, and spices. Hearty and nutritious.',
    price: 550,
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80',
    allergens: ['None']
  },
  {
    id: 'mukimo',
    name: 'Mukimo',
    category: 'Main Course',
    description: 'A mashed blend of potatoes, maize, pumpkin leaves or peas, served with beef stew or roasted meat.',
    price: 750,
    image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=600&q=80',
    allergens: ['None']
  },
  {
    id: 'matoke',
    name: 'Matoke (Banana Stew)',
    category: 'Main Course',
    description: 'Green bananas cooked in a savory tomato-based sauce with onions, garlic, and sometimes beef. Soft and comforting.',
    price: 650,
    image: 'https://images.unsplash.com/photo-1594971475674-6a97f8fe8c2b?auto=format&fit=crop&w=600&q=80',
    allergens: ['None']
  },
  {
    id: 'chapati-stew',
    name: 'Chapati & Beef Stew',
    category: 'Main Course',
    description: 'Soft, layered chapatis served with rich beef stew. A common street and home meal.',
    price: 800,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80',
    allergens: ['Gluten']
  },

  // Grills & Roasts
  {
    id: 'nyama-choma',
    name: 'Nyama Choma (Goat/Beef)',
    category: 'Main Course',
    description: 'Kenya’s signature dish—chunks of goat or beef roasted over open charcoal until smoky and tender. Served with kachumbari and ugali.',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    allergens: ['None']
  },
  {
    id: 'kuku-choma',
    name: 'Kuku Choma (Grilled Chicken)',
    category: 'Main Course',
    description: 'Marinated chicken grilled over charcoal, crispy outside and juicy inside. Served with chili sauce and kachumbari.',
    price: 1350,
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80',
    allergens: ['None']
  },
  {
    id: 'fish-tilapia',
    name: 'Fish (Tilapia Whole Fry)',
    category: 'Main Course',
    description: 'Fresh tilapia marinated and deep-fried whole. Served with ugali, sukuma wiki, and kachumbari.',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&w=600&q=80',
    allergens: ['Fish']
  },

  // Fast Food & Street Favorites
  {
    id: 'chips-masala',
    name: 'Chips Masala',
    category: 'Appetizers',
    description: 'Deep-fried potatoes tossed in a rich tomato, chili, and spice sauce. A popular urban fast food dish.',
    price: 450,
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=600&q=80',
    allergens: ['Spices']
  },
  {
    id: 'samosa',
    name: 'Samosa (Beef/Veg)',
    category: 'Appetizers',
    description: 'Triangular pastries filled with spiced minced meat or vegetables, deep-fried until golden and crispy.',
    price: 300,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
    allergens: ['Gluten']
  },

  // Sides
  {
    id: 'kachumbari',
    name: 'Kachumbari',
    category: 'Appetizers',
    description: 'A refreshing mix of tomatoes, onions, coriander, and chili, lightly seasoned with lemon juice.',
    price: 200,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    allergens: ['None']
  },

  // Desserts
  {
    id: 'mandazi',
    name: 'Mandazi',
    category: 'Desserts',
    description: 'Lightly sweet, fluffy fried dough flavored with coconut or cardamom. Perfect with tea.',
    price: 250,
    image: 'https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&w=600&q=80',
    allergens: ['Gluten', 'Dairy']
  },
  {
    id: 'fruit-plate',
    name: 'Fruit Plate',
    category: 'Desserts',
    description: 'Selection of tropical fruits like mango, pineapple, watermelon, and pawpaw.',
    price: 400,
    image: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?auto=format&fit=crop&w=600&q=80',
    allergens: ['None']
  },

  // Beverages
  {
    id: 'chai',
    name: 'Kenyan Chai',
    category: 'Drinks',
    description: 'Strong black tea brewed with milk, sugar, and sometimes spices like ginger or cardamom.',
    price: 200,
    image: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=600&q=80',
    allergens: ['Dairy']
  },
  {
    id: 'fresh-juice',
    name: 'Fresh Juice',
    category: 'Drinks',
    description: 'Freshly squeezed juices (Mango, Passion, or Sugarcane), sweet and refreshing.',
    price: 350,
    image: 'https://images.unsplash.com/photo-1622597467827-43c0531b7958?auto=format&fit=crop&w=600&q=80',
    allergens: ['None']
  },
  {
    id: 'tusker',
    name: 'Tusker Beer',
    category: 'Drinks',
    description: 'Kenya’s most famous beer, smooth and slightly bitter.',
    price: 500,
    image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=600&q=80',
    allergens: ['Alcohol']
  }
];
