import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Product, Category } from '../types';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (categoriesError) throw categoriesError;

      // Fetch products with categories
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select(`
          *,
          category:categories(id, name)
        `)
        .order('created_at', { ascending: false });

      if (productsError) throw productsError;

      setCategories(categoriesData || []);
      setProducts(productsData || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar datos');
    } finally {
      setLoading(false);
    }
  };

  const getProductsByCategory = (categoryName: string) => {
    if (categoryName === 'Todos') return products;
    return products.filter(product => 
      product.category?.name.toLowerCase() === categoryName.toLowerCase()
    );
  };

  const getFeaturedProducts = () => {
    return products.filter(product => product.featured);
  };

  const getDiscountedProducts = () => {
    return products.filter(product => product.discount && product.discount > 0);
  };

  return {
    products,
    categories,
    loading,
    error,
    getProductsByCategory,
    getFeaturedProducts,
    getDiscountedProducts,
    refetch: fetchData
  };
}