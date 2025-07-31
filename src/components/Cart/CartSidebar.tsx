import React, { useState } from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cart, updateQuantity, removeFromCart, clearCart, total } = useCart();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(price);

  const handleOrderClick = () => setShowForm(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const itemsText = cart.map(item => `${item.name} x${item.quantity}`).join(', ');
    const message = `Hola, quiero hacer un pedido:\nNombre: ${name}\nDirección: ${address}\nProductos: ${itemsText}\nTotal: ${formatPrice(total)}`;
    const phone = '573113630754';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    clearCart();
    setShowForm(false);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* HEADER */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Carrito de Compras ({cart.length})
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* BODY */}
          <div className="flex-1 overflow-y-auto p-6">
            {showForm ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Dirección
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700"
                >
                  Enviar Pedido por WhatsApp
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-300"
                >
                  Volver al Carrito
                </button>
              </form>
            ) : cart.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg font-medium mb-2">Tu carrito está vacío</p>
                <p className="text-sm">Agrega productos para comenzar</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                    <img
                      src={item.images?.[0] || 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg'}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">{item.name}</h3>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-gray-400 hover:text-gray-600 p-1"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-gray-400 hover:text-gray-600 p-1"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-400 hover:text-red-600 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      {item.discount && (
                        <p className="text-xs text-gray-500 line-through">
                          {formatPrice((item.price / (1 - item.discount / 100)) * item.quantity)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* FOOTER */}
          {!showForm && cart.length > 0 && (
            <div className="border-t border-gray-200 p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-base font-medium text-gray-900">Total:</span>
                <span className="text-xl font-bold text-gray-900">
                  {formatPrice(total)}
                </span>
              </div>
              <div className="space-y-3">
                <button
                  onClick={handleOrderClick}
                  className="w-full bg-amber-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-amber-700"
                >
                  Hacer pedido
                </button>
                <button
                  onClick={clearCart}
                  className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-300"
                >
                  Vaciar Carrito
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}


// import React from 'react';
// import { X, Plus, Minus, Trash2 } from 'lucide-react';
// import { useCart } from '../../context/CartContext';

// interface CartSidebarProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
//   const { cart, updateQuantity, removeFromCart, clearCart, total } = useCart();

//   const formatPrice = (price: number) => {
//     return new Intl.NumberFormat('es-CO', {
//       style: 'currency',
//       currency: 'COP'
//     }).format(price);
//   };

//   return (
//     <>
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40"
//           onClick={onClose}
//         />
//       )}

//       <div
//         className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ${
//           isOpen ? 'translate-x-0' : 'translate-x-full'
//         }`}
//       >
//         <div className="flex flex-col h-full">
//           <div className="flex items-center justify-between p-6 border-b border-gray-200">
//             <h2 className="text-lg font-semibold text-gray-900">
//               Carrito de Compras ({cart.length})
//             </h2>
//             <button
//               onClick={onClose}
//               className="text-gray-400 hover:text-gray-600 transition-colors"
//             >
//               <X className="h-6 w-6" />
//             </button>
//           </div>

//           <div className="flex-1 overflow-y-auto p-6">
//             {cart.length === 0 ? (
//               <div className="text-center py-12">
//                 <div className="text-gray-500">
//                   <p className="text-lg font-medium mb-2">Tu carrito está vacío</p>
//                   <p className="text-sm">Agrega algunos productos para comenzar</p>
//                 </div>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {cart.map((item) => (
//                   <div key={item.id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
//                     <img
//                       src={item.images?.[0] || 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg'}
//                       alt={item.name}
//                       className="w-16 h-16 object-cover rounded-md"
//                     />

//                     <div className="flex-1 min-w-0">
//                       <h3 className="text-sm font-medium text-gray-900 truncate">
//                         {item.name}
//                       </h3>
//                       <p className="text-xs text-gray-500">{item.category?.name}</p>

//                       <div className="flex items-center justify-between mt-2">
//                         <div className="flex items-center space-x-2">
//                           <button
//                             onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                             className="text-gray-400 hover:text-gray-600 p-1"
//                           >
//                             <Minus className="h-4 w-4" />
//                           </button>
//                           <span className="text-sm font-medium w-8 text-center">
//                             {item.quantity}
//                           </span>
//                           <button
//                             onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                             className="text-gray-400 hover:text-gray-600 p-1"
//                           >
//                             <Plus className="h-4 w-4" />
//                           </button>
//                         </div>

//                         <button
//                           onClick={() => removeFromCart(item.id)}
//                           className="text-red-400 hover:text-red-600 p-1"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </button>
//                       </div>
//                     </div>

//                     <div className="text-right">
//                       <p className="text-sm font-semibold text-gray-900">
//                         {formatPrice(item.price * item.quantity)}
//                       </p>
//                       {item.discount && (
//                         <p className="text-xs text-gray-500 line-through">
//                           {formatPrice(item.price / (1 - item.discount / 100) * item.quantity)}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {cart.length > 0 && (
//             <div className="border-t border-gray-200 p-6 space-y-4">
//               <div className="flex justify-between items-center">
//                 <span className="text-base font-medium text-gray-900">Total:</span>
//                 <span className="text-xl font-bold text-gray-900">
//                   {formatPrice(total)}
//                 </span>
//               </div>

//               <div className="space-y-3">
//                 <button className="w-full bg-amber-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-amber-700 transition-colors">
//                   Hacer pedido
//                 </button>
//                 <button
//                   onClick={clearCart}
//                   className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
//                 >
//                   Vaciar Carrito
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }
