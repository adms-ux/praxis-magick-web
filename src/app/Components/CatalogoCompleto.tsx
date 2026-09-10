"use client";
import Link from "next/link";

export default function CatalogoCompleto() {
  const productos = [
    { id: "e1", name: "Demonios del Verum", desc: "Método operativo completo para trabajar con los 18 espíritus.", tag: "Disponible", route: "/ebooks" },
    { id: "g1", name: "Grimorios Digitales", desc: "Instrucciones de uso, métodos de consagración y ritualística.", tag: "Disponible", route: "/grimorios" },
    { id: "e2", name: "Magia Olímpica", desc: "Guía para trabajar con las siete inteligencias planetarias.", tag: "23 Octubre", route: "/ebooks" },
    { id: "o1", name: "Jester's Road (Oleum)", desc: "Abre Caminos. Surgat abre las puertas a lugares inalcanzables.", tag: "Próximamente", route: "/oleums" },
    { id: "o2", name: "Leprechaun's Hoard (Oleum)", desc: "Abundancia. Atrae abundancia económica a tu vida.", tag: "Próximamente", route: "/oleums" },
    { id: "o3", name: "Pope's Decree (Oleum)", desc: "Dominación. Influye en pensamientos y emociones ajenas.", tag: "Próximamente", route: "/oleums" },
    { id: "o4", name: "Witch's Glamour (Oleum)", desc: "Lujuria. Despierta una atracción magnética seductora.", tag: "Próximamente", route: "/oleums" },
    { id: "v1", name: "Velón de Poder", desc: "El Heraldo. Proclamación oficial que autoriza el ritual.", tag: "Próximamente", route: "/velas" },
    { id: "i1", name: "Ídolos de Madera", desc: "Cuerpos físicos tallados para albergar a las entidades.", tag: "Próximamente", route: "/idolos" },
    { id: "s1", name: "Consultas Personales", desc: "Trabajos a la medida ejecutados por nuestros practicantes.", tag: "Servicio", route: "/consultas" },
    { id: "s2", name: "Sesiones de Ouija", desc: "Consulta directa a fuerzas reales mediante el tablero.", tag: "Servicio", route: "/ouija" }
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 md:px-6 py-10 text-gray-200 z-20 relative">
      <div className="w-full text-center mb-10">
        <h3 className="text-3xl md:text-4xl font-cinzel text-green-300 mb-2 drop-shadow-md">
          El Arsenal
        </h3>
        <p className="text-sm font-medieval text-gray-400">Todo nuestro catálogo físico, digital y de servicios.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {productos.map((producto) => (
          <div key={producto.id} className="bg-black/50 border border-green-500/20 rounded-xl overflow-hidden hover:border-green-500/60 transition-all duration-300 flex flex-col">
            <div className="relative w-full aspect-square bg-white/5 flex items-center justify-center border-b border-green-500/20 p-2 text-center">
              <span className="text-gray-600 font-sans text-[10px] md:text-xs uppercase tracking-widest">
                Próximamente
              </span>
              <div className="absolute top-2 right-2 bg-black/80 border border-green-500/50 text-green-300 text-[8px] md:text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded backdrop-blur-md">
                {producto.tag}
              </div>
            </div>
            <div className="p-3 md:p-5 flex flex-col flex-grow text-center md:text-left">
              <h4 className="text-sm md:text-base font-cinzel text-gray-200 mb-2 leading-snug">
                {producto.name}
              </h4>
              <p className="text-[10px] md:text-xs text-gray-400 font-sans leading-relaxed mb-4 flex-grow">
                {producto.desc}
              </p>
              {/* ESTO YA LOS DIRIGE A SU SECCIÓN RESPECTIVA */}
              <Link href={producto.route} className="w-full py-2 bg-transparent border border-gray-600 text-gray-300 hover:border-green-400 hover:text-green-300 rounded-md text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer text-center block">
                Ver Detalles
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}