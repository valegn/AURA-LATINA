import React from 'react';
import { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { Loader2 } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  category: string;
}

export function ProductGrid({ products, loading, category }: ProductGridProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-amber-600 mx-auto mb-4" />
          <p className="text-gray-600">Cargando productos...</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500">
          <p className="text-lg font-medium mb-2">No hay productos disponibles</p>
          <p className="text-sm">
            {category === 'Todos' 
              ? 'No se encontraron productos en esta tienda.' 
              : `No hay productos en la categoría "${category}".`
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}