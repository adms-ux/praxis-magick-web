"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const OLEUMS_DATA = [
  { id: "jester", name: "Jester's Road", spirit: "Surgat", color: "#f97316" },
  { id: "witch", name: "Witch's Glamour", spirit: "Frimost", color: "#22c55e" },
  { id: "danse", name: "Danse Macabre", spirit: "Guland", color: "#e2e8f0" },
  { id: "pope", name: "Pope's Decree", spirit: "Huictigaras", color: "#a855f7" },
  { id: "king", name: "King's Vault", spirit: "Clauneck", color: "#eab308" },
  { id: "leprechaun", name: "Leprechaun's Hoard", spirit: "Frutimiere", color: "#10b981" },
];

export default function OleumsPage() {
  const [idx, setIdx] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Fuego Realista (Elipses dinámicas)
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let particles: any[] = [];
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Fuego ascendente con elipses
      particles.push({ x: canvas.width/2 + (Math.random()-0.5)*40, y: canvas.height, vy: -Math.random()*3 - 1, size: Math.random()*20+5, alpha: 1 });
      
      particles.forEach((p, i) => {
        p.y += p.vy;
        p.alpha -= 0.01;
        ctx.fillStyle = OLEUMS_DATA[idx].color + Math.floor(p.alpha * 255).toString(16).padStart(2, '0');
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, p.size/2, p.size, 0, 0, Math.PI * 2);
        ctx.fill();
        if (p.alpha <= 0) particles.splice(i, 1);
      });
      requestAnimationFrame(animate);
    };
    animate();
  }, [idx]);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center overflow-hidden">
      <canvas ref={canvasRef} className="fixed bottom-0 w-full h-[400px] z-0" />
      <div className="relative z-10 w-full max-w-4xl p-6 text-center">
        <Link href="/" className="absolute top-6 left-6 text-gray-500">« Volver</Link>
        <h1 className="text-4xl font-cinzel mt-20 mb-10">Línea de Oleums</h1>
        
        <div className="flex justify-center items-center gap-10 h-[300px]">
          <button onClick={() => setIdx(idx === 0 ? 5 : idx - 1)} className="text-4xl">←</button>
          <div className="transition-all scale-150">
             <h2 className="text-4xl font-bold" style={{color: OLEUMS_DATA[idx].color}}>{OLEUMS_DATA[idx].name}</h2>
             <p className="mt-2 text-purple-300 italic">{OLEUMS_DATA[idx].spirit}</p>
          </div>
          <button onClick={() => setIdx(idx === 5 ? 0 : idx + 1)} className="text-4xl">→</button>
        </div>

        <div className="mt-10 bg-black/50 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
            <input type="email" placeholder="Correo para notificaciones..." className="bg-transparent border-b border-white/20 p-2 outline-none w-60" />
            <button className="bg-purple-700 px-6 py-2 rounded-lg ml-4">Notificarme</button>
        </div>
      </div>
    </main>
  );
}