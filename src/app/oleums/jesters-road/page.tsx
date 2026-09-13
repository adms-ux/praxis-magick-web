"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "../../../Context/ToastContext";

export default function OleumJestersRoad() {
  const router = useRouter();
  const { showToast } = useToast();
  
  // Estados de la tienda y usuario
  const [isStoreOpen, setIsStoreOpen] = useState(false);
  const isUserLoggedIn = false; 
  const userHasPurchased = false; 
  
  // Estados de la interfaz
  const [activeTab, setActiveTab] = useState<"propiedades" | "aplicacion" | "ficha">("propiedades");
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Estado para la galería interactiva de imágenes
  const [mainImage, setMainImage] = useState("/banner-jester.png");

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
    showToast("Jester's Road añadido a tu carrito. Recuerda que los envíos físicos son solo en México.", "success");
  };

  const handleToggleFavorite = () => {
    if (!isUserLoggedIn) {
      showToast("Inicia sesión para guardar en tus deseos.", "error");
      return;
    }
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      showToast("Guardado en deseos. Te avisaremos cuando haya inventario.", "info");
    }
  };

  const handleLeaveReview = () => {
    if (!isUserLoggedIn) {
      showToast("Inicia sesión para interactuar con el Cónclave.", "error");
    } else if (!userHasPurchased) {
      showToast("Debes adquirir este Oleum para agregar un comentario.", "error");
    } else {
      showToast("Abriendo editor de comentarios...", "info");
    }
  };

  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden pt-24 pb-16 px-4 md:px-8 text-white selection:bg-red-900 selection:text-red-300">
      
      {/* Fondo inmersivo rojo/alquímico */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-black bg-[radial-gradient(ellipse_at_top,rgba(153,27,27,0.08),transparent_60%)]" />

      <div className="w-full max-w-6xl mx-auto z-10 relative">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors font-sans text-sm group w-max">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Regresar
          </button>
          <div className="text-xs font-sans text-gray-500 uppercase tracking-widest">
            <Link href="/" className="hover:text-red-400">Inicio</Link> <span className="mx-2">/</span> 
            <Link href="/oleums" className="hover:text-red-400">Oleums</Link> <span className="mx-2">/</span> 
            <span className="text-gray-300">Jester's Road</span>
          </div>
        </div>

        {/* SECCIÓN PRINCIPAL */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 mb-16">
          
          {/* Columna Izquierda: Galería de Imágenes Interactiva */}
          <div className="md:col-span-5 flex flex-col items-center">
            
            {/* Imagen Principal */}
            <div className="relative w-full max-w-[350px] aspect-square md:aspect-[4/5] rounded-md overflow-hidden shadow-[0_0_40px_rgba(153,27,27,0.15)] border border-red-900/30 group bg-gray-900">
              <Image 
                src={mainImage} 
                alt="Jester's Road Principal" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
                priority 
                onError={(e) => { e.currentTarget.style.display = 'none'; }} 
              />
            </div>
            
            {/* Miniaturas de Selección */}
            <div className="flex gap-4 mt-6 w-full max-w-[350px] justify-center">
              <button 
                onClick={() => setMainImage("/banner-jester.png")}
                className={`relative w-16 h-16 rounded overflow-hidden border transition-all ${mainImage === "/banner-jester.png" ? "border-red-500 opacity-100" : "border-gray-800 opacity-50 hover:opacity-100 hover:border-red-900"}`}
              >
                <Image src="/banner-jester.png" alt="Vista 1" fill className="object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              </button>
              <button 
                onClick={() => setMainImage("/jester-1.png")}
                className={`relative w-16 h-16 rounded overflow-hidden border bg-gray-900 flex items-center justify-center transition-all ${mainImage === "/jester-1.png" ? "border-red-500 opacity-100" : "border-gray-800 opacity-50 hover:opacity-100 hover:border-red-900"}`}
              >
                <Image src="/jester-1.png" alt="Vista 2" fill className="object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                <span className="text-[8px] text-gray-600 absolute">Foto 2</span>
              </button>
              <button 
                onClick={() => setMainImage("/jester-2.png")}
                className={`relative w-16 h-16 rounded overflow-hidden border bg-gray-900 flex items-center justify-center transition-all ${mainImage === "/jester-2.png" ? "border-red-500 opacity-100" : "border-gray-800 opacity-50 hover:opacity-100 hover:border-red-900"}`}
              >
                <Image src="/jester-2.png" alt="Vista 3" fill className="object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                <span className="text-[8px] text-gray-600 absolute">Foto 3</span>
              </button>
            </div>
          </div>

          {/* Columna Derecha: Información y Conversión */}
          <div className="md:col-span-7 flex flex-col justify-center">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-red-950/50 border border-red-900/50 text-red-300 text-[10px] uppercase tracking-widest rounded-full">
                Extracto Botánico Consagrado
              </span>
              <span className="px-3 py-1 bg-black border border-gray-700 text-gray-400 text-[10px] uppercase tracking-widest rounded-full flex items-center gap-1">
                ⚠️ Solo envíos en México
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-cinzel text-gray-100 mb-2 leading-tight">Jester's Road</h1>
            <p className="text-sm font-sans text-red-500 mb-4 uppercase tracking-widest">Oleum Abre Caminos — Dominio de Surgat</p>
            
            <div onClick={() => document.getElementById('resenas')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center gap-2 mb-6 cursor-pointer group">
              {isStoreOpen ? (
                <>
                  <div className="flex text-red-500 text-sm">★★★★★</div>
                  <span className="text-xs font-sans text-gray-400 group-hover:text-red-400 transition-colors">5.0 (8 reseñas)</span>
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
                <span className="text-3xl font-bold text-red-400">$450 MXN</span>
              ) : (
                <>
                  <div className="flex flex-col">
                    <span className="text-xs text-red-500 uppercase tracking-widest mb-1">Precio Especial de Preventa</span>
                    <span className="text-3xl font-bold text-red-400">$350 MXN</span>
                  </div>
                  <span className="text-sm text-gray-500 line-through md:ml-4">$450 MXN</span>
                </>
              )}
            </div>

            <p className="text-sm text-gray-300 font-sans leading-relaxed mb-6">
              El bufón ríe frente a las puertas cerradas, porque él tiene las llaves. Jester's Road es un oleum alquímico consagrado bajo la influencia de Surgat. Su propósito operativo es destrabar caminos, romper el estancamiento y forzar la apertura de oportunidades burocráticas, creativas o materiales que parecían bloqueadas.
            </p>

            {/* Aviso de Recompensa Digital */}
            <div className="mb-8 p-4 border border-purple-500/30 bg-purple-950/20 rounded-lg flex gap-4 items-center">
               <div className="text-2xl">🗝️</div>
               <div>
                 <h4 className="text-sm font-bold text-purple-300 font-cinzel mb-1">Grimorio Operativo Incluido</h4>
                 <p className="text-xs text-gray-400 font-sans">Al adquirir este frasco, se desbloqueará automáticamente en tu Bóveda Digital el ritual exacto para activarlo y dirigirlo.</p>
               </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button onClick={handleAddToCart} className="flex-1 py-4 bg-red-800 hover:bg-red-700 text-white text-sm font-bold font-cinzel uppercase tracking-wider rounded-lg transition-colors shadow-[0_0_20px_rgba(153,27,27,0.2)]">
                Añadir al Carrito
              </button>
              <button onClick={handleToggleFavorite} className={`w-full sm:w-14 h-14 flex items-center justify-center border rounded-lg transition-colors ${isFavorite ? 'bg-red-950/50 border-red-500 text-red-500' : 'bg-transparent border-gray-600 text-gray-400 hover:border-gray-400'}`}>
                <svg className="w-6 h-6" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
              </button>
            </div>
          </div>
        </div>

        {/* SECCIÓN DE DETALLES */}
        <div className="w-full mb-16 border border-white/10 rounded-2xl overflow-hidden bg-black/40 backdrop-blur-sm">
          <div className="flex border-b border-white/10 overflow-x-auto">
            <button onClick={() => setActiveTab("propiedades")} className={`flex-1 py-4 px-4 text-xs font-bold font-cinzel uppercase tracking-widest whitespace-nowrap transition-colors ${activeTab === "propiedades" ? "bg-red-900/20 text-red-400 border-b-2 border-red-500" : "text-gray-400 hover:text-gray-200"}`}>Propiedades</button>
            <button onClick={() => setActiveTab("aplicacion")} className={`flex-1 py-4 px-4 text-xs font-bold font-cinzel uppercase tracking-widest whitespace-nowrap transition-colors ${activeTab === "aplicacion" ? "bg-red-900/20 text-red-400 border-b-2 border-red-500" : "text-gray-400 hover:text-gray-200"}`}>Aplicación</button>
            <button onClick={() => setActiveTab("ficha")} className={`flex-1 py-4 px-4 text-xs font-bold font-cinzel uppercase tracking-widest whitespace-nowrap transition-colors ${activeTab === "ficha" ? "bg-red-900/20 text-red-400 border-b-2 border-red-500" : "text-gray-400 hover:text-gray-200"}`}>Ficha Técnica</button>
          </div>
          
          <div className="p-6 md:p-10 text-sm font-sans text-gray-300 leading-relaxed">
            {activeTab === "propiedades" && (
              <ul className="list-disc pl-5 space-y-3">
                <li>Formulado para desmantelar estancamientos energéticos.</li>
                <li>Útil en la apertura de negociaciones difíciles o trámites detenidos.</li>
                <li>Consagrado individualmente; no es un aceite de producción masiva.</li>
                <li>Su aroma botánico ancla la intención al plano físico.</li>
              </ul>
            )}
            {activeTab === "aplicacion" && (
              <p>El uso ritualístico de Jester's Road no exige herramientas complejas. Puede utilizarse para ungir velas, talismanes, documentos importantes o puntos de pulso. Al adquirir este producto, recibirás instrucciones precisas en el Grimorio Digital (desbloqueado automáticamente en tu Bóveda) para alinear este oleum con la autoridad del espíritu de Surgat.</p>
            )}
            {activeTab === "ficha" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 border-b border-white/5 pb-2">
                  <span className="text-gray-500">Volumen:</span>
                  <span className="text-gray-200">30 ml (Envase de cristal oscuro)</span>
                </div>
                <div className="grid grid-cols-2 border-b border-white/5 pb-2">
                  <span className="text-gray-500">Fabricación:</span>
                  <span className="text-gray-200">Artesanal / Consagrado bajo rito</span>
                </div>
                <div className="grid grid-cols-2 pb-2">
                  <span className="text-gray-500">Cobertura de Envío:</span>
                  <span className="text-red-400">Exclusivamente dentro de la República Mexicana</span>
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
              <p className="text-sm font-sans text-gray-400">Testimonios de quienes han caminado la ruta del bufón.</p>
            </div>
            <button onClick={handleLeaveReview} className="px-6 py-2 border border-red-900/50 text-red-400 hover:bg-red-900/30 rounded text-xs font-bold uppercase tracking-wider transition-colors">
              Agregar un comentario
            </button>
          </div>

          {!isStoreOpen ? (
            <div className="text-center py-12 bg-white/5 rounded-xl border border-white/10">
              <p className="text-gray-400 font-sans text-sm">El cónclave está en silencio. Sé el primero en comentar tras el lanzamiento de los Oleums.</p>
            </div>
          ) : (
            <div className="space-y-6">
              
              <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center font-sans font-bold text-lg text-gray-300">C</div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200">Carlos M.</h4>
                      <span className="text-[10px] text-red-400 uppercase tracking-widest flex items-center gap-1">✓ Adquisición Verificada</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 font-sans">25 Sep</span>
                </div>
                <div className="flex text-red-500 text-xs mb-3">★★★★★</div>
                <p className="text-sm font-sans text-gray-300 leading-relaxed">
                  Llevaba tres meses con un trámite legal atascado sin respuesta. Ungí los documentos copiados con el Jester's Road siguiendo el grimorio que se desbloqueó en mi cuenta, y en menos de una semana se resolvió. El empaque llegó impecable a CDMX.
                </p>
              </div>
              
              <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center font-sans font-bold text-lg text-red-300">A</div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200">Alina G.</h4>
                      <span className="text-[10px] text-red-400 uppercase tracking-widest flex items-center gap-1">✓ Adquisición Verificada</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 font-sans">28 Sep</span>
                </div>
                <div className="flex text-red-500 text-xs mb-3">★★★★★</div>
                <p className="text-sm font-sans text-gray-300 leading-relaxed">
                  El aroma botánico te ancla de inmediato. Me encanta la idea de comprar el producto físico y tener las instrucciones digitales siempre a la mano en el celular. Compré los otros dos grimorios de Surgat después de ver cómo funciona esto.
                </p>
              </div>

            </div>
          )}
        </div>

      </div>
    </main>
  );
}