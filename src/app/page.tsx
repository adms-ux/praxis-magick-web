"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import PortalRegistro from "./Components/PortalRegistro";
import CatalogoCompleto from "./Components/CatalogoCompleto";
import ServiciosMagicos from "./Components/ServiciosMagicos";
import { useLegal } from "./Context/LegalContext";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Home() {
  const { openLegalModal } = useLegal(); 
  
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isStoreOpen, setIsStoreOpen] = useState(false);

  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showFreeTrialModal, setShowFreeTrialModal] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [showEbookFaqModal, setShowEbookFaqModal] = useState(false);
  const [openEbookFaq, setOpenEbookFaq] = useState<number | null>(null);

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [checkoutEmail, setCheckoutEmail] = useState("");
  const [checkoutLanguage, setCheckoutLanguage] = useState<"es" | "en">("es");

  const [freeTrialEmail, setFreeTrialEmail] = useState("");
  const [freeTrialLanguage, setFreeTrialLanguage] = useState<"es" | "en">("es");
  const [isSubmittingTrial, setIsSubmittingTrial] = useState(false);

  const [pdfUrlToView, setPdfUrlToView] = useState("");
  const [rawPdfUrl, setRawPdfUrl] = useState(""); 

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
        ctx.fillStyle = `rgba(168, 85, 247, ${flashAlpha})`;
        ctx.fillRect(0, 0, width, height);
        flashAlpha -= 0.03;
      }
      
      activeLightnings.forEach((bolt, index) => {
        ctx.beginPath();
        ctx.moveTo(bolt.path[0].x, bolt.path[0].y);
        for (let i = 1; i < bolt.path.length; i++) { ctx.lineTo(bolt.path[i].x, bolt.path[i].y); }
        ctx.strokeStyle = `rgba(235, 210, 255, ${bolt.alpha})`;
        ctx.lineWidth = 2.5; ctx.shadowColor = "#c084fc"; ctx.shadowBlur = 18; ctx.stroke();
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
  const toggleEbookFaq = (index: number) => { setOpenEbookFaq(openEbookFaq === index ? null : index); };

  const handleProceedToPayment = () => {
    if (!checkoutEmail || !EMAIL_REGEX.test(checkoutEmail)) return;
    window.location.href = `https://buy.stripe.com/14AcN7eDmbCt39N7Sc9IQ01?prefilled_email=${encodeURIComponent(checkoutEmail)}&client_reference_id=${encodeURIComponent(checkoutLanguage)}`;
  };

  const handleSubmitFreeTrial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!freeTrialEmail || !EMAIL_REGEX.test(freeTrialEmail)) return;
    setIsSubmittingTrial(true);
    try {
      await fetch("/api/webhook", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event_type: "free_trial", email: freeTrialEmail, language: freeTrialLanguage, timestamp: new Date().toISOString() }),
      });
      const baseUrl = freeTrialLanguage === "es" 
        ? "https://nsdimmoimblxjamvkskc.supabase.co/storage/v1/object/public/archivos_preventa/demonios-del-verum-muestra-es.pdf" 
        : "https://nsdimmoimblxjamvkskc.supabase.co/storage/v1/object/public/archivos_preventa/demonios-del-verum-sample-en.pdf";
      setRawPdfUrl(baseUrl);
      setPdfUrlToView(`https://docs.google.com/gview?url=${encodeURIComponent(baseUrl)}&embedded=true`);
      setShowFreeTrialModal(false); setShowPdfModal(true); setFreeTrialEmail("");
    } finally { setIsSubmittingTrial(false); }
  };

  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden flex flex-col items-center text-white selection:bg-purple-900 selection:text-green-300">
      <style>{`
        .font-cinzel { font-family: var(--font-cinzel); }
        .font-medieval { font-family: var(--font-medieval); }
        .font-sans { font-family: sans-serif; }
        
        .hero-mask {
          mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 100%);
          -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 100%);
        }
      `}</style>
      
      <div className="fixed inset-0 pointer-events-none z-0 bg-black bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.12),transparent_80%)]" />

      <div ref={heroContainerRef} className="hero-mask relative w-full md:w-[95%] max-w-6xl mx-auto h-[65vh] min-h-[550px] overflow-hidden mt-16 z-10 flex flex-col items-center justify-center">
        
        <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full" />
        
        <div className="absolute top-[10%] right-[10%] w-24 h-24 md:w-32 md:h-32 z-10 flex items-center justify-center">
          <div className="absolute w-[200%] h-[200%] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.3)_0%,transparent_70%)] animate-pulse" />
          <Image src="/luna.png" alt="Luna" fill className="object-contain drop-shadow-[0_0_15px_rgba(168,85,247,0.7)]" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        </div>

        <div className="absolute bottom-0 w-full h-[45%] md:h-[60%] z-10 opacity-90 pointer-events-none mix-blend-lighten">
          <Image src="/castillo.png" alt="" fill className="object-cover object-bottom" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        </div>

        <div className="relative z-20 flex flex-col items-center mt-[-10vh]">
          <div className="w-32 h-32 md:w-44 md:h-44 mb-4 rounded-full border border-purple-500/30 bg-black/60 backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.3)] p-3">
            <Image src="/logo.png" alt="Logo Praxis Magick" width={160} height={160} className="object-contain" priority />
          </div>
          <h1 className="text-sm md:text-lg font-cinzel text-gray-300 tracking-[0.2em] md:tracking-[0.3em] uppercase drop-shadow-md text-center bg-black/40 px-6 py-2 rounded-full backdrop-blur-sm border border-white/5">
            Tienda de Productos Esotéricos
          </h1>
        </div>
      </div>

      <div className="relative z-20 flex flex-col items-center px-4 w-full max-w-6xl -mt-10 pb-20">
        
        <div className="mb-16">
          {isStoreOpen ? (
            <div className="px-10 py-6 border border-purple-500/50 rounded-2xl bg-black/80 backdrop-blur-md shadow-[0_0_30px_rgba(168,85,247,0.4)] text-center">
              <h2 className="text-2xl md:text-3xl font-cinzel text-purple-300 tracking-widest uppercase">La Bóveda está Abierta</h2>
            </div>
          ) : (
            <div className="px-8 md:px-12 py-5 border border-white/10 rounded-2xl bg-black/60 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.8)] text-center">
              <p className="text-3xl md:text-5xl font-mono text-green-400 tracking-widest drop-shadow-[0_0_15px_rgba(74,222,128,0.6)]">
                {formatNumber(timeLeft.days)}:{formatNumber(timeLeft.hours)}:{formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)}
              </p>
              <p className="text-[10px] md:text-xs text-gray-400 mt-2 font-cinzel tracking-[0.2em] flex justify-between px-2 uppercase">
                <span>Días</span> <span>Hrs</span> <span>Min</span> <span>Seg</span>
              </p>
            </div>
          )}
        </div>

        <div className="w-full max-w-4xl bg-black/60 border border-green-500/30 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(21,128,61,0.15)] mb-16 flex flex-col md:flex-row items-center p-6 gap-6 md:gap-10 backdrop-blur-sm">
          <div className="w-32 h-48 md:w-40 md:h-60 shrink-0 relative rounded-md overflow-hidden shadow-[0_0_20px_rgba(21,128,61,0.3)]">
            <Image src="/verum-portada.png" alt="Demonios del Verum" fill className="object-cover" priority />
          </div>
          <div className="flex-grow text-center md:text-left flex flex-col justify-center">
            <span className="text-[10px] uppercase tracking-widest text-green-400 mb-2 font-sans border border-green-500/30 inline-block px-2 py-1 rounded w-max mx-auto md:mx-0">Disponible Ahora</span>
            <h2 className="text-2xl md:text-3xl font-cinzel text-gray-100 mb-3">Demonios del Verum</h2>
            <p className="text-xs md:text-sm text-gray-400 font-medieval leading-relaxed mb-6">
              El Grimorium Verum rescatado y traducido a un método operativo para el siglo XXI. Incluye la estrategia, el entrenamiento y el ritual completo para trabajar con los 18 espíritus.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button onClick={() => setShowCheckoutModal(true)} className="px-6 py-3 bg-green-700 hover:bg-green-600 text-white text-sm font-bold font-cinzel uppercase tracking-wider rounded-lg transition-colors cursor-pointer border border-green-500/50">
                Comprar Ebook
              </button>
              <button onClick={() => setShowFreeTrialModal(true)} className="px-6 py-3 bg-transparent border border-gray-600 hover:border-gray-400 text-gray-300 text-sm font-cinzel uppercase tracking-wider rounded-lg transition-colors cursor-pointer">
                Leer Muestra
              </button>
            </div>
          </div>
        </div>

        <PortalRegistro />
        <CatalogoCompleto />
        <ServiciosMagicos />

      </div>

      <footer className="w-full border-t border-white/10 bg-black/80 backdrop-blur-md py-10 px-6 z-30 text-center font-medieval text-xs text-gray-500 mt-auto">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
          <div className="flex items-center gap-4 text-gray-400 text-sm">
            <span>Pagos procesados de forma segura con Stripe</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-gray-400">
            <button onClick={() => openLegalModal("terminos")} className="hover:text-green-400 underline cursor-pointer">Términos y Condiciones</button>
            <button onClick={() => openLegalModal("privacidad")} className="hover:text-purple-400 underline cursor-pointer">Aviso de Privacidad</button>
          </div>
          <p>© 2026 Praxis Magick. Todos los derechos reservados.</p>
        </div>
      </footer>

      {showCheckoutModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-black border border-green-500/40 rounded-2xl p-6 font-medieval text-gray-200">
            <button onClick={() => setShowCheckoutModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl">✕</button>
            <h3 className="text-2xl font-cinzel text-green-300 mb-3 text-center">Confirmación de Compra</h3>
            <div className="mb-4">
              <label className="block text-xs text-green-300 mb-1">Tu Correo Electrónico:</label>
              <input type="email" required value={checkoutEmail} onChange={(e) => setCheckoutEmail(e.target.value)} className="w-full px-4 py-2.5 bg-white/5 border border-green-500/30 rounded-lg text-white font-sans text-sm outline-none focus:border-green-400" />
            </div>
            <div className="mb-6 text-xs text-gray-300">
              <label className="flex items-start gap-3 cursor-pointer bg-green-950/20 p-3 rounded-lg border border-green-500/20">
                <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="mt-0.5 accent-green-500 w-4 h-4" />
                <span>He leído y acepto los Términos y Condiciones.</span>
              </label>
            </div>
            <button disabled={!termsAccepted || !checkoutEmail} onClick={handleProceedToPayment} className={`w-full py-4 rounded-lg font-medieval text-lg border ${termsAccepted && checkoutEmail ? "bg-green-600 text-white border-green-400 cursor-pointer" : "bg-gray-800 text-gray-500 cursor-not-allowed"}`}>
              Proceder al Pago Seguro
            </button>
          </div>
        </div>
      )}

      {showFreeTrialModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-black border border-purple-500/40 rounded-2xl p-6 shadow-[0_0_50px_rgba(168,85,247,0.3)] font-medieval text-gray-200">
            <button onClick={() => setShowFreeTrialModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl cursor-pointer">✕</button>
            <h3 className="text-2xl font-cinzel text-purple-300 mb-2 text-center">Prueba Gratuita</h3>
            <form onSubmit={handleSubmitFreeTrial} className="space-y-4">
              <div>
                <label className="block text-xs text-purple-300 mb-1">Correo electrónico:</label>
                <input type="email" required value={freeTrialEmail} onChange={(e) => setFreeTrialEmail(e.target.value)} disabled={isSubmittingTrial} className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-lg text-white font-sans outline-none focus:border-purple-400" />
              </div>
              <button type="submit" disabled={isSubmittingTrial || !freeTrialEmail} className="w-full py-3.5 bg-purple-800 hover:bg-purple-700 text-white rounded-lg font-medieval transition-all border border-purple-500/40 cursor-pointer disabled:opacity-50">
                {isSubmittingTrial ? "Procesando..." : "Ver Muestra Gratis"}
              </button>
            </form>
          </div>
        </div>
      )}

      {showPdfModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-2 md:p-4 bg-black/95 backdrop-blur-md">
          <div className="relative w-full h-full max-h-[90vh] max-w-4xl bg-black border border-purple-500/40 rounded-xl overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-3 px-5 bg-purple-950/40 border-b border-purple-500/30 shrink-0">
              <span className="font-cinzel text-purple-200 text-sm">Demonios del Verum - Muestra</span>
              <button onClick={() => setShowPdfModal(false)} className="text-gray-300 hover:text-white text-2xl font-bold cursor-pointer">✕</button>
            </div>
            <div className="flex-grow w-full h-full bg-white relative overflow-hidden" style={{ WebkitOverflowScrolling: 'touch' }}>
              <iframe src={pdfUrlToView} className="absolute top-0 left-0 w-full h-full border-none" title="Visor PDF" loading="lazy" />
            </div>
            <div className="bg-purple-950/80 p-2 text-center">
              <a href={rawPdfUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded text-xs font-bold font-sans">Abrir directo</a>
            </div>
          </div>
        </div>
      )}

      {showEbookFaqModal && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl bg-black border border-green-500/40 rounded-2xl p-6 shadow-[0_0_50px_rgba(34,197,94,0.2)] font-medieval text-gray-200">
            <button onClick={() => setShowEbookFaqModal(false)} className="absolute top-4 right-5 text-gray-400 hover:text-white text-2xl cursor-pointer">✕</button>
            <h3 className="text-2xl font-cinzel text-purple-300 mb-6 text-center">Antes de decidir</h3>
            <div className="space-y-4 mb-8">
              <div className="border border-white/10 rounded-xl bg-black/50 p-4">
                <h4 className="text-green-200 mb-2 font-semibold">¿Qué incluye exactamente el ebook?</h4>
                <p className="text-sm text-gray-300">El entrenamiento del operador, la estrategia completa con los espíritus, el ritual de evocación y el marco práctico para traducir peticiones antiguas a resultados concretos.</p>
              </div>
            </div>
            <button onClick={() => { setShowEbookFaqModal(false); setShowCheckoutModal(true); }} className="w-full py-4 bg-green-700 hover:bg-green-600 text-white rounded-xl font-bold font-cinzel text-lg">
              Comprar Preventa
            </button>
          </div>
        </div>
      )}
    </main>
  );
}