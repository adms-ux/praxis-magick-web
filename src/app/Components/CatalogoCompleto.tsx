"use client";
import { useState } from "react";

export default function CatalogoCompleto() {
  const [wishlistMsg, setWishlistMsg] = useState<string | null>(null);

  const handleWishlist = (productName: string) => {
    setWishlistMsg(`Añadido a Deseos: ${productName}. Te avisaremos cuando esté listo.`);
    setTimeout(() => setWishlistMsg(null), 3000);
  };

  const productos = [
    { id: "e1", name: "Demonios del Verum", desc: "Manual directo con el entrenamiento, la estrategia y el ritual completo para trabajar con 18 espíritus.", tag: "Disponible" },
    { id: "e2", name: "Magia Olímpica", desc: "Guía introductoria al trabajo con las siete inteligencias planetarias clásicas.", tag: "23 Octubre" },
    { id: "c1", name: "Iniciación a la Alta Magia", desc: "Curso teórico-práctico. Módulos de Magia de velas, hierbas, planetaria y rituales.", tag: "Próximamente" },
    { id: "o1", name: "Jester's Road (Oleum)", desc: "Abre Caminos. Surgat abre las puertas de los lugares donde quieres entrar.", tag: "Próximamente - Solo MX" },
    { id: "o2", name: "Leprechaun's Hoard (Oleum)", desc: "Abundancia. Frutimiere convierte el azar en un aliado para atraer abundancia.", tag: "Próximamente - Solo MX" },
    { id: "o3", name: "Pope's Decree (Oleum)", desc: "Dominación. Clisthert logra influir en los pensamientos y sentimientos ajenos.", tag: "Próximamente - Solo MX" },
    { id: "o4", name: "Witch's Glamour (Oleum)", desc: "Lujuria. Frimost despierta la atracción magnética seductora y carnal.", tag: "Próximamente - Solo MX" },
    { id: "o5", name: "King's Vault (Oleum)", desc: "Prosperidad. Clauneck concede la autoridad y visión para consolidar prosperidad.", tag: "Próximamente - Solo MX" },
    { id: "o6", name: "Danse Macabre (Oleum)", desc: "Funesto. Guland conoce tu pena y hará que tu víctima baile la danza macabra.", tag: "Próximamente - Solo MX" },
    { id: "v1", name: "Velón de Poder — El Heraldo", desc: "Proclamación que autoriza el ritual. Activa tus Oleums y despierta a tus Ídolos.", tag: "Próximamente - Solo MX" },
    { id: "p1", name: "Polvo Mágico — El Alquimista", desc: "Catalizador que transforma un objeto común en consagrado. Úsalo para vestir velas.", tag: "Próximamente - Solo MX" },
    { id: "po1", name: "Poppet — Hamelin's Children", desc: "Vehículo de magia simpática para dirigir energía sin necesidad de contacto directo.", tag: "Próximamente - Solo MX" },
    { id: "i1", name: "Claunech (Ídolo)", desc: "El primero en abrir la puerta. Se asocia con quienes buscan que las cosas se muevan a su favor.", tag: "Próximamente - Solo MX" },
    { id: "i2", name: "Frimost (Ídolo)", desc: "Gobierna el deseo antes de que sea palabra. Trabaja en el territorio del magnetismo.", tag: "Próximamente - Solo MX" },
    { id: "i3", name: "Clisthert (Ídolo)", desc: "Doblega voluntades ajenas hacia la del consultante, inclinando decisiones.", tag: "Próximamente - Solo MX" },
    { id: "i4", name: "Guland (Ídolo)", desc: "Se acude a él para deshacer, deteriorar o cerrar un capítulo de forma definitiva.", tag: "Próximamente - Solo MX" },
    { id: "i5", name: "Frutimiere (Ídolo)", desc: "Trabaja sobre lo que ya está sembrado (recursos, proyectos) y lo hace crecer.", tag: "Próximamente - Solo MX" },
    { id: "i6", name: "Surgat (Ídolo)", desc: "El espíritu de los caminos abiertos, las oportunidades que aparecen donde no había ninguna.", tag: "Próximamente - Solo MX" },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 md:px-6 py-16 text-gray-200 z-20 relative">
      <div className="w-full text-center mb-10">
        <h3 className="text-3xl md:text-4xl font-cinzel text-purple-300 mb-4 drop-shadow-md">
          Catálogo General
        </h3>
        <p className="text-sm font-medieval text-gray-400 max-w-2xl mx-auto">
          Explora nuestro arsenal completo. Desde conocimiento digital hasta vehículos físicos de manifestación.
        </p>
      </div>

      <div className="w-full max-w-4xl mx-auto mb-12 bg-black/60 border border-red-900/50 rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 backdrop-blur-sm shadow-[0_0_20px_rgba(127,29,29,0.3)]">
        <div>
          <h4 className="text-red-400 font-cinzel font-bold mb-2">Aviso Importante sobre Envíos Físicos</h4>
          <p className="text-xs md:text-sm text-gray-300 font-sans leading-relaxed text-justify">
            Por regulaciones aduanales internacionales sobre extractos de hierbas, nuestros productos físicos solo se envían dentro de la República Mexicana. La biblioteca digital es global.
          </p>
        </div>
      </div>

      {wishlistMsg && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-green-900/90 border border-green-500 text-green-100 px-6 py-3 rounded-lg shadow-[0_0_20px_rgba(34,197,94,0.4)] z-[200] font-sans text-sm animate-pulse text-center w-[90%] max-w-md">
          {wishlistMsg}
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {productos.map((producto) => (
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
              <p className="text-[10px] md:text-xs text-gray-400 font-sans leading-relaxed mb-4 flex-grow text-justify">
                {producto.desc}
              </p>
              <button 
                onClick={() => handleWishlist(producto.name)}
                className="w-full py-2 bg-transparent border border-gray-600 text-gray-300 hover:border-purple-400 hover:text-purple-300 rounded-md text-[10px] md:text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Añadir a Deseos
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}