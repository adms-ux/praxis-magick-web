"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "../Context/ToastContext";

export default function PortalRegistro() {
  const router = useRouter();
  const { showToast } = useToast();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Validación estricta contra inyecciones y errores
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Ciberseguridad Frontal: Filtros de validación
    if (!EMAIL_REGEX.test(email)) {
      showToast("La estructura del correo electrónico es inválida.", "error");
      return;
    }
    if (password.length < 6) {
      showToast("Por seguridad, la contraseña debe tener al menos 6 caracteres.", "error");
      return;
    }
    if (!isLogin && password !== confirmPassword) {
      showToast("Las contraseñas no coinciden. El pacto debe ser exacto.", "error");
      return;
    }

    // Simulamos la carga segura hacia la base de datos
    setIsLoading(true);
    
    // Aquí es donde en el futuro conectaremos src/utils/auth.ts (Supabase)
    setTimeout(() => {
      setIsLoading(false);
      if (isLogin) {
        showToast("Bienvenido de vuelta al Círculo Interno.", "success");
        // router.push("/boveda"); // Futura redirección
      } else {
        showToast("Cuenta forjada con éxito. Revisa tu correo para verificar tu identidad.", "success");
        setIsLogin(true); // Lo pasamos a login tras registrarse
      }
    }, 1500);
  };

  return (
    <main className="relative min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center p-4 text-white selection:bg-green-900 selection:text-green-300">
      
      {/* Fondo inmersivo */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-black bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.05),transparent_80%)]" />
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-20 pointer-events-none mix-blend-overlay" />

      {/* Botón de escape rápido */}
      <button onClick={() => router.back()} className="absolute top-6 left-6 md:top-10 md:left-10 flex items-center gap-2 text-gray-500 hover:text-green-400 transition-colors font-sans text-xs uppercase tracking-widest z-20 group">
        <span className="group-hover:-translate-x-1 transition-transform">←</span> Abandonar
      </button>

      <div className="w-full max-w-md relative z-10 flex flex-col items-center">
        
        <div className="w-24 h-24 mb-6 rounded-full border border-green-500/30 bg-black/60 backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.2)]">
          <Image src="/logo.png" alt="Praxis Magick" width={60} height={60} className="object-contain" priority />
        </div>

        <div className="bg-black/80 backdrop-blur-xl border border-green-500/20 rounded-2xl w-full p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-cinzel text-gray-100 mb-2">{isLogin ? "El Círculo Interno" : "Forjar un Pacto"}</h1>
            <p className="text-xs font-sans text-gray-400 uppercase tracking-widest">
              {isLogin ? "Identifícate para acceder a tu bóveda" : "Regístrate para asegurar tus conocimientos"}
            </p>
          </div>

          <div className="flex bg-white/5 p-1 rounded-lg mb-8 border border-white/5">
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 text-xs font-bold font-sans uppercase tracking-widest rounded-md transition-all ${isLogin ? 'bg-green-900/40 text-green-300 shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
            >
              Ingresar
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 text-xs font-bold font-sans uppercase tracking-widest rounded-md transition-all ${!isLogin ? 'bg-green-900/40 text-green-300 shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
            >
              Nuevo Ingreso
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-sans text-gray-400 uppercase tracking-widest pl-1">Correo Electrónico</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg text-white font-sans text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all placeholder:text-gray-700"
                placeholder="ejemplo@dominio.com"
              />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center pl-1">
                <label className="text-[10px] font-sans text-gray-400 uppercase tracking-widest">Contraseña Privada</label>
                {isLogin && (
                  <button type="button" onClick={() => showToast("El sistema de recuperación estará activo en el lanzamiento.", "info")} className="text-[9px] text-gray-500 hover:text-green-400 transition-colors">
                    ¿Extraviada?
                  </button>
                )}
              </div>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg text-white font-sans text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all placeholder:text-gray-700"
                placeholder="••••••••"
              />
            </div>

            {!isLogin && (
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-sans text-gray-400 uppercase tracking-widest pl-1">Confirmar Contraseña</label>
                <input 
                  type="password" 
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg text-white font-sans text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all placeholder:text-gray-700"
                  placeholder="••••••••"
                />
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full py-4 mt-2 bg-green-800 hover:bg-green-700 text-white text-sm font-bold font-cinzel uppercase tracking-wider rounded-lg transition-all shadow-[0_0_15px_rgba(34,197,94,0.15)] flex justify-center items-center ${isLoading ? 'opacity-70 cursor-wait' : ''}`}
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                isLogin ? "Cruzar el Umbral" : "Sellar Pacto"
              )}
            </button>
          </form>

        </div>

        <p className="mt-8 text-center text-[9px] text-gray-600 font-sans max-w-xs leading-relaxed">
          Este es un espacio privado y estrictamente monitoreado. Al ingresar, aceptas los Términos y Condiciones y el Aviso de Privacidad de Praxis Magick.
        </p>

      </div>
    </main>
  );
}