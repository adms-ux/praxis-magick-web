"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface Oleum {
  id: string;
  name: string;
  subtitle: string;
  spirit: string;
  quote: string;
  description: string;
  fireColor: { r: number; g: number; b: number };
  accentColor: string;
  image: string;
}

const OLEUMS_DATA: Oleum[] = [
  {
    id: "jester",
    name: "Jester's Road",
    subtitle: "Oleum abre caminos",
    spirit: "Espíritu Goético Surgat",
    quote: "Se dice que en las cortes medievales, solo el bufón podía decirle la verdad al rey sin perder la cabeza...",
    description: "Praxis Magick trae la astucia del bufón medieval para abrir tus caminos ritualizado con el espíritu Surgat, quien posee el poder de abrir cerraduras, romper ligaduras y franquear lugares sellados.",
    fireColor: { r: 249, g: 115, b: 22 }, // Naranja
    accentColor: "#f97316",
    image: "/verum-portada.png", // Reemplazar con imagen PNG del frasco
  },
  {
    id: "witch",
    name: "Witch's Glamour",
    subtitle: "Oleum para belleza magnética",
    spirit: "Espíritu Goético Frimost",
    quote: "En la Europa medieval, glamour no era belleza, era brujería...",
    description: "El secreto de la bruja del bosque para proyectar una fascinación coercitiva y obsesión, independientemente de tu orientación, ritualizado bajo la potestad de Frimost.",
    fireColor: { r: 34, g: 197, b: 94 }, // Verde Esmeralda
    accentColor: "#22c55e",
    image: "/verum-portada.png",
  },
  {
    id: "danse",
    name: "Danse Macabre",
    subtitle: "Oleum funesto",
    spirit: "Espíritu Goético Nebiros",
    quote: "En los murales medievales, la Danza Macabra mostraba siempre lo mismo: el esqueleto tomando la mano de todos sin distinción...",
    description: "Una fórmula de alta contundencia ritualizada con Nebiros para infligir daño exacto a quien se desee y dominar las fuerzas de la ruina sobre los adversarios.",
    fireColor: { r: 226, g: 232, b: 240 }, // Fuego Blanco / Ceniza
    accentColor: "#e2e8f0",
    image: "/verum-portada.png",
  },
  {
    id: "pope",
    name: "Pope's Decree",
    subtitle: "Oleum de dominación",
    spirit: "Inteligencias Taphthartharath & Zazel",
    quote: "El Papa medieval no gobernaba reinos con ejércitos — los gobernaba con una sola palabra...",
    description: "Diseñado para doblar voluntades resistentes, penetrar en la mente del objetivo e instalar pensamientos directos con la llave de Taphthartharath y el sello de Zazel.",
    fireColor: { r: 168, g: 85, b: 247 }, // Púrpura Imperial
    accentColor: "#a855f7",
    image: "/verum-portada.png",
  },
  {
    id: "king",
    name: "King's Vault",
    subtitle: "Oleum de riqueza estructural",
    spirit: "Espíritu Clauneck",
    quote: "En la Europa medieval, la riqueza del rey no era fortuna, era arquitectura...",
    description: "Ritualizado con Clauneck para asentar prosperidad duradera, autoridad comercial y crecimiento financiero sostenido en el tiempo.",
    fireColor: { r: 234, g: 179, b: 8 }, // Oro / Ámbar Real
    accentColor: "#eab308",
    image: "/verum-portada.png",
  },
  {
    id: "leprechaun",
    name: "Leprechaun's Hoard",
    subtitle: "Oleum para el dinero y suerte",
    spirit: "Pacto de Prosperidad Celta",
    quote: "La suerte del duende para atraer dinero y oportunidades imprevistas a la vida cotidiana...",
    description: "Atracción magnética de circulante y fortuna rápida bajo la corriente folclórica del oro oculto.",
    fireColor: { r: 16, g: 185, b: 129 }, // Verde Trébol
    accentColor: "#10b981",
    image: "/verum-portada.png",
  },
];

