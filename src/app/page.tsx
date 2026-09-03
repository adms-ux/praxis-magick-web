"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
// IMPORTAMOS EL MEGÁFONO LEGAL:
import { useLegal } from "./Context/LegalContext";

const BANNERS = [
  "/banner-leprechaun.png",
  "/banner-pope.png",
  "/banner-king.png",
  "/banner-jester.png",
  "/banner-witch.png",
  "/banner-danse.png"
];

// Expresión regular para validar formato de correo electrónico
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Home() {
  const { openLegalModal } = useLegal(); // INICIALIZAMOS EL MEGÁFONO
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Estados de Modales
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

  const [currentBannerIdx, setCurrentBannerIdx] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Contador de la preventa
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

  // Intervalo del carrusel de banners
  useEffect(() => {
    const bannerInterval = setInterval(() => {
      setCurrentBannerIdx((prev) => (prev + 1) % BANNERS.length);
    }, 4000);
    return () => clearInterval(bannerInterval);
  }, []);

  // Animación del fondo (Rayos) - OPTIMIZADA PARA RAM
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
          createLightningPath(
            branchStart.x,
            branchStart.y,
            branchStart.x + (Math.random() - 0.5) * 220,
            branchStart.y + 140 + Math.random() * 100,
            depth + 1
          )
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

    const drawLightning = (bolt: Lightning) => {
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
      bolt.branches.forEach((branch) => {
        branch.alpha = bolt.alpha * 0.65;
        drawLightning(branch);
      });
    };

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
        drawLightning(bolt);
        bolt.alpha -= 0.04;
        if (bolt.alpha <= 0) {
          activeLightnings.splice(index, 1);
        }
      });
      nextStrikeTimer++;
      if (nextStrikeTimer > 160 + Math.random() * 220) {
        triggerStrike();
        nextStrikeTimer = 0;
      }
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    const handleVisibilityChange = () => { isActive = !document.hidden; };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        resizeCanvas();
        cancelAnimationFrame(animationFrameId);
        render();
      }
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pageshow", handlePageShow);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const formatNumber = (num: number) => String(num).padStart(2, "0");

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const toggleEbookFaq = (index: number) => {
    setOpenEbookFaq(openEbookFaq === index ? null : index);
  };

  const handleProceedToPayment = () => {
    if (!checkoutEmail) {
      alert("Por favor ingresa tu correo electrónico.");
      return;
    }
    if (!EMAIL_REGEX.test(checkoutEmail)) {
        alert("Por favor, ingresa un formato de correo electrónico válido.");
        return;
    }
    const stripeUrl = `https://buy.stripe.com/14AcN7eDmbCt39N7Sc9IQ01?prefilled_email=${encodeURIComponent(
      checkoutEmail
    )}&client_reference_id=${encodeURIComponent(checkoutLanguage)}`;
    window.location.href = stripeUrl;
  };

  const handleSubmitFreeTrial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!freeTrialEmail) return;
    if (!EMAIL_REGEX.test(freeTrialEmail)) {
        alert("Por favor, ingresa un formato de correo electrónico válido.");
        return;
    }
    setIsSubmittingTrial(true);
    try {
      await fetch("/api/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          event_type: "free_trial",
          email: freeTrialEmail, 
          language: freeTrialLanguage,
          timestamp: new Date().toISOString()
        }),
      });
      
      // Enlace crudo de Supabase
      const baseUrl = freeTrialLanguage === "es" 
        ? "https://nsdimmoimblxjamvkskc.supabase.co/storage/v1/object/public/archivos_preventa/demonios-del-verum-muestra-es.pdf" 
        : "https://nsdimmoimblxjamvkskc.supabase.co/storage/v1/object/public/archivos_preventa/demonios-del-verum-sample-en.pdf";
      
      // TRUCO: Envolvemos la URL en el visor de Google para forzar renderizado en celulares
      const viewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(baseUrl)}&embedded=true`;
      
      setPdfUrlToView(viewerUrl);
      setShowFreeTrialModal(false);
      setShowPdfModal(true);
      setFreeTrialEmail("");
    } catch (error) {
      alert("Hubo un error de conexión, por favor intenta de nuevo.");
    } finally {
      setIsSubmittingTrial(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden flex flex-col items-center text-white selection:bg-purple-900 selection:text-green-300">
      <style>{`
        @keyframes float-particle {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translateY(-100vh) scale(0.5); opacity: 0; }
        }
        .particle { animation: float-particle 12s infinite linear; }
        .font-cinzel { font-family: var(--font-cinzel); }
        .font-medieval { font-family: var(--font-medieval); }
        .font-serif-classic { font-family: 'Times New Roman', Times, serif; }
      `}</style>
      
      {/* AMBIENTE DE FONDO */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(34,197,94,0.22),rgba(0,0,0,0.98))]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(147,51,234,0.3),transparent_75%)]" />
        <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none w-full h-full" />
        <div className="absolute top-[8%] right-[8%] md:top-[10%] md:right-[18%] w-28 h-28 md:w-36 md:h-36 z-0 flex items-center justify-center">
          <div className="absolute w-[200%] h-[200%] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.35)_0%,rgba(168,85,247,0.08)_45%,transparent_70%)] animate-pulse" />
          <Image 
            src="/luna.png" 
            alt="Luna Púrpura" 
            width={150} 
            height={150} 
            className="relative z-10 object-contain drop-shadow-[0_0_20px_rgba(168,85,247,0.7)]" 
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </div>
        <div className="absolute inset-0">
          <div className="particle absolute left-[15%] bottom-0 w-1.5 h-1.5 bg-green-300 rounded-full blur-[1px]" style={{ animationDelay: '0s' }}></div>
          <div className="particle absolute left-[35%] bottom-0 w-2 h-2 bg-purple-300 rounded-full blur-[1px]" style={{ animationDelay: '3s' }}></div>
          <div className="particle absolute left-[60%] bottom-0 w-1 h-1 bg-green-400 rounded-full blur-[0.5px]" style={{ animationDelay: '6s' }}></div>
          <div className="particle absolute left-[80%] bottom-0 w-2 h-2 bg-purple-400 rounded-full blur-[1px]" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-5xl pt-10 pb-20">
        <div className="w-28 h-28 md:w-36 md:h-36 mb-6 rounded-full border border-purple-500/30 bg-black/50 backdrop-blur-md flex items-center justify-center shadow-[0_0_25px_rgba(168,85,247,0.25)] overflow-hidden p-2">
          <Image src="/logo.png" alt="Logo Praxis Magick" width={140} height={140} className="object-contain w-full h-full" priority />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-4 font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-300 to-gray-500 tracking-widest drop-shadow-[0_5px_10px_rgba(0,0,0,0.9)] uppercase">
          Praxis Magick
        </h1>
        
        <div className="w-full max-w-2xl text-center mb-6 px-4">
          <p className="font-serif-classic text-sm md:text-base text-gray-300 leading-relaxed bg-black/40 border border-white/5 backdrop-blur-md p-5 rounded-xl shadow-inner">
            «Praxis Magick es una tienda de productos esotéricos consagrados a los espíritus de la alta magia. Nuestro arsenal, tanto digital como físico, está dirigido a practicantes dedicados y al público en general. Sé testigo del nacimiento y la expansión de este proyecto mágico.»
          </p>
        </div>
        
        <div className="px-6 md:px-10 py-6 mb-10 mt-2 border border-white/10 rounded-2xl bg-black/60 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.8)]">
          <p className="text-4xl md:text-6xl font-mono text-green-400 tracking-widest drop-shadow-[0_0_15px_rgba(74,222,128,0.6)]">
            {formatNumber(timeLeft.days)}:{formatNumber(timeLeft.hours)}:{formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)}
          </p>
          <p className="text-xs md:text-sm text-gray-400 mt-3 font-cinzel tracking-[0.2em] flex justify-between px-2 uppercase">
            <span>Días</span> <span>Hrs</span> <span>Min</span> <span>Seg</span>
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-4 mb-16 text-sm font-medieval text-gray-300">
          <a href="#instrucciones" className="hover:text-green-400 transition-colors border-b border-transparent hover:border-green-400 pb-0.5">
            ↓ Instrucciones de compra
          </a>
          <span className="text-gray-600">•</span>
          <a href="#faq" className="hover:text-purple-400 transition-colors border-b border-transparent hover:border-purple-400 pb-0.5">
            ↓ Preguntas frecuentes
          </a>
        </div>

        {/* SECCIÓN LIBRO */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 text-left mb-20 items-center">
          <div className="flex justify-center order-2 md:order-1">
            <div className="w-64 h-96 border border-green-500/30 bg-black/70 flex items-center justify-center shadow-[0_0_35px_rgba(21,128,61,0.35)] transform transition-transform hover:scale-105 duration-500 rounded-sm overflow-hidden">
              <Image 
                src="/verum-portada.png" 
                alt="Demonios del Verum" 
                width={256} 
                height={384} 
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-cinzel text-green-300 mb-4 drop-shadow-md">Demonios del Verum</h2>
            <p className="text-md text-gray-300 font-medieval leading-relaxed mb-4">
              El <em>Grimorium Verum</em> es uno de los grimorios más influyentes de la historia de la magia occidental — y también uno de los más incomprendidos.
            </p>
            <p className="text-md text-gray-300 font-medieval leading-relaxed mb-6">
              <strong>Demonios del Verum</strong> rescata una parte de ese grimorio que casi nadie ha explorado en el mundo moderno. <strong>Deborah Visper</strong> traduce ese grimorio antiguo a un método operativo para el siglo XXI: sin dogma, sin lenguaje arcaico y sin rituales innecesariamente complicados. Un manual directo para quien busca resultados concretos, con el entrenamiento, la estrategia y el ritual completo para trabajar con estos 18 espíritus.
            </p>
            
            {/* NUEVO BOTÓN: SABER MÁS */}
            <button 
              onClick={() => setShowEbookFaqModal(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 text-sm font-cinzel font-bold tracking-wide text-purple-200 border border-purple-500/50 rounded-lg bg-purple-900/30 hover:bg-purple-800/60 hover:border-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all cursor-pointer"
            >
              ¿Tienes dudas? Resuélvelas aquí <span>→</span>
            </button>

            <blockquote className="text-xs font-medieval text-gray-400 border-l-2 border-purple-500 pl-3 mb-6 italic bg-purple-950/20 py-2 rounded-r">
              Aviso: Este contenido es de naturaleza esotérica y se ofrece con fines educativos y de práctica personal.
            </blockquote>
            
            <div className="p-5 border border-purple-800/40 rounded-xl bg-purple-950/20 backdrop-blur-sm mb-6">
              <h3 className="text-lg font-cinzel text-purple-300 mb-2 flex items-center gap-2">
                <span>🎟️</span> Bono especial de preventa
              </h3>
              <p className="text-sm text-gray-300 font-medieval leading-relaxed mb-3">
                Por tiempo limitado, al adquirir <em>Demonios del Verum</em> en preventa recibirás un cupón de descuento exclusivo para adquirir nuestro próximo lanzamiento:
              </p>
              <p className="text-sm font-semibold text-green-300 font-medieval mb-2">
                MAGIA OLÍMPICA — Aprende a Trabajar con los Espíritus Planetarios
              </p>
              <p className="text-xs text-gray-400 font-medieval leading-relaxed mb-3">
                Una guía introductoria al trabajo con las siete inteligencias planetarias clásicas, perfecta como complemento para expandir tu práctica más allá de la magia goética.
              </p>
              <p className="text-xs font-semibold text-purple-400 font-medieval">
                📅 El cupón se te enviará el día de su lanzamiento: 23 de octubre.
              </p>
            </div>
          </div>
        </div>

        {/* BOTONES PREVENTA Y PRUEBA GRATIS */}
        <div className="flex flex-col sm:flex-row gap-6 w-full justify-center items-center mb-10">
          <button 
            onClick={() => setShowCheckoutModal(true)}
            className="flex flex-col items-center justify-center px-8 py-4 bg-green-700/90 text-white rounded-xl font-medieval transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:bg-green-600 hover:shadow-[0_10px_30px_rgba(34,197,94,0.6)] border border-green-500/50 cursor-pointer min-w-[280px]"
          >
            <span className="text-xl font-bold tracking-wide">Comprar Preventa</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-2xl font-bold text-green-200">$220 MXN</span>
              <span className="text-sm text-gray-300 line-through decoration-red-500 decoration-2 font-sans">$340 MXN</span>
            </div>
            <div className="text-[11px] text-green-100/80 font-sans mt-0.5">
              <span>$12.99 USD</span> <span className="line-through text-gray-300 decoration-red-400">($19.99 USD)</span>
            </div>
          </button>
          <button 
            onClick={() => setShowFreeTrialModal(true)}
            className="px-8 py-5 bg-transparent border-2 border-purple-600/80 hover:border-purple-400 text-purple-200 rounded-xl font-medieval text-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:bg-purple-950/40 hover:shadow-[0_10px_30px_rgba(168,85,247,0.4)] cursor-pointer min-w-[280px]"
          >
            Reclamar prueba gratis
          </button>
        </div>

        {/* CARRUSEL DE BANNERS OLEUMS */}
        <div className="w-full max-w-4xl my-24 relative flex flex-col items-center">
          <Link href="/oleums" className="w-full relative block group">
            <div className="w-full h-48 md:h-72 relative rounded-2xl overflow-hidden border border-purple-500/40 shadow-[0_0_40px_rgba(168,85,247,0.2)] group-hover:shadow-[0_0_50px_rgba(168,85,247,0.5)] transition-all duration-500 bg-black/60">
              {BANNERS.map((src, idx) => (
                <Image 
                  key={src}
                  src={src} 
                  alt={`Arquetipo Oleum ${idx}`} 
                  fill 
                  style={{ objectFit: "cover" }}
                  className={`transition-opacity duration-1000 ease-in-out ${
                    currentBannerIdx === idx ? "opacity-60 group-hover:opacity-100" : "opacity-0"
                  }`} 
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end items-center pb-8 px-4 text-center">
                <span className="text-[10px] md:text-xs tracking-[0.3em] font-medieval text-green-300 uppercase mb-2">Próximo Lanzamiento</span>
                <h3 className="text-2xl md:text-4xl font-cinzel text-purple-200 drop-shadow-[0_5px_5px_rgba(0,0,0,0.9)] mb-5">
                  Línea de Oleums Ceremoniales
                </h3>
                <span className="px-6 py-2.5 md:py-3 bg-purple-900/80 border border-purple-500/50 text-white font-medieval text-sm rounded-lg group-hover:bg-purple-700 transition-colors shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                  Explorar la Colección →
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* INSTRUCCIONES DE COMPRA */}
        <div id="instrucciones" className="w-full max-w-3xl text-left border border-white/10 rounded-2xl bg-black/60 backdrop-blur-md p-8 mb-20 shadow-xl">
          <h3 className="text-2xl font-cinzel text-green-300 mb-6 text-center">Instrucciones de Compra y Entrega</h3>
          <div className="space-y-4 font-medieval text-gray-300">
            <div className="flex items-start gap-4">
              <span className="w-8 h-8 rounded-full bg-green-900/60 border border-green-500/40 flex items-center justify-center text-green-300 font-bold shrink-0">1</span>
              <p className="mt-1">Selecciona el idioma de tu preferencia (Español o Inglés) y realiza tu compra procesada de forma segura a través de Stripe.</p>
            </div>
            <div className="flex items-start gap-4">
              <span className="w-8 h-8 rounded-full bg-green-900/60 border border-green-500/40 flex items-center justify-center text-green-300 font-bold shrink-0">2</span>
              <p className="mt-1">Inmediatamente después de tu pago, recibirás un correo electrónico automático con tu recibo, confirmando tu acceso a la preventa.</p>
            </div>
            <div className="flex items-start gap-4">
              <span className="w-8 h-8 rounded-full bg-green-900/60 border border-green-500/40 flex items-center justify-center text-green-300 font-bold shrink-0">3</span>
              <p className="mt-1">El día oficial del lanzamiento (<strong>23 de septiembre</strong>), te enviaremos por correo electrónico los datos de acceso y la contraseña de tu cuenta de usuario.</p>
            </div>
            <div className="flex items-start gap-4">
              <span className="w-8 h-8 rounded-full bg-purple-900/60 border border-purple-500/40 flex items-center justify-center text-purple-300 font-bold shrink-0">4</span>
              <p className="mt-1">
                Con tu cuenta, podrás ingresar a nuestra aplicación web para leer <em>Demonios del Verum</em> directamente en tu biblioteca virtual. Para proteger los derechos de autor el material no será descargable, pero tendrás acceso a enlaces directos exclusivos para descargar e imprimir los sellos rituales.
              </p>
            </div>
          </div>
        </div>

        {/* PREGUNTAS FRECUENTES (GENERALES) */}
        <div id="faq" className="w-full max-w-3xl text-left mb-24">
          <h3 className="text-3xl font-cinzel text-purple-300 mb-8 text-center">Preguntas Frecuentes</h3>
          <div className="space-y-4 font-medieval">
            <div className="border border-white/10 rounded-xl bg-black/50 overflow-hidden">
              <button onClick={() => toggleFaq(1)} className="w-full p-5 text-left flex justify-between items-center text-gray-200 hover:text-green-300 transition-colors font-semibold cursor-pointer">
                <span>¿En qué idioma recibiré mi e-book?</span>
                <span className="text-xl text-purple-400">{openFaq === 1 ? "−" : "+"}</span>
              </button>
              {openFaq === 1 && (
                <div className="px-5 pb-5 text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-3">
                  Contamos con edición en Español e Inglés. Puedes seleccionar la versión deseada al momento de confirmar tu preventa o solicitar la prueba gratuita.
                </div>
              )}
            </div>
            <div className="border border-white/10 rounded-xl bg-black/50 overflow-hidden">
              <button onClick={() => toggleFaq(2)} className="w-full p-5 text-left flex justify-between items-center text-gray-200 hover:text-green-300 transition-colors font-semibold cursor-pointer">
                <span>¿Es un PDF o tengo que leerlo en la plataforma?</span>
                <span className="text-xl text-purple-400">{openFaq === 2 ? "−" : "+"}</span>
              </button>
              {openFaq === 2 && (
                <div className="px-5 pb-5 text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-3">
                  Por motivos de seguridad y para proteger los derechos de autor, el e-book <strong>no se envía en PDF ni es descargable</strong>. A partir del 23 de septiembre recibirás tus credenciales para leer el material de forma cómoda en tu biblioteca dentro de nuestra aplicación web. Sin embargo, dentro del libro encontrarás enlaces exclusivos para descargar e imprimir los diagramas y sellos necesarios para tu práctica.
                </div>
              )}
            </div>
            <div className="border border-white/10 rounded-xl bg-black/50 overflow-hidden">
              <button onClick={() => toggleFaq(3)} className="w-full p-5 text-left flex justify-between items-center text-gray-200 hover:text-green-300 transition-colors font-semibold cursor-pointer">
                <span>¿Puedo compartir mi acceso a la plataforma?</span>
                <span className="text-xl text-purple-400">{openFaq === 3 ? "−" : "+"}</span>
              </button>
              {openFaq === 3 && (
                <div className="px-5 pb-5 text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-3">
                  No. Es una obra de distribución exclusiva y tu cuenta de usuario es de uso estrictamente personal e intransferible. Compartir tus credenciales resultará en la terminación de tu cuenta sin derecho a reembolso.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="w-full border-t border-white/10 bg-black/80 backdrop-blur-md py-10 px-6 z-10 text-center font-medieval text-xs text-gray-500">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
          <div className="flex items-center gap-4 text-gray-400 text-sm">
            <span>Pagos procesados de forma segura con Stripe</span>
            <span className="text-gray-600">|</span>
            <span className="font-sans font-bold tracking-wider text-gray-300">VISA</span>
            <span className="font-sans font-bold tracking-wider text-gray-300">MASTERCARD</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-gray-400">
            <button onClick={() => openLegalModal("terminos")} className="hover:text-green-400 transition-colors underline cursor-pointer">
              Términos y Condiciones
            </button>
            <span className="text-gray-600">|</span>
            <button onClick={() => openLegalModal("privacidad")} className="hover:text-purple-400 transition-colors underline cursor-pointer">
              Aviso de Privacidad
            </button>
          </div>
          <a href="https://www.instagram.com/praxis.magick?igsh=MWRucmEwNmwyejQxMA==&igsi=MWRucmEwNmwyejQxMA==" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 group mt-2">
            <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
            </svg>
            <span className="font-sans text-xs tracking-widest uppercase">Síguenos en Instagram</span>
          </a>
          <p>© 2026 Praxis Magick. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* MODAL CHECKOUT */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-black border border-green-500/40 rounded-2xl p-6 shadow-[0_0_50px_rgba(34,197,94,0.3)] font-medieval text-gray-200">
            <button onClick={() => setShowCheckoutModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl cursor-pointer">✕</button>
            <h3 className="text-2xl font-cinzel text-green-300 mb-3 text-center">Confirmación de Preventa</h3>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4 text-sm space-y-2">
              <div className="flex justify-between font-semibold items-center">
                <span>Demonios del Verum (Preventa)</span>
                <div className="text-right">
                  <span className="text-green-400 font-bold">$220 MXN</span>
                  <span className="text-xs text-gray-400 block font-sans">($12.99 USD)</span>
                </div>
              </div>
              <p className="text-xs text-purple-300 border-t border-white/10 pt-2 mt-2">
                🎟️ Incluye: Cupón de descuento para <strong>Magia Olímpica</strong> (23 Oct).
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-xs text-green-300 mb-1.5">Idioma del e-book:</label>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => setCheckoutLanguage("es")} className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${checkoutLanguage === "es" ? "bg-green-900/60 border-green-400 text-green-200 shadow-[0_0_12px_rgba(34,197,94,0.4)]" : "bg-white/5 border-white/10 text-gray-400 hover:border-gray-500"}`}><span>🇪🇸</span> Español</button>
                <button type="button" onClick={() => setCheckoutLanguage("en")} className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${checkoutLanguage === "en" ? "bg-green-900/60 border-green-400 text-green-200 shadow-[0_0_12px_rgba(34,197,94,0.4)]" : "bg-white/5 border-white/10 text-gray-400 hover:border-gray-500"}`}><span>🇺🇸</span> English</button>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-xs text-green-300 mb-1">Tu Correo Electrónico:</label>
              <input type="email" required placeholder="tu@email.com" value={checkoutEmail} onChange={(e) => setCheckoutEmail(e.target.value)} className="w-full px-4 py-2.5 bg-white/5 border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-400 font-sans text-sm" />
              {/* TEXTO DE ADVERTENCIA CORREGIDO */}
              <p className="mt-2 text-xs text-green-200/70 italic leading-snug">
                * Al procesar tu pago, Stripe generará tu recibo. Tu acceso oficial se enviará a este correo electrónico. (Tip: La magia a veces se desvía, revisa tu carpeta de Spam o Correo No Deseado).
              </p>
            </div>
            <div className="mb-6 text-xs text-gray-300">
              <label className="flex items-start gap-3 cursor-pointer bg-green-950/20 p-3 rounded-lg border border-green-500/20">
                <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="mt-0.5 accent-green-500 w-4 h-4 rounded shrink-0 cursor-pointer" />
                <span className="leading-relaxed">He leído y acepto los <button onClick={() => openLegalModal("terminos")} className="text-green-400 underline font-semibold">Términos y Condiciones</button> y el <button onClick={() => openLegalModal("privacidad")} className="text-green-400 underline font-semibold">Aviso de Privacidad</button>.</span>
              </label>
            </div>
            <button disabled={!termsAccepted || !checkoutEmail} onClick={handleProceedToPayment} className={`w-full py-4 rounded-lg font-medieval text-lg transition-all duration-300 border ${termsAccepted && checkoutEmail ? "bg-green-600 hover:bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.5)] border-green-400 cursor-pointer" : "bg-gray-800 text-gray-500 border-gray-700 cursor-not-allowed"}`}>
              Proceder al Pago Seguro ({checkoutLanguage === "es" ? "Español" : "English"})
            </button>
          </div>
        </div>
      )}

      {/* MODAL PRUEBA GRATUITA */}
      {showFreeTrialModal && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-black border border-purple-500/40 rounded-2xl p-6 shadow-[0_0_50px_rgba(168,85,247,0.3)] font-medieval text-gray-200">
            <button onClick={() => setShowFreeTrialModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl cursor-pointer">✕</button>
            <h3 className="text-2xl font-cinzel text-purple-300 mb-2 text-center">Prueba Gratuita</h3>
            <p className="text-xs text-gray-300 text-center mb-5 leading-relaxed">
              Selecciona tu idioma e ingresa tu correo. Al hacerlo, abriremos automáticamente la muestra gratuita de <strong>Demonios del Verum</strong>.
            </p>
            <form onSubmit={handleSubmitFreeTrial} className="space-y-4">
              <div>
                <label className="block text-xs text-purple-300 mb-1.5">Idioma deseado:</label>
                <div className="grid grid-cols-2 gap-3">
                  <button type="button" onClick={() => setFreeTrialLanguage("es")} className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${freeTrialLanguage === "es" ? "bg-purple-900/60 border-purple-400 text-purple-200 shadow-[0_0_12px_rgba(168,85,247,0.4)]" : "bg-white/5 border-white/10 text-gray-400 hover:border-gray-500"}`}><span>🇪🇸</span> Español</button>
                  <button type="button" onClick={() => setFreeTrialLanguage("en")} className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${freeTrialLanguage === "en" ? "bg-purple-900/60 border-purple-400 text-purple-200 shadow-[0_0_12px_rgba(168,85,247,0.4)]" : "bg-white/5 border-white/10 text-gray-400 hover:border-gray-500"}`}><span>🇺🇸</span> English</button>
                </div>
              </div>
              <div>
                <label className="block text-xs text-purple-300 mb-1">Correo electrónico:</label>
                <input type="email" required placeholder="tu@email.com" value={freeTrialEmail} onChange={(e) => setFreeTrialEmail(e.target.value)} disabled={isSubmittingTrial} className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 font-sans" />
              </div>
              <div className="mb-4 text-[10px] text-gray-400 font-sans leading-tight">
                Al solicitar este contenido, aceptas nuestro <button type="button" onClick={() => openLegalModal("privacidad")} className="text-purple-400 underline">Aviso de Privacidad</button> y aceptas recibir comunicaciones promocionales.
              </div>
              <button type="submit" disabled={isSubmittingTrial || !freeTrialEmail} className="w-full py-3.5 bg-purple-800 hover:bg-purple-700 text-white rounded-lg font-medieval text-md transition-all duration-300 border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.4)] cursor-pointer disabled:opacity-50">
                {isSubmittingTrial ? "Procesando..." : `Ver Muestra Gratis (${freeTrialLanguage === "es" ? "Español" : "English"})`}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* NUEVO MODAL: VISOR DE PDF EN PANTALLA COMPLETA */}
      {showPdfModal && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-2 bg-black/95 backdrop-blur-md">
          <div className="relative w-full h-full max-h-[90vh] max-w-4xl bg-black border border-purple-500/40 rounded-xl overflow-hidden flex flex-col shadow-[0_0_40px_rgba(168,85,247,0.5)]">
            <div className="flex justify-between items-center p-3 px-5 bg-purple-950/40 border-b border-purple-500/30">
              <span className="font-cinzel text-purple-200 tracking-wide font-bold">Demonios del Verum - Muestra Gratuita</span>
              <button onClick={() => setShowPdfModal(false)} className="text-gray-300 hover:text-white text-2xl font-bold cursor-pointer">✕</button>
            </div>
            <iframe 
              src={pdfUrlToView} 
              className="w-full flex-grow bg-white" 
              title="Visor PDF"
            />
          </div>
        </div>
      )}

      {/* NUEVO MODAL: PREGUNTAS DEL EBOOK (SABER MÁS) */}
      {showEbookFaqModal && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-black border border-green-500/40 rounded-2xl p-6 md:p-8 shadow-[0_0_50px_rgba(34,197,94,0.2)] font-medieval text-gray-200 hide-scroll-bar">
            <button onClick={() => setShowEbookFaqModal(false)} className="absolute top-4 right-5 text-gray-400 hover:text-white text-2xl cursor-pointer">✕</button>
            
            <h3 className="text-2xl md:text-3xl font-cinzel text-purple-300 mb-2 text-center drop-shadow-md">Antes de decidir</h3>
            <p className="text-sm text-gray-400 text-center mb-6 font-sans">Lo que probablemente te estás preguntando</p>
            
            <div className="space-y-4 mb-8">
              <div className="border border-white/10 rounded-xl bg-black/50 overflow-hidden">
                <button onClick={() => toggleEbookFaq(1)} className="w-full p-4 text-left flex justify-between items-center text-green-200 hover:text-green-300 transition-colors font-semibold cursor-pointer text-sm md:text-base">
                  <span>¿Qué incluye exactamente el ebook?</span>
                  <span className="text-xl text-purple-400">{openEbookFaq === 1 ? "−" : "+"}</span>
                </button>
                {openEbookFaq === 1 && (
                  <div className="px-5 pb-5 text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-3">
                    El entrenamiento del operador (cómo posicionarte antes de invocar), la estrategia completa de trabajo con los 18 espíritus de Syrach, el ritual único de evocación a través de Scirlin, y el marco práctico para traducir peticiones antiguas ('construir castillos', 'proveer familiares') a resultados concretos en tu vida actual: influencia, aliados estratégicos, intuición aguda. No es una colección de datos históricos — es un método operativo paso a paso.
                  </div>
                )}
              </div>
              <div className="border border-white/10 rounded-xl bg-black/50 overflow-hidden">
                <button onClick={() => toggleEbookFaq(2)} className="w-full p-4 text-left flex justify-between items-center text-green-200 hover:text-green-300 transition-colors font-semibold cursor-pointer text-sm md:text-base">
                  <span>¿Esto es peligroso?</span>
                  <span className="text-xl text-purple-400">{openEbookFaq === 2 ? "−" : "+"}</span>
                </button>
                {openEbookFaq === 2 && (
                  <div className="px-5 pb-5 text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-3">
                    No si trabajas con el método tal como está estructurado. El sistema del Grimorium Verum no depende del miedo ni de círculos de sal desesperados: depende de que tú actúes como la autoridad del ritual. El libro te da tres capas de seguridad: cómo posicionarte como operador legítimo, el papel de Scirlin como intermediario que filtra a quién realmente llamas, y un cierre formal (la Licencia para Partir) que exige que el espíritu se retire sin causar daño. La tradición detrás de esta magia trataba a estos espíritus como aliados con los que se negocia, no como fuerzas que hay que temer a ciegas.
                  </div>
                )}
              </div>
              <div className="border border-white/10 rounded-xl bg-black/50 overflow-hidden">
                <button onClick={() => toggleEbookFaq(3)} className="w-full p-4 text-left flex justify-between items-center text-green-200 hover:text-green-300 transition-colors font-semibold cursor-pointer text-sm md:text-base">
                  <span>¿Necesito experiencia previa en magia?</span>
                  <span className="text-xl text-purple-400">{openEbookFaq === 3 ? "−" : "+"}</span>
                </button>
                {openEbookFaq === 3 && (
                  <div className="px-5 pb-5 text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-3">
                    No. El libro está escrito deliberadamente sin dogma ni lenguaje arcaico innecesario, pensado para que un operador moderno —con o sin experiencia previa— pueda entender la lógica del sistema y ejecutarlo. Si ya practicas otras tradiciones, puedes incorporar tus herramientas habituales (velas, inciensos, círculos); si no, el método funciona igual sin ellas, porque el poder reside en el operador, no en el objeto.
                  </div>
                )}
              </div>
              <div className="border border-white/10 rounded-xl bg-black/50 overflow-hidden">
                <button onClick={() => toggleEbookFaq(4)} className="w-full p-4 text-left flex justify-between items-center text-green-200 hover:text-green-300 transition-colors font-semibold cursor-pointer text-sm md:text-base">
                  <span>¿En qué formato voy a leerlo?</span>
                  <span className="text-xl text-purple-400">{openEbookFaq === 4 ? "−" : "+"}</span>
                </button>
                {openEbookFaq === 4 && (
                  <div className="px-5 pb-5 text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-3">
                    Lo lees directamente en tu biblioteca virtual dentro de nuestra plataforma web, con acceso desde tu cuenta. Para proteger la obra no está disponible como descarga, pero sí tendrás enlaces exclusivos para descargar e imprimir los sellos rituales que necesitas para la práctica. Aún no contamos con versiones físicas.
                  </div>
                )}
              </div>
            </div>
            
            {/* BOTÓN DE COMPRA DENTRO DEL MODAL */}
            <div className="flex justify-center w-full border-t border-green-500/30 pt-6 mt-4">
              <button 
                onClick={() => {
                  setShowEbookFaqModal(false);
                  setShowCheckoutModal(true);
                }}
                className="w-full sm:w-auto px-10 py-4 bg-green-700 hover:bg-green-600 text-white rounded-xl font-bold font-cinzel text-lg transition-all shadow-[0_0_20px_rgba(34,197,94,0.5)] cursor-pointer"
              >
                Comprar Preventa
              </button>
            </div>

          </div>
        </div>
      )}

    </main>
  );
}