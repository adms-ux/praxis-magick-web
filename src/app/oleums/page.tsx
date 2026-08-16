"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

// 1. BASE DE DATOS DE OLEUMS ACTUALIZADA CON TUS ESPÍRITUS
const OLEUMS_DATA = [
  {
    id: "jester",
    name: "Jester's Road",
    titleImage: "/title-jester.png", // Tu imagen PNG en arco
    subtitle: "Oleum abre caminos",
    spirit: "Espíritu Goético Surgat",
    quote: "Se dice que en las cortes medievales, solo el bufón podía decirle la verdad al rey sin perder la cabeza...",
    description: "Praxis Magick trae la astucia del bufón medieval para abrir tus caminos ritualizado con el espíritu Surgat, quien posee el poder de abrir cerraduras, romper ligaduras y franquear lugares sellados.",
    fireColor: { r: 249, g: 115, b: 22 }, // Fuego Naranja
    accentColor: "#f97316",
    image: "/verum-portada.png", // Reemplazar con el frasco PNG
  },
  {
    id: "witch",
    name: "Witch's Glamour",
    titleImage: "/title-witch.png",
    subtitle: "Oleum para belleza magnética",
    spirit: "Espíritu Goético Frimost",
    quote: "En la Europa medieval, glamour no era belleza, era brujería...",
    description: "El secreto de la bruja del bosque para proyectar una fascinación coercitiva y obsesión, independientemente de tu orientación, ritualizado bajo la potestad de Frimost.",
    fireColor: { r: 34, g: 197, b: 94 }, // Fuego Verde
    accentColor: "#22c55e",
    image: "/verum-portada.png",
  },
  {
    id: "danse",
    name: "Danse Macabre",
    titleImage: "/title-danse.png",
    subtitle: "Oleum funesto",
    spirit: "Espíritu Goético Guland",
    quote: "En los murales medievales, la Danza Macabra mostraba siempre lo mismo: el esqueleto tomando la mano de todos sin distinción...",
    description: "Una fórmula de alta contundencia ritualizada con Guland para infligir daño exacto a quien se desee y dominar las fuerzas de la ruina sobre los adversarios.",
    fireColor: { r: 226, g: 232, b: 240 }, // Fuego Blanco/Ceniza
    accentColor: "#e2e8f0",
    image: "/verum-portada.png",
  },
  {
    id: "pope",
    name: "Pope's Decree",
    titleImage: "/title-pope.png",
    subtitle: "Oleum de dominación",
    spirit: "Espíritu Goético Huictigaras",
    quote: "El Papa medieval no gobernaba reinos con ejércitos — los gobernaba con una sola palabra...",
    description: "Diseñado para doblar voluntades resistentes, penetrar en la mente del objetivo e instalar pensamientos directos con el sello de Huictigaras.",
    fireColor: { r: 168, g: 85, b: 247 }, // Fuego Púrpura
    accentColor: "#a855f7",
    image: "/verum-portada.png",
  },
  {
    id: "king",
    name: "King's Vault",
    titleImage: "/title-king.png",
    subtitle: "Oleum de riqueza estructural",
    spirit: "Espíritu Goético Clauneck",
    quote: "En la Europa medieval, la riqueza del rey no era fortuna, era arquitectura...",
    description: "Ritualizado con Clauneck para asentar prosperidad duradera, autoridad comercial y crecimiento financiero sostenido en el tiempo.",
    fireColor: { r: 234, g: 179, b: 8 }, // Fuego Dorado
    accentColor: "#eab308",
    image: "/verum-portada.png",
  },
  {
    id: "leprechaun",
    name: "Leprechaun's Hoard",
    titleImage: "/title-leprechaun.png",
    subtitle: "Oleum para el dinero y suerte",
    spirit: "Espíritu Goético Frutimiere",
    quote: "La suerte del duende para atraer dinero y oportunidades imprevistas a la vida cotidiana...",
    description: "Atracción magnética de circulante y fortuna rápida bajo la potestad de Frutimiere.",
    fireColor: { r: 16, g: 185, b: 129 }, // Fuego Verde Trébol
    accentColor: "#10b981",
    image: "/verum-portada.png",
  },
];

