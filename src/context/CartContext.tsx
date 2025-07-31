import { createContext, useContext, useEffect, useState } from "react";
import { Product } from "../types";

interface CartItem extends Product {
  quantity: number;
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateQuantity: (id: string, quantity: number) => void;
  total: number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    // Calculamos el total cada vez que cambia el carrito
    const newTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(newTotal);
  }, [cart]);

  const addToCart = (product: Product) => {
    if (!product.id) {
      console.warn("Intentando agregar producto sin ID:", product);
      return;
    }

    setCart(prev => {
      const found = prev.find(item => item.id === product.id);
      if (found) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
};

// import { createContext, useContext, useEffect, useState } from "react";
// import { Product } from "../types";

// interface CartItem extends Product {
//   quantity: number;
// }

// interface CartContextProps {
//   cart: CartItem[];
//   addToCart: (product: Product) => void;
//   removeFromCart: (id: string) => void;
//   clearCart: () => void;
// }

// const CartContext = createContext<CartContextProps | undefined>(undefined);

// export const CartProvider = ({ children }: { children: React.ReactNode }) => {
//   const [cart, setCart] = useState<CartItem[]>([]);

//   useEffect(() => {
//     const storedCart = localStorage.getItem("cart");
//     if (storedCart) {
//       setCart(JSON.parse(storedCart));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   const addToCart = (product: Product) => {
//     setCart(prev => {
//       const found = prev.find(item => item.id === product.id);
//       if (found) {
//         return prev.map(item =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }
//       return [...prev, { ...product, quantity: 1 }];
//     });
//   };

//   const removeFromCart = (id: string) => {
//     setCart(prev => prev.filter(item => item.id !== id));
//   };

//   const clearCart = () => {
//     setCart([]);
//   };

//   return (
//     <CartContext.Provider
//       value={{ cart, addToCart, removeFromCart, clearCart }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart debe usarse dentro de un CartProvider");
//   }
//   return context;
// };
