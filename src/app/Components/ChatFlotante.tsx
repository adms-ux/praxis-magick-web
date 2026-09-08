"use client";
import { useState } from "react";

export default function ChatFlotante() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  // Simulamos que el usuario NO está logueado para activar las protecciones
  const isUserLoggedIn = false; 

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    if (!isUserLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }
    setMessage("");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[150] p-4 bg-green-900/80 border border-green-500/50 text-white rounded-full shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:bg-green-700 transition-all cursor-pointer"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[90vw] max-w-sm h-[500px] max-h-[70vh] bg-black border border-green-500/40 rounded-2xl shadow-[0_0_40px_rgba(34,197,94,0.2)] z-[150] flex flex-col overflow-hidden font-sans">
          
          <div className="p-4 bg-green-950/50 border-b border-green-500/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-black border border-green-500/50 flex items-center justify-center p-1">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h4 className="font-cinzel text-green-300 font-bold text-sm">El Cónclave</h4>
              <p className="text-[10px] text-gray-400">Soporte y Consultas</p>
            </div>
          </div>

          <div className="flex-grow p-4 overflow-y-auto space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl rounded-tl-none p-3 text-xs text-gray-300 leading-relaxed w-[85%] text-justify">
              Bienvenido a Praxis Magick. Este canal es para soporte de tu Bóveda Digital, seguimiento de envíos y orientación de servicios personalizados. ¿En qué podemos orientarte hoy?
            </div>
          </div>

          {showLoginPrompt && (
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-20">
              <p className="text-sm text-gray-300 mb-6 font-medieval leading-relaxed">
                Debes crear una cuenta en el Círculo Interno para comunicarte con nuestros practicantes y mantener tu historial protegido.
              </p>
              <div className="w-full flex flex-col gap-3">
                <button className="w-full py-3 bg-green-700 hover:bg-green-600 text-white font-bold rounded-lg transition-colors text-sm shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                  Crear cuenta gratuita
                </button>
                <button onClick={() => setShowLoginPrompt(false)} className="w-full py-2 bg-transparent text-gray-400 hover:text-white transition-colors text-xs">
                  Cerrar
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleSend} className="p-3 bg-white/5 border-t border-white/10 flex items-end gap-2">
            <button type="button" className="p-2 text-gray-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
            </button>
            <textarea 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe tu mensaje..."
              className="flex-grow bg-transparent text-sm text-white resize-none outline-none max-h-24 p-2"
              rows={1}
            />
            <button type="button" className="p-2 text-gray-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
            </button>
            <button type="submit" className="p-2 text-green-400 hover:text-green-300 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
            </button>
          </form>

        </div>
      )}
    </>
  );
}