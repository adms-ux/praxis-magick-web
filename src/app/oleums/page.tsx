"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CatalogoOleums() {
  const router = useRouter();

  // Mapeamos los Oleums utilizando los banners que ya tienes en la carpeta public
  const catalogoOleums = [
    {
      id: "jester",
      title: "Jester's Road",
      desc: "Abre Caminos. Surgat abre las puertas. Rompe estancamientos y libera el flujo de energía hacia tus objetivos.",
      tag: "Próximamente",
      link: "/oleums/jesters-road",
      image: "/banner-jester.png"
    },
    {
      id: "leprechaun",
      title: "Leprechaun's Hoard",
      desc: "Abundancia. Atrae suerte material, flujo financiero y oportunidades de crecimiento comercial.",
      tag: "Próximamente",
      link: "/oleums/leprechauns-hoard",
      image: "/banner-leprechaun.png"
    },
    {
      id: "pope",
      title: "Pope's Decree",
      desc: "Dominación. Influye sutilmente en pensamientos ajenos y establece autoridad en tu entorno.",
      tag: "Próximamente",
      link: "/oleums/popes-decree",
      image: "/banner-pope.png"
    },
    {
      id: "witch",
      title: "Witch's Glamour",
      desc: "Lujuria. Genera un magnetismo seductor y atracción irresistible en dinámicas de poder y romance.",
      tag: "Próximamente",
      link: "/oleums/witchs-glamour",
      image: "/banner-witch.png"
    },
    {
      id: "king",
      title: "King's Vault",
      desc: "Prosperidad. Otorga visión estratégica para consolidar un imperio y proteger recursos adquiridos.",
      tag: "Próximamente",
      link: "/oleums/kings-vault",
      image: "/banner-king.png"
    },
    {
      id: "danse",
      title: "Danse Macabre",
      desc: "Funesto. Hará que tu víctima baile la danza. Magia de desgaste y disrupción dirigida.",
      tag: "Próximamente",
      link: "/oleums/danse-macabre",
      image: "/banner-danse.png"
    }
  ];

  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden flex flex-col items-center pt-24 pb-16 px-4 md:px-8 text-white selection:bg-red-900 selection:text-red-300">
      
      {/* Iluminación tenue carmesí/alquímica cayendo desde arriba */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-black bg-[radial-gradient(ellipse_at_top,rgba(153,27,27,0.12),transparent_60%)]" />

      <div className="w-full max-w-5xl z-10 relative">
        
        {/* Botón dinámico de Regresar */}
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors font-sans text-sm mb-8 md:mb-12 group cursor-pointer w-max"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Regresar
        </button>

        {/* Encabezado */}
        <div className="text-center mb-16 border-b border-red-900/30 pb-12">
          <h1 className="text-3xl md:text-5xl font-cinzel text-red-500 mb-6 drop-shadow-[0_0_15px_rgba(153,27,27,0.3)]">
            Oleums de Alta Magia
          </h1>
          <p className="text-sm md:text-base font-medieval text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Nuestros Oleums son anclajes físicos de poder. Aceites consagrados bajo estrictos protocolos goéticos, 
            diseñados para alterar la probabilidad y manifestar resultados en el mundo material. 
            <strong className="text-red-400 font-sans block mt-4 text-xs uppercase tracking-widest">
              Al adquirir un frasco físico, desbloqueas automáticamente su Grimorio Operativo en tu Bóveda Digital.
            </strong>
          </p>
        </div>

        {/* Cuadrícula de Oleums */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {catalogoOleums.map((oleum) => (
            <div key={oleum.id} className="bg-black/40 border border-red-900/40 rounded-2xl overflow-hidden hover:border-red-500/50 transition-all duration-300 flex flex-col group shadow-[0_0_15px_rgba(153,27,27,0.05)] hover:shadow-[0_0_25px_rgba(153,27,27,0.15)]">
              
              {/* Contenedor del Banner */}
              <div className="relative w-full h-40 md:h-56 bg-gray-900 flex items-center justify-center border-b border-red-900/40 overflow-hidden">
                 <div className="absolute inset-0 bg-red-900/10 group-hover:bg-transparent transition-colors z-10" />
                 <Image 
                   src={oleum.image} 
                   alt={oleum.title} 
                   fill 
                   className="object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                   onError={(e) => { e.currentTarget.style.display = 'none'; }} 
                 />
                 <div className="absolute top-4 right-4 bg-black/80 border border-red-500/50 text-red-400 text-[10px] uppercase tracking-widest px-2 py-1 rounded backdrop-blur-md z-20">
                   {oleum.tag}
                 </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl md:text-2xl font-cinzel text-gray-100 mb-2">{oleum.title}</h2>
                <p className="text-xs text-gray-400 font-sans leading-relaxed mb-6 flex-grow">
                  {oleum.desc}
                </p>
                <Link href={oleum.link} className="w-full py-3 bg-transparent border border-red-900/50 text-red-400 hover:bg-red-950/40 text-center rounded-lg text-xs font-bold uppercase tracking-wider transition-colors">
                  Ver Detalles
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </main>
  );
}