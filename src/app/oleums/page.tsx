"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
// IMPORTAMOS EL MEGÁFONO LEGAL:
import { useLegal } from "../../context/LegalContext";

// ==========================================
// 1. BASE DE DATOS Y TEXTOS
// ==========================================
const DEFINICION_OLEOUMS = "Los Oleoums Medievales de Praxis Magick son aceites esenciales intencionados para bendecir o imbuir cualquier objeto ungido con la esencia de la fuerza daemónica o el propósito para el cual fue creado. Se utilizan para ungir objetos, velas o a uno mismo.";

const TEASER_TEXT = "Cada Oleum de Praxis Magick es una herramienta de múltiples facetas. Al adquirirlo en nuestra tienda en línea, no solo recibes la fórmula ritualizada, sino que obtendrás de regalo un grimorio digital exclusivo y demás grimorios que puedes desbloquear. Este material te enseñará a utilizar su poder mucho más allá de su propósito principal, adaptándolo a diferentes áreas de tu vida. Las instrucciones completas y secretos de uso se revelarán en tu biblioteca virtual al momento de tu compra.";

const OLEUMS_DATA = [
  { 
    id: "jester", 
    name: "Jester's Road", 
    spirit: "Surgat", 
    category: "OLEOUM ABRE CAMINOS", 
    color: "#f97316",
    bg: "/bg-jester.png", 
    bgMobile: "/bg-jester-mobile.png", 
    image: "/frasco-jester.png", 
    titleImage: "/title-jester.png",
    legend: "En las cortes medievales, solo el bufón podía decirle la verdad al rey sin perder la cabeza. Su locura era su máscara y su astucia, su verdadero poder. Quien camina la senda del bufón no mendiga oportunidades; Surgat en este Oleoum ayuda abrir las puertas de lugares donde quieres entrar, metafóricamente hablando."
  },
  { 
    id: "leprechaun", 
    name: "Leprechaun's Hoard", 
    spirit: "Frutimiere", 
    category: "OLEOUM DE ABUNDANCIA", 
    color: "#10b981",
    bg: "/bg-leprechaun.png", 
    bgMobile: "/bg-leprechaun-mobile.png", 
    image: "/frasco-leprechaun.png", 
    titleImage: "/title-leprechaun.png",
    legend: "El duende guarda su tesoro al final de un arco que solo algunos logran ver. Es el espíritu de la abundancia en todos los aspectos. Frutimiere es la mano que guía hacia el aumento sobre las cosas, convirtiendo el azar en una aliada constante para atraer abundancia a tu vida."
  },
  { 
    id: "pope", 
    name: "Pope's Decree", 
    spirit: "Huictigaras", 
    category: "OLEOUM DE DOMINACIÓN", 
    color: "#a855f7",
    bg: "/bg-pope.png", 
    bgMobile: "/bg-pope-mobile.png", 
    image: "/frasco-pope.png", 
    titleImage: "/title-pope.png",
    legend: "El Papa en la Edad Media no gobernaba con ejércitos, sino con la autoridad divina de su palabra. El verdadero control comienza en la mente del otro. Huictigaras logra influir en los pensamientos y sentimientos ajenos en cualquier ámbito que puedas imaginar."
  },
  { 
    id: "witch", 
    name: "Witch's Glamour", 
    spirit: "Frimost", 
    category: "OLEOUM DE LUJURIA", 
    color: "#86efac",
    bg: "/bg-witch.png", 
    bgMobile: "/bg-witch-mobile.png", 
    image: "/frasco-witch.png", 
    titleImage: "/title-witch.png",
    legend: "En la Europa antigua, quienes dominaban el arte del glamour tejían redes de fascinación irresistibles. Su presencia era un hechizo magnético. Frimost despierta esa atracción seductora y carnal, una fuerza que puede ser invocada por cualquier persona para cautivar, sin importar su género u orientación sexual."
  },
  { 
    id: "king", 
    name: "King's Vault", 
    spirit: "Clauneck", 
    category: "OLEOUM DE PROSPERIDAD", 
    color: "#eab308",
    bg: "/bg-king.png", 
    bgMobile: "/bg-king-mobile.png", 
    image: "/frasco-king.png", 
    titleImage: "/title-king.png",
    legend: "La riqueza de un rey medieval no se basaba en la fortuna efímera, sino en la impecable arquitectura de su imperio. Clauneck no concede simples golpes de suerte, sino la autoridad, el estatus y la visión necesarias para consolidar una prosperidad sólida, estructural y duradera en el tiempo."
  },
  { 
    id: "danse", 
    name: "Danse Macabre", 
    spirit: "Guland", 
    category: "OLEOUM FUNESTO", 
    color: "#e2e8f0",
    bg: "/bg-danse.png", 
    bgMobile: "/bg-danse-mobile.png", 
    image: "/frasco-danse.png", 
    titleImage: "/title-danse.png",
    legend: "La Danza Macabra en los cementerios medievales era el recordatorio definitivo en los murales antiguos. Guland conoce tú pena y hará que tú víctima baile la Danza Macabra con una maldición que destruya su vida."
  },
];

export default function OleumsPage() {
  const { openLegalModal } = useLegal(); // INICIALIZAMOS EL MEGÁFONO
  
  const [idx, setIdx] = useState(0);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [fade, setFade] = useState(false);

  // Swipe táctil en móvil
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [touchEndY, setTouchEndY] = useState(0);

  const current = OLEUMS_DATA[idx];

  // Precarga inmediata de recursos
  useEffect(() => {
    OLEUMS_DATA.forEach((item) => {
      [item.bg, item.bgMobile, item.image, item.titleImage].forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });
    });
  }, []);

  const changeOleum = (newIdx: number) => {
    setFade(true);
    setTimeout(() => {
      setIdx(newIdx);
      setFade(false);
    }, 280);
  };

  const nextOleum = () => changeOleum(idx === OLEUMS_DATA.length - 1 ? 0 : idx + 1);
  const prevOleum = () => changeOleum(idx === 0 ? OLEUMS_DATA.length - 1 : idx - 1);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchStartY(e.targetTouches[0].clientY);
    setTouchEndX(e.targetTouches[0].clientX);
    setTouchEndY(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
    setTouchEndY(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    const distanceX = touchStartX - touchEndX;
    const distanceY = touchStartY - touchEndY;

    if (Math.abs(distanceY) > Math.abs(distanceX)) return;

    if (distanceX > 50) nextOleum();
    if (distanceX < -50) prevOleum();
  };

  const handleNotifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !termsAccepted) return;
    setIsSubmitting(true);
    try {
      const webhookUrl = "URL_DE_TU_WEBHOOK_MAKE_AQUI"; 
      if (webhookUrl !== "URL_DE_TU_WEBHOOK_MAKE_AQUI") {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email, oleum_interes: current.name }),
        });
      } else {
        await new Promise((resolve) => setTimeout(resolve, 800));
      }
      alert(`¡Registrado! Te avisaremos a ${email} en cuanto ${current.name} esté disponible.`);
      setEmail("");
      setTermsAccepted(false); // Reiniciamos el checkbox
    } catch {
      alert("Hubo un error de conexión. Por favor, intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-gray-200 flex flex-col items-center overflow-x-hidden relative font-sans selection:bg-purple-950 selection:text-green-300">
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=MedievalSharp&family=Cinzel:wght@600;700&display=swap');

        .font-celtic-clean {
          font-family: 'MedievalSharp', cursive, serif;
        }
        .font-medieval-title {
          font-family: 'Cinzel Decorative', cursive, serif;
        }
        .font-serif-classic {
          font-family: 'Cinzel', 'Times New Roman', Times, serif;
        }

        @keyframes pulse-title {
          0%, 100% { opacity: 0.85; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.02); }
        }

        @keyframes smoke-float {
          0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.5; }
          50% { transform: scale(1.15) translate(3%, -4%); opacity: 0.8; }
        }

        .anim-title-pulse {
          animation: pulse-title 4s ease-in-out infinite;
        }

        .anim-smoke {
          animation: smoke-float 8s ease-in-out infinite alternate;
        }
      `}</style>

      {/* ========================================== */}
      {/* FONDO ANCLADO ESTÁTICO (NO SALTA EN SCROLL) */}
      {/* ========================================== */}
      <div 
        className="fixed top-0 left-0 w-screen h-screen z-0 pointer-events-none bg-black"
        style={{ position: "fixed", width: "100vw", height: "100vh" }}
      >
        {OLEUMS_DATA.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === idx ? "opacity-40" : "opacity-0"
            }`}
          >
            <div className="relative w-full h-full md:hidden">
              <Image
                src={item.bgMobile}
                alt=""
                fill
                priority={index === 0}
                className="object-cover object-center"
              />
            </div>
            <div className="relative w-full h-full hidden md:block">
              <Image
                src={item.bg}
                alt=""
                fill
                priority={index === 0}
                className="object-cover object-center"
              />
            </div>
          </div>
        ))}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#000000_90%)]" />
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col min-h-screen px-6 py-6 items-center">

        {/* HEADER */}
        <header className="w-full flex items-center justify-between mb-8">
          <Link
            href="/"
            className="text-xs md:text-sm font-medium text-gray-400 hover:text-white transition-colors flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm shadow-md"
          >
            « Volver al inicio
          </Link>

          {/* Logo con halo radial sin bordes duros */}
          <div className="relative flex items-center justify-center">
            <div 
              className="absolute -inset-2 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)" }}
            />
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-purple-500/40 bg-black/60 backdrop-blur-md flex items-center justify-center p-1.5 shadow-[0_0_20px_rgba(168,85,247,0.4)] relative z-10">
              <Image
                src="/logo.png"
                alt="Praxis Magick Logo"
                width={60}
                height={60}
                className="object-contain w-full h-full"
                priority
              />
            </div>
          </div>
        </header>

        {/* TÍTULO PRINCIPAL CON HUMO VERDE RADIAL (SIN BORDES CUADRADOS) */}
        <div className="relative w-full max-w-2xl flex justify-center items-center mb-6 py-4">
          {/* Capas de humo compuestas 100% por gradientes radiales esféricos */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center -z-10">
            <div 
              className="anim-smoke absolute w-[380px] md:w-[550px] h-[160px] md:h-[220px]"
              style={{
                background: "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(34,197,94,0.38) 0%, rgba(16,185,129,0.18) 45%, transparent 75%)"
              }}
            />
            <div 
              className="anim-smoke absolute w-[300px] md:w-[420px] h-[120px] md:h-[180px]"
              style={{
                animationDelay: "-3s",
                background: "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(74,222,128,0.3) 0%, rgba(34,197,94,0.12) 50%, transparent 75%)"
              }}
            />
          </div>

          <div className="relative w-full max-w-[340px] md:max-w-[440px] h-16 md:h-20">
            <Image
              src="/oleums-main.png"
              alt="Línea de Oleums"
              fill
              sizes="(max-width: 768px) 340px, 440px"
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* DEFINICIÓN */}
        <div className="w-full max-w-2xl text-center mb-10 px-4">
          <p className="font-celtic-clean text-sm md:text-base text-gray-300 leading-relaxed tracking-wide bg-black/50 border border-white/10 backdrop-blur-md p-5 rounded-xl shadow-lg">
            "{DEFINICION_OLEOUMS}"
          </p>
        </div>

        {/* ========================================== */}
        {/* CARRUSEL INMERSIVO */}
        {/* ========================================== */}
        <div
          className="flex flex-col items-center justify-center w-full relative mb-10"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Flechas de Navegación */}
          <div className="flex justify-between items-center w-full max-w-3xl absolute top-[38%] -translate-y-1/2 z-30 px-0 pointer-events-none">
            <button
              onClick={prevOleum}
              aria-label="Oleum anterior"
              className="pointer-events-auto text-4xl md:text-5xl text-gray-400 hover:text-white transition-transform active:scale-90 p-4 cursor-pointer focus:outline-none drop-shadow-[0_0_15px_rgba(0,0,0,0.95)]"
            >
              ‹
            </button>
            <button
              onClick={nextOleum}
              aria-label="Siguiente Oleum"
              className="pointer-events-auto text-4xl md:text-5xl text-gray-400 hover:text-white transition-transform active:scale-90 p-4 cursor-pointer focus:outline-none drop-shadow-[0_0_15px_rgba(0,0,0,0.95)]"
            >
              ›
            </button>
          </div>

          {/* CONTENEDOR DEL PRODUCTO CON TRANSICIÓN DE OPACIDAD Y HOVER INTERACTIVO */}
          <div 
            className={`flex flex-col items-center justify-center w-full transition-all duration-300 ease-out ${
              fade ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          >
            {/* Frasco con iluminación circular pura */}
            <div className="relative w-48 h-72 md:w-64 md:h-96 flex items-center justify-center mb-6">
              <div
                className="absolute inset-0 scale-150 pointer-events-none transition-all duration-700"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${current.color}44 0%, transparent 65%)`,
                }}
              />
              <Image
                src={current.image}
                alt={current.name}
                fill
                sizes="(max-width: 768px) 192px, 256px"
                className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)] transition-transform duration-500 hover:scale-110 cursor-pointer"
                priority
              />
            </div>

            {/* Título del Oleum */}
            <div className="w-full max-w-[290px] md:max-w-[340px] h-20 md:h-28 relative flex justify-center items-center mb-6 anim-title-pulse">
              <div
                className="absolute inset-0 scale-125 pointer-events-none transition-all duration-700"
                style={{
                  background: `radial-gradient(ellipse at 50% 50%, ${current.color}35 0%, transparent 70%)`,
                }}
              />
              <Image
                src={current.titleImage}
                alt={current.name}
                fill
                sizes="(max-width: 768px) 290px, 340px"
                className="object-contain"
                priority
              />
            </div>

            {/* Categoría y Espíritu */}
            <div className="flex flex-col items-center gap-2 mb-4">
              <span
                className="font-medieval-title text-base md:text-lg tracking-widest uppercase border-b border-white/20 pb-1 text-center"
                style={{ color: current.color }}
              >
                {current.category}
              </span>

              <span className="font-serif-classic text-sm md:text-base text-gray-300 bg-black/60 px-5 py-1.5 rounded-full border border-white/10 backdrop-blur-md shadow-md tracking-wider">
                Espíritu Ritualizado:{" "}
                <span className="font-bold text-white tracking-widest">{current.spirit}</span>
              </span>
            </div>
          </div>
        </div>

        {/* LEYENDA Y TEASER */}
        <div 
          className={`w-full max-w-3xl mx-auto flex flex-col gap-8 text-center z-20 mb-14 transition-opacity duration-300 ${
            fade ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="bg-black/70 border border-white/10 backdrop-blur-xl p-8 md:p-10 rounded-2xl shadow-[0_0_35px_rgba(0,0,0,0.7)]">
            <blockquote className="text-lg md:text-xl font-celtic-clean text-gray-200 leading-relaxed mb-8 tracking-wide">
              "{current.legend}"
            </blockquote>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

            <p className="text-sm font-sans text-gray-400 leading-relaxed px-2 text-justify md:text-center">
              {TEASER_TEXT}
            </p>
          </div>
        </div>

        {/* FORMULARIO DE CAPTURA CON CHECKBOX */}
        <div className="w-full max-w-xl mx-auto mb-14 z-20">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col items-center backdrop-blur-xl shadow-lg">
            <h4 className="text-lg font-bold text-white mb-2 text-center">Notificaciones de Lanzamiento</h4>
            <p className="text-sm text-gray-400 mb-6 text-center font-sans">
              Ingresa tu correo electrónico para recibir un aviso en cuanto esta fórmula esté disponible en la tienda.
            </p>

            <form onSubmit={handleNotifySubmit} className="flex flex-col w-full gap-4">
              <div className="flex flex-col sm:flex-row w-full gap-3">
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
                  disabled={isSubmitting || !email || !termsAccepted}
                  className="px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 text-black cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: current.color, boxShadow: `0 0 15px ${current.color}50` }}
                >
                  {isSubmitting ? "Enviando..." : "Avisarme"}
                </button>
              </div>

              {/* Casilla de aceptación de Términos */}
              <div className="w-full text-left text-xs text-gray-400 mt-1">
                <label className="flex items-start gap-3 cursor-pointer rounded-lg">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-0.5 accent-gray-500 w-4 h-4 rounded shrink-0 cursor-pointer"
                  />
                  <span className="leading-relaxed">
                    He leído y acepto las{" "}
                    <button
                      type="button"
                      onClick={() => openLegalModal("privacidad")}
                      className="text-gray-300 underline hover:text-white transition-colors"
                    >
                      Políticas de Privacidad y Términos
                    </button>
                    .
                  </span>
                </label>
              </div>
            </form>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="w-full flex flex-col items-center gap-5 py-8 mt-auto z-20 border-t border-white/10">
          <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-gray-400 font-sans">
            <button
              onClick={() => openLegalModal("terminos")}
              className="hover:text-white transition-colors cursor-pointer underline underline-offset-4"
            >
              Políticas de Privacidad y Términos
            </button>
            <span className="text-gray-600">•</span>
            <Link href="/" className="hover:text-white transition-colors">
              Tienda Principal
            </Link>
          </div>

          <a
            href="https://www.instagram.com/praxis.magick?igsh=MWRucmEwNmwyejQxMA==&igsi=MWRucmEwNmwyejQxMA=="
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 group mt-2"
          >
            <svg
              className="w-5 h-5 group-hover:scale-110 transition-transform"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-sans text-xs tracking-widest uppercase">Síguenos en Instagram</span>
          </a>
        </footer>

      </div>
    </main>
  );
}