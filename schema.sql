-- Categories Table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Sub-Categories Table
CREATE TABLE sub_categories (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(category_id, name)
);

-- Rooms Table
CREATE TABLE rooms (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    long_description TEXT,
    price DECIMAL(12, 2) NOT NULL,
    image_url TEXT,
    features TEXT[], -- Array of features
    size VARCHAR(50),
    bed VARCHAR(50),
    amenities TEXT[], -- Array of amenities
    is_best_seller BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Menu Items Table
CREATE TABLE menu_items (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(12, 2) NOT NULL,
    category_id INTEGER REFERENCES categories(id),
    sub_category_id INTEGER REFERENCES sub_categories(id),
    image_url TEXT,
    allergens TEXT[], -- Array of allergens
    calories INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Initial Data for Categories
INSERT INTO categories (name) VALUES 
('Main Course'), 
('Appetizers'), 
('Desserts'), 
('Drinks');

-- Initial Data for Sub-Categories
INSERT INTO sub_categories (category_id, name) VALUES 
((SELECT id FROM categories WHERE name = 'Main Course'), 'Kenyan Staples'),
((SELECT id FROM categories WHERE name = 'Main Course'), 'Grills & Roasts'),
((SELECT id FROM categories WHERE name = 'Appetizers'), 'Street Food'),
((SELECT id FROM categories WHERE name = 'Drinks'), 'Beverages'),
((SELECT id FROM categories WHERE name = 'Drinks'), 'Alcoholic');

-- Settings Table
CREATE TABLE settings (
    key VARCHAR(50) PRIMARY KEY,
    value TEXT NOT NULL
);

-- Initial Branding Data
INSERT INTO settings (key, value) VALUES 
('hotel_icon', 'https://images.unsplash.com/photo-1551219059-b5f8e7acee56?auto=format&fit=crop&w=200&q=80'),
('hotel_avatar', 'N'),
('hero_background', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80');
