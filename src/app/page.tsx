"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import PortalRegistro from "./Components/PortalRegistro";
import CatalogoCompleto from "./Components/CatalogoCompleto";
import ServiciosBanners from "./Components/ServiciosBanners";
import ChatFlotante from "./Components/ChatFlotante";
import BotonSubir from "./Components/BotonSubir";
import { useLegal } from "./Context/LegalContext";

export default function Home() {
  const { openLegalModal } = useLegal(); 
  
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isStoreOpen, setIsStoreOpen] = useState(false);
  
  // MOCK: Variable de estado de usuario
  const isUserLoggedIn = false; 

  const [showLoginPrompt, setShowLoginPrompt] = useState(false); 
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const targetDate = new Date(2026, 8, 23, 23, 59, 59).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setIsStoreOpen(true);
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = heroContainerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let isActive = true;

    const resizeCanvas = () => {
      if (!canvas || !container) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    interface Lightning { branches: Lightning[]; alpha: number; path: { x: number; y: number }[]; }
    let activeLightnings: Lightning[] = [];
    let flashAlpha = 0;

    const createLightningPath = (x1: number, y1: number, x2: number, y2: number, depth = 0): Lightning => {
      const path: { x: number; y: number }[] = [{ x: x1, y: y1 }];
      let currentX = x1; let currentY = y1;
      const steps = 18 + Math.random() * 8;
      const dy = (y2 - y1) / steps;
      for (let i = 0; i < steps; i++) {
        currentX += (Math.random() - 0.5) * 45; currentY += dy;
        path.push({ x: currentX, y: currentY });
      }
      const branches: Lightning[] = [];
      if (depth < 2 && Math.random() > 0.35) {
        const branchIndex = Math.floor(Math.random() * (path.length - 2)) + 1;
        const branchStart = path[branchIndex];
        branches.push(createLightningPath(branchStart.x, branchStart.y, branchStart.x + (Math.random() - 0.5) * 220, branchStart.y + 140 + Math.random() * 100, depth + 1));
      }
      return { branches, alpha: 1, path };
    };

    const triggerStrike = () => {
      const startX = Math.random() * width;
      const endX = startX + (Math.random() - 0.5) * 320;
      const endY = height * (0.55 + Math.random() * 0.35);
      activeLightnings.push(createLightningPath(startX, 0, endX, endY));
      flashAlpha = 0.35 + Math.random() * 0.25;
    };

    let nextStrikeTimer = 0;

    const render = () => {
      if (!isActive) { animationFrameId = requestAnimationFrame(render); return; }
      ctx.clearRect(0, 0, width, height);
      
      if (flashAlpha > 0) {
        ctx.fillStyle = `rgba(34, 197, 94, ${flashAlpha})`; 
        ctx.fillRect(0, 0, width, height);
        flashAlpha -= 0.03;
      }
      
      activeLightnings.forEach((bolt, index) => {
        ctx.beginPath();
        ctx.moveTo(bolt.path[0].x, bolt.path[0].y);
        for (let i = 1; i < bolt.path.length; i++) { ctx.lineTo(bolt.path[i].x, bolt.path[i].y); }
        ctx.strokeStyle = `rgba(200, 255, 200, ${bolt.alpha})`;
        ctx.lineWidth = 2.5; ctx.shadowColor = "#22c55e"; ctx.shadowBlur = 18; ctx.stroke();
        bolt.alpha -= 0.04;
        if (bolt.alpha <= 0) activeLightnings.splice(index, 1);
      });
      
      nextStrikeTimer++;
      if (nextStrikeTimer > 160 + Math.random() * 220) { triggerStrike(); nextStrikeTimer = 0; }
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const formatNumber = (num: number) => String(num).padStart(2, "0");
  const toggleFaq = (index: number) => { setOpenFaq(openFaq === index ? null : index); };

  const handleComprarAction = () => {
    // Redirige a la sección del libro directamente
    window.location.href = "/ebooks";
  };

  const handleMuestraGratis = () => {
    if (!isUserLoggedIn) {
      setShowLoginPrompt(true);
    } else {
      // Lógica futura para mostrar PDF si está logueado
    }
  };

  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden flex flex-col items-center text-white selection:bg-green-900 selection:text-green-300 pb-10">
      <style>{`
        .font-cinzel { font-family: var(--font-cinzel); }
        .font-medieval { font-family: var(--font-medieval); }
        .font-sans { font-family: sans-serif; }
        
        .hero-mask {
          mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 100%);
          -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 100%);
        }
      `}</style>
      
      <div className="fixed inset-0 pointer-events-none z-0 bg-black bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.10),transparent_80%)]" />

      <div ref={heroContainerRef} className="hero-mask relative w-full md:w-[95%] max-w-6xl mx-auto h-[70vh] min-h-[500px] overflow-hidden mt-16 z-10 flex flex-col items-center justify-center">
        <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full" />
        
        <div className="absolute top-[10%] right-[10%] w-24 h-24 md:w-32 md:h-32 z-10 flex items-center justify-center">
          <div className="absolute w-[200%] h-[200%] rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.25)_0%,transparent_70%)] animate-pulse" />
          <Image src="/luna.png" alt="Luna" fill className="object-contain drop-shadow-[0_0_15px_rgba(34,197,94,0.7)]" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        </div>

        <div className="absolute bottom-0 w-full h-[55%] md:h-[70%] z-10 opacity-90 pointer-events-none mix-blend-lighten">
          <Image src="/castillo.png" alt="Castillo" fill className="object-cover object-bottom" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        </div>

        <div className="relative z-20 flex flex-col items-center mt-[-15vh]">
          <div className="w-32 h-32 md:w-44 md:h-44 mb-2 rounded-full border border-green-500/30 bg-black/60 backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.3)] p-3">
            <Image src="/logo.png" alt="Logo Praxis Magick" width={160} height={160} className="object-contain" priority />
          </div>
          <h1 className="text-sm md:text-lg font-cinzel text-gray-300 tracking-[0.2em] md:tracking-[0.3em] uppercase drop-shadow-md text-center bg-black/40 px-6 py-2 rounded-full backdrop-blur-sm border border-white/5">
            Tienda de Productos Esotéricos
          </h1>
        </div>
      </div>

      <div className="relative z-20 flex flex-col items-center px-4 w-full max-w-5xl -mt-16 pb-10">
        
        <div className="mb-10 w-full flex justify-center">
          {isStoreOpen ? (
            <div className="px-10 py-6 border-b border-green-500/50 text-center w-full max-w-md">
              <h2 className="text-xl md:text-2xl font-cinzel text-green-300 tracking-widest uppercase">La Bóveda está Abierta</h2>
            </div>
          ) : (
            <div className="px-8 py-4 border border-white/10 rounded-2xl bg-black/60 backdrop-blur-md text-center">
              <p className="text-3xl md:text-5xl font-mono text-green-400 tracking-widest">
                {formatNumber(timeLeft.days)}:{formatNumber(timeLeft.hours)}:{formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)}
              </p>
              <p className="text-[10px] text-gray-400 mt-2 font-cinzel tracking-[0.2em] flex justify-between px-2 uppercase">
                <span>Días</span> <span>Hrs</span> <span>Min</span> <span>Seg</span>
              </p>
            </div>
          )}
        </div>

        {/* EBOOK BANNER LIMPIO CON PRECIO INTELIGENTE */}
        <div className="w-full max-w-4xl bg-black/60 border border-green-500/30 rounded-xl overflow-hidden mb-10 flex flex-col md:flex-row items-center p-6 gap-6 md:gap-10 backdrop-blur-sm shadow-[0_0_30px_rgba(21,128,61,0.15)]">
          <div className="w-32 h-48 md:w-40 md:h-60 shrink-0 relative rounded-md overflow-hidden shadow-[0_0_20px_rgba(21,128,61,0.3)]">
            <Image src="/verum-portada.png" alt="Demonios del Verum" fill className="object-cover" priority onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          </div>
          <div className="flex-grow text-center md:text-left flex flex-col justify-center">
            <span className="text-[10px] uppercase tracking-widest text-green-400 mb-2 font-sans border border-green-500/30 inline-block px-2 py-1 rounded w-max mx-auto md:mx-0">Disponible Ahora</span>
            <h2 className="text-2xl md:text-3xl font-cinzel text-gray-100 mb-2">Demonios del Verum</h2>
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <span className="text-2xl font-bold text-green-300">${isStoreOpen ? "340" : "220"} MXN</span>
              {!isStoreOpen && <span className="text-sm text-gray-400 line-through">$340 MXN</span>}
            </div>
            <p className="text-xs md:text-sm text-gray-400 font-medieval leading-relaxed mb-6">
              El Grimorium Verum rescatado y traducido a un método operativo para el siglo XXI. Incluye la estrategia y el ritual completo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button onClick={handleComprarAction} className="px-6 py-3 bg-green-700 hover:bg-green-600 text-white text-sm font-bold font-cinzel uppercase tracking-wider rounded-lg transition-colors cursor-pointer border border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                {isStoreOpen ? "Comprar Ebook" : "Comprar Preventa"}
              </button>
              <button onClick={handleMuestraGratis} className="px-6 py-3 bg-transparent border border-gray-600 hover:border-gray-400 text-gray-300 text-sm font-cinzel uppercase tracking-wider rounded-lg transition-colors cursor-pointer">
                Ver Muestra Gratis
              </button>
            </div>
          </div>
        </div>

        <PortalRegistro />
        <CatalogoCompleto />
        <ServiciosBanners />

        <div id="faq" className="w-full max-w-3xl text-left mt-10">
          <h3 className="text-2xl font-cinzel text-purple-300 mb-6 text-center border-b border-white/10 pb-4">Preguntas Frecuentes</h3>
          <div className="space-y-2 font-sans text-sm">
            <div className="bg-white/5 rounded-lg">
              <button onClick={() => toggleFaq(1)} className="w-full p-4 text-left flex justify-between items-center text-gray-300 hover:text-white">
                ¿Debo crear cuenta para comprar? <span className="text-purple-400">{openFaq === 1 ? "−" : "+"}</span>
              </button>
              {openFaq === 1 && <div className="px-4 pb-4 text-xs text-gray-400 text-justify">Sí. Es obligatorio para que tus ebooks, grimorios e instrucciones de uso se guarden permanentemente en tu Bóveda Digital y protejamos los derechos de distribución.</div>}
            </div>
            <div className="bg-white/5 rounded-lg">
              <button onClick={() => toggleFaq(2)} className="w-full p-4 text-left flex justify-between items-center text-gray-300 hover:text-white">
                ¿Hay envíos internacionales? <span className="text-purple-400">{openFaq === 2 ? "−" : "+"}</span>
              </button>
              {openFaq === 2 && <div className="px-4 pb-4 text-xs text-gray-400 text-justify">La biblioteca digital (ebooks y cursos) es global. Los productos físicos (Oleums, Velas, Polvos) solo se envían dentro de México debido a restricciones aduanales botánicas.</div>}
            </div>
          </div>
        </div>

      </div>

      <footer className="w-full border-t border-white/10 bg-black/80 backdrop-blur-md py-8 px-6 z-30 text-center font-sans text-[10px] text-gray-500 mt-auto">
        <div className="flex flex-wrap justify-center gap-4 text-gray-400 mb-4">
          <button onClick={() => openLegalModal("terminos")} className="hover:text-green-400 underline cursor-pointer">Términos y Condiciones</button>
          <button onClick={() => openLegalModal("privacidad")} className="hover:text-purple-400 underline cursor-pointer">Aviso de Privacidad</button>
        </div>
        <p>© 2026 Praxis Magick. Todos los derechos reservados.</p>
      </footer>

      <BotonSubir />
      <ChatFlotante />

      {/* Modal de Aviso de Registro Restringido */}
      {showLoginPrompt && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-sm bg-black border border-green-500/50 rounded-2xl p-6 md:p-8 font-sans text-center shadow-[0_0_30px_rgba(34,197,94,0.2)]">
            <button onClick={() => setShowLoginPrompt(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl cursor-pointer">✕</button>
            <h3 className="text-xl font-cinzel text-green-300 mb-4">Ingreso Requerido</h3>
            <p className="text-xs text-gray-300 mb-6 leading-relaxed font-medieval">
              Debes tener una cuenta en el Círculo Interno para leer muestras, acceder a instrucciones, o realizar compras en la tienda.
            </p>
            <div className="flex flex-col gap-3">
              <button className="w-full py-3 bg-green-700 hover:bg-green-600 text-white font-bold rounded-lg transition-colors text-sm shadow-[0_0_15px_rgba(34,197,94,0.3)] cursor-pointer">
                Crear cuenta gratuita
              </button>
              <button onClick={() => setShowLoginPrompt(false)} className="w-full py-2 bg-transparent border border-gray-600 text-gray-400 hover:border-gray-400 hover:text-white rounded-lg transition-colors text-xs cursor-pointer">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}