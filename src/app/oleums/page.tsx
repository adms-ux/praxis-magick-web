"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// ==========================================
// 1. BASE DE DATOS Y TEXTOS
// ==========================================
const TEASER_TEXT = "Cada Oleum de Praxis Magick es una herramienta de múltiples facetas. Al adquirirlo en nuestra tienda en línea, no solo recibes la fórmula ritualizada, sino que obtendrás de regalo un grimorio digital exclusivo. Este material te enseñará a utilizar su poder mucho más allá de su propósito principal, adaptándolo a diferentes áreas de tu vida, desde el éxito material hasta el crecimiento personal. Las instrucciones completas y secretos de uso se revelarán en tu biblioteca virtual al momento de tu compra.";

const OLEUMS_DATA = [
  { 
    id: "jester", name: "Jester's Road", spirit: "Surgat", category: "Oleum Abre Caminos", color: "#f97316",
    bg: "/bg-jester.png", bgMobile: "/bg-jester-mobile.png", image: "/frasco-jester.png", titleImage: "/title-jester.png",
    legend: "En las cortes medievales, solo el bufón podía decirle la verdad al rey sin perder la cabeza. Su locura era su máscara y su astucia, su verdadero poder. Quien camina la senda del bufón no mendiga oportunidades; utiliza el ingenio para crearlas de la nada y abrir las puertas más pesadas."
  },
  { 
    id: "leprechaun", name: "Leprechaun's Hoard", spirit: "Frutimiere", category: "Magia de Abundancia", color: "#10b981",
    bg: "/bg-leprechaun.png", bgMobile: "/bg-leprechaun-mobile.png", image: "/frasco-leprechaun.png", titleImage: "/title-leprechaun.png",
    legend: "El duende guarda su tesoro al final de un arco que solo algunos logran ver. Es el espíritu de la oportunidad inesperada y el hallazgo fortuito. Frutimiere es la mano que guía hacia el flujo del circulante, convirtiendo el azar en una aliada constante para atraer abundancia a tu vida."
  },
  { 
    id: "witch", name: "Witch's Glamour", spirit: "Frimost", category: "Magia de Lujuria", color: "#22c55e",
    bg: "/bg-witch.png", bgMobile: "/bg-witch-mobile.png", image: "/frasco-witch.png", titleImage: "/title-witch.png",
    legend: "En la Europa antigua, quienes dominaban el arte del glamour tejían redes de fascinación irresistibles. Su presencia era un hechizo magnético. Witch's Glamour despierta esa atracción seductora y carnal, una fuerza que puede ser invocada por cualquier persona para cautivar, sin importar su género u orientación sexual."
  },
  { 
    id: "pope", name: "Pope's Decree", spirit: "Huictigaras", category: "Magia de Dominio", color: "#a855f7",
    bg: "/bg-pope.png", bgMobile: "/bg-pope-mobile.png", image: "/frasco-pope.png", titleImage: "/title-pope.png",
    legend: "El Papa no gobernaba con ejércitos, sino con la autoridad absoluta de su palabra. El verdadero control comienza en la mente del otro. Quien logra influir en el pensamiento ajeno, gobierna el territorio sin necesidad de fuerza ni conflicto."
  },
  { 
    id: "king", name: "King's Vault", spirit: "Clauneck", category: "Prosperidad", color: "#eab308",
    bg: "/bg-king.png", bgMobile: "/bg-king-mobile.png", image: "/frasco-king.png", titleImage: "/title-king.png",
    legend: "La riqueza de un rey no se basaba en la fortuna efímera, sino en la impecable arquitectura de su imperio. Clauneck no concede simples golpes de suerte, sino la autoridad, el estatus y la visión necesarias para consolidar una prosperidad sólida, estructural y duradera en el tiempo."
  },
  { 
    id: "danse", name: "Danse Macabre", spirit: "Guland", category: "Magia Funesta", color: "#e2e8f0",
    bg: "/bg-danse.png", bgMobile: "/bg-danse-mobile.png", image: "/frasco-danse.png", titleImage: "/title-danse.png",
    legend: "La Danza Macabra era el recordatorio definitivo en los murales antiguos: todo ciclo debe terminar para que otro comience. Guland conoce el ritmo exacto de esta disolución. Aquello que está estancado, nocivo o corrupto en tu entorno debe caer para dejar espacio a una verdadera renovación."
  },
];

