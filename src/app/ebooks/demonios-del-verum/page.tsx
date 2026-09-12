"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "../../Context/ToastContext";

export default function ProductoDemoniosVerum() {
  const router = useRouter();
  const { showToast } = useToast();
  
  const [isStoreOpen, setIsStoreOpen] = useState(false);
  const isUserLoggedIn = false; 
  const userHasPurchased = false; 
  const userHasViewedSample = false; 
  
  const [activeTab, setActiveTab] = useState<"sinopsis" | "aprendizaje" | "ficha">("sinopsis");
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const targetDate = new Date(2026, 8, 23, 23, 59, 59).getTime();
    const checkDate = () => {
      const now = new Date().getTime();
      if (now >= targetDate) setIsStoreOpen(true);
    };
    checkDate();
    const interval = setInterval(checkDate, 60000); 
    return () => clearInterval(interval);
  }, []);

  const handleAddToCart = () => {
    if (!isUserLoggedIn) {
      showToast("Debes iniciar sesión para añadir al carrito.", "error");
      return;
    }
    showToast("Demonios del Verum añadido a tu carrito.", "success");
  };

  const handleFreeSample = () => {
    if (!isUserLoggedIn) {
      showToast("Inicia sesión para desbloquear la muestra gratuita.", "error");
      return;
    }
    showToast("Muestra añadida. Revisa las notificaciones en tu Bóveda.", "success");
  };

  const handleToggleFavorite = () => {
    if (!isUserLoggedIn) {
      showToast("Inicia sesión para guardar en tus deseos.", "error");
      return;
    }
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      showToast("Guardado en deseos. Te avisaremos de promociones.", "info");
    }
  };

  const handleLeaveReview = () => {
    if (!isUserLoggedIn) {
      showToast("Inicia sesión para interactuar con el Cónclave.", "error");
    } else if (!userHasPurchased && !userHasViewedSample) {
      showToast("Debes adquirir el tomo o descargar la muestra para agregar un comentario.", "error");
    } else {
      showToast("Abriendo editor de comentarios...", "info");
    }
  };

  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden pt-24 pb-16 px-4 md:px-8 text-white selection:bg-green-900 selection:text-green-300">
      
      <div className="fixed inset-0 pointer-events-none z-0 bg-black bg-[radial-gradient(ellipse_at_top,rgba(34,197,94,0.08),transparent_60%)]" />

      <div className="w-full max-w-6xl mx-auto z-10 relative">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors font-sans text-sm group w-max">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Regresar
          </button>
          <div className="text-xs font-sans text-gray-500 uppercase tracking-widest">
            <Link href="/" className="hover:text-green-400">Inicio</Link> <span className="mx-2">/</span> 
            <Link href="/ebooks" className="hover:text-green-400">Ebooks</Link> <span className="mx-2">/</span> 
            <span className="text-gray-300">Demonios del Verum</span>
          </div>
        </div>

        {/* SECCIÓN PRINCIPAL */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 mb-16">
          
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-[350px] aspect-[2/3] rounded-md overflow-hidden shadow-[0_0_40px_rgba(34,197,94,0.15)] border border-green-500/20 group">
              <Image src="/verum-portada.png" alt="Demonios del Verum" fill className="object-cover group-hover:scale-105 transition-transform duration-700" priority onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            </div>
          </div>

          <div className="md:col-span-7 flex flex-col justify-center">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-green-950/50 border border-green-500/50 text-green-300 text-[10px] uppercase tracking-widest rounded-full">
                Edición Bilingüe (ES / EN)
              </span>
              <span className="px-3 py-1 bg-black border border-gray-700 text-gray-400 text-[10px] uppercase tracking-widest rounded-full">
                Ebook / PDF Interactivo
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-cinzel text-gray-100 mb-2 leading-tight">Demonios del Verum</h1>
            <p className="text-sm font-sans text-green-400 mb-4 uppercase tracking-widest">Autoría de Praxis Magick</p>
            
            <div onClick={() => document.getElementById('resenas')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center gap-2 mb-6 cursor-pointer group">
              {isStoreOpen ? (
                <>
                  <div className="flex text-green-500 text-sm">★★★★<span className="text-green-500">★</span></div>
                  <span className="text-xs font-sans text-gray-400 group-hover:text-green-300 transition-colors">4.8 (14 reseñas)</span>
                </>
              ) : (
                <>
                  <div className="flex text-gray-600 text-sm">★★★★★</div>
                  <span className="text-xs font-sans text-gray-500 group-hover:text-gray-300 transition-colors">0 reseñas (Preventa)</span>
                </>
              )}
            </div>

            <div className="flex flex-col md:flex-row md:items-baseline gap-2 mb-6 p-4 bg-white/5 border border-white/10 rounded-xl">
              {isStoreOpen ? (
                <span className="text-3xl font-bold text-green-300">$340 MXN <span className="text-base font-sans text-gray-400 font-normal">($19.99 USD)</span></span>
              ) : (
                <>
                  <div className="flex flex-col">
                    <span className="text-xs text-green-400 uppercase tracking-widest mb-1">Precio Especial de Preventa</span>
                    <span className="text-3xl font-bold text-green-300">$220 MXN <span className="text-base font-sans text-gray-300 font-normal">($12.99 USD)</span></span>
                  </div>
                  <span className="text-sm text-gray-500 line-through md:ml-4">$340 MXN ($19.99 USD)</span>
                </>
              )}
            </div>

            <p className="text-sm text-gray-300 font-sans leading-relaxed mb-8">
              El Grimorium Verum rescatado y traducido a un método operativo directo. Sin dogmas religiosos ni parafernalia innecesaria. Diseñado para el practicante moderno que busca resultados tangibles mediante la estrategia y el ritual completo de los 18 espíritus.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button onClick={handleAddToCart} className="flex-1 py-4 bg-green-700 hover:bg-green-600 text-white text-sm font-bold font-cinzel uppercase tracking-wider rounded-lg transition-colors shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                Añadir al Carrito
              </button>
              <button onClick={handleFreeSample} className="flex-1 py-4 bg-transparent border border-green-500/50 text-green-300 hover:bg-green-950/40 text-sm font-cinzel uppercase tracking-wider rounded-lg transition-colors">
                Obtener Muestra
              </button>
              <button onClick={handleToggleFavorite} className={`w-full sm:w-14 h-14 flex items-center justify-center border rounded-lg transition-colors ${isFavorite ? 'bg-red-950/50 border-red-500 text-red-500' : 'bg-transparent border-gray-600 text-gray-400 hover:border-gray-400'}`}>
                <svg className="w-6 h-6" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
              </button>
            </div>
            
            <div className="flex gap-4 text-[10px] text-gray-500 font-sans uppercase tracking-widest justify-center md:justify-start">
              <span className="flex items-center gap-1">🔒 Pago Seguro</span>
              <span className="flex items-center gap-1">⚡ Entrega Inmediata</span>
            </div>
          </div>
        </div>

        {/* SECCIÓN DE DETALLES */}
        <div className="w-full mb-16 border border-white/10 rounded-2xl overflow-hidden bg-black/40 backdrop-blur-sm">
          <div className="flex border-b border-white/10 overflow-x-auto">
            <button onClick={() => setActiveTab("sinopsis")} className={`flex-1 py-4 px-4 text-xs font-bold font-cinzel uppercase tracking-widest whitespace-nowrap transition-colors ${activeTab === "sinopsis" ? "bg-green-900/20 text-green-300 border-b-2 border-green-400" : "text-gray-400 hover:text-gray-200"}`}>Sinopsis</button>
            <button onClick={() => setActiveTab("aprendizaje")} className={`flex-1 py-4 px-4 text-xs font-bold font-cinzel uppercase tracking-widest whitespace-nowrap transition-colors ${activeTab === "aprendizaje" ? "bg-green-900/20 text-green-300 border-b-2 border-green-400" : "text-gray-400 hover:text-gray-200"}`}>Qué Aprenderás</button>
            <button onClick={() => setActiveTab("ficha")} className={`flex-1 py-4 px-4 text-xs font-bold font-cinzel uppercase tracking-widest whitespace-nowrap transition-colors ${activeTab === "ficha" ? "bg-green-900/20 text-green-300 border-b-2 border-green-400" : "text-gray-400 hover:text-gray-200"}`}>Ficha Técnica</button>
          </div>
          
          <div className="p-6 md:p-10 text-sm font-sans text-gray-300 leading-relaxed">
            {activeTab === "sinopsis" && (
              <p>El Grimorium Verum ha sido malinterpretado durante siglos. En este tomo, Praxis Magick destila la verdadera esencia de su sistema operativo, eliminando el velo de superstición para revelar una maquinaria de resultados directos. Aprenderás a establecer contacto, negociar y dirigir a los 18 espíritus del Duque Syrach sin requerir túnicas, herramientas costosas ni dogmas limitantes.</p>
            )}
            {activeTab === "aprendizaje" && (
              <ul className="list-disc pl-5 space-y-3">
                <li>La vibración de las siete vocales griegas y el Sello de Apertura Solar.</li>
                <li>La creación de tu Llave Maestra mediante el Sello de Scirlin.</li>
                <li>Elaboración de peticiones exactas para evitar vacíos legales mágicos.</li>
                <li>El contrato directo: cómo la proclamación pública sirve como ofrenda post-manifestación.</li>
              </ul>
            )}
            {activeTab === "ficha" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 border-b border-white/5 pb-2">
                  <span className="text-gray-500">Idiomas:</span>
                  <span className="text-green-300">Español e Inglés (Intercambiable)</span>
                </div>
                <div className="grid grid-cols-2 border-b border-white/5 pb-2">
                  <span className="text-gray-500">Formato:</span>
                  <span className="text-gray-200">PDF Interactivo Adaptable</span>
                </div>
                <div className="grid grid-cols-2 pb-2">
                  <span className="text-gray-500">Acceso:</span>
                  <span className="text-gray-200">Permanente en tu Bóveda Digital</span>
                </div>
                <div className="mt-4 p-4 bg-green-950/30 border border-green-500/30 rounded-lg text-xs text-green-200">
                  <strong>Nota sobre el idioma:</strong> Podrás alternar entre Español e Inglés con un solo clic directamente desde el visor de tu Bóveda Digital. Esta función aplica tanto para el tomo completo como para la muestra gratuita.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* EL CÍRCULO DE LECTORES */}
        <div id="resenas" className="w-full pt-10 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
            <div>
              <h3 className="text-2xl font-cinzel text-gray-100 mb-2">Ecos del Cónclave</h3>
              <p className="text-sm font-sans text-gray-400">Comentarios y experiencias de los practicantes.</p>
            </div>
            <button onClick={handleLeaveReview} className="px-6 py-2 border border-green-500/50 text-green-300 hover:bg-green-900/30 rounded text-xs font-bold uppercase tracking-wider transition-colors">
              Agregar un comentario
            </button>
          </div>

          {!isStoreOpen ? (
            <div className="text-center py-12 bg-white/5 rounded-xl border border-white/10">
              <p className="text-gray-400 font-sans text-sm">El cónclave está en silencio. Sé el primero en comentar tras el lanzamiento.</p>
            </div>
          ) : (
            <div className="space-y-6">
              
              <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center font-sans font-bold text-lg text-gray-300">R</div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200">Rafael O.</h4>
                      <span className="text-[10px] text-green-400 uppercase tracking-widest flex items-center gap-1">Lectura de Muestra</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 font-sans">24 Sep</span>
                </div>
                <div className="flex text-green-500 text-xs mb-3">★★★★<span className="text-gray-600">★</span></div>
                <p className="text-sm font-sans text-gray-300 leading-relaxed">
                  La muestra gratuita me convenció por completo. Me encantó la premisa de que no necesitas trazar círculos de sal porque la verdadera protección nace de tu autoridad como operador. La app es comodísima para leer de noche, parece un Kindle oscuro.
                </p>
              </div>
              
              <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-900 rounded-full flex items-center justify-center font-sans font-bold text-lg text-purple-300">V</div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200">Valeria C.</h4>
                      <span className="text-[10px] text-green-400 uppercase tracking-widest flex items-center gap-1">✓ Adquisición Verificada</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 font-sans">26 Sep</span>
                </div>
                <div className="flex text-green-500 text-xs mb-3">★★★★★</div>
                <p className="text-sm font-sans text-gray-300 leading-relaxed">
                  Llamé a Surgat para destrabar un negocio que llevaba meses bloqueado por burocracia y funcionó rapidísimo. El ritual con la vibración de las siete vocales y el sello de Scirlin se siente brutalmente poderoso. Un enfoque muy directo.
                </p>
              </div>

              <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-900 rounded-full flex items-center justify-center font-sans font-bold text-lg text-green-300">S</div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200">Sombra_88</h4>
                      <span className="text-[10px] text-green-400 uppercase tracking-widest flex items-center gap-1">✓ Adquisición Verificada</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 font-sans">28 Sep</span>
                </div>
                <div className="flex text-green-500 text-xs mb-3">★★★★★</div>
                <p className="text-sm font-sans text-gray-300 leading-relaxed">
                  Por fin magia transaccional sin dogmas ni culpas. La regla de pagar con la proclamación pública sólo en la "fase dos" (cuando el resultado ya se materializó) es lo más lógico que he leído. Además, la opción de cambiar entre ES y EN con un botón es una joya.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}