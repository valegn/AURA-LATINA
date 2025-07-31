/*
  # Create products table

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `description` (text)
      - `price` (decimal, not null)
      - `category_id` (uuid, foreign key to categories)
      - `images` (text array for multiple images)
      - `discount` (integer, percentage)
      - `stock` (integer, default 0)
      - `featured` (boolean, default false)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on `products` table
    - Add policy for public read access
  3. Relationships
    - Foreign key constraint to categories table
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  price decimal(10,2) NOT NULL,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  images text[] DEFAULT '{}',
  discount integer DEFAULT 0,
  stock integer DEFAULT 0,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are publicly readable"
  ON products
  FOR SELECT
  TO public
  USING (true);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_products_discount ON products(discount);