"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [isPhilosophyOpen, setIsPhilosophyOpen] = useState(false);
  
  // Menú de Perfil
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false);
  const isUserLoggedIn = false; // MOCK: Cambiará dinámicamente después

  const products = [
    { name: "Ebooks", status: "Disponibles", link: "/ebooks", color: "text-green-400" },
    { name: "Grimorios Digitales", status: "Disponibles", link: "/grimorios", color: "text-green-400" },
    { name: "Cursos", status: "Próximamente", link: "/cursos", color: "text-gray-500" },
    { name: "Oleums", status: "Próximamente - Solo MX", link: "/oleums", color: "text-gray-500" },
    { name: "Poppets", status: "Próximamente", link: "/poppets", color: "text-gray-500" },
    { name: "Ídolos", status: "Próximamente", link: "/idolos", color: "text-gray-500" },
    { name: "Velas", status: "Próximamente", link: "/velas", color: "text-gray-500" },
    { name: "Polvos", status: "Próximamente", link: "/polvos", color: "text-gray-500" },
    { name: "Consultas Personales", status: "Próximamente", link: "/consultas", color: "text-gray-500" },
    { name: "Sesiones de Ouija", status: "Próximamente", link: "/ouija", color: "text-gray-500" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[100] bg-black/80 border-b border-green-500/30 backdrop-blur-md shadow-[0_4px_30px_rgba(34,197,94,0.15)] font-medieval text-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            <div className="flex-shrink-0 flex items-center cursor-pointer">
              <Link href="/">
                <Image src="/logo.png" alt="Praxis Magick" width={50} height={50} className="object-contain" />
              </Link>
            </div>

            <div className="hidden md:flex space-x-8 items-center">
              <div 
                className="relative"
                onMouseEnter={() => setIsProductsOpen(true)}
                onMouseLeave={() => setIsProductsOpen(false)}
              >
                <button className="text-gray-300 hover:text-green-400 transition-colors py-2 flex items-center gap-1 cursor-pointer">
                  Arsenal Mágico <span className="text-xs">▾</span>
                </button>
                
                {isProductsOpen && (
                  <div className="absolute left-0 mt-0 w-64 rounded-xl shadow-2xl bg-black border border-green-500/40 overflow-hidden backdrop-blur-xl">
                    <div className="py-2">
                      {products.map((item, idx) => (
                        <Link key={idx} href={item.link} className="block px-4 py-3 hover:bg-green-900/30 transition-colors border-b border-white/5 last:border-0">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-200">{item.name}</span>
                            <span className={`text-[10px] tracking-wider uppercase font-sans ${item.color}`}>{item.status}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button onClick={() => setIsPhilosophyOpen(true)} className="text-gray-300 hover:text-green-400 transition-colors cursor-pointer">
                Nuestra Magia
              </button>
              <Link href="#faq" className="text-gray-300 hover:text-green-400 transition-colors">FAQ</Link>
              <Link href="/contacto" className="text-gray-300 hover:text-green-400 transition-colors">Contacto</Link>
            </div>

            <div className="hidden md:flex items-center space-x-6 relative">
              
              {/* DROPDOWN DE PERFIL (MONITOR) */}
              <div 
                className="relative"
                onMouseEnter={() => setIsProfileOpen(true)}
                onMouseLeave={() => setIsProfileOpen(false)}
              >
                <button className="text-gray-400 hover:text-green-300 transition-colors cursor-pointer flex items-center gap-2" title="Mi Cuenta">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-2xl bg-black border border-green-500/40 overflow-hidden backdrop-blur-xl py-2">
                    {!isUserLoggedIn ? (
                      <Link href="/login" className="block px-4 py-3 text-sm text-gray-200 hover:bg-green-900/30 transition-colors font-sans">
                        Iniciar Sesión
                      </Link>
                    ) : (
                      <>
                        <Link href="/perfil" className="block px-4 py-3 text-sm text-gray-200 hover:bg-green-900/30 transition-colors border-b border-white/10 font-sans">Mi Perfil</Link>
                        <button className="w-full text-left px-4 py-3 text-sm text-gray-200 hover:bg-red-900/30 hover:text-red-400 transition-colors font-sans cursor-pointer">Cerrar Sesión</button>
                      </>
                    )}
                  </div>
                )}
              </div>

              <button className="text-gray-300 hover:text-green-400 transition-colors cursor-pointer relative" title="Carrito de Compras">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">0</span>
              </button>
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-300 hover:text-white cursor-pointer">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-black border-t border-green-500/30 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-around items-center py-4 border-b border-white/10 bg-white/5">
              
              {/* DROPDOWN PERFIL (MÓVIL) */}
              <div className="relative">
                <button onClick={() => setIsMobileProfileOpen(!isMobileProfileOpen)} className="text-gray-400 hover:text-green-300 flex flex-col items-center gap-1 cursor-pointer">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  <span className="text-[10px]">Cuenta</span>
                </button>
                {isMobileProfileOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-40 rounded-xl shadow-2xl bg-black border border-green-500/40 overflow-hidden z-50">
                    {!isUserLoggedIn ? (
                      <Link href="/login" className="block px-4 py-3 text-sm text-center text-gray-200 font-sans">Iniciar Sesión</Link>
                    ) : (
                      <>
                        <Link href="/perfil" className="block px-4 py-3 text-sm text-center text-gray-200 border-b border-white/10 font-sans">Mi Perfil</Link>
                        <button className="w-full px-4 py-3 text-sm text-center text-red-400 font-sans">Cerrar Sesión</button>
                      </>
                    )}
                  </div>
                )}
              </div>

              <button className="text-gray-300 flex flex-col items-center gap-1 relative cursor-pointer"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg><span className="absolute -top-1 right-2 bg-green-600 text-white text-[9px] px-1.5 rounded-full">0</span><span className="text-[10px]">Carrito</span></button>
            </div>

            <div className="px-4 py-4 space-y-1">
              <div className="border-b border-white/10">
                <button 
                  onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)} 
                  className="w-full flex justify-between items-center py-3 text-green-300 font-bold text-lg"
                >
                  Arsenal Mágico
                  <span className="text-sm">{isMobileProductsOpen ? "▲" : "▼"}</span>
                </button>
                {isMobileProductsOpen && (
                  <div className="mt-1 mb-3 space-y-2 pl-4 border-l-2 border-green-900/50">
                    {products.map((item, idx) => (
                      <Link key={idx} href={item.link} className="block py-2">
                        <span className="block text-gray-200">{item.name}</span>
                        <span className={`text-[10px] uppercase font-sans ${item.color}`}>{item.status}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <button onClick={() => {setIsPhilosophyOpen(true); setIsMobileMenuOpen(false);}} className="block w-full text-left py-4 text-gray-300 border-b border-white/10 font-bold">Nuestra Magia</button>
              <Link href="#faq" onClick={() => setIsMobileMenuOpen(false)} className="block py-4 text-gray-300 border-b border-white/10 font-bold">FAQ</Link>
              <Link href="/contacto" onClick={() => setIsMobileMenuOpen(false)} className="block py-4 text-gray-300 font-bold">Contacto</Link>
            </div>
          </div>
        )}
      </nav>

      {/* MODAL: NUESTRA FILOSOFÍA / MANIFIESTO */}
      {isPhilosophyOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-black border border-green-500/40 rounded-2xl p-6 md:p-10 shadow-[0_0_50px_rgba(34,197,94,0.3)] font-medieval text-gray-200">
            <button onClick={() => setIsPhilosophyOpen(false)} className="absolute top-4 right-5 text-gray-400 hover:text-white text-2xl cursor-pointer">✕</button>
            <h2 className="text-3xl md:text-4xl font-cinzel text-green-300 mb-2 text-center drop-shadow-md uppercase tracking-widest">Praxis Magick</h2>
            <p className="text-center text-gray-400 font-sans tracking-[0.2em] uppercase text-xs mb-10 border-b border-white/10 pb-4">Magia Operativa para el Mundo Moderno</p>
            <div className="space-y-8 text-sm md:text-base leading-relaxed text-gray-300 text-justify">
              <section>
                <h3 className="text-xl font-cinzel text-green-300 mb-3">Nuestra Misión</h3>
                <p>Durante siglos, las instituciones conservadoras y la cultura popular han intentado domesticar la magia a través del miedo, el moralismo y el dogma. En Praxis Magick, nuestra misión es destruir esas cadenas y devolverte el control absoluto de tu realidad.</p>
              </section>
              <section>
                <h3 className="text-xl font-cinzel text-green-300 mb-3">¿Qué magia practicamos?</h3>
                <p>Trabajamos con <strong>Magia Goética</strong>, <strong>Magia Greco-Egipcia</strong> y <strong>Magia Planetaria</strong>.</p>
              </section>
              <section>
                <h3 className="text-xl font-cinzel text-green-300 mb-3">Nuestra Filosofía</h3>
                <p>Cada elemento de nuestro catálogo está creado para potenciar tu soberanía. Ofrecemos servicios de magia personalizados con la misma arquitectura implacable, rigor y confidencialidad.</p>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
}