"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const OLEUMS_DATA = [
  { id: "jester", name: "Jester's Road", spirit: "Surgat", titleImage: "/title-jester.png", image: "/verum-portada.png", color: "#f97316", glow: "rgba(249, 115, 22, 0.15)" },
  { id: "witch", name: "Witch's Glamour", spirit: "Frimost", titleImage: "/title-witch.png", image: "/verum-portada.png", color: "#22c55e", glow: "rgba(34, 197, 94, 0.15)" },
  { id: "danse", name: "Danse Macabre", spirit: "Guland", titleImage: "/title-danse.png", image: "/verum-portada.png", color: "#e2e8f0", glow: "rgba(226, 232, 240, 0.15)" },
  { id: "pope", name: "Pope's Decree", spirit: "Huictigaras", titleImage: "/title-pope.png", image: "/verum-portada.png", color: "#a855f7", glow: "rgba(168, 85, 247, 0.15)" },
  { id: "king", name: "King's Vault", spirit: "Clauneck", titleImage: "/title-king.png", image: "/verum-portada.png", color: "#eab308", glow: "rgba(234, 179, 8, 0.15)" },
  { id: "leprechaun", name: "Leprechaun's Hoard", spirit: "Frutimiere", titleImage: "/title-leprechaun.png", image: "/verum-portada.png", color: "#10b981", glow: "rgba(16, 185, 129, 0.15)" },
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
}

