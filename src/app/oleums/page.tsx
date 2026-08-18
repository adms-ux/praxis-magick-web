"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// ==========================================
// 1. BASE DE DATOS Y TEXTOS
// ==========================================
const TEASER_TEXT = "Cada Oleum de Praxis Magick es una herramienta de múltiples facetas. Al adquirirlo en nuestra tienda en línea, no solo recibes la fórmula ritualizada, sino que obtendrás de regalo un grimorio digital exclusivo. Este material te enseñará a utilizar su poder mucho más allá de su propósito principal, adaptándolo a diferentes áreas de tu vida, desde el éxito material hasta el crecimiento personal. Las instrucciones completas y secretos de uso se revelarán en tu biblioteca virtual al momento de tu compra.";

const OLEUMS_DATA = [
  { 
    id: "jester", name: "Jester's Road", spirit: "Surgat", category: "Oleum Abre Caminos", color: "#f97316",
    bg: "/bg-jester.png", image: "/frasco-jester.png", titleImage: "/title-jester.png",
    legend: "En las cortes medievales, solo el bufón podía decirle la verdad al rey sin perder la cabeza. Su locura era su máscara y su astucia, su verdadero poder. Quien camina la senda del bufón no mendiga oportunidades; utiliza el ingenio para crearlas de la nada y abrir las puertas más pesadas."
  },
  { 
    id: "leprechaun", name: "Leprechaun's Hoard", spirit: "Frutimiere", category: "Magia de Abundancia", color: "#10b981",
    bg: "/bg-leprechaun.png", image: "/frasco-leprechaun.png", titleImage: "/title-leprechaun.png",
    legend: "El duende guarda su tesoro al final de un arco que solo algunos logran ver. Es el espíritu de la oportunidad inesperada y el hallazgo fortuito. Frutimiere es la mano que guía hacia el flujo del circulante, convirtiendo el azar en una aliada constante para atraer abundancia a tu vida."
  },
  { 
    id: "witch", name: "Witch's Glamour", spirit: "Frimost", category: "Magia de Lujuria", color: "#22c55e",
    bg: "/bg-witch.png", image: "/frasco-witch.png", titleImage: "/title-witch.png",
    legend: "En la Europa antigua, quienes dominaban el arte del glamour tejían redes de fascinación irresistibles. Su presencia era un hechizo magnético. Witch's Glamour despierta esa atracción seductora y carnal, una fuerza que puede ser invocada por cualquier persona para cautivar, sin importar su género u orientación sexual."
  },
  { 
    id: "pope", name: "Pope's Decree", spirit: "Huictigaras", category: "Magia de Dominio", color: "#a855f7",
    bg: "/bg-pope.png", image: "/frasco-pope.png", titleImage: "/title-pope.png",
    legend: "El Papa no gobernaba con ejércitos, sino con la autoridad absoluta de su palabra. El verdadero control comienza en la mente del otro. Quien logra influir en el pensamiento ajeno, gobierna el territorio sin necesidad de fuerza ni conflicto."
  },
  { 
    id: "king", name: "King's Vault", spirit: "Clauneck", category: "Prosperidad", color: "#eab308",
    bg: "/bg-king.png", image: "/frasco-king.png", titleImage: "/title-king.png",
    legend: "La riqueza de un rey no se basaba en la fortuna efímera, sino en la impecable arquitectura de su imperio. Clauneck no concede simples golpes de suerte, sino la autoridad, el estatus y la visión necesarias para consolidar una prosperidad sólida, estructural y duradera en el tiempo."
  },
  { 
    id: "danse", name: "Danse Macabre", spirit: "Guland", category: "Magia Funesta", color: "#e2e8f0",
    bg: "/bg-danse.png", image: "/frasco-danse.png", titleImage: "/title-danse.png",
    legend: "La Danza Macabra era el recordatorio definitivo en los murales antiguos: todo ciclo debe terminar para que otro comience. Guland conoce el ritmo exacto de esta disolución. Aquello que está estancado, nocivo o corrupto en tu entorno debe caer para dejar espacio a una verdadera renovación."
  },
];

