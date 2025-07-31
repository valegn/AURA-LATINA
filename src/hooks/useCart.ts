import { useState, useEffect } from 'react';
import { CartItem, Cart, Product } from '../types';
import toast from 'react-hot-toast';

export function useCart() {
  const [cart, setCart] = useState<Cart>({
    items: [],
    total: 0,
    itemCount: 0
  });

  useEffect(() => {
    const savedCart = localStorage.getItem('amber-cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCart(parsedCart);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('amber-cart', JSON.stringify(cart));
  }, [cart]);

  const calculateTotal = (items: CartItem[]) => {
    return items.reduce((total, item) => {
      const price = item.product.discount 
        ? item.product.price * (1 - item.product.discount / 100)
        : item.product.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const calculateItemCount = (items: CartItem[]) => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    if (product.stock < quantity) {
      toast.error('No hay suficiente stock disponible');
      return;
    }

    setCart(prevCart => {
      const existingItem = prevCart.items.find(item => item.product.id === product.id);
      let newItems: CartItem[];

      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > product.stock) {
          toast.error('No hay suficiente stock disponible');
          return prevCart;
        }
        
        newItems = prevCart.items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        );
      } else {
        newItems = [...prevCart.items, { product, quantity }];
      }

      const newCart = {
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems)
      };

      toast.success('Producto agregado al carrito');
      return newCart;
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => {
      const newItems = prevCart.items.filter(item => item.product.id !== productId);
      return {
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems)
      };
    });
    toast.success('Producto eliminado del carrito');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart => {
      const item = prevCart.items.find(item => item.product.id === productId);
      if (!item) return prevCart;

      if (quantity > item.product.stock) {
        toast.error('No hay suficiente stock disponible');
        return prevCart;
      }

      const newItems = prevCart.items.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      );

      return {
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems)
      };
    });
  };

  const clearCart = () => {
    setCart({
      items: [],
      total: 0,
      itemCount: 0
    });
    toast.success('Carrito vaciado');
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };
}