export default function OleumsPage() {
  const [idx, setIdx] = useState(0);
  const [email, setEmail] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let animationFrameId: number;
    let particles: Particle[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "screen";

      if (particles.length < 80) {
        particles.push({
          x: canvas.width / 2 + (Math.random() - 0.5) * 60,
          y: canvas.height * 0.85, 
          vx: (Math.random() - 0.5) * 1.5, 
          vy: -Math.random() * 2.5 - 1.5, 
          size: Math.random() * 25 + 15, 
          alpha: 1,
          life: 0,
          maxLife: Math.random() * 40 + 30
        });
      }

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        p.alpha = 1 - p.life / p.maxLife;

        const currentSize = p.size * p.alpha;

        if (p.alpha <= 0 || currentSize <= 0) {
          particles.splice(i, 1);
          return;
        }

        ctx.filter = "blur(4px)";
        ctx.fillStyle = OLEUMS_DATA[idx].color + Math.floor(p.alpha * 255).toString(16).padStart(2, '0');
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.filter = "none";
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [idx]);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center overflow-hidden relative">
      
      {/* CAPA 0: RESPLANDOR */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[60%] pointer-events-none z-0 transition-all duration-1000"
           style={{
             background: `radial-gradient(circle, ${OLEUMS_DATA[idx].glow} 0%, rgba(16, 13, 29, 0.05) 50%, transparent 100%)`,
             filter: "blur(80px)"
           }} 
      />

      {/* CAPA 1: FUEGO REALISTA */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />

      {/* CAPA 2: INTERFAZ CON FRASCOS */}
      <div className="relative z-20 w-full max-w-4xl min-h-screen p-6 flex flex-col items-center text-center">
        
        <header className="w-full flex items-center justify-start mt-4 mb-8">
          <Link href="/" className="text-gray-400 hover:text-white transition tracking-widest text-sm flex items-center gap-1 border border-white/10 px-4 py-2 rounded-lg bg-black/40 backdrop-blur-md">
            « VOLVER
          </Link>
        </header>

        {/* LOGO SUPERIOR LÍNEA DE OLEUMS */}
        <div className="mb-8 w-full max-w-sm h-16 relative flex justify-center items-center mx-auto">
           <Image 
             src="/oleums-main.png" 
             alt="Línea de Oleums" 
             fill
             className="object-contain"
             onError={(e) => { 
               e.currentTarget.style.display = 'none'; 
               e.currentTarget.parentElement!.innerHTML = `<h1 class="text-3xl font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500 uppercase tracking-widest">Línea de Oleums</h1>`;
             }}
           />
        </div>

        {/* CARRUSEL DE FRASCOS */}
        <div className="flex justify-center items-center w-full px-4 min-h-[350px] md:min-h-[450px] mb-8 relative">
          <button 
            onClick={() => setIdx(idx === 0 ? 5 : idx - 1)} 
            className="absolute left-0 md:left-4 text-3xl text-gray-400 hover:text-white transition p-4 z-30"
          >
            ←
          </button>
          
          <div className="transition-all duration-500 transform scale-110 md:scale-125 flex flex-col items-center">
             
             {/* Frasco Flotante */}
             <div className="w-48 h-72 relative flex items-center justify-center transition-all duration-700">
               <Image 
                 src={OLEUMS_DATA[idx].image} 
                 alt={OLEUMS_DATA[idx].name} 
                 width={220} 
                 height={320} 
                 className="relative z-10 object-contain max-h-full transition-all duration-700"
                 style={{ filter: `drop-shadow(0 15px 25px rgba(0,0,0,0.9))` }}
               />
             </div>

             {/* Título Arco (PNG) */}
             <div className="flex justify-center mt-6 min-h-[60px] relative w-full max-w-xs">
                <Image 
                  src={OLEUMS_DATA[idx].titleImage}
                  alt={OLEUMS_DATA[idx].name}
                  fill
                  className="object-contain transition-all duration-700"
                  style={{ filter: `drop-shadow(0 0 15px ${OLEUMS_DATA[idx].color})` }}
                  onError={(e) => { 
                    e.currentTarget.style.display = 'none'; 
                    e.currentTarget.parentElement!.innerHTML = `<h2 class="text-3xl font-cinzel font-bold drop-shadow-[0_0_15px_${OLEUMS_DATA[idx].color}]" style="color: ${OLEUMS_DATA[idx].color}">${OLEUMS_DATA[idx].name}</h2>`;
                  }}
                />
             </div>
             
             <p className="mt-4 text-gray-300 font-medieval text-sm uppercase tracking-widest border border-white/10 px-4 py-1 rounded-full bg-black/60">
               Espíritu: <span style={{color: OLEUMS_DATA[idx].color}}>{OLEUMS_DATA[idx].spirit}</span>
             </p>
          </div>
          
          <button 
            onClick={() => setIdx(idx === 5 ? 0 : idx + 1)} 
            className="absolute right-0 md:right-4 text-3xl text-gray-400 hover:text-white transition p-4 z-30"
          >
            →
          </button>
        </div>

        {/* SECCIÓN CAPTURA LEADS (SOBRE EL FUEGO) */}
        <div className="w-full max-w-md mt-auto mb-16 bg-black/40 p-6 rounded-2xl border border-white/5 backdrop-blur-lg shadow-[0_0_30px_rgba(0,0,0,0.8)] relative z-20">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">¿Deseas adquirir este elixir?</p>
            <div className="flex flex-col sm:flex-row gap-3 items-stretch justify-center">
              <input 
                type="email" 
                placeholder="Tu correo místico..." 
                className="bg-zinc-900/60 border border-white/10 p-3 px-4 rounded-xl outline-none text-sm text-white placeholder-gray-500 transition flex-grow"
                style={{ borderColor: email ? OLEUMS_DATA[idx].color : '' }}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button 
                className="text-white font-medium text-sm tracking-wider px-6 py-3 rounded-xl transition duration-300 shadow-[0_0_15px_rgba(0,0,0,0.8)] whitespace-nowrap bg-black border border-white/20 hover:bg-black/80"
                style={{ color: OLEUMS_DATA[idx].color, borderColor: OLEUMS_DATA[idx].color }}
                onClick={() => alert(`Suscrito para ${OLEUMS_DATA[idx].name} con: ${email}`)}
              >
                NOTIFICARME
              </button>
            </div>
        </div>

      </div>
    </main>
  );
}