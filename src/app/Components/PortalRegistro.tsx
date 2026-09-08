"use client";
import { useState } from "react";

export default function PortalRegistro() {
  const [showAppModal, setShowAppModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);

  return (
    <section className="w-full max-w-5xl mx-auto px-4 md:px-6 py-10 z-20 relative flex flex-col gap-6">
      
      <div 
        onClick={() => setShowAppModal(true)}
        className="w-full bg-black/60 border border-purple-500/30 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between cursor-pointer hover:border-purple-400 transition-colors shadow-[0_0_20px_rgba(168,85,247,0.15)] group"
      >
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h3 className="text-xl md:text-2xl font-cinzel text-purple-300">Lleva la Magia Contigo</h3>
          <p className="text-xs text-gray-400 font-sans mt-1">Conoce los beneficios de instalar nuestra App Web gratuita.</p>
        </div>
        <button className="px-6 py-2 bg-transparent border border-purple-500/50 text-purple-300 rounded text-xs font-bold uppercase tracking-wider group-hover:bg-purple-900/40">
          Saber Más
        </button>
      </div>

      <div 
        onClick={() => setShowAccountModal(true)}
        className="w-full bg-black/60 border border-green-500/30 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between cursor-pointer hover:border-green-400 transition-colors shadow-[0_0_20px_rgba(34,197,94,0.15)] group"
      >
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h3 className="text-xl md:text-2xl font-cinzel text-green-300">El Círculo Interno</h3>
          <p className="text-xs text-gray-400 font-sans mt-1">Tu bóveda digital y seguimiento de compras. Beneficios exclusivos.</p>
        </div>
        <button className="px-6 py-2 bg-transparent border border-green-500/50 text-green-300 rounded text-xs font-bold uppercase tracking-wider group-hover:bg-green-900/40">
          Crear Cuenta
        </button>
      </div>

      {showAppModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-black border border-purple-500/50 rounded-2xl p-6 md:p-8 font-sans">
            <button onClick={() => setShowAppModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl">✕</button>
            <h3 className="text-2xl font-cinzel text-purple-300 mb-6 text-center">App Web Praxis Magick</h3>
            <div className="space-y-4 text-sm text-gray-300 mb-8">
              <p><strong className="text-purple-400">Velocidad:</strong> Tu templo abre al instante sin recargas.</p>
              <p><strong className="text-purple-400">Notificaciones:</strong> Entérate antes que nadie de ingresos y descuentos.</p>
              <p><strong className="text-purple-400">Acceso Offline:</strong> Lee tus ebooks y consulta rituales sin internet.</p>
            </div>
            <button className="w-full py-3 bg-purple-700 hover:bg-purple-600 text-white font-cinzel rounded-lg transition-colors">
              Descargar App Web
            </button>
          </div>
        </div>
      )}

      {showAccountModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-black border border-green-500/50 rounded-2xl p-6 md:p-8 font-sans">
            <button onClick={() => setShowAccountModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl">✕</button>
            <h3 className="text-2xl font-cinzel text-green-300 mb-6 text-center">El Círculo Interno</h3>
            <div className="space-y-4 text-sm text-gray-300 mb-8">
              <p><strong className="text-green-400">Bóveda Digital:</strong> Acceso permanente a tus ebooks y cursos.</p>
              <p><strong className="text-green-400">Grimorios Gratuitos:</strong> Desbloquea instrucciones exclusivas al adquirir productos físicos.</p>
              <p><strong className="text-green-400">Chat del Cónclave:</strong> Soporte directo sin intermediarios.</p>
            </div>
            <button className="w-full py-3 bg-transparent border border-green-500 text-green-400 hover:bg-green-900/30 font-cinzel rounded-lg transition-colors">
              Registrarse Gratis
            </button>
          </div>
        </div>
      )}
    </section>
  );
}