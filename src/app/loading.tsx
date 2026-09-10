export default function Loading() {
  return (
    <div className="fixed inset-0 z-[500] bg-black flex flex-col items-center justify-center">
      <div className="w-24 h-24 relative flex items-center justify-center">
        {/* Resplandor verde que late de fondo */}
        <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse"></div>
        {/* Tu logo */}
        <img 
          src="/logo.png" 
          alt="Cargando Bóveda..." 
          className="w-20 h-20 object-contain animate-pulse relative z-10" 
        />
      </div>
      <p className="mt-6 text-green-400 font-serif text-[10px] tracking-[0.3em] uppercase animate-pulse">
        Abriendo la Bóveda...
      </p>
    </div>
  );
}