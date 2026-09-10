import type { Metadata } from "next";
import { Cinzel_Decorative, MedievalSharp } from "next/font/google";
import "./globals.css";

// IMPORTAMOS NUESTROS ARCHIVOS GLOBALES
import { LegalProvider } from "./Context/LegalContext";
import { ToastProvider } from "./Context/ToastContext"; // <-- 1. IMPORTAMOS LOS TOASTS
import LegalGlobal from "./Components/LegalGlobal";
import Navbar from "./Components/Navbar"; 

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

// TARJETA DE PRESENTACIÓN GLOBAL PARA REDES SOCIALES Y WHATSAPP
export const metadata: Metadata = {
  title: "Praxis Magick | El Círculo Interno",
  description: "El Grimorium Verum rescatado y traducido a un método operativo. Explora nuestro arsenal mágico, ebooks y servicios esotéricos.",
  openGraph: {
    title: "Praxis Magick | Tienda de Productos Esotéricos",
    description: "Adéntrate en la bóveda. Productos esotéricos, grimorios y servicios de alta magia.",
    url: "https://praxismagick.com", // Tu dominio real
    siteName: "Praxis Magick",
    images: [
      {
        url: "/castillo.png", // Cuando compartas el link, saldrá el castillo
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
        {/* ENVOLVEMOS TODO CON EL PROVEEDOR DE TOASTS Y EL LEGAL */}
        <ToastProvider>
          <LegalProvider>
            <Navbar /> 
            {children}
            <LegalGlobal />
          </LegalProvider>
        </ToastProvider>
      </body>
    </html>
  );
}