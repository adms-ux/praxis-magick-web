import type { Metadata } from "next";
import { Cinzel_Decorative, MedievalSharp } from "next/font/google";
import "./globals.css";

// IMPORTAMOS NUESTROS ARCHIVOS GLOBALES
import { LegalProvider } from "../context/LegalContext";
import LegalGlobal from "../components/LegalGlobal";

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

export const metadata: Metadata = {
  title: "Praxis Magick | Preventa Exclusiva",
  description: "Adquiere el e-book en preventa antes del 23 de Septiembre.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${cinzel.variable} ${medieval.variable} antialiased bg-black`}>
        {/* ENVOLVEMOS TODO CON EL PROVEEDOR LEGAL */}
        <LegalProvider>
          {children}
          {/* EL BANNER Y MODAL LEGAL ESTARÁN DISPONIBLES EN TODA LA WEB */}
          <LegalGlobal />
        </LegalProvider>
      </body>
    </html>
  );
}