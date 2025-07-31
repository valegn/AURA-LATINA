import React, { useState } from 'react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext'; // ✅ Asegúrate de que la ruta sea correcta
import { ShoppingBag, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const hasDiscount = product.discount && product.discount > 0;
  const discountedPrice = hasDiscount 
    ? product.price * (1 - product.discount! / 100)
    : product.price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={product.images[currentImageIndex] || 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 text-xs font-semibold rounded">
            -{product.discount}%
          </div>
        )}

        {/* Image Indicators */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={() => handleImageChange(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
              className="bg-white/90 hover:bg-white p-2 rounded-full transition-all duration-200 transform hover:scale-110"
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
            </button>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="bg-white/90 hover:bg-white p-2 rounded-full transition-all duration-200 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingBag className="h-4 w-4 text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-amber-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 mt-1">{product.category?.name}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-gray-900">
              ${discountedPrice.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          <div className="text-xs text-gray-500">
            Stock: {product.stock}
          </div>
        </div>

        {product.stock === 0 && (
          <div className="mt-2 text-center">
            <span className="text-xs text-red-600 font-medium">Agotado</span>
          </div>
        )}
      </div>
    </div>
  );
}
