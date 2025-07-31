import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/Layout/Header';
import { Hero } from './components/UI/Hero';
import { ProductGrid } from './components/Products/ProductGrid';
import { CartSidebar } from './components/Cart/CartSidebar';
import { LoadingSpinner } from './components/UI/LoadingSpinner';
import { ErrorMessage } from './components/UI/ErrorMessage';
import { useProducts } from './hooks/useProducts';
import { Product } from './types';

function App() {
  const { 
    products, 
    categories, 
    loading, 
    error, 
    getProductsByCategory, 
    getDiscountedProducts,
    refetch 
  } = useProducts();
  
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [cartOpen, setCartOpen] = useState(false);
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (selectedCategory === 'Descuentos') {
      setDisplayProducts(getDiscountedProducts());
    } else {
      setDisplayProducts(getProductsByCategory(selectedCategory));
    }
  }, [selectedCategory, products]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  return (
    <div className="min-h-screen bg-white">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />

      <Header
        categories={categories}
        onCategorySelect={setSelectedCategory}
        onCartToggle={() => setCartOpen(true)}
        selectedCategory={selectedCategory}
      />

      {selectedCategory === 'Todos' && <Hero />}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {selectedCategory === 'Todos' 
              ? 'Nuestra Colección' 
              : selectedCategory === 'Descuentos'
              ? 'Productos en Descuento'
              : selectedCategory
            }
          </h2>
          <p className="text-gray-600">
            {displayProducts.length} producto{displayProducts.length !== 1 ? 's' : ''} disponible{displayProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        <ProductGrid 
          products={displayProducts}
          loading={loading}
          category={selectedCategory}
        />
      </main>

      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h3 
              className="text-2xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              AURA LATINA
            </h3>
            <p className="text-gray-600 mb-4">
              Elegancia y exclusividad en cada prenda
            </p>
            <p className="text-sm text-gray-500">
              © 2024 Amber. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;