export default function OleumsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const currentOleum = OLEUMS_DATA[currentIndex];

  // ANIMACIÓN PROCEDURAL DE FUEGO DINÁMICO EN CANVAS
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      decay: number;
    }

    const particles: Particle[] = [];
    let currentColor = { ...currentOleum.fireColor };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Transición suave de color (lerp)
      const targetColor = OLEUMS_DATA[currentIndex].fireColor;
      currentColor.r += (targetColor.r - currentColor.r) * 0.05;
      currentColor.g += (targetColor.g - currentColor.g) * 0.05;
      currentColor.b += (targetColor.b - currentColor.b) * 0.05;

      // Generar llamas en la base central
      const centerX = width / 2;
      const spawnY = height * 0.68;

      for (let i = 0; i < 4; i++) {
        particles.push({
          x: centerX + (Math.random() - 0.5) * 180,
          y: spawnY + Math.random() * 20,
          vx: (Math.random() - 0.5) * 1.5,
          vy: -(2 + Math.random() * 3.5),
          size: 15 + Math.random() * 25,
          alpha: 0.8,
          decay: 0.015 + Math.random() * 0.015,
        });
      }

      // Dibujar partículas
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.size *= 0.98;

        if (p.alpha <= 0 || p.size <= 1) {
          particles.splice(i, 1);
          continue;
        }

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        gradient.addColorStop(
          0,
          `rgba(${Math.round(currentColor.r)}, ${Math.round(currentColor.g)}, ${Math.round(currentColor.b)}, ${p.alpha})`
        );
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? OLEUMS_DATA.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === OLEUMS_DATA.length - 1 ? 0 : prev + 1));
  };

  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden flex flex-col items-center text-white selection:bg-purple-900 selection:text-green-300">
      
      {/* FONDO BASE Y CANVAS DE FUEGO */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(34,197,94,0.18),rgba(0,0,0,0.98))]">
        <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

        {/* LUNA PÚRPURA */}
        <div className="absolute top-[6%] right-[8%] md:top-[8%] md:right-[15%] w-24 h-24 md:w-32 md:h-32 z-0 opacity-60">
          <Image 
            src="/luna.png" 
            alt="Luna" 
            width={120} 
            height={120} 
            className="object-contain drop-shadow-[0_0_20px_rgba(168,85,247,0.6)]" 
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </div>
      </div>

      {/* CABECERA CON NAVEGACIÓN */}
      <header className="relative z-10 w-full max-w-5xl px-6 pt-8 pb-4 flex justify-between items-center">
        <Link 
          href="/" 
          className="text-sm font-medieval text-gray-400 hover:text-green-400 transition-colors flex items-center gap-2 border border-white/10 px-4 py-2 rounded-lg bg-black/40 backdrop-blur-md"
        >
          <span>«</span> Volver a Libros
        </Link>
        <span className="text-xs uppercase tracking-[0.2em] font-cinzel text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full bg-purple-950/30">
          Exhibición Exclusiva
        </span>
      </header>

      {/* CONTENEDOR PRINCIPAL */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-4xl pt-4 pb-16">
        
        <h1 className="text-4xl md:text-6xl font-bold mb-2 font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-300 to-gray-500 tracking-widest uppercase">
          Línea de Oleums
        </h1>
        <p className="text-xs md:text-sm font-medieval text-gray-400 mb-8 max-w-md">
          Fórmulas ceremoniales consagradas a corrientes goéticas y planetarias.
        </p>

        {/* CARRUSEL DE FRASCOS CON FOCO CENTRAL */}
        <div className="relative w-full flex items-center justify-center gap-6 my-6 min-h-[360px]">
          
          {/* Botón Izquierdo */}
          <button 
            onClick={handlePrev}
            className="z-20 p-3 rounded-full bg-black/60 border border-white/10 hover:border-white/40 text-gray-300 hover:text-white transition-all cursor-pointer shadow-lg"
          >
            ←
          </button>

          {/* Frasco Activo */}
          <div className="relative flex flex-col items-center transition-all duration-500 transform scale-105">
            <div 
              className="w-48 h-72 md:w-56 md:h-80 relative flex items-center justify-center p-4 rounded-2xl border bg-black/40 backdrop-blur-sm transition-all duration-500 shadow-2xl"
              style={{ borderColor: `${currentOleum.accentColor}55`, boxShadow: `0 0 35px ${currentOleum.accentColor}33` }}
            >
              <Image 
                src={currentOleum.image} 
                alt={currentOleum.name} 
                width={220} 
                height={320} 
                className="object-contain max-h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
              />
            </div>
            
            <span 
              className="mt-4 px-3 py-1 rounded-full text-[11px] font-medieval tracking-widest uppercase border bg-black/80 backdrop-blur-md"
              style={{ color: currentOleum.accentColor, borderColor: `${currentOleum.accentColor}66` }}
            >
              Próximamente
            </span>
          </div>

          {/* Botón Derecho */}
          <button 
            onClick={handleNext}
            className="z-20 p-3 rounded-full bg-black/60 border border-white/10 hover:border-white/40 text-gray-300 hover:text-white transition-all cursor-pointer shadow-lg"
          >
            →
          </button>
        </div>

        {/* FICHA TÉCNICA DEL OLEUM SELECCIONADO */}
        <div className="w-full max-w-2xl mt-8 border border-white/10 rounded-2xl bg-black/70 backdrop-blur-md p-6 md:p-8 text-left transition-all duration-500">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-4 mb-4 gap-2">
            <div>
              <h2 className="text-2xl md:text-3xl font-cinzel font-bold" style={{ color: currentOleum.accentColor }}>
                {currentOleum.name}
              </h2>
              <p className="text-xs font-medieval text-gray-400">{currentOleum.subtitle}</p>
            </div>
            <span className="text-xs font-medieval text-purple-300 bg-purple-950/40 border border-purple-500/30 px-3 py-1 rounded-md self-start md:self-auto">
              {currentOleum.spirit}
            </span>
          </div>

          <blockquote className="text-xs md:text-sm font-medieval text-gray-300 italic border-l-2 pl-4 py-1 mb-4" style={{ borderColor: currentOleum.accentColor }}>
            "{currentOleum.quote}"
          </blockquote>

          <p className="text-xs md:text-sm font-medieval text-gray-400 leading-relaxed">
            {currentOleum.description}
          </p>
        </div>

        {/* SELECTOR DE PUNTOS RÁPIDO */}
        <div className="flex gap-3 mt-8">
          {OLEUMS_DATA.map((oleum, idx) => (
            <button
              key={oleum.id}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                idx === currentIndex ? "scale-125" : "opacity-30 hover:opacity-70"
              }`}
              style={{ backgroundColor: oleum.accentColor }}
            />
          ))}
        </div>

      </div>

    </main>
  );
}