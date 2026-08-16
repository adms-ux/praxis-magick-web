"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const OLEUMS_DATA = [
  { id: "jester", name: "Jester's Road", spirit: "Surgat", fireColor: { r: 249, g: 115, b: 22 }, accent: "#f97316" },
  { id: "witch", name: "Witch's Glamour", spirit: "Frimost", fireColor: { r: 34, g: 197, b: 94 }, accent: "#22c55e" },
  { id: "danse", name: "Danse Macabre", spirit: "Guland", fireColor: { r: 226, g: 232, b: 240 }, accent: "#e2e8f0" },
  { id: "pope", name: "Pope's Decree", spirit: "Huictigaras", fireColor: { r: 168, g: 85, b: 247 }, accent: "#a855f7" },
  { id: "king", name: "King's Vault", spirit: "Clauneck", fireColor: { r: 234, g: 179, b: 8 }, accent: "#eab308" },
  { id: "leprechaun", name: "Leprechaun's Hoard", spirit: "Frutimiere", fireColor: { r: 16, g: 185, b: 129 }, accent: "#10b981" },
];

export default function OleumsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [email, setEmail] = useState("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Fuego Realista (Canvas)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationId: number;
    const particles: any[] = [];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const color = OLEUMS_DATA[currentIndex].fireColor;
      
      // Crear partículas
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 50,
        y: canvas.height * 0.95,
        vy: -Math.random() * 4 - 2,
        size: Math.random() * 8 + 2,
        alpha: 1
      });

      particles.forEach((p, i) => {
        p.y += p.vy;
        p.alpha -= 0.02;
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        if (p.alpha <= 0) particles.splice(i, 1);
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationId);
  }, [currentIndex]);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center">
      <canvas ref={canvasRef} className="fixed bottom-0 left-0 w-full h-[300px] pointer-events-none z-0" />
      <div className="relative z-10 w-full max-w-4xl p-6">
        <Link href="/" className="text-gray-400 hover:text-white">« Volver</Link>
        
        {/* Carrusel 3D */}
        <div className="flex justify-center items-center h-[500px] gap-10">
          <button onClick={() => setCurrentIndex((prev) => (prev === 0 ? 5 : prev - 1))}>←</button>
          <div className="text-center transition-all duration-500 scale-110">
             <h2 className="text-3xl font-bold" style={{color: OLEUMS_DATA[currentIndex].accent}}>{OLEUMS_DATA[currentIndex].name}</h2>
             <p className="text-sm opacity-70">{OLEUMS_DATA[currentIndex].spirit}</p>
          </div>
          <button onClick={() => setCurrentIndex((prev) => (prev === 5 ? 0 : prev + 1))}>→</button>
        </div>

        {/* Captura de Leads */}
        <div className="mt-10 bg-white/5 p-6 rounded-xl border border-white/10 text-center">
            <input 
              type="email" 
              placeholder="Tu correo para notificaciones..." 
              className="bg-transparent border-b border-white/30 p-2 w-64 outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="ml-4 bg-purple-600 px-4 py-2 rounded" onClick={() => alert("Registrado: " + email)}>Notificarme</button>
        </div>
      </div>
    </main>
  );
}