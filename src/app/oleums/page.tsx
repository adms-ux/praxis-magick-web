"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

// ==========================================
// 1. BASE DE DATOS DE OLEUMS Y TEXTOS
// ==========================================
const TEASER_TEXT = "Todo Oleum es un punto de entrada. Quien adquiere esta consagración no solo recibe el aceite, sino la llave operativa para expandir su poder hacia esferas que exceden su naturaleza original. La verdadera maestría reside en cómo esta energía se integra en cada área de tu vida; el secreto de esta expansión se revela tras el sello de la compra.";

const OLEUMS_DATA = [
  { 
    id: "jester", name: "Jester's Road", spirit: "Surgat", category: "Oleum Abre Caminos",
    color: "#f97316", rgb: "249, 115, 22",
    image: "/frasco-jester.png", titleImage: "/title-jester.png",
    legend: "En los pasillos de piedra fría, el bufón era el único que podía susurrar la verdad al oído del rey sin perder la cabeza. Su locura no era falta de razón, sino un arma: él entraba donde nadie más podía, conquistaba con el ingenio y seducía con la máscara. Quien camina la senda del bufón no mendiga puertas abiertas; las hace desaparecer."
  },
  { 
    id: "leprechaun", name: "Leprechaun's Hoard", spirit: "Frutimiere", category: "Magia de Abundancia",
    color: "#10b981", rgb: "16, 185, 129",
    image: "/frasco-leprechaun.png", titleImage: "/title-leprechaun.png",
    legend: "El duende guarda su tesoro al final de un arco que solo algunos pueden ver. Es el espíritu de la oportunidad inesperada, del hallazgo fortuito y del flujo constante. Frutimiere es la mano que guía hacia el circulante, convirtiendo el azar en una aliada constante para que la abundancia nunca falte en tu vida."
  },
  { 
    id: "witch", name: "Witch's Glamour", spirit: "Frimost", category: "Magia de Lujuria",
    color: "#22c55e", rgb: "34, 197, 94",
    image: "/frasco-witch.png", titleImage: "/title-witch.png",
    legend: "La bruja del bosque no perseguía el amor, lo tejía. En la Europa profunda, el 'glamour' no era vanidad, era una red de sombras y luz atrapada en la piel. Bastaba con que su mirada cruzara la de un hombre —o una mujer— para que la obsesión floreciera sin remedio. Su belleza era un hechizo coercitivo, el magnetismo de lo que no puede ser ignorado."
  },
  { 
    id: "pope", name: "Pope's Decree", spirit: "Huictigaras", category: "Magia de Dominio",
    color: "#a855f7", rgb: "168, 85, 247",
    image: "/frasco-pope.png", titleImage: "/title-pope.png",
    legend: "El Papa medieval no necesitaba ejércitos para doblegar reinos; le bastaba una palabra sellada con autoridad divina. El control de la realidad comienza en la mente del otro. Quien domina el pensamiento, no necesita dominar el territorio, pues el territorio ya vive dentro de la mente que has conquistado."
  },
  { 
    id: "king", name: "King's Vault", spirit: "Clauneck", category: "Prosperidad",
    color: "#eab308", rgb: "234, 179, 8",
    image: "/frasco-king.png", titleImage: "/title-king.png",
    legend: "La riqueza de un rey medieval no se medía en fortuna efímera, sino en arquitectura. Cada moneda, cada tierra, cada alianza era una piedra en una estructura diseñada para durar siglos. Clauneck no concede golpes de suerte, sino la autoridad para consolidar un imperio personal que perdura y crece con el tiempo."
  },
  { 
    id: "danse", name: "Danse Macabre", spirit: "Guland", category: "Magia Funesta",
    color: "#e2e8f0", rgb: "226, 232, 240",
    image: "/frasco-danse.png", titleImage: "/title-danse.png",
    legend: "En los frescos de las iglesias medievales, la Danza Macabra era el recordatorio final: la vida es un baile que termina en ceniza. Guland es el espíritu que conoce el ritmo de esta danza; él no dicta el fin, sino la disolución. Aquello que está podrido en tu vida debe caer para que el baile continúe."
  },
];

