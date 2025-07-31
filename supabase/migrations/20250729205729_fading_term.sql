/*
  # Insert sample products

  1. Sample Data
    - Add sample products for each category
    - Include multiple images for each product
    - Set some products as featured
    - Add discount products
  2. Categories covered
    - Superiores (tops)
    - Inferiores (bottoms)
    - Calzado (footwear)
    - Products with discounts
*/

-- Insert sample products

-- INSERT INTO products (name, description, price, category_id, images, discount, stock, featured) 
-- SELECT 
--   'Blusa Elegante Amber',
--   'Blusa de seda premium con corte elegante, perfecta para ocasiones especiales.',
--   89.99,
--   c.id,
--   ARRAY[
--     'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg',
--     'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg'
--   ],
--   0,
--   15,
--   true
-- FROM categories c WHERE c.name = 'Superiores'
-- ON CONFLICT DO NOTHING;

-- INSERT INTO products (name, description, price, category_id, images, discount, stock, featured) 
-- SELECT 
--   'Camisa Clásica',
--   'Camisa de algodón premium con diseño atemporal y corte perfecto.',
--   69.99,
--   c.id,
--   ARRAY[
--     'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg',
--     'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg'
--   ],
--   0,
--   20,
--   false
-- FROM categories c WHERE c.name = 'Superiores'
-- ON CONFLICT DO NOTHING;

-- INSERT INTO products (name, description, price, category_id, images, discount, stock, featured) 
-- SELECT 
--   'Pantalón Palazzo',
--   'Pantalón de corte palazzo en tela fluida, cómodo y elegante.',
--   79.99,
--   c.id,
--   ARRAY[
--     'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg',
--     'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg'
--   ],
--   0,
--   12,
--   true
-- FROM categories c WHERE c.name = 'Inferiores'
-- ON CONFLICT DO NOTHING;

-- INSERT INTO products (name, description, price, category_id, images, discount, stock, featured) 
-- SELECT 
--   'Jeans Premium',
--   'Jeans de mezclilla premium con corte moderno y acabados de lujo.',
--   99.99,
--   c.id,
--   ARRAY[
--     'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg',
--     'https://images.pexels.com/photos/1598509/pexels-photo-1598509.jpeg'
--   ],
--   15,
--   8,
--   false
-- FROM categories c WHERE c.name = 'Inferiores'
-- ON CONFLICT DO NOTHING;

-- INSERT INTO products (name, description, price, category_id, images, discount, stock, featured) 
-- SELECT 
--   'Zapatos de Cuero',
--   'Zapatos de cuero genuino hechos a mano con diseño elegante.',
--   149.99,
--   c.id,
--   ARRAY[
--     'https://images.pexels.com/photos/1598506/pexels-photo-1598506.jpeg',
--     'https://images.pexels.com/photos/1598510/pexels-photo-1598510.jpeg'
--   ],
--   0,
--   10,
--   true
-- FROM categories c WHERE c.name = 'Calzado'
-- ON CONFLICT DO NOTHING;

-- INSERT INTO products (name, description, price, category_id, images, discount, stock, featured) 
-- SELECT 
--   'Botas Elegantes',
--   'Botas de cuero con tacón medio, perfectas para cualquier ocasión.',
--   129.99,
--   c.id,
--   ARRAY[
--     'https://images.pexels.com/photos/1598511/pexels-photo-1598511.jpeg',
--     'https://images.pexels.com/photos/1598512/pexels-photo-1598512.jpeg'
--   ],
--   25,
--   6,
--   false
-- FROM categories c WHERE c.name = 'Calzado'
-- ON CONFLICT DO NOTHING;

-- -- Add more discount products
-- INSERT INTO products (name, description, price, category_id, images, discount, stock, featured) 
-- SELECT 
--   'Vestido de Temporada',
--   'Vestido elegante de la colección pasada con descuento especial.',
--   119.99,
--   c.id,
--   ARRAY[
--     'https://images.pexels.com/photos/1536620/pexels-photo-1536620.jpeg',
--     'https://images.pexels.com/photos/1536621/pexels-photo-1536621.jpeg'
--   ],
--   30,
--   5,
--   false
-- FROM categories c WHERE c.name = 'Superiores'
-- ON CONFLICT DO NOTHING;