"use client";

export default function ServiciosMagicos() {
  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-16 text-gray-200 font-sans z-20 relative">
      
      {/* CONSULTAS PERSONALES */}
      <div className="mb-20">
        <div className="text-center mb-10">
          <h3 className="text-3xl md:text-4xl font-cinzel text-purple-300 mb-4 drop-shadow-md">
            Consultas Personales
          </h3>
          <p className="text-sm font-medieval text-gray-400 max-w-3xl mx-auto text-justify md:text-center">
            Nuestros servicios de magia personalizada no son un producto de catálogo: son un trabajo hecho a la medida exacta de tu situación.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 backdrop-blur-sm mb-10 text-sm text-gray-300 leading-relaxed text-justify space-y-4">
          <p>
            Realizas el pago por adelantado. En menos de 24 horas recibirás un mensaje en tu Chat del Cónclave para confirmar el servicio adquirido. Tu pago queda retenido hasta que el mago responde y da inicio formal al trabajo — si no recibes respuesta dentro de las 24 horas, tu dinero te será reembolsado automáticamente.
          </p>
          <p>
            En Praxis Magick, cada consulta es atendida por uno de los magos de nuestro círculo interno. Al confirmar tu servicio, se te asignará el practicante correspondiente para tu caso — esto garantiza consistencia en el método y protege tanto tu privacidad como la de quienes ejecutan cada trabajo.
          </p>
          <p className="text-purple-400 font-bold italic">
            Debido a la naturaleza del trabajo espiritual, no se aceptan devoluciones una vez iniciado el ritual. Cupos limitados por semana.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-purple-500/30 rounded-xl p-6 bg-black/60">
            <h4 className="font-cinzel text-lg text-green-300 mb-4 border-b border-white/10 pb-2">Amor</h4>
            <ul className="space-y-4 text-xs text-gray-400 text-justify">
              <li><strong className="text-gray-200">Hechizo para Enamorar:</strong> Transforma la percepción y sentimientos del objetivo desde la raíz. Trabaja con Clisthert.</li>
              <li><strong className="text-gray-200">Hechizo de Unión (Amarre):</strong> Ancla la atención y el deseo exclusivamente hacia el consultante. Trabaja con Clisthert.</li>
              <li><strong className="text-gray-200">Encontrar el Amor:</strong> Despeja el camino para nuevas oportunidades amorosas. Trabaja con Surgat.</li>
              <li><strong className="text-gray-200">Atracción Sexual:</strong> Intensifica el magnetismo sexual del consultante.</li>
            </ul>
          </div>
          <div className="border border-purple-500/30 rounded-xl p-6 bg-black/60">
            <h4 className="font-cinzel text-lg text-yellow-300 mb-4 border-b border-white/10 pb-2">Prosperidad</h4>
            <ul className="space-y-4 text-xs text-gray-400 text-justify">
              <li><strong className="text-gray-200">Abrir Caminos:</strong> Bendición inicial para proyectos nuevos o detenidos. Trabaja con Surgat.</li>
              <li><strong className="text-gray-200">Flujo Económico:</strong> Multiplica y potencia los ingresos que ya generas. Trabaja con Frutimiere.</li>
            </ul>
          </div>
          <div className="border border-red-900/50 rounded-xl p-6 bg-black/60">
            <h4 className="font-cinzel text-lg text-red-400 mb-4 border-b border-white/10 pb-2">Magia Funesta</h4>
            <ul className="space-y-4 text-xs text-gray-400 text-justify">
              <li><strong className="text-gray-200">Destruir un Proyecto:</strong> Erosiona el negocio de una persona específica hasta la quiebra. Trabaja con Guland.</li>
              <li><strong className="text-gray-200">Enfermar:</strong> Deteriora la salud física de la víctima señalada. Trabaja con Guland.</li>
              <li><strong className="text-gray-200">Romper Maldiciones:</strong> Repele o revierte energías negativas en un espacio. Trabaja con Guland.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* SESIONES DE OUIJA */}
      <div>
        <div className="text-center mb-10">
          <h3 className="text-3xl md:text-4xl font-cinzel text-purple-300 mb-4 drop-shadow-md">
            Sesiones de Ouija
          </h3>
          <p className="text-sm font-medieval text-gray-400 max-w-3xl mx-auto text-justify md:text-center">
            El tablero no es un juguete ni un espectáculo de feria. Es un canal — y transmite lo que el otro lado decide enviar, no lo que tú esperas escuchar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-sm text-gray-300">
            <h4 className="font-cinzel text-lg text-purple-200 mb-4">Mitos y Realidades</h4>
            <ul className="space-y-3 text-xs text-justify">
              <li><strong>Mito: Te puedes poseer.</strong> — Falso; requiere apertura real de quien participa.</li>
              <li><strong>Mito: Es peligroso hablar con entidades.</strong> — No lo es si se hace con respeto; no hay materialización física.</li>
              <li><strong>Mito: Se necesitan dos personas.</strong> — Falso; a veces es más efectivo hacerlo solo.</li>
              <li><strong>Mito: Solo funciona de noche.</strong> — No hay diferencia entre día y noche.</li>
            </ul>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-sm text-gray-300">
            <h4 className="font-cinzel text-lg text-purple-200 mb-4">Reglas de Consulta</h4>
            <ul className="space-y-3 text-xs text-justify">
              <li>Un tema central por sesión. Respuestas en sí/no/tal vez o símbolos.</li>
              <li>Se permite preguntar por terceros directamente involucrados.</li>
              <li>No se realizan preguntas que exijan fecha exacta; el tablero responde en procesos.</li>
              <li>El tiempo no utilizado no se acumula ni se transfiere.</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-center gap-4 flex-wrap">
          <div className="border border-purple-500/40 p-4 rounded-lg text-center bg-black w-48">
            <h5 className="font-cinzel font-bold text-gray-200">Sesión Breve</h5>
            <p className="text-xs text-gray-400 mt-2">15 Minutos. Pregunta central + 2 seguimientos.</p>
          </div>
          <div className="border border-purple-500/40 p-4 rounded-lg text-center bg-black w-48">
            <h5 className="font-cinzel font-bold text-gray-200">Sesión Media</h5>
            <p className="text-xs text-gray-400 mt-2">30 Minutos. Temas con más matices.</p>
          </div>
          <div className="border border-purple-500/40 p-4 rounded-lg text-center bg-black w-48">
            <h5 className="font-cinzel font-bold text-gray-200">Sesión Extendida</h5>
            <p className="text-xs text-gray-400 mt-2">60 Minutos. Orientación integral.</p>
          </div>
        </div>
      </div>
    </section>
  );
}