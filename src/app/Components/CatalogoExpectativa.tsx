"use client";
import { useState } from "react";

export default function CatalogoExpectativa() {
  const [wishlistMsg, setWishlistMsg] = useState<string | null>(null);

  const handleWishlist = (productName: string) => {
    setWishlistMsg(`Añadido a Deseos: ${productName}. Te avisaremos cuando esté listo.`);
    setTimeout(() => setWishlistMsg(null), 3000);
  };

  const productosCatálogo = [
    { id: "o1", name: "Jester's Road", desc: "Oleum Abre Caminos. Surgat abre las puertas metafóricas de los lugares donde quieres entrar.", tag: "Próximamente - Solo MX" },
    { id: "o2", name: "Leprechaun's Hoard", desc: "Oleum de Abundancia. Frutimiere es la mano que guía hacia el aumento sobre las cosas y el azar.", tag: "Próximamente - Solo MX" },
    { id: "o3", name: "Pope's Decree", desc: "Oleum de Dominación. Clisthert logra influir en los pensamientos y sentimientos ajenos.", tag: "Próximamente - Solo MX" },
    { id: "o4", name: "Witch's Glamour", desc: "Oleum de Lujuria. Frimost despierta la atracción magnética seductora y carnal.", tag: "Próximamente - Solo MX" },
    { id: "o5", name: "King's Vault", desc: "Oleum de Prosperidad. Clauneck concede la visión necesaria para consolidar prosperidad sólida.", tag: "Próximamente - Solo MX" },
    { id: "o6", name: "Danse Macabre", desc: "Oleum Funesto. Guland conoce tu pena y hará que tu víctima baile una danza destructiva.", tag: "Próximamente - Solo MX" },
    { id: "velon", name: "Velón de Poder", desc: "El Heraldo. Activa tus Oleums, despierta a tus Ídolos y anuncia tu voluntad de manera formal.", tag: "Próximamente" },
    { id: "polvo", name: "Polvo Mágico", desc: "El Alquimista. El catalizador que transforma un objeto común en consagrado para vestir velas.", tag: "Próximamente" },
    { id: "poppet", name: "Poppet - Hamelin's Children", desc: "Vehículo de magia simpática que permite dirigir la energía de un ritual sin contacto directo.", tag: "Próximamente" },
    { id: "idolos", name: "Ídolos Consagrados", desc: "Cada Ídolo se solicita, se talla en madera y se bautiza de forma individual para quien lo adquiere.", tag: "Próximamente" }
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 md:px-6 py-16 text-gray-200 z-20 relative">
      
      <div className="w-full text-center mb-10">
        <h3 className="text-3xl md:text-4xl font-cinzel text-purple-300 mb-4 drop-shadow-md">
          Catálogo Físico
        </h3>
        <p className="text-sm font-medieval text-gray-400 max-w-2xl mx-auto">
          La magia operativa requiere vehículos tangibles. Conoce las herramientas que forjarán tu práctica.
        </p>
      </div>

      <div className="w-full max-w-4xl mx-auto mb-12 bg-black/60 border border-red-900/50 rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 backdrop-blur-sm shadow-[0_0_20px_rgba(127,29,29,0.3)]">
        <div className="text-red-500">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
        </div>
        <div>
          <h4 className="text-red-400 font-cinzel font-bold mb-2">Aviso sobre Envíos Físicos</h4>
          <p className="text-xs md:text-sm text-gray-300 font-sans leading-relaxed text-justify">
            Por regulaciones aduanales internacionales sobre extractos botánicos, <strong>nuestros productos físicos solo están disponibles para envío dentro de la República Mexicana</strong>. La biblioteca digital y servicios personalizados son globales.
          </p>
        </div>
      </div>

      {wishlistMsg && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-green-900/90 border border-green-500 text-green-100 px-6 py-3 rounded-lg shadow-[0_0_20px_rgba(34,197,94,0.4)] z-[200] font-sans text-sm animate-pulse text-center w-[90%] max-w-md">
          {wishlistMsg}
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {productosCatálogo.map((producto) => (
          <div key={producto.id} className="bg-black/50 border border-purple-500/20 rounded-xl overflow-hidden hover:border-purple-500/60 transition-all duration-300 group flex flex-col">
            
            <div className="relative w-full aspect-square bg-white/5 flex items-center justify-center border-b border-purple-500/20 p-2 text-center">
              <span className="text-gray-600 font-sans text-[10px] md:text-xs uppercase tracking-widest leading-relaxed">
                Imagen Próximamente
              </span>
              <div className="absolute top-2 right-2 bg-black/80 border border-purple-500/50 text-purple-300 text-[8px] md:text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded backdrop-blur-md">
                {producto.tag}
              </div>
            </div>

            <div className="p-3 md:p-5 flex flex-col flex-grow">
              <h4 className="text-sm md:text-base font-cinzel text-gray-200 mb-2 group-hover:text-purple-300 transition-colors leading-snug">
                {producto.name}
              </h4>
              <p className="text-[10px] md:text-xs text-gray-400 font-sans leading-relaxed mb-4 flex-grow text-justify line-clamp-4 md:line-clamp-none">
                {producto.desc}
              </p>
              
              <button 
                onClick={() => handleWishlist(producto.name)}
                className="w-full py-2 bg-transparent border border-gray-600 text-gray-300 hover:border-purple-400 hover:text-purple-300 rounded-md text-[10px] md:text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                Deseos
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}