"use client";
import { useState } from "react";

export default function PortalRegistro() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-16 text-gray-200 font-sans z-20 relative">
      
      {/* BANNER PWA - DESCARGA DE LA APP */}
      <div 
        className="relative w-full rounded-2xl overflow-hidden border border-purple-500/40 bg-black/80 backdrop-blur-md shadow-[0_0_40px_rgba(168,85,247,0.15)] mb-16"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.2),transparent_60%)] pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-center p-8 md:p-12 gap-8 relative z-10">
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-3xl font-cinzel text-purple-300 mb-4 drop-shadow-md tracking-wide">
              Lleva la Magia Contigo
            </h3>
            <p className="text-gray-300 font-medieval text-sm md:text-base leading-relaxed mb-6">
              Instala nuestra app y convierte tu bóveda digital en un templo portátil: tus grimorios y rituales, contigo estés donde estés — incluso sin conexión.
            </p>
            <div className="space-y-4 font-sans text-sm text-gray-400">
              <p className="flex items-start gap-3 justify-center md:justify-start">
                <span className="text-purple-500 mt-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </span>
                <span><strong className="text-gray-200">Velocidad:</strong> Sin recargas ni esperas, tu templo abre al instante.</span>
              </p>
              <p className="flex items-start gap-3 justify-center md:justify-start">
                <span className="text-purple-500 mt-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                </span>
                <span><strong className="text-gray-200">Notificaciones:</strong> Entérate antes que nadie de nuevos grimorios gratuitos o descuentos en tu Lista de Deseos.</span>
              </p>
              <p className="flex items-start gap-3 justify-center md:justify-start">
                <span className="text-purple-500 mt-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                </span>
                <span><strong className="text-gray-200">Acceso sin conexión:</strong> Lee tus ebooks y consulta tus rituales aunque no tengas internet.</span>
              </p>
            </div>
          </div>
          <div className="shrink-0 flex flex-col items-center gap-4">
            <button className={`px-8 py-4 rounded-xl font-cinzel font-bold tracking-widest text-sm transition-all duration-500 border cursor-pointer ${isHovered ? 'bg-purple-600 border-purple-400 text-white shadow-[0_0_25px_rgba(168,85,247,0.6)]' : 'bg-purple-900/50 border-purple-500/50 text-purple-200'}`}>
              Descargar App Web
            </button>
            <span className="text-[10px] uppercase tracking-widest text-gray-500">Próximamente</span>
          </div>
        </div>
      </div>

      {/* PORTAL DE REGISTRO - BENEFICIOS */}
      <div className="w-full text-center mb-10">
        <h3 className="text-2xl md:text-3xl font-cinzel text-green-300 mb-4 drop-shadow-md">
          El Círculo Interno
        </h3>
        <p className="text-sm font-medieval text-gray-400 max-w-2xl mx-auto">
          Crear una cuenta en Praxis Magick no es solo un registro, es el acceso a tu arsenal personal. Conoce tus beneficios:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-green-500/40 transition-colors backdrop-blur-sm">
          <h4 className="text-lg font-cinzel text-green-200 mb-2">
            Bóveda Digital
          </h4>
          <p className="text-xs text-gray-400 font-sans leading-relaxed text-justify">
            Tu biblioteca personal, siempre disponible. Cada ebook y curso que adquieras vive aquí, protegido y accesible desde cualquier dispositivo — incluso sin conexión.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-purple-500/40 transition-colors backdrop-blur-sm">
          <h4 className="text-lg font-cinzel text-purple-200 mb-2">
            Grimorios Gratuitos
          </h4>
          <p className="text-xs text-gray-400 font-sans leading-relaxed text-justify">
            Con cada compra, desbloqueas grimorios complementarios sin costo adicional — conocimiento extra que profundiza el trabajo que ya adquiriste.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-gray-400 transition-colors backdrop-blur-sm">
          <h4 className="text-lg font-cinzel text-gray-200 mb-2">
            Chat del Cónclave
          </h4>
          <p className="text-xs text-gray-400 font-sans leading-relaxed text-justify">
            Comunicación directa con nuestro equipo para dudas técnicas, esotéricas o de soporte — sin intermediarios, sin esperas eternas.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-blue-500/40 transition-colors backdrop-blur-sm">
          <h4 className="text-lg font-cinzel text-blue-200 mb-2">
            Privilegios Exclusivos
          </h4>
          <p className="text-xs text-gray-400 font-sans leading-relaxed text-justify">
            Acceso anticipado a descuentos, cupones y paquetes especiales de temporada que no se publican en el catálogo general — reservados solo para miembros.
          </p>
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <button className="px-10 py-3 bg-transparent border-2 border-gray-600 hover:border-gray-400 text-gray-300 rounded-lg font-medieval transition-all cursor-pointer">
          Crear mi cuenta gratuita
        </button>
      </div>
    </section>
  );
}