export default function OleumsPage() {
  const [idx, setIdx] = useState(0);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Estados para animaciones y Swipe
  const [fade, setFade] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const current = OLEUMS_DATA[idx];

  // ==========================================
  // MOTOR DE PRECARGA (Carga instantánea)
  // ==========================================
  useEffect(() => {
    OLEUMS_DATA.forEach((item) => {
      const imagesToPreload = [item.bg, item.bgMobile, item.image, item.titleImage];
      imagesToPreload.forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });
    });
  }, []);

  // ==========================================
  // TRANSICIONES SUAVES Y NAVEGACIÓN
  // ==========================================
  const changeOleum = (newIdx: number) => {
    setFade(true); 
    setTimeout(() => {
      setIdx(newIdx);
      setFade(false); 
    }, 400); 
  };

  const nextOleum = () => changeOleum(idx === OLEUMS_DATA.length - 1 ? 0 : idx + 1);
  const prevOleum = () => changeOleum(idx === 0 ? OLEUMS_DATA.length - 1 : idx - 1);

  // ==========================================
  // LÓGICA DE SWIPE (DESLIZAR EN MÓVIL)
  // ==========================================
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) nextOleum();
    if (isRightSwipe) prevOleum();
    setTouchStart(0);
    setTouchEnd(0);
  };

  // ==========================================
  // CONEXIÓN A MAKE.COM / SUPABASE
  // ==========================================
  const handleNotifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    try {
      const webhookUrl = "URL_DE_TU_WEBHOOK_MAKE_AQUI"; 
      if(webhookUrl !== "URL_DE_TU_WEBHOOK_MAKE_AQUI") {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email, oleum_interes: current.name }),
        });
      } else {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      alert(`¡Gracias! Te avisaremos al correo ${email} cuando ${current.name} esté disponible.`);
      setEmail("");
    } catch (error) {
      alert("Hubo un error. Por favor, inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-gray-200 flex flex-col items-center overflow-x-hidden relative font-sans">
      
      {/* Importación de fuente Celta Medieval (Uncial Antiqua) */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Uncial+Antiqua&display=swap');
        .font-celtic { font-family: 'Uncial Antiqua', cursive; }
      `}</style>

      {/* FONDO FOTOGRÁFICO ANCLADO (Sin saltos en scroll móvil) */}
      <div className="fixed top-0 bottom-0 left-0 right-0 z-0 pointer-events-none bg-black">
        {/* Fondo versión Móvil (9:16) */}
        <div 
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out md:hidden ${fade ? "opacity-0" : "opacity-40"}`}
          style={{ backgroundImage: `url(${current.bgMobile})` }}
        />
        {/* Fondo versión PC (16:9) */}
        <div 
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out hidden md:block ${fade ? "opacity-0" : "opacity-40"}`}
          style={{ backgroundImage: `url(${current.bg})` }}
        />
        {/* Gradiente para fundir bordes oscuros */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,#000000_90%)] md:bg-[radial-gradient(circle_at_center,transparent_20%,#000000_90%)]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl flex flex-col min-h-screen px-6 py-8">
        
        {/* HEADER LIMPIO */}
        <header className="w-full flex justify-start mb-8">
          <Link href="/" className="text-sm font-medium text-gray-400 hover:text-white transition-colors flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm z-50">
            « Volver al inicio
          </Link>
        </header>

        {/* LOGO PRINCIPAL (LÍNEA DE OLEUMS) */}
        <div className="w-full flex justify-center mb-8 h-12 md:h-16 relative">
          <Image 
             src="/oleums-main.png" 
             alt="Línea de Oleums" 
             fill
             className="object-contain"
             priority
          />
        </div>

        {/* ========================================== */}
        {/* CARRUSEL INMERSIVO (CON SOPORTE SWIPE) */}
        {/* ========================================== */}
        <div 
          className="flex flex-col items-center justify-center w-full relative mb-12"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* FLECHAS DIRECCIONALES */}
          <div className="flex justify-between items-center w-full max-w-3xl absolute top-[40%] -translate-y-1/2 z-30 px-0 pointer-events-none">
            <button onClick={prevOleum} className="pointer-events-auto text-4xl md:text-5xl text-gray-400 hover:text-white transition-colors p-4 cursor-pointer focus:outline-none drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">‹</button>
            <button onClick={nextOleum} className="pointer-events-auto text-4xl md:text-5xl text-gray-400 hover:text-white transition-colors p-4 cursor-pointer focus:outline-none drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">›</button>
          </div>

          {/* CONTENEDOR DE PRODUCTO CON ANIMACIÓN DE DESVANECIMIENTO */}
          <div className={`flex flex-col items-center justify-center w-full transition-all duration-500 ease-in-out ${fade ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
             
             {/* FRASCO */}
             <div className="relative w-48 h-72 md:w-64 md:h-96 flex items-center justify-center mb-6">
               <Image 
                 src={current.image} 
                 alt={current.name} 
                 fill 
                 className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] transition-transform duration-700 hover:scale-105"
                 priority
               />
               {/* Resplandor orgánico sin bordes cuadrados (Radial Gradient) */}
               <div 
                 className="absolute inset-0 -z-10 scale-150 transition-colors duration-1000"
                 style={{ background: `radial-gradient(circle, ${current.color}55 0%, transparent 65%)` }}
               />
             </div>

             {/* TÍTULO EN ARCO */}
             <div className="w-full max-w-[280px] h-20 md:h-28 relative flex justify-center items-center mb-6">
                <Image 
                  src={current.titleImage}
                  alt={current.name}
                  fill
                  className="object-contain transition-all duration-700"
                  style={{ filter: `drop-shadow(0 5px 15px rgba(0,0,0,0.8))` }}
                  priority
                />
             </div>

             {/* ESPÍRITU Y CATEGORÍA */}
             <div className="flex flex-col items-center gap-2 mb-4">
               <span className="text-sm font-semibold tracking-widest uppercase border-b border-white/20 pb-1" style={{ color: current.color }}>
                 {current.category}
               </span>
               <span className="text-sm text-gray-300 bg-black/50 px-4 py-1 rounded-full border border-white/10 backdrop-blur-md">
                 Espíritu Ritualizado: <span className="font-bold">{current.spirit}</span>
               </span>
             </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* LEYENDAS Y DESCRIPCIÓN */}
        {/* ========================================== */}
        <div className={`w-full max-w-3xl mx-auto flex flex-col gap-8 text-center z-20 mb-16 transition-opacity duration-500 ${fade ? "opacity-0" : "opacity-100"}`}>
          <div className="bg-black/60 border border-white/10 backdrop-blur-xl p-8 md:p-10 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.6)]">
            
            {/* APLICACIÓN DE LA FUENTE CELTA */}
            <blockquote className="text-xl md:text-2xl font-celtic text-gray-200 leading-relaxed mb-8 tracking-wide">
              "{current.legend}"
            </blockquote>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

            <p className="text-sm font-sans text-gray-400 leading-relaxed px-2 text-justify md:text-center">
              {TEASER_TEXT}
            </p>
          </div>
        </div>

        {/* ========================================== */}
        {/* FORMULARIO DE CAPTURA */}
        {/* ========================================== */}
        <div className="w-full max-w-xl mx-auto mb-10 z-20">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col items-center backdrop-blur-xl">
            <h4 className="text-lg font-bold text-white mb-2 text-center">Notificaciones de Lanzamiento</h4>
            <p className="text-sm text-gray-400 mb-6 text-center font-sans">
              Ingresa tu correo electrónico para recibir un aviso en cuanto esta fórmula esté disponible en la tienda.
            </p>
            
            <form onSubmit={handleNotifySubmit} className="flex flex-col sm:flex-row w-full gap-3">
              <input 
                type="email" 
                required
                placeholder="Tu correo electrónico..." 
                className="flex-grow bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                style={{ outlineColor: current.color }}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isSubmitting}
              />
              <button 
                type="submit"
                disabled={isSubmitting || !email}
                className="px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 text-black cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: current.color, boxShadow: `0 0 15px ${current.color}40` }}
              >
                {isSubmitting ? "Enviando..." : "Avisarme"}
              </button>
            </form>
          </div>
        </div>

        {/* ========================================== */}
        {/* FOOTER INSTAGRAM */}
        {/* ========================================== */}
        <footer className="w-full flex justify-center py-8 mt-auto z-20">
          <a 
            href="https://www.instagram.com/praxis.magick?igsh=MWRucmEwNmwyejQxMA==&igsi=MWRucmEwNmwyejQxMA==" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 group"
          >
            <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
            </svg>
            <span className="font-sans text-sm tracking-widest uppercase">Síguenos en Instagram</span>
          </a>
        </footer>

      </div>
    </main>
  );
}