// ==========================================
// 2. COMPONENTE DE NIEBLA CINEMÁTICA (Background)
// ==========================================
const CinematicFog = ({ activeRgb }: { activeRgb: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let time = 0;
    let animationId: number;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const animate = () => {
      time += 0.005;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "screen";

      for (let i = 0; i < 3; i++) {
        const cx = width / 2 + Math.sin(time + i * 2) * (width * 0.3);
        const cy = height * 0.7 + Math.cos(time * 0.8 + i) * (height * 0.2);
        const radius = width > 768 ? 400 + Math.sin(time) * 100 : 250 + Math.sin(time) * 50;

        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        gradient.addColorStop(0, `rgba(${activeRgb}, 0.15)`);
        gradient.addColorStop(0.5, `rgba(${activeRgb}, 0.05)`);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [activeRgb]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

// ==========================================
// 3. COMPONENTE PRINCIPAL (La Cámara de Invocación)
// ==========================================
export default function OleumsPage() {
  const [idx, setIdx] = useState(0);
  const [email, setEmail] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const current = OLEUMS_DATA[idx];

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20; 
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  };

  const nextOleum = () => setIdx((prev) => (prev === OLEUMS_DATA.length - 1 ? 0 : prev + 1));
  const prevOleum = () => setIdx((prev) => (prev === 0 ? OLEUMS_DATA.length - 1 : prev - 1));

  return (
    <main 
      className="min-h-screen bg-[#050505] text-gray-200 flex flex-col items-center overflow-x-hidden relative font-sans"
      onMouseMove={handleMouseMove}
    >
      <CinematicFog activeRgb={current.rgb} />

      <div className="relative z-10 w-full max-w-5xl flex flex-col min-h-screen px-6 py-8">
        
        <header className="w-full flex justify-between items-center mb-10">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors tracking-widest text-xs border border-white/10 px-4 py-2 rounded-lg bg-black/40 backdrop-blur-md uppercase">
            « Volver al umbral
          </Link>
        </header>

        <div className="w-full flex justify-center mb-12 h-12 md:h-16 relative">
          <Image 
             src="/oleums-main.png" 
             alt="Línea de Oleums" 
             fill
             className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
             onError={(e) => { 
               e.currentTarget.style.display = 'none'; 
               e.currentTarget.parentElement!.innerHTML = `<h1 class="text-3xl md:text-4xl font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-600 uppercase tracking-[0.3em]">Línea de Oleums</h1>`;
             }}
          />
        </div>

        <div className="flex-grow flex flex-col items-center justify-center w-full relative mb-16">
          
          <div className="flex justify-between items-center w-full max-w-3xl absolute top-1/2 -translate-y-1/2 z-30 px-2 md:px-0">
            <button onClick={prevOleum} className="text-3xl md:text-5xl text-gray-500 hover:text-white transition-colors p-4 cursor-pointer focus:outline-none drop-shadow-xl">‹</button>
            <button onClick={nextOleum} className="text-3xl md:text-5xl text-gray-500 hover:text-white transition-colors p-4 cursor-pointer focus:outline-none drop-shadow-xl">›</button>
          </div>

          <div 
            className="flex flex-col items-center justify-center w-full transition-all duration-1000 ease-in-out"
            style={{ transform: `translate(${-mousePos.x}px, ${-mousePos.y}px)` }} 
          >
             
             <div className="relative w-48 h-72 md:w-64 md:h-96 flex items-center justify-center mb-8">
               <div className="absolute bottom-[-10%] w-[60%] h-[10px] bg-black blur-[10px] rounded-[100%]" />
               
               <Image 
                 src={current.image} 
                 alt={current.name} 
                 fill 
                 className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)] transition-all duration-700"
                 onError={(e) => { e.currentTarget.style.opacity = '0'; }}
               />
               <div 
                 className="absolute inset-0 -z-10 blur-[60px] opacity-30 transition-all duration-1000 rounded-full"
                 style={{ backgroundColor: current.color }}
               />
             </div>

             <div className="w-full max-w-[280px] h-20 md:h-28 relative flex justify-center items-center mb-6">
                <Image 
                  src={current.titleImage}
                  alt={current.name}
                  fill
                  className="object-contain transition-all duration-700"
                  style={{ filter: `drop-shadow(0 0 15px ${current.color})` }}
                  onError={(e) => { 
                    e.currentTarget.style.display = 'none'; 
                    e.currentTarget.parentElement!.innerHTML = `<h2 class="text-4xl font-cinzel font-bold text-center" style="color: ${current.color}; text-shadow: 0 0 20px ${current.color}88">${current.name}</h2>`;
                  }}
                />
             </div>

             <div className="flex flex-col items-center gap-2 mb-8">
               <span className="text-xs uppercase tracking-[0.3em] text-gray-400 font-sans border-b border-white/10 pb-2">
                 {current.category}
               </span>
               <span 
                 className="text-sm md:text-base font-medieval px-6 py-2 rounded-lg bg-black/60 border backdrop-blur-md"
                 style={{ color: current.color, borderColor: `${current.color}44`, boxShadow: `0 0 20px ${current.color}15` }}
               >
                 Espíritu: {current.spirit}
               </span>
             </div>
          </div>
        </div>

        <div className="w-full max-w-2xl mx-auto flex flex-col gap-8 text-center z-20 mb-20">
          <div className="bg-black/40 border border-white/5 backdrop-blur-md p-6 md:p-10 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            <blockquote className="text-sm md:text-base font-medieval text-gray-300 leading-relaxed italic mb-8">
              "{current.legend}"
            </blockquote>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

            <p className="text-xs md:text-sm font-sans text-gray-400 leading-relaxed text-justify md:text-center px-2">
              {TEASER_TEXT}
            </p>
          </div>
        </div>

        <div className="w-full max-w-xl mx-auto mb-10 z-20">
          <div 
            className="p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-transparent transition-all duration-700"
            style={{ boxShadow: `0 0 40px ${current.color}15` }}
          >
            <div className="bg-[#0a0a0a] rounded-2xl p-6 md:p-8 flex flex-col items-center">
              <h4 className="text-sm font-cinzel text-gray-200 mb-2 text-center">Sé el primero en invocar su poder</h4>
              <p className="text-xs text-gray-500 mb-6 text-center uppercase tracking-widest font-sans">
                Registra tu esencia para el lanzamiento
              </p>
              
              <div className="flex flex-col sm:flex-row w-full gap-3">
                <input 
                  type="email" 
                  placeholder="Tu correo electrónico..." 
                  className="flex-grow bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white/40 transition-colors"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <button 
                  className="px-8 py-3 rounded-xl font-medieval text-sm uppercase tracking-wider transition-all duration-500 bg-black border cursor-pointer whitespace-nowrap"
                  style={{ color: current.color, borderColor: current.color, boxShadow: `0 0 15px ${current.color}33` }}
                  onClick={() => alert(`Sello registrado para ${current.name} con: ${email}`)}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}