export default function OleumsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const currentOleum = OLEUMS_DATA[currentIndex];

  // 2. FUEGO HIPERREALISTA EN CANVAS (Partículas y Fusión de Colores)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    interface Flame {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      life: number;
      maxLife: number;
      wobble: number;
    }

    const flames: Flame[] = [];
    const currentColor = { ...currentOleum.fireColor };

    const render = () => {
      // Limpiar con fondo negro transparente
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, width, height);
      
      // Interpolación de color suave al cambiar de oleum
      const targetColor = OLEUMS_DATA[currentIndex].fireColor;
      currentColor.r += (targetColor.r - currentColor.r) * 0.04;
      currentColor.g += (targetColor.g - currentColor.g) * 0.04;
      currentColor.b += (targetColor.b - currentColor.b) * 0.04;

      // Modo "screen" para que las luces superpuestas se vean brillantes (Fuego Real)
      ctx.globalCompositeOperation = "screen";

      // Generar nuevas partículas de fuego
      const centerX = width / 2;
      const spawnY = height * 0.75; // Nace de más abajo

      for (let i = 0; i < 5; i++) {
        flames.push({
          x: centerX + (Math.random() - 0.5) * 150, // Ancho de la fogata
          y: spawnY + Math.random() * 20,
          vx: (Math.random() - 0.5) * 1.2,
          vy: -(Math.random() * 3 + 2), // Velocidad hacia arriba
          size: Math.random() * 40 + 20, // Tamaño de la flama
          life: 1,
          maxLife: Math.random() * 60 + 40,
          wobble: Math.random() * Math.PI * 2,
        });
      }

      for (let i = flames.length - 1; i >= 0; i--) {
        const p = flames[i];
        p.life++;
        const lifeRatio = p.life / p.maxLife;

        // Movimiento en zig-zag térmico
        p.x += p.vx + Math.sin(p.wobble) * 1.5;
        p.y += p.vy;
        p.wobble += 0.08;
        p.size *= 0.96; // Se encogen conforme suben

        if (p.life >= p.maxLife || p.size <= 1) {
          flames.splice(i, 1);
          continue;
        }

        const opacity = Math.max(0, 1 - lifeRatio);
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        
        // Núcleo caliente (blanco/amarillo)
        gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.9})`);
        // Color intermedio (el color del branding)
        gradient.addColorStop(0.4, `rgba(${Math.round(currentColor.r)}, ${Math.round(currentColor.g)}, ${Math.round(currentColor.b)}, ${opacity * 0.6})`);
        // Borde oscuro
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [currentIndex]);

  const handlePrev = () => setCurrentIndex((prev) => (prev === 0 ? OLEUMS_DATA.length - 1 : prev - 1));
  const handleNext = () => setCurrentIndex((prev) => (prev === OLEUMS_DATA.length - 1 ? 0 : prev + 1));

  // Función matemática para calcular el carrusel 3D circular
  const getOffset = (idx: number) => {
    let diff = idx - currentIndex;
    if (diff < -OLEUMS_DATA.length / 2) diff += OLEUMS_DATA.length;
    if (diff > OLEUMS_DATA.length / 2) diff -= OLEUMS_DATA.length;
    return diff;
  };

  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden flex flex-col items-center text-white selection:bg-purple-900 selection:text-green-300">
      
      {/* FONDO MÍSTICO Y CANVAS DE FUEGO */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(34,197,94,0.15),rgba(0,0,0,0.98))]">
        <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none w-full h-full opacity-90" />
      </div>

      {/* HEADER DE NAVEGACIÓN */}
      <header className="relative z-10 w-full max-w-5xl px-6 pt-8 pb-4 flex justify-between items-center">
        <Link 
          href="/" 
          className="text-sm font-medieval text-gray-400 hover:text-white transition-colors flex items-center gap-2 border border-white/10 px-4 py-2 rounded-lg bg-black/40 backdrop-blur-md"
        >
          <span>«</span> Volver a Libros
        </Link>
        <span className="text-xs uppercase tracking-[0.2em] font-cinzel text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full bg-purple-950/30 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
          Próximamente
        </span>
      </header>

      {/* CONTENEDOR PRINCIPAL */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-5xl pt-4 pb-16">
        
        {/* IMAGEN DEL TÍTULO PRINCIPAL DE LA LÍNEA RECTO */}
        <div className="mb-4 w-full max-w-md h-24 relative flex justify-center items-center">
          {/* Reemplazar con tu logo recto real, este es el placeholder */}
          <div className="absolute inset-0 bg-transparent flex justify-center items-center">
            <h1 className="text-4xl md:text-5xl font-cinzel tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400">
              <Image 
                src="/oleums-main.png" 
                alt="Línea de Oleums" 
                width={400} 
                height={100}
                className="object-contain"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <span className="text-gray-300 opacity-30 text-sm block tracking-widest mt-2">(LOGO LÍNEA AQUI)</span>
            </h1>
          </div>
        </div>

        <p className="text-xs md:text-sm font-medieval text-gray-400 mb-12 max-w-md z-20">
          Fórmulas ceremoniales consagradas a corrientes goéticas y planetarias para manifestación tangible.
        </p>

        {/* CARRUSEL 3D INTERACTIVO */}
        <div className="relative w-full h-[400px] md:h-[480px] flex items-center justify-center my-4 overflow-hidden z-20">
          
          <button onClick={handlePrev} className="absolute left-2 md:left-10 z-50 p-4 rounded-full bg-black/50 border border-white/10 hover:bg-black/80 hover:border-white/40 transition-all cursor-pointer backdrop-blur-md text-xl">
            ←
          </button>

          <div className="relative w-full h-full flex items-center justify-center">
            {OLEUMS_DATA.map((oleum, idx) => {
              const offset = getOffset(idx);
              const isActive = offset === 0;
              
              // Matemáticas del 3D / Cover Flow
              const scale = isActive ? 1.3 : 0.8;
              const translateX = offset * 180; // Separación horizontal
              const zIndex = 20 - Math.abs(offset);
              const opacity = Math.abs(offset) > 1 ? 0 : isActive ? 1 : 0.4;
              const blur = isActive ? "0px" : "4px";

              return (
                <div 
                  key={oleum.id}
                  onClick={() => !isActive && setCurrentIndex(idx)}
                  className={`absolute transition-all duration-700 ease-out flex flex-col items-center ${!isActive && 'cursor-pointer'}`}
                  style={{
                    transform: `translateX(${translateX}px) scale(${scale})`,
                    zIndex,
                    opacity,
                    filter: `blur(${blur})`
                  }}
                >
                  <div 
                    className="w-48 h-72 md:w-56 md:h-80 relative flex items-center justify-center rounded-2xl transition-all duration-700"
                  >
                    {/* Sombras reactivas al color del oleum para el frasco central */}
                    {isActive && (
                      <div 
                        className="absolute inset-0 rounded-2xl opacity-40 blur-[40px] transition-all duration-700" 
                        style={{ backgroundColor: oleum.accentColor }} 
                      />
                    )}
                    <Image 
                      src={oleum.image} 
                      alt={oleum.name} 
                      width={220} 
                      height={320} 
                      className={`relative z-10 object-contain max-h-full transition-all duration-700 ${isActive ? 'drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)]' : 'drop-shadow-none'}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <button onClick={handleNext} className="absolute right-2 md:right-10 z-50 p-4 rounded-full bg-black/50 border border-white/10 hover:bg-black/80 hover:border-white/40 transition-all cursor-pointer backdrop-blur-md text-xl">
            →
          </button>
        </div>

        {/* TÍTULO EN ARCO (PNG) Y FICHA TÉCNICA DEL OLEUM */}
        <div className="w-full max-w-2xl mt-16 text-center transition-all duration-500 z-20">
          
          {/* TÍTULO EN ARCO PNG CON DESTELLO DE COLOR */}
          <div className="flex justify-center mb-6 min-h-[80px]">
            <Image 
              src={currentOleum.titleImage}
              alt={currentOleum.name}
              width={300}
              height={100}
              className="object-contain transition-all duration-700"
              style={{ filter: `drop-shadow(0 0 20px ${currentOleum.accentColor})` }}
              onError={(e) => { 
                // Fallback por si la imagen PNG aún no existe
                e.currentTarget.style.display = 'none'; 
                e.currentTarget.parentElement!.innerHTML = `<h2 class="text-3xl font-cinzel font-bold drop-shadow-[0_0_15px_${currentOleum.accentColor}]" style="color: ${currentOleum.accentColor}">${currentOleum.name}</h2>`;
              }}
            />
          </div>

          {/* INSIGNIA DEL ESPÍRITU */}
          <div className="flex justify-center mb-6">
            <span 
              className="text-xs md:text-sm font-medieval bg-black/80 backdrop-blur-md border px-5 py-2 rounded-lg transition-all duration-700 shadow-lg"
              style={{ color: currentOleum.accentColor, borderColor: `${currentOleum.accentColor}55`, boxShadow: `0 0 20px ${currentOleum.accentColor}22` }}
            >
              {currentOleum.spirit}
            </span>
          </div>

          <blockquote className="text-sm md:text-base font-medieval text-gray-200 italic mb-6 px-4">
            "{currentOleum.quote}"
          </blockquote>

          <p className="text-xs md:text-sm font-medieval text-gray-400 leading-relaxed max-w-xl mx-auto mb-8">
            {currentOleum.description}
          </p>

          <button 
            className="px-8 py-3 rounded-lg font-medieval text-sm transition-all duration-500 border bg-black/60 hover:bg-black backdrop-blur-md cursor-pointer"
            style={{ borderColor: `${currentOleum.accentColor}88`, color: currentOleum.accentColor, boxShadow: `0 0 15px ${currentOleum.accentColor}44` }}
            onClick={() => alert(`Notificaciones activadas para: ${currentOleum.name}. Te avisaremos cuando esté disponible.`)}
          >
            Notificarme cuando esté disponible
          </button>
        </div>

        {/* SELECTOR DE PUNTOS */}
        <div className="flex gap-4 mt-12 z-20">
          {OLEUMS_DATA.map((oleum, idx) => (
            <button
              key={oleum.id}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-500 cursor-pointer ${
                idx === currentIndex ? "scale-150" : "opacity-30 hover:opacity-70"
              }`}
              style={{ backgroundColor: oleum.accentColor, boxShadow: idx === currentIndex ? `0 0 10px ${oleum.accentColor}` : 'none' }}
            />
          ))}
        </div>

      </div>
    </main>
  );
}