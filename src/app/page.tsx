"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import PortalRegistro from "./Components/PortalRegistro";
import CatalogoCompleto from "./Components/CatalogoCompleto";
import ServiciosMagicos from "./Components/ServiciosMagicos";
import { useLegal } from "./Context/LegalContext";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Home() {
  const { openLegalModal } = useLegal(); 
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showFreeTrialModal, setShowFreeTrialModal] = useState(false);
  const [showEbookFaqModal, setShowEbookFaqModal] = useState(false);
  const [openEbookFaq, setOpenEbookFaq] = useState<number | null>(null);
  const [showPdfModal, setShowPdfModal] = useState(false);

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [checkoutEmail, setCheckoutEmail] = useState("");
  const [checkoutLanguage, setCheckoutLanguage] = useState<"es" | "en">("es");

  const [freeTrialEmail, setFreeTrialEmail] = useState("");
  const [freeTrialLanguage, setFreeTrialLanguage] = useState<"es" | "en">("es");
  const [isSubmittingTrial, setIsSubmittingTrial] = useState(false);

  const [pdfUrlToView, setPdfUrlToView] = useState("");
  const [rawPdfUrl, setRawPdfUrl] = useState(""); 

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
      } else clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let isActive = true;

    const resizeCanvas = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    interface Lightning {
      branches: Lightning[];
      alpha: number;
      path: { x: number; y: number }[];
    }
    let activeLightnings: Lightning[] = [];
    let flashAlpha = 0;

    const createLightningPath = (x1: number, y1: number, x2: number, y2: number, depth = 0): Lightning => {
      const path: { x: number; y: number }[] = [{ x: x1, y: y1 }];
      let currentX = x1;
      let currentY = y1;
      const steps = 18 + Math.random() * 8;
      const dy = (y2 - y1) / steps;
      for (let i = 0; i < steps; i++) {
        currentX += (Math.random() - 0.5) * 45;
        currentY += dy;
        path.push({ x: currentX, y: currentY });
      }
      const branches: Lightning[] = [];
      if (depth < 2 && Math.random() > 0.35) {
        const branchIndex = Math.floor(Math.random() * (path.length - 2)) + 1;
        const branchStart = path[branchIndex];
        branches.push(
          createLightningPath(branchStart.x, branchStart.y, branchStart.x + (Math.random() - 0.5) * 220, branchStart.y + 140 + Math.random() * 100, depth + 1)
        );
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
      if (!isActive) {
          animationFrameId = requestAnimationFrame(render);
          return;
      }
      ctx.clearRect(0, 0, width, height);
      if (flashAlpha > 0) {
        ctx.fillStyle = `rgba(168, 85, 247, ${flashAlpha})`;
        ctx.fillRect(0, 0, width, height);
        flashAlpha -= 0.03;
      }
      activeLightnings.forEach((bolt, index) => {
        ctx.beginPath();
        ctx.moveTo(bolt.path[0].x, bolt.path[0].y);
        for (let i = 1; i < bolt.path.length; i++) {
          ctx.lineTo(bolt.path[i].x, bolt.path[i].y);
        }
        ctx.strokeStyle = `rgba(235, 210, 255, ${bolt.alpha})`;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = "#c084fc";
        ctx.shadowBlur = 18;
        ctx.stroke();
        bolt.alpha -= 0.04;
        if (bolt.alpha <= 0) activeLightnings.splice(index, 1);
      });
      nextStrikeTimer++;
      if (nextStrikeTimer > 160 + Math.random() * 220) {
        triggerStrike();
        nextStrikeTimer = 0;
      }
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
    if (!checkoutEmail) { alert("Por favor ingresa tu correo electrónico."); return; }
    if (!EMAIL_REGEX.test(checkoutEmail)) { alert("Por favor, ingresa un formato válido."); return; }
    window.location.href = `https://buy.stripe.com/14AcN7eDmbCt39N7Sc9IQ01?prefilled_email=${encodeURIComponent(checkoutEmail)}&client_reference_id=${encodeURIComponent(checkoutLanguage)}`;
  };

  const handleSubmitFreeTrial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!freeTrialEmail || !EMAIL_REGEX.test(freeTrialEmail)) return;
    setIsSubmittingTrial(true);
    try {
      await fetch("/api/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event_type: "free_trial", email: freeTrialEmail, language: freeTrialLanguage, timestamp: new Date().toISOString() }),
      });
      const baseUrl = freeTrialLanguage === "es" 
        ? "https://nsdimmoimblxjamvkskc.supabase.co/storage/v1/object/public/archivos_preventa/demonios-del-verum-muestra-es.pdf" 
        : "https://nsdimmoimblxjamvkskc.supabase.co/storage/v1/object/public/archivos_preventa/demonios-del-verum-sample-en.pdf";
      setRawPdfUrl(baseUrl);
      setPdfUrlToView(`https://docs.google.com/gview?url=${encodeURIComponent(baseUrl)}&embedded=true`);
      setShowFreeTrialModal(false);
      setShowPdfModal(true);
      setFreeTrialEmail("");
    } finally {
      setIsSubmittingTrial(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden flex flex-col items-center text-white selection:bg-purple-900 selection:text-green-300">
      <style>{`
        .font-cinzel { font-family: var(--font-cinzel); }
        .font-medieval { font-family: var(--font-medieval); }
        .font-serif-classic { font-family: 'Times New Roman', Times, serif; }
      `}</style>
      
      {/* FONDO ANIMADO */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(34,197,94,0.22),rgba(0,0,0,0.98))]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(147,51,234,0.3),transparent_75%)]" />
        <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full" />
        <div className="absolute top-[8%] right-[8%] md:top-[10%] md:right-[18%] w-28 h-28 md:w-36 md:h-36 flex items-center justify-center">
          <div className="absolute w-[200%] h-[200%] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.35)_0%,rgba(168,85,247,0.08)_45%,transparent_70%)] animate-pulse" />
          <Image src="/luna.png" alt="Luna" width={150} height={150} className="relative z-10 object-contain drop-shadow-[0_0_20px_rgba(168,85,247,0.7)]" />
        </div>
      </div>

      {/* HERO SECTION */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 md:px-6 w-full max-w-5xl pt-24 pb-20">
        <div className="w-28 h-28 md:w-36 md:h-36 mb-6 rounded-full border border-purple-500/30 bg-black/50 backdrop-blur-md flex items-center justify-center shadow-[0_0_25px_rgba(168,85,247,0.25)] p-2">
          <Image src="/logo.png" alt="Logo" width={140} height={140} className="object-contain w-full h-full" priority />
        </div>
        
        <h1 className="text-base md:text-2xl font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200 tracking-[0.15em] md:tracking-[0.2em] uppercase mb-10 drop-shadow-md whitespace-normal px-2">
          Tienda de Productos Esotéricos
        </h1>

        <div className="px-6 md:px-10 py-6 mb-10 mt-2 border border-white/10 rounded-2xl bg-black/60 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.8)]">
          <p className="text-4xl md:text-6xl font-mono text-green-400 tracking-widest drop-shadow-[0_0_15px_rgba(74,222,128,0.6)]">
            {formatNumber(timeLeft.days)}:{formatNumber(timeLeft.hours)}:{formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)}
          </p>
          <p className="text-xs md:text-sm text-gray-400 mt-3 font-cinzel tracking-[0.2em] flex justify-between px-2 uppercase">
            <span>Días</span> <span>Hrs</span> <span>Min</span> <span>Seg</span>
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 text-left mb-20 items-center">
          <div className="flex justify-center order-2 md:order-1">
            <div className="w-64 h-96 border border-green-500/30 bg-black/70 flex items-center justify-center shadow-[0_0_35px_rgba(21,128,61,0.35)] transform transition-transform hover:scale-105 duration-500 rounded-sm overflow-hidden">
              <Image src="/verum-portada.png" alt="Demonios del Verum" width={256} height={384} className="object-cover w-full h-full" priority />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-cinzel text-green-300 mb-4">Demonios del Verum</h2>
            <p className="text-md text-gray-300 font-medieval leading-relaxed mb-4 text-justify">
              El <em>Grimorium Verum</em> es uno de los grimorios más influyentes de la historia de la magia occidental — y también uno de los más incomprendidos.
            </p>
            <p className="text-md text-gray-300 font-medieval leading-relaxed mb-6 text-justify">
              <strong>Demonios del Verum</strong> rescata una parte de ese grimorio que casi nadie ha explorado en el mundo moderno. Un manual directo para quien busca resultados concretos, con el entrenamiento, la estrategia y el ritual completo para trabajar con estos 18 espíritus.
            </p>
            <button onClick={() => setShowEbookFaqModal(true)} className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 text-sm font-cinzel font-bold text-purple-200 border border-purple-500/50 rounded-lg bg-purple-900/30 hover:bg-purple-800/60 cursor-pointer">
              ¿Tienes dudas? Resuélvelas aquí
            </button>
            <div className="p-5 border border-purple-800/40 rounded-xl bg-purple-950/20 mb-6">
              <h3 className="text-lg font-cinzel text-purple-300 mb-2">Bono especial de preventa</h3>
              <p className="text-sm text-gray-300 font-medieval mb-3">Recibirás un cupón exclusivo para nuestro próximo lanzamiento:</p>
              <p className="text-sm font-semibold text-green-300 font-medieval mb-2">MAGIA OLÍMPICA — Espíritus Planetarios</p>
              <p className="text-xs text-purple-400 font-medieval">Se te enviará el día de su lanzamiento: 23 de octubre.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 w-full justify-center items-center mb-10">
          <button onClick={() => setShowCheckoutModal(true)} className="flex flex-col items-center justify-center px-8 py-4 bg-green-700/90 text-white rounded-xl font-medieval hover:scale-105 border border-green-500/50 cursor-pointer min-w-[280px]">
            <span className="text-xl font-bold">Comprar Preventa</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-2xl font-bold text-green-200">$220 MXN</span>
              <span className="text-sm text-gray-300 line-through font-sans">$340 MXN</span>
            </div>
          </button>
          <button onClick={() => setShowFreeTrialModal(true)} className="px-8 py-5 bg-transparent border-2 border-purple-600/80 text-purple-200 rounded-xl font-medieval text-lg hover:scale-105 cursor-pointer min-w-[280px]">
            Reclamar prueba gratis
          </button>
        </div>
      </div>

      {/* COMPONENTES INTEGRADORES */}
      <PortalRegistro/>
      <CatalogoCompleto/>
      <ServiciosMagicos/>

      {/* FOOTER */}
      <footer className="w-full border-t border-white/10 bg-black/80 backdrop-blur-md py-10 px-6 z-10 text-center font-medieval text-xs text-gray-500">
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

      {/* MODALES DE COMPRA Y PDF (Se mantienen exactamente iguales en funcionalidad) */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-black border border-green-500/40 rounded-2xl p-6 font-medieval text-gray-200">
            <button onClick={() => setShowCheckoutModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl">✕</button>
            <h3 className="text-2xl font-cinzel text-green-300 mb-3 text-center">Confirmación de Preventa</h3>
            <div className="mb-4">
              <label className="block text-xs text-green-300 mb-1">Tu Correo Electrónico:</label>
              <input type="email" required value={checkoutEmail} onChange={(e) => setCheckoutEmail(e.target.value)} className="w-full px-4 py-2.5 bg-white/5 border border-green-500/30 rounded-lg text-white font-sans text-sm" />
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
    </main>
  );
}