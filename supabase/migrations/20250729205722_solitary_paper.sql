/*
  # Create categories table

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on `categories` table
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are publicly readable"
  ON categories
  FOR SELECT
  TO public
  USING (true);

-- Insert default categories
-- INSERT INTO categories (name) VALUES 
--   ('Superiores'),
--   ('Inferiores'),
--   ('Calzado'),
--   ('Descuentos')
-- ON CONFLICT (name) DO NOTHING;