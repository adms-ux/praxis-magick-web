import type { Metadata } from "next";
import { Cinzel_Decorative, MedievalSharp } from "next/font/google";
import "./globals.css";

// IMPORTAMOS NUESTROS ARCHIVOS GLOBALES
import { LegalProvider } from "./Context/LegalContext";
import { ToastProvider } from "./Context/ToastContext"; 
import LegalGlobal from "./Components/LegalGlobal";
import Navbar from "./Components/Navbar"; 
import ChatFlotante from "./Components/ChatFlotante"; // <-- AHORA ES GLOBAL
import BotonSubir from "./Components/BotonSubir";     // <-- AHORA ES GLOBAL

// Fuente Gótica/Elegante para títulos
const cinzel = Cinzel_Decorative({ 
  weight: ['400', '700', '900'],
  subsets: ["latin"],
  variable: '--font-cinzel'
});

// Fuente Celta/Medieval legible para textos
const medieval = MedievalSharp({ 
  weight: ['400'],
  subsets: ["latin"],
  variable: '--font-medieval'
});

// TARJETA DE PRESENTACIÓN GLOBAL
export const metadata: Metadata = {
  title: "Praxis Magick | El Círculo Interno",
  description: "El Grimorium Verum rescatado y traducido a un método operativo. Explora nuestro arsenal mágico, ebooks y servicios esotéricos.",
  openGraph: {
    title: "Praxis Magick | Tienda de Productos Esotéricos",
    description: "Adéntrate en la bóveda. Productos esotéricos, grimorios y servicios de alta magia.",
    url: "https://praxismagick.com",
    siteName: "Praxis Magick",
    images: [
      {
        url: "/castillo.png",
        width: 800,
        height: 600,
        alt: "Castillo Praxis Magick",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${cinzel.variable} ${medieval.variable} antialiased bg-black text-white selection:bg-green-900 selection:text-green-300`}>
        <ToastProvider>
          <LegalProvider>
            <Navbar /> 
            {children}
            {/* ESTOS DOS COMPONENTES AHORA TE SEGUIRÁN A TODAS LAS HABITACIONES */}
            <BotonSubir />
            <ChatFlotante />
            <LegalGlobal />
          </LegalProvider>
        </ToastProvider>
      </body>
    </html>
  );
}