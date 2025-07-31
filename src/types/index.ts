export interface Category {
  id: string;
  name: string;
  created_at?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category_id: string;
  images: string[];
  discount?: number;
  stock: number;
  featured?: boolean;
  created_at?: string;
  category?: Category;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}