// ==========================================
// 2. COMPONENTE PRINCIPAL
// ==========================================
export default function OleumsPage() {
  const [idx, setIdx] = useState(0);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const current = OLEUMS_DATA[idx];

  const nextOleum = () => setIdx((prev) => (prev === OLEUMS_DATA.length - 1 ? 0 : prev + 1));
  const prevOleum = () => setIdx((prev) => (prev === 0 ? OLEUMS_DATA.length - 1 : prev - 1));

  // ==========================================
  // CONEXIÓN A MAKE.COM / SUPABASE
  // ==========================================
  const handleNotifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    try {
      // Reemplaza esta URL con el Webhook que generes en Make.com
      const webhookUrl = "URL_DE_TU_WEBHOOK_MAKE_AQUI"; 
      
      // Si aún no tienes la URL, esto simulará el envío correctamente.
      if(webhookUrl !== "URL_DE_TU_WEBHOOK_MAKE_AQUI") {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email, oleum_interes: current.name }),
        });
      } else {
        // Simulación de carga (Quitar cuando conectes Make)
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      alert(`¡Gracias! Te avisaremos al correo ${email} cuando ${current.name} esté disponible.`);
      setEmail("");
    } catch (error) {
      console.error("Error enviando lead:", error);
      alert("Hubo un error. Por favor, inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-gray-200 flex flex-col items-center overflow-x-hidden relative font-sans">
      
      {/* FONDO FOTOGRÁFICO CON DESVANECIDO EN BORDES */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-black">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out opacity-40"
          style={{ backgroundImage: `url(${current.bg})` }}
        />
        {/* Este gradiente radial funde los bordes de la imagen con el negro absoluto */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#000000_90%)]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl flex flex-col min-h-screen px-6 py-8">
        
        {/* HEADER LIMPIO Y MODERNO */}
        <header className="w-full flex justify-start mb-8">
          <Link href="/" className="text-sm font-medium text-gray-400 hover:text-white transition-colors flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
            « Volver al inicio
          </Link>
        </header>

        {/* LOGO PNG: Título Principal de la Línea (Recto) */}
        <div className="w-full flex justify-center mb-8 h-12 md:h-16 relative">
          <Image 
             src="/oleums-main.png" 
             alt="Línea de Oleums" 
             fill
             className="object-contain"
             onError={(e) => { 
               e.currentTarget.style.display = 'none'; 
               e.currentTarget.parentElement!.innerHTML = `<h1 class="text-2xl md:text-3xl font-cinzel text-white uppercase tracking-widest">Línea de Oleums</h1>`;
             }}
          />
        </div>

        {/* ========================================== */}
        {/* CARRUSEL INMERSIVO */}
        {/* ========================================== */}
        <div className="flex flex-col items-center justify-center w-full relative mb-12">
          
          <div className="flex justify-between items-center w-full max-w-3xl absolute top-[40%] -translate-y-1/2 z-30 px-0">
            <button onClick={prevOleum} className="text-4xl md:text-5xl text-gray-400 hover:text-white transition-colors p-4 cursor-pointer focus:outline-none">‹</button>
            <button onClick={nextOleum} className="text-4xl md:text-5xl text-gray-400 hover:text-white transition-colors p-4 cursor-pointer focus:outline-none">›</button>
          </div>

          <div className="flex flex-col items-center justify-center w-full">
             
             {/* FRASCO (PNG Flotante) */}
             <div className="relative w-48 h-72 md:w-64 md:h-96 flex items-center justify-center mb-6">
               <Image 
                 src={current.image} 
                 alt={current.name} 
                 fill 
                 className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] transition-all duration-700 hover:scale-105"
                 onError={(e) => { e.currentTarget.style.opacity = '0'; }}
               />
               {/* Iluminación de acento sutil detrás del frasco */}
               <div 
                 className="absolute inset-0 -z-10 blur-[80px] opacity-40 transition-colors duration-1000 rounded-full"
                 style={{ backgroundColor: current.color }}
               />
             </div>

             {/* TÍTULO EN ARCO (PNG) */}
             <div className="w-full max-w-[280px] h-20 md:h-28 relative flex justify-center items-center mb-6">
                <Image 
                  src={current.titleImage}
                  alt={current.name}
                  fill
                  className="object-contain transition-all duration-700"
                  style={{ filter: `drop-shadow(0 5px 15px rgba(0,0,0,0.8))` }}
                  onError={(e) => { 
                    e.currentTarget.style.display = 'none'; 
                    e.currentTarget.parentElement!.innerHTML = `<h2 class="text-3xl font-cinzel font-bold text-center" style="color: ${current.color}">${current.name}</h2>`;
                  }}
                />
             </div>

             {/* ESPÍRITU Y CATEGORÍA (UI Limpia) */}
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
        {/* LEYENDAS Y DESCRIPCIÓN COMERCIAL */}
        {/* ========================================== */}
        <div className="w-full max-w-3xl mx-auto flex flex-col gap-8 text-center z-20 mb-16">
          
          <div className="bg-black/60 border border-white/10 backdrop-blur-xl p-8 md:p-10 rounded-2xl shadow-2xl">
            {/* LEYENDA (Usa fuente medieval/serif legible) */}
            <blockquote className="text-base md:text-lg font-medieval text-gray-200 leading-relaxed italic mb-8">
              "{current.legend}"
            </blockquote>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

            {/* TEASER (Usa fuente moderna/sans-serif) */}
            <p className="text-sm font-sans text-gray-400 leading-relaxed px-2 text-justify md:text-center">
              {TEASER_TEXT}
            </p>
          </div>
        </div>

        {/* ========================================== */}
        {/* FORMULARIO DE CAPTURA LISTO PARA AUTOMATIZAR */}
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

      </div>
    </main>
  );
}