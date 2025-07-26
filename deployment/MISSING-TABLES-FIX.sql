-- QUICK FIX: Add missing tables to your existing database
-- Run this in phpMyAdmin if you already imported the basic schema

-- Check which tables exist first
SHOW TABLES;

-- Add Storage Items Table (if missing)
CREATE TABLE IF NOT EXISTS storage_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(255) NOT NULL,
    quantity_in_tons DECIMAL(10,2) NOT NULL,
    purchase_price_per_ton DECIMAL(10,2) NOT NULL,
    dealer_name VARCHAR(255) NOT NULL,
    dealer_contact VARCHAR(255),
    purchase_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add Activity Logs Table (if missing)
CREATE TABLE IF NOT EXISTS activity_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    log_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add Products Table (if missing)
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add Users Table (if missing)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add sample data for storage items
INSERT IGNORE INTO storage_items (item_name, quantity_in_tons, purchase_price_per_ton, dealer_name, dealer_contact, purchase_date) VALUES 
('Ammonium Nitrate', 150.5, 850.00, 'Cairo Chemical Supplies', '+20-2-123-4567', '2024-01-15'),
('Phosphoric Acid', 80.0, 1200.00, 'Alexandria Phosphate Co.', '+20-3-234-5678', '2024-01-20'),
('Potassium Chloride', 120.0, 950.00, 'Red Sea Minerals', '+20-65-345-6789', '2024-01-25'),
('Urea', 200.0, 780.00, 'Nile Fertilizers Ltd.', '+20-88-456-7890', '2024-02-01'),
('Sulfuric Acid', 60.0, 650.00, 'Egyptian Acids Corp.', '+20-97-567-8901', '2024-02-05');

-- Add sample activity logs
INSERT IGNORE INTO activity_logs (title, description, log_date) VALUES 
('Production Started', 'Started production of NPK fertilizer batch #2024-001', '2024-07-25'),
('Quality Check Completed', 'Quality control check completed for Ammonium Nitrate lot AN-2024-15', '2024-07-24'),
('Equipment Maintenance', 'Scheduled maintenance completed on mixing unit #3', '2024-07-23'),
('Safety Training', 'Monthly safety training conducted for all production staff', '2024-07-22'),
('Inventory Update', 'Received new shipment of Phosphoric Acid - 80 tons', '2024-07-21');

-- Add sample users
INSERT IGNORE INTO users (username, password) VALUES 
('admin', 'admin123'),
('manager', 'manager123');

-- Add sample products
INSERT IGNORE INTO products (name, unit_price, stock_quantity) VALUES 
('NPK Fertilizer 20-20-20', 45.50, 500),
('Ammonium Sulfate', 35.00, 300),
('Triple Superphosphate', 42.00, 250),
('Potassium Nitrate', 48.00, 200);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_storage_item_name ON storage_items(item_name);
CREATE INDEX IF NOT EXISTS idx_activity_logs_date ON activity_logs(log_date);

-- Check final table count
SELECT COUNT(*) as total_tables FROM information_schema.tables WHERE table_schema = DATABASE();

-- Show all tables
SHOW TABLES;