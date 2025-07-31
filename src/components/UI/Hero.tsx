import React from 'react';

export function Hero() {
  return (
    <div className="relative bg-gradient-to-r from-gray-50 to-white">
      <div className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
        {/* Hero Image - Full width */}
        <img
          src="https://images.pexels.com/photos/16240798/pexels-photo-16240798.jpeg"
          alt="Moda elegante"
          className="h-full w-full object-cover"
        />
        
        {/* Text Overlay - Modified layout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-28">
          <h2 
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white/70 whitespace-nowrap" // text-white/70 para transparencia
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Elegancia <span className="text-amber-300/70">Atemporal</span> 
            {/* // text-amber-300/70 para transparencia */}
          </h2>
          <button className="mt-8 bg-transparent border-2 border-white text-white px-6 py-2 rounded-lg font-medium hover:bg-white/10 transition-all text-base">
            Ver Colección
          </button>
        </div>
        
        {/* Floating Elements - Repositioned */}
        <div className="absolute top-1/4 -left-4 w-16 h-16 bg-amber-100 rounded-full opacity-40"></div>
        <div className="absolute bottom-1/4 -right-4 w-20 h-20 bg-gray-100 rounded-full opacity-30"></div>
      </div>
    </div>
  );
}
// import React from 'react';

// export function Hero() {
//   return (
//     <div className="relative bg-gradient-to-r from-gray-50 to-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//           {/* Text Content */}
//           <div className="text-center lg:text-left">
//             <h1 
//               className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6"
//               style={{ fontFamily: 'Playfair Display, serif' }}
//             >
//               Elegancia
//               <span className="block text-amber-600">Atemporal</span>
//             </h1>
//             <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
//               Descubre nuestra colección exclusiva de prendas cuidadosamente seleccionadas 
//               para quienes valoran la calidad y el estilo único.
//             </p>
//             <button className="bg-black text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-900 transition-colors text-lg">
//               Explorar Colección
//             </button>
//           </div>

//           {/* Hero Image */}
//           <div className="relative">
//             <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
//               <img
//                 src="https://images.pexels.com/photos/16240798/pexels-photo-16240798.jpeg"
//                 alt="Moda elegante"
//                 className="w-full h-full object-cover"
//               />
//             </div>
            
//             {/* Floating Elements */}
//             <div className="absolute -top-6 -left-6 w-24 h-24 bg-amber-100 rounded-full opacity-60"></div>
//             <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gray-100 rounded-full opacity-40"></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }