"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  
  const isUserLoggedIn = false;
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Eliminamos Consultas y Ouija de este arreglo para ponerlos directos en la barra
  const products = [
    { name: "Ebooks", status: "Disponible", link: "/ebooks", color: "text-green-400" },
    { name: "Grimorios Digitales", status: "Próximamente", link: "/grimorios", color: "text-gray-500" },
    { name: "Cursos", status: "Próximamente", link: "/cursos", color: "text-gray-500" },
    { name: "Oleums", status: "Próximamente", link: "/oleums", color: "text-gray-500" },
    { name: "Poppets", status: "Próximamente", link: "/poppets", color: "text-gray-500" },
    { name: "Ídolos", status: "Próximamente", link: "/idolos", color: "text-gray-500" },
    { name: "Velas", status: "Próximamente", link: "/velas", color: "text-gray-500" },
    { name: "Polvos", status: "Próximamente", link: "/polvos", color: "text-gray-500" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[100] bg-black/80 border-b border-green-500/30 backdrop-blur-md shadow-[0_4px_30px_rgba(34,197,94,0.1)] font-medieval text-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            
            <div className="flex-shrink-0 flex items-center cursor-pointer">
              <Link href="/">
                <Image src="/logo.png" alt="Praxis Magick" width={45} height={45} className="object-contain" />
              </Link>
            </div>

            {/* ENLACES DE ESCRITORIO */}
            <div className="hidden lg:flex space-x-6 items-center text-sm">
              <div className="relative" onMouseEnter={() => setIsProductsOpen(true)} onMouseLeave={() => setIsProductsOpen(false)}>
                <button className="text-gray-300 hover:text-green-400 transition-colors py-2 flex items-center gap-1 cursor-pointer">
                  Arsenal Mágico <span className="text-[10px]">▼</span>
                </button>
                
                {isProductsOpen && (
                  <div className="absolute left-0 mt-0 w-64 rounded-xl shadow-2xl bg-black border border-green-500/40 overflow-hidden backdrop-blur-xl">
                    <div className="py-2 max-h-[70vh] overflow-y-auto">
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
              
              {/* Servicios y Acerca de PM separados del Arsenal */}
              <Link href="/consultas" className="text-gray-300 hover:text-purple-400 transition-colors">Consultas</Link>
              <Link href="/ouija" className="text-gray-300 hover:text-purple-400 transition-colors">Ouija</Link>
              <Link href="/acerca" className="text-gray-300 hover:text-green-400 transition-colors">Acerca de PM</Link>
              <Link href="#faq" className="text-gray-300 hover:text-green-400 transition-colors">FAQ</Link>
            </div>

            <div className="hidden md:flex items-center space-x-6 relative">
              
              <div className="relative" onMouseEnter={() => setIsProfileOpen(true)} onMouseLeave={() => setIsProfileOpen(false)}>
                <button className="text-gray-400 hover:text-green-300 transition-colors cursor-pointer py-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-0 w-48 rounded-xl shadow-2xl bg-black border border-green-500/40 overflow-hidden backdrop-blur-xl">
                    <div className="py-2">
                      {!isUserLoggedIn ? (
                        <Link href="/registro" className="block px-4 py-3 hover:bg-green-900/30 text-sm font-bold text-green-300 transition-colors">
                          Iniciar Sesión
                        </Link>
                      ) : (
                        <>
                          <div className="px-4 py-2 border-b border-white/10 mb-1">
                            <span className="block text-xs text-gray-400 font-sans">Bienvenido</span>
                            <span className="block text-sm text-gray-200 font-bold truncate">Usuario</span>
                          </div>
                          <Link href="/boveda" className="block px-4 py-2 hover:bg-green-900/30 text-sm text-gray-200 transition-colors">Mi Bóveda</Link>
                          <Link href="/perfil" className="block px-4 py-2 hover:bg-green-900/30 text-sm text-gray-200 transition-colors">Ajustes de Perfil</Link>
                          <button className="w-full text-left px-4 py-2 hover:bg-red-900/30 text-sm text-red-400 transition-colors border-t border-white/10 mt-1 cursor-pointer">Cerrar Sesión</button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <Link href="/carrito" className="text-gray-300 hover:text-green-400 transition-colors cursor-pointer relative">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">0</span>
              </Link>
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

        {/* MENÚ MÓVIL */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black border-t border-green-500/30 max-h-[85vh] overflow-y-auto pb-6">
            <div className="flex justify-around items-center py-4 border-b border-white/10 bg-white/5">
              {!isUserLoggedIn ? (
                <Link href="/registro" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400 flex flex-col items-center gap-1 hover:text-green-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  <span className="text-[10px]">Ingresar</span>
                </Link>
              ) : (
                <Link href="/boveda" onClick={() => setIsMobileMenuOpen(false)} className="text-green-400 flex flex-col items-center gap-1">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  <span className="text-[10px]">Mi Bóveda</span>
                </Link>
              )}
              <Link href="/carrito" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 flex flex-col items-center gap-1 relative">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                <span className="absolute -top-1 right-2 bg-green-600 text-white text-[9px] px-1.5 rounded-full">0</span>
                <span className="text-[10px]">Carrito</span>
              </Link>
            </div>

            <div className="px-4 py-4 space-y-1">
              <div className="border-b border-white/10 pb-2">
                <button onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)} className="w-full flex justify-between items-center py-3 text-green-300 font-bold text-lg">
                  Arsenal Mágico <span className="text-sm">{isMobileProductsOpen ? "▲" : "▼"}</span>
                </button>
                {isMobileProductsOpen && (
                  <div className="mt-1 mb-3 space-y-2 pl-4 border-l-2 border-green-900/50">
                    {products.map((item, idx) => (
                      <Link key={idx} href={item.link} onClick={() => setIsMobileMenuOpen(false)} className="block py-2">
                        <span className="block text-gray-200">{item.name}</span>
                        <span className={`text-[10px] uppercase font-sans ${item.color}`}>{item.status}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Servicios y Acerca separados en el menú móvil */}
              <Link href="/consultas" onClick={() => setIsMobileMenuOpen(false)} className="block py-4 text-purple-300 font-bold border-b border-white/10">Consultas Personales</Link>
              <Link href="/ouija" onClick={() => setIsMobileMenuOpen(false)} className="block py-4 text-purple-300 font-bold border-b border-white/10">Sesiones de Ouija</Link>
              <Link href="/acerca" onClick={() => setIsMobileMenuOpen(false)} className="block py-4 text-gray-300 border-b border-white/10">Acerca de Praxis Magick</Link>
              <Link href="#faq" onClick={() => setIsMobileMenuOpen(false)} className="block py-4 text-gray-300 border-b border-white/10">Preguntas Frecuentes</Link>
              
              {isUserLoggedIn && (
                 <button className="block w-full text-left py-4 text-red-400 border-t border-white/10 mt-4 cursor-pointer">Cerrar Sesión</button>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}