import React, { useState } from 'react'; 
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Category } from '../../types';

interface HeaderProps {
  categories: Category[];
  onCategorySelect: (category: string) => void;
  onCartToggle: () => void;
  selectedCategory: string;
}

export function Header({ categories, onCategorySelect, onCartToggle, selectedCategory }: HeaderProps) {
  const { cart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categoryNames = categories.map(cat => cat.name);
  const uniqueCategoryNames = Array.from(new Set(categoryNames));
  if (!uniqueCategoryNames.includes('Descuentos')) {
    uniqueCategoryNames.push('Descuentos');
  }
  const allCategories = ['Todos', ...uniqueCategoryNames];

  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      {/* Contenedor más ancho */}
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-20"> {/* Altura aumentada */}
          {/* Logo con efecto dorado */}
          <div className="flex-shrink-0">
            <h1 
              className="text-3xl font-bold text-black relative" 
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              <span className="text-shadow-gold">AURA LATINA</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10"> {/* Espaciado aumentado */}
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => onCategorySelect(category)}
                className={`text-base font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'text-amber-600 border-b-2 border-amber-600'
                    : 'text-gray-700 hover:text-amber-600'
                }`}
              >
                {category}
              </button>
            ))}
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-6"> {/* Espaciado aumentado */}
            <button className="text-gray-700 hover:text-amber-600 transition-colors">
              <Search className="h-6 w-6" /> {/* Iconos más grandes */}
            </button>

            <button
              onClick={onCartToggle}
              className="text-gray-700 hover:text-amber-600 transition-colors relative"
            >
              <ShoppingBag className="h-6 w-6" /> {/* Iconos más grandes */}
              {!!itemCount && (
                <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-medium">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700"
            >
              {mobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <div className="flex flex-col space-y-4"> {/* Espaciado aumentado */}
              {allCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    onCategorySelect(category);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left text-lg font-medium transition-colors ${
                    selectedCategory === category
                      ? 'text-amber-600'
                      : 'text-gray-700 hover:text-amber-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Agregar este estilo para el efecto dorado */}
      {/* <style jsx>{`
      .text-shadow-gold {
          text-shadow: 1px 1px 2px rgba(212, 175, 55, 0.8),
                       2px 2px 4px rgba(212, 175, 55, 0.4);
        }
      `}</style> */}
    </header>
  );
}
// import React, { useState } from 'react'; 
// import { ShoppingBag, Menu, X, Search } from 'lucide-react';
// import { useCart } from '../../context/CartContext'; // ✅ Actualiza esta ruta según tu estructura
// import { Category } from '../../types';

// interface HeaderProps {
//   categories: Category[];
//   onCategorySelect: (category: string) => void;
//   onCartToggle: () => void;
//   selectedCategory: string;
// }

// export function Header({ categories, onCategorySelect, onCartToggle, selectedCategory }: HeaderProps) {
//   const { cart } = useCart();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const categoryNames = categories.map(cat => cat.name);
//   const uniqueCategoryNames = Array.from(new Set(categoryNames));
//   if (!uniqueCategoryNames.includes('Descuentos')) {
//     uniqueCategoryNames.push('Descuentos');
//   }
//   const allCategories = ['Todos', ...uniqueCategoryNames];

//   // ✅ Contar total de productos en el carrito
//   const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

//   return (
//     <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <h1 className="text-2xl font-bold text-black" style={{ fontFamily: 'Playfair Display, serif' }}>
//               AMBER
//             </h1>
//           </div>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex space-x-8">
//             {allCategories.map((category) => (
//               <button
//                 key={category}
//                 onClick={() => onCategorySelect(category)}
//                 className={`text-sm font-medium transition-all duration-200 ${
//                   selectedCategory === category
//                     ? 'text-amber-600 border-b-2 border-amber-600'
//                     : 'text-gray-700 hover:text-amber-600'
//                 }`}
//               >
//                 {category}
//               </button>
//             ))}
//           </nav>

//           {/* Right side icons */}
//           <div className="flex items-center space-x-4">
//             <button className="text-gray-700 hover:text-amber-600 transition-colors">
//               <Search className="h-5 w-5" />
//             </button>

//             <button
//               onClick={onCartToggle}
//               className="text-gray-700 hover:text-amber-600 transition-colors relative"
//             >
//               <ShoppingBag className="h-5 w-5" />
//               {!!itemCount && (
//                 <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
//                   {itemCount}
//                 </span>
//               )}
//             </button>

//             {/* Mobile menu button */}
//             <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="md:hidden text-gray-700"
//             >
//               {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {mobileMenuOpen && (
//           <div className="md:hidden border-t border-gray-100 py-4">
//             <div className="flex flex-col space-y-3">
//               {allCategories.map((category) => (
//                 <button
//                   key={category}
//                   onClick={() => {
//                     onCategorySelect(category);
//                     setMobileMenuOpen(false);
//                   }}
//                   className={`text-left text-base font-medium transition-colors ${
//                     selectedCategory === category
//                       ? 'text-amber-600'
//                       : 'text-gray-700 hover:text-amber-600'
//                   }`}
//                 >
//                   {category}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }
