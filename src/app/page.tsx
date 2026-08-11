"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // MODALES
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showFreeTrialModal, setShowFreeTrialModal] = useState(false);
  const [showLegalModal, setShowLegalModal] = useState(false);
  
  // CHECKOUT & CAPTURA
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [freeTrialEmail, setFreeTrialEmail] = useState("");

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

  const formatNumber = (num: number) => String(num).padStart(2, "0");

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleProceedToPayment = () => {
    alert("Redirigiendo a Stripe para procesar tu pago de $220 MXN ($12.99 USD) de forma segura...");
  };

  const handleSubmitFreeTrial = (e: React.FormEvent) => {
    e.preventDefault();
    if (freeTrialEmail) {
      alert(`¡Gracias! En breve enviaremos tu muestra gratuita a: ${freeTrialEmail}`);
      setShowFreeTrialModal(false);
      setFreeTrialEmail("");
    }
  };

  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden flex flex-col items-center text-white selection:bg-purple-900 selection:text-green-300">
      
      {/* ANIMACIONES Y EFECTOS CSS (HUMO, PARTÍCULAS Y TORMENTA DE RAYOS MORADOS) */}
      <style>{`
        @keyframes smoke-1 {
          0% { transform: translate(0px, 0px) scale(1); opacity: 0.35; }
          50% { transform: translate(40px, -40px) scale(1.2); opacity: 0.65; }
          100% { transform: translate(0px, 0px) scale(1); opacity: 0.35; }
        }
        @keyframes smoke-2 {
          0% { transform: translate(0px, 0px) scale(1); opacity: 0.25; }
          50% { transform: translate(-50px, 30px) scale(1.3); opacity: 0.55; }
          100% { transform: translate(0px, 0px) scale(1); opacity: 0.25; }
        }
        @keyframes float-particle {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translateY(-100vh) scale(0.5); opacity: 0; }
        }

        /* ANIMACIÓN DE RELÁMPAGOS/DESTELLOS MORADOS EN EL CIELO */
        @keyframes sky-flash {
          0%, 91%, 93%, 96%, 100% { opacity: 0; }
          92% { opacity: 0.45; }
          94%, 95% { opacity: 0.8; }
        }

        /* ANIMACIÓN DE RAYOS VERTICALES/DIAGONALES */
        @keyframes bolt-strike-1 {
          0%, 88%, 91%, 100% { opacity: 0; transform: scaleY(0); }
          89% { opacity: 1; transform: scaleY(1.1) rotate(-12deg); }
          90% { opacity: 0.4; transform: scaleY(0.9) rotate(-12deg); }
        }

        @keyframes bolt-strike-2 {
          0%, 94%, 97%, 100% { opacity: 0; transform: scaleY(0); }
          95% { opacity: 1; transform: scaleY(1.2) rotate(15deg); }
          96% { opacity: 0.3; transform: scaleY(0.8) rotate(15deg); }
        }

        .animate-smoke-1 { animation: smoke-1 16s infinite ease-in-out; }
        .animate-smoke-2 { animation: smoke-2 22s infinite ease-in-out reverse; }
        .particle { animation: float-particle 12s infinite linear; }
        .font-cinzel { font-family: var(--font-cinzel); }
        .font-medieval { font-family: var(--font-medieval); }

        .sky-lightning { animation: sky-flash 9s infinite ease-in-out; }
        .bolt-1 { animation: bolt-strike-1 11s infinite ease-in-out; transform-origin: top; }
        .bolt-2 { animation: bolt-strike-2 14s infinite ease-in-out; transform-origin: top; }
      `}</style>

      {/* AMBIENTE DE FONDO Y TORMENTA MORADA */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        
        {/* RESPLANDOR DE DESTELLOS DE TORMENTA EN EL CIELO */}
        <div className="sky-lightning absolute inset-0 bg-purple-600/30 blur-[90px] mix-blend-screen"></div>

        {/* RAYO MORADO 1 (Lado Izquierdo) */}
        <div className="bolt-1 absolute top-0 left-[20%] w-[3px] h-[70vh] bg-gradient-to-b from-purple-200 via-purple-500 to-transparent shadow-[0_0_20px_rgba(168,85,247,1)]"></div>

        {/* RAYO MORADO 2 (Lado Derecho) */}
        <div className="bolt-2 absolute top-0 right-[25%] w-[4px] h-[80vh] bg-gradient-to-b from-purple-100 via-fuchsia-500 to-transparent shadow-[0_0_25px_rgba(217,70,239,1)]"></div>

        {/* LUNA */}
        <div className="absolute top-[8%] right-[8%] md:top-[12%] md:right-[20%] w-24 h-24 md:w-36 md:h-36 z-0">
          <div className="absolute inset-0 rounded-full bg-purple-500/30 blur-[40px] animate-pulse"></div>
          <Image 
            src="/luna.png" 
            alt="Luna Púrpura" 
            width={150} 
            height={150} 
            className="object-contain drop-shadow-[0_0_25px_rgba(168,85,247,0.8)]" 
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </div>

        {/* HUMO VERDE */}
        <div className="absolute top-[-10%] left-[-10%] w-[75%] h-[75%] bg-green-700/50 blur-[140px] rounded-full animate-smoke-1"></div>
        <div className="absolute top-[35%] right-[-10%] w-[80%] h-[80%] bg-green-900/60 blur-[160px] rounded-full animate-smoke-2"></div>
        <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[150%] h-96 bg-purple-950/60 blur-[140px] rounded-t-full animate-pulse"></div>

        {/* PARTÍCULAS FLOTANTES */}
        <div className="absolute inset-0">
          <div className="particle absolute left-[15%] bottom-0 w-1.5 h-1.5 bg-green-300 rounded-full blur-[1px]" style={{ animationDelay: '0s' }}></div>
          <div className="particle absolute left-[35%] bottom-0 w-2 h-2 bg-purple-300 rounded-full blur-[1px]" style={{ animationDelay: '3s' }}></div>
          <div className="particle absolute left-[60%] bottom-0 w-1 h-1 bg-green-400 rounded-full blur-[0.5px]" style={{ animationDelay: '6s' }}></div>
          <div className="particle absolute left-[80%] bottom-0 w-2 h-2 bg-purple-400 rounded-full blur-[1px]" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-5xl pt-10 pb-20">
        
        {/* LOGO */}
        <div className="w-28 h-28 md:w-36 md:h-36 mb-6 rounded-full border border-purple-500/30 bg-black/50 backdrop-blur-md flex items-center justify-center shadow-[0_0_25px_rgba(168,85,247,0.25)] overflow-hidden p-2">
          <Image 
            src="/logo.png" 
            alt="Logo Praxis Magick" 
            width={140} 
            height={140} 
            className="object-contain w-full h-full" 
            priority
          />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-4 font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-300 to-gray-500 tracking-widest drop-shadow-[0_5px_10px_rgba(0,0,0,0.9)] uppercase">
          Praxis Magick
        </h1>

        {/* CONTADOR REGRESIVO */}
        <div className="px-6 md:px-10 py-6 mb-10 mt-4 border border-white/10 rounded-2xl bg-black/60 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.8)]">
          <p className="text-4xl md:text-6xl font-mono text-green-400 tracking-widest drop-shadow-[0_0_15px_rgba(74,222,128,0.6)]">
            {formatNumber(timeLeft.days)}:{formatNumber(timeLeft.hours)}:{formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)}
          </p>
          <p className="text-xs md:text-sm text-gray-400 mt-3 font-cinzel tracking-[0.2em] flex justify-between px-2 uppercase">
            <span>Días</span> <span>Hrs</span> <span>Min</span> <span>Seg</span>
          </p>
        </div>

        {/* NAVEGACIÓN RÁPIDA */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 text-sm font-medieval text-gray-300">
          <a href="#instrucciones" className="hover:text-green-400 transition-colors border-b border-transparent hover:border-green-400 pb-0.5">
            ↓ Instrucciones de compra
          </a>
          <span className="text-gray-600">•</span>
          <a href="#faq" className="hover:text-purple-400 transition-colors border-b border-transparent hover:border-purple-400 pb-0.5">
            ↓ Preguntas frecuentes
          </a>
        </div>

        {/* SECCIÓN PRINCIPAL DEL LIBRO */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 text-left mb-20 items-center">
          
          {/* PORTADA */}
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

            <blockquote className="text-xs font-medieval text-gray-400 border-l-2 border-purple-500 pl-3 mb-6 italic bg-purple-950/20 py-2 rounded-r">
              Aviso: Este contenido es de naturaleza esotérica y se ofrece con fines educativos y de práctica personal.
            </blockquote>

            <div className="p-5 border border-purple-800/40 rounded-xl bg-purple-950/20 backdrop-blur-sm mb-6">
              <h3 className="text-lg font-cinzel text-purple-300 mb-2 flex items-center gap-2">
                <span>🎁</span> Regalo de preventa: Magia Olímpica
              </h3>
              <p className="text-sm text-gray-300 font-medieval leading-relaxed mb-3">
                Por tiempo limitado, al adquirir <em>Demonios del Verum</em> en preventa recibes de regalo nuestro próximo ebook:
              </p>
              <p className="text-sm font-semibold text-green-300 font-medieval mb-2">
                MAGIA OLÍMPICA — Aprende a Trabajar con los Espíritus Planetarios
              </p>
              <p className="text-xs text-gray-400 font-medieval leading-relaxed mb-3">
                Una guía introductoria al trabajo con las siete inteligencias planetarias clásicas, perfecta como complemento para expandir tu práctica más allá de la magia goética.
              </p>
              <p className="text-xs font-semibold text-purple-400 font-medieval">
                📅 Este bono se entrega el día de su lanzamiento: 23 de octubre.
              </p>
              <p className="text-[11px] text-gray-500 font-medieval mt-1 italic">
                (No se entrega antes ni por separado; es un obsequio exclusivo para quienes compran en la etapa de preventa).
              </p>
            </div>
          </div>
        </div>

        {/* BOTONES PRINCIPALES DE ACCIÓN */}
        <div className="flex flex-col sm:flex-row gap-6 w-full justify-center items-center mb-24">
          
          {/* BOTÓN PREVENTA CON PRECIOS TACHADOS */}
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

          {/* BOTÓN PRUEBA GRATUITA */}
          <button 
            onClick={() => setShowFreeTrialModal(true)}
            className="px-8 py-5 bg-transparent border-2 border-purple-600/80 hover:border-purple-400 text-purple-200 rounded-xl font-medieval text-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:bg-purple-950/40 hover:shadow-[0_10px_30px_rgba(168,85,247,0.4)] cursor-pointer min-w-[280px]"
          >
            Reclamar prueba gratis
          </button>

        </div>

        {/* INSTRUCCIONES DE COMPRA */}
        <div id="instrucciones" className="w-full max-w-3xl text-left border border-white/10 rounded-2xl bg-black/60 backdrop-blur-md p-8 mb-20 shadow-xl">
          <h3 className="text-2xl font-cinzel text-green-300 mb-6 text-center">Instrucciones de Compra y Entrega</h3>
          
          <div className="space-y-4 font-medieval text-gray-300">
            <div className="flex items-start gap-4">
              <span className="w-8 h-8 rounded-full bg-green-900/60 border border-green-500/40 flex items-center justify-center text-green-300 font-bold shrink-0">1</span>
              <p className="mt-1">Realiza tu compra de forma segura ingresando tu correo electrónico en nuestra pasarela de pago.</p>
            </div>
            
            <div className="flex items-start gap-4">
              <span className="w-8 h-8 rounded-full bg-green-900/60 border border-green-500/40 flex items-center justify-center text-green-300 font-bold shrink-0">2</span>
              <p className="mt-1">Recibirás un correo electrónico automático confirmando tu orden de preventa.</p>
            </div>

            <div className="flex items-start gap-4">
              <span className="w-8 h-8 rounded-full bg-green-900/60 border border-green-500/40 flex items-center justify-center text-green-300 font-bold shrink-0">3</span>
              <p className="mt-1">El <strong>23 de septiembre</strong> te enviaremos el e-book <em>Demonios del Verum</em> directo a tu correo electrónico.</p>
            </div>

            <div className="flex items-start gap-4">
              <span className="w-8 h-8 rounded-full bg-purple-900/60 border border-purple-500/40 flex items-center justify-center text-purple-300 font-bold shrink-0">4</span>
              <p className="mt-1">
                Junto con tu e-book el 23 de septiembre, <strong>recibirás los datos de acceso a tu cuenta de usuario</strong> creada automáticamente. Desde allí podrás descargar y respaldar tu e-book (y <em>Magia Olímpica</em> a partir del 23 de octubre) en cualquier momento.
              </p>
            </div>
          </div>
        </div>

        {/* PREGUNTAS FRECUENTES */}
        <div id="faq" className="w-full max-w-3xl text-left mb-24">
          <h3 className="text-3xl font-cinzel text-purple-300 mb-8 text-center">Preguntas Frecuentes</h3>
          
          <div className="space-y-4 font-medieval">
            <div className="border border-white/10 rounded-xl bg-black/50 overflow-hidden">
              <button 
                onClick={() => toggleFaq(1)}
                className="w-full p-5 text-left flex justify-between items-center text-gray-200 hover:text-green-300 transition-colors font-semibold cursor-pointer"
              >
                <span>¿Es un PDF o tengo que leerlo en la plataforma?</span>
                <span className="text-xl text-purple-400">{openFaq === 1 ? "−" : "+"}</span>
              </button>
              {openFaq === 1 && (
                <div className="px-5 pb-5 text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-3">
                  Se enviará a tu correo electrónico en formato PDF. Además, el mismo 23 de septiembre se te enviará la contraseña de tu cuenta para almacenarlo y descargarlo desde tu biblioteca en nuestra página web. Próximamente estará habilitada la lectura en línea.
                </div>
              )}
            </div>

            <div className="border border-white/10 rounded-xl bg-black/50 overflow-hidden">
              <button 
                onClick={() => toggleFaq(2)}
                className="w-full p-5 text-left flex justify-between items-center text-gray-200 hover:text-green-300 transition-colors font-semibold cursor-pointer"
              >
                <span>¿Puedo compartir mi copia?</span>
                <span className="text-xl text-purple-400">{openFaq === 2 ? "−" : "+"}</span>
              </button>
              {openFaq === 2 && (
                <div className="px-5 pb-5 text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-3">
                  No. Es una obra de distribución exclusiva y de uso personal e intransferible, protegida por derechos de autor.
                </div>
              )}
            </div>

            <div className="border border-white/10 rounded-xl bg-black/50 overflow-hidden">
              <button 
                onClick={() => toggleFaq(3)}
                className="w-full p-5 text-left flex justify-between items-center text-gray-200 hover:text-green-300 transition-colors font-semibold cursor-pointer"
              >
                <span>¿Qué pasa si compro y aún no es el 23 de septiembre?</span>
                <span className="text-xl text-purple-400">{openFaq === 3 ? "−" : "+"}</span>
              </button>
              {openFaq === 3 && (
                <div className="px-5 pb-5 text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-3">
                  Tu compra queda registrada de forma segura como preventa. Recibirás la confirmación inmediata en tu correo y el libro puntualmente el 23 de septiembre, junto con los accesos a tu cuenta y la confirmación de tu regalo de <em>Magia Olímpica</em>.
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
            <button onClick={() => setShowLegalModal(true)} className="hover:text-green-400 transition-colors underline cursor-pointer">
              Términos, Condiciones y Políticas de Privacidad
            </button>
          </div>

          <p>© 2026 Praxis Magick. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* MODAL CHECKOUT */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-black border border-green-500/40 rounded-2xl p-6 shadow-[0_0_50px_rgba(34,197,94,0.3)] font-medieval text-gray-200">
            <button 
              onClick={() => setShowCheckoutModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl cursor-pointer"
            >
              ✕
            </button>

            <h3 className="text-2xl font-cinzel text-green-300 mb-4 text-center">Confirmación de Preventa</h3>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6 text-sm space-y-2">
              <div className="flex justify-between font-semibold items-center">
                <span>Demonios del Verum (Preventa)</span>
                <div className="text-right">
                  <span className="text-green-400 font-bold">$220 MXN</span>
                  <span className="text-xs text-gray-400 block font-sans">($12.99 USD)</span>
                </div>
              </div>
              <p className="text-xs text-purple-300 border-t border-white/10 pt-2 mt-2">
                🎁 Incluye gratis: e-book <strong>Magia Olímpica</strong> (23 Oct).
              </p>
              <p className="text-xs text-gray-300">
                📩 Entrega en PDF a tu correo el 23 de Septiembre + acceso a tu cuenta.
              </p>
            </div>

            <div className="mb-6 text-xs text-gray-300">
              <label className="flex items-start gap-3 cursor-pointer bg-green-950/20 p-3 rounded-lg border border-green-500/20">
                <input 
                  type="checkbox" 
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-0.5 accent-green-500 w-4 h-4 rounded shrink-0 cursor-pointer" 
                />
                <span className="leading-relaxed">
                  Soy mayor de 18 años y he leído y acepto los{" "}
                  <button onClick={() => setShowLegalModal(true)} className="text-green-400 underline font-semibold">
                    Términos, Condiciones y Políticas de Privacidad
                  </button>{" "}
                  (incluyendo entrega digital en preventa).
                </span>
              </label>
            </div>

            <button
              disabled={!termsAccepted}
              onClick={handleProceedToPayment}
              className={`w-full py-4 rounded-lg font-medieval text-lg transition-all duration-300 border ${
                termsAccepted
                  ? "bg-green-600 hover:bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.5)] border-green-400 cursor-pointer"
                  : "bg-gray-800 text-gray-500 border-gray-700 cursor-not-allowed"
              }`}
            >
              Proceder al Pago Seguro ($220 MXN)
            </button>
          </div>
        </div>
      )}

      {/* MODAL CAPTURA - PRUEBA GRATUITA */}
      {showFreeTrialModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-black border border-purple-500/40 rounded-2xl p-6 shadow-[0_0_50px_rgba(168,85,247,0.3)] font-medieval text-gray-200">
            <button 
              onClick={() => setShowFreeTrialModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl cursor-pointer"
            >
              ✕
            </button>

            <h3 className="text-2xl font-cinzel text-purple-300 mb-2 text-center">Prueba Gratuita</h3>
            <p className="text-xs text-gray-300 text-center mb-6 leading-relaxed">
              Ingresa tu correo electrónico para recibir de inmediato una muestra gratuita exclusiva de <strong>Demonios del Verum</strong>.
            </p>

            <form onSubmit={handleSubmitFreeTrial} className="space-y-4">
              <div>
                <label className="block text-xs text-purple-300 mb-1">Correo electrónico:</label>
                <input 
                  type="email" 
                  required
                  placeholder="tu@email.com" 
                  value={freeTrialEmail}
                  onChange={(e) => setFreeTrialEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 font-sans"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-purple-800 hover:bg-purple-700 text-white rounded-lg font-medieval text-md transition-all duration-300 border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.4)] cursor-pointer"
              >
                Obtener Muestra Gratis
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL POLÍTICAS Y CONDICIONES */}
      {showLegalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-2xl max-h-[85vh] bg-black border border-purple-500/40 rounded-2xl p-6 shadow-[0_0_50px_rgba(168,85,247,0.3)] font-medieval text-gray-300 overflow-y-auto">
            <button 
              onClick={() => setShowLegalModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl cursor-pointer"
            >
              ✕
            </button>

            <h3 className="text-2xl font-cinzel text-purple-300 mb-6 text-center">Términos, Condiciones y Políticas de Privacidad</h3>

            <div className="space-y-6 text-sm leading-relaxed text-gray-300 pr-2">
              <section>
                <h4 className="font-bold text-green-300 text-md mb-2">1. Naturaleza del contenido</h4>
                <p>Los productos que vendemos (ebooks, grimorios, guías rituales) son conocimiento esotérico para adultos, ofrecido con fines educativos y de práctica personal. No constituyen asesoría médica, psicológica, financiera ni legal. Usas este contenido bajo tu propio riesgo. Debes ser mayor de 18 años para comprar en este sitio.</p>
              </section>

              <section>
                <h4 className="font-bold text-green-300 text-md mb-2">2. Compras, entrega y preventa</h4>
                <p>Cuando un producto se vende en preventa, la fecha de entrega se indica claramente (23 de Septiembre para Demonios del Verum y 23 de Octubre para Magia Olímpica). Una vez confirmado tu pago, recibirás tu correo de confirmación. En la fecha de lanzamiento recibirás tu e-book en PDF y los accesos a tu cuenta de usuario creada automáticamente. Los pagos son procesados de forma segura por Stripe.</p>
              </section>

              <section>
                <h4 className="font-bold text-green-300 text-md mb-2">3. Reembolsos y Excepciones</h4>
                <p>La venta de ebooks es final. No hay reembolsos una vez entregado el producto. Si cancelas tu compra antes de la fecha de entrega (en preventa), tienes derecho a reembolso completo. Clientes internacionales/UE aceptan expresamente la entrega digital sin derecho de desistimiento una vez enviado el material.</p>
              </section>

              <section>
                <h4 className="font-bold text-green-300 text-md mb-2">4. Propiedad y uso permitido</h4>
                <p>Todo el contenido es propiedad de Praxis Magick y está protegido por derechos de autor. Tu compra concede una licencia de uso personal no transferible. Queda estrictamente prohibida la redistribución, reventa o publicación parcial o total.</p>
              </section>

              <section>
                <h4 className="font-bold text-green-300 text-md mb-2">5. Tu cuenta de usuario</h4>
                <p>Al entregarse tu producto el 23 de septiembre se generará tu cuenta de usuario para respaldo en tu biblioteca personal. Eres responsable de mantener segura tu contraseña. Nos reservamos el derecho de suspender cuentas que incumplan estos términos.</p>
              </section>

              <section>
                <h4 className="font-bold text-green-300 text-md mb-2">6. Tus datos y derechos</h4>
                <p>Recabamos únicamente tu correo y nombre para entregarte el producto y dar acceso a tu biblioteca. Puedes solicitar la corrección o eliminación de tus datos escribiendo a <strong>lamagick99@gmail.com</strong>.</p>
              </section>

              <section>
                <h4 className="font-bold text-green-300 text-md mb-2">7. Cookies y Legislación</h4>
                <p>Usamos cookies esenciales para la sesión y el pago seguro. Estos términos se rigen por las leyes aplicables en México.</p>
              </section>
            </div>

            <div className="mt-8 text-center">
              <button 
                onClick={() => setShowLegalModal(false)}
                className="px-6 py-2.5 bg-purple-900/60 hover:bg-purple-800 text-white rounded-lg border border-purple-500/40 text-sm cursor-pointer"
              >
                Entendido / Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}