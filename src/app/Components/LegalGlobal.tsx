"use client";
import { useState, useEffect } from "react";
import { useLegal } from "../Context/LegalContext";

export default function LegalGlobal() {
  const { showLegalModal, activeLegalTab, closeLegalModal, openLegalModal } = useLegal();

  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const [showCookieConfig, setShowCookieConfig] = useState(false);
  const [cookieConsent, setCookieConsent] = useState({ essential: true, analytics: false });

  useEffect(() => {
    const storedConsent = localStorage.getItem("praxisCookieConsent");
    if (!storedConsent) {
      setShowCookieBanner(true);
    } else {
      setCookieConsent(JSON.parse(storedConsent));
    }
  }, []);

  const acceptAllCookies = () => {
    const consent = { essential: true, analytics: true };
    localStorage.setItem("praxisCookieConsent", JSON.stringify(consent));
    setCookieConsent(consent);
    setShowCookieBanner(false);
    setShowCookieConfig(false);
  };

  const saveCookiePreferences = () => {
    localStorage.setItem("praxisCookieConsent", JSON.stringify(cookieConsent));
    setShowCookieBanner(false);
    setShowCookieConfig(false);
  };

  return (
    <>
      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 bg-black/90 border-t border-purple-500/50 backdrop-blur-md shadow-[0_-10px_40px_rgba(168,85,247,0.2)]">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 font-sans text-sm">
            <p className="text-gray-300 leading-relaxed text-center md:text-left">
              Para garantizar el acceso a tu biblioteca digital y procesar pagos de forma segura, utilizamos cookies esenciales. Opcionalmente, utilizamos cookies analíticas para mejorar nuestra plataforma. Revisa nuestra{" "}
              <button onClick={() => openLegalModal("cookies")} className="text-purple-400 underline font-semibold">Política de Cookies</button> y{" "}
              <button onClick={() => openLegalModal("privacidad")} className="text-purple-400 underline font-semibold">Aviso de Privacidad</button>.
            </p>
            <div className="flex gap-3 shrink-0">
              <button 
                onClick={() => { setShowCookieBanner(false); setShowCookieConfig(true); }}
                className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition cursor-pointer"
              >
                Configurar
              </button>
              <button 
                onClick={acceptAllCookies}
                className="px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white font-semibold rounded-lg shadow-[0_0_15px_rgba(168,85,247,0.4)] transition cursor-pointer"
              >
                Aceptar Todas
              </button>
            </div>
          </div>
        </div>
      )}

      {showCookieConfig && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-black border border-purple-500/40 rounded-2xl p-6 shadow-[0_0_50px_rgba(168,85,247,0.3)] font-sans">
            <h3 className="text-xl font-bold text-white mb-2">Configuración de Cookies</h3>
            <p className="text-xs text-gray-400 mb-6">Selecciona qué tipo de cookies permites que utilicemos. Las cookies técnicas son obligatorias para que la aplicación funcione.</p>
            
            <div className="space-y-4 mb-6">
              <div className="p-4 border border-gray-700 bg-gray-900/50 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-gray-200">Esenciales y de Sesión</span>
                  <span className="text-xs px-2 py-1 bg-green-900/60 text-green-300 rounded border border-green-500/30">Siempre Activo</span>
                </div>
                <p className="text-xs text-gray-500">Estrictamente necesarias para mantener tu sesión iniciada, acceder a tus e-books y procesar transacciones seguras a través de Stripe.</p>
              </div>

              <div className="p-4 border border-gray-700 bg-gray-900/50 rounded-lg flex gap-4">
                <div className="flex-1">
                  <div className="font-semibold text-gray-200 mb-1">Analítica y Marketing</div>
                  <p className="text-xs text-gray-500">Nos permiten medir el tráfico de la página y entender cómo interactúas con la tienda para mejorar nuestros servicios y promociones.</p>
                </div>
                <div className="flex items-start pt-1">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={cookieConsent.analytics}
                      onChange={(e) => setCookieConsent({ ...cookieConsent, analytics: e.target.checked })}
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <button 
              onClick={saveCookiePreferences}
              className="w-full py-3 bg-purple-700 hover:bg-purple-600 text-white rounded-lg font-semibold transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)] cursor-pointer"
            >
              Guardar Preferencias
            </button>
          </div>
        </div>
      )}

      {showLegalModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-gray-950 border border-purple-500/40 rounded-2xl shadow-[0_0_50px_rgba(168,85,247,0.3)] font-sans flex flex-col">
            
            <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-black/50 rounded-t-2xl">
              <h3 className="text-xl font-cinzel text-purple-300">Documentos Legales</h3>
              <button 
                onClick={closeLegalModal}
                className="text-gray-400 hover:text-white text-xl p-2 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex border-b border-gray-800 bg-gray-900/30 text-sm overflow-x-auto shrink-0">
              <button 
                onClick={() => openLegalModal("terminos")}
                className={`px-6 py-4 whitespace-nowrap font-semibold transition-colors cursor-pointer ${activeLegalTab === "terminos" ? "text-purple-300 border-b-2 border-purple-400 bg-purple-900/10" : "text-gray-500 hover:text-gray-300"}`}
              >
                Términos y Condiciones
              </button>
              <button 
                onClick={() => openLegalModal("privacidad")}
                className={`px-6 py-4 whitespace-nowrap font-semibold transition-colors cursor-pointer ${activeLegalTab === "privacidad" ? "text-purple-300 border-b-2 border-purple-400 bg-purple-900/10" : "text-gray-500 hover:text-gray-300"}`}
              >
                Aviso de Privacidad
              </button>
              <button 
                onClick={() => openLegalModal("cookies")}
                className={`px-6 py-4 whitespace-nowrap font-semibold transition-colors cursor-pointer ${activeLegalTab === "cookies" ? "text-purple-300 border-b-2 border-purple-400 bg-purple-900/10" : "text-gray-500 hover:text-gray-300"}`}
              >
                Política de Cookies
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 text-sm text-gray-300 space-y-6 leading-relaxed custom-scrollbar">
              
              {activeLegalTab === "terminos" && (
                <div className="space-y-6">
                  <h4 className="text-lg font-cinzel text-white mb-4">Términos y Condiciones de Uso y Venta</h4>
                  <p className="text-xs text-gray-500">Última actualización: 26 de agosto de 2026</p>
                  <p>Bienvenido/a. Los presentes Términos y Condiciones rigen el uso de este sitio web, la aplicación web asociada (en adelante, la "Plataforma") y la compra de productos digitales y físicos ofrecidos por Bryan Méndez Mota (en adelante, el "Titular"). Al crear una cuenta, realizar una compra o acceder a nuestros contenidos, el usuario acepta someterse íntegramente a las siguientes políticas.</p>
                  
                  <div>
                    <h5 className="font-bold text-purple-300 mb-2">1. Creación de Cuentas, Seguridad y Baja del Servicio</h5>
                    <p className="mb-2">Para acceder al contenido digital adquirido o descargar materiales gratuitos, el sistema requiere o genera automáticamente una cuenta de usuario asociada al correo electrónico proporcionado.</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>Credenciales:</strong> En caso de creación automática, el usuario recibirá credenciales provisionales. Es responsabilidad absoluta del usuario ingresar a la Plataforma y cambiar esta contraseña. El Titular no se hace responsable por el acceso no autorizado derivado del mal manejo de las contraseñas.</li>
                      <li><strong>Baja de Cuenta y Pérdida de Acceso:</strong> El usuario puede solicitar la eliminación de su cuenta. <strong>IMPORTANTE:</strong> La eliminación conlleva la pérdida irrevocable e inmediata del acceso a la biblioteca digital dentro de la Plataforma. Es responsabilidad exclusiva del usuario descargar sus archivos a sus dispositivos antes de proceder con la baja.</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-bold text-purple-300 mb-2">2. Propiedad Intelectual y Licencia de Uso</h5>
                    <p className="mb-2">Todo el contenido digital, incluyendo libros electrónicos, cursos y textos están protegidos por la Ley Federal del Derecho de Autor y tratados internacionales.</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Al adquirir un producto digital, el usuario recibe una <strong>licencia de uso personal, no exclusiva, intransferible y revocable</strong>.</li>
                      <li>Queda estrictamente prohibida la reproducción, distribución, reventa o modificación por cualquier medio. Cualquier uso no autorizado será causa de terminación inmediata de la cuenta sin derecho a reembolso.</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-bold text-purple-300 mb-2">3. Preventas y Fechas de Liberación</h5>
                    <p>Para los productos adquiridos en "Preventa", el acceso no es inmediato. La liberación oficial de <em>Demonios del Verum</em> se llevará a cabo el <strong>23 de septiembre de 2026</strong>. A partir de dicha fecha, los usuarios podrán acceder a su contenido a través de su biblioteca en la web.</p>
                  </div>

                  <div>
                    <h5 className="font-bold text-purple-300 mb-2">4. Promociones y Lead Magnets</h5>
                    <p>La Plataforma podrá ofrecer contenido gratuito a cambio del registro del correo electrónico. La descarga está sujeta a las mismas restricciones de Propiedad Intelectual. Al solicitar este contenido, el usuario acepta recibir comunicaciones de marketing.</p>
                  </div>

                  <div>
                    <h5 className="font-bold text-purple-300 mb-2">5. Pagos y Reembolsos</h5>
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>Pagos:</strong> Procesados a través de Stripe. La entrega está condicionada a la acreditación de los fondos.</li>
                      <li><strong>Productos Digitales:</strong> Una vez que el archivo ha sido descargado o se ha iniciado sesión para acceder a él, la venta es final. <strong>No existen reembolsos ni cancelaciones</strong>.</li>
                      <li><strong>Productos Físicos:</strong> Debido a su naturaleza de consumo/ritual, todas las ventas son finales sin devoluciones.</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-bold text-purple-300 mb-2">6. Naturaleza de los Productos y Exclusión de Garantías (Disclaimer)</h5>
                    <p>Los productos comercializados (libros, cursos, aceites) se ofrecen exclusivamente con fines de entretenimiento, estudio cultural y creencias personales. El Titular no garantiza resultados específicos, objetivos, médicos, financieros ni psicológicos. El usuario asume total responsabilidad por el uso que dé a la información.</p>
                  </div>

                  <div>
                    <h5 className="font-bold text-purple-300 mb-2">7. Jurisdicción</h5>
                    <p>Las partes se someten expresamente a las leyes federales de México y a los tribunales competentes con sede en el Estado de Tlaxcala, renunciando a cualquier otro fuero.</p>
                  </div>

                  <div>
                    <h5 className="font-bold text-purple-300 mb-2">8. Contacto y Soporte</h5>
                    <p>Para cualquier consulta, asistencia con tu orden o soporte técnico, puedes comunicarte con nosotros al correo oficial de Praxis Magick: <strong>lamagick99@gmail.com</strong>.</p>
                  </div>
                </div>
              )}

              {activeLegalTab === "privacidad" && (
                <div className="space-y-6">
                  <h4 className="text-lg font-cinzel text-white mb-4">Aviso de Privacidad Integral</h4>
                  <p>Bryan Méndez Mota, con domicilio en el Estado de Tlaxcala, México, es el Responsable del uso y protección de sus datos personales.</p>
                  
                  <div>
                    <h5 className="font-bold text-purple-300 mb-2">Datos Recabados</h5>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>Datos de registro y acceso:</strong> Correo electrónico y nombre de usuario.</li>
                      <li><strong>Datos de logística (para productos físicos):</strong> Domicilio de entrega, código postal y teléfono de contacto.</li>
                    </ul>
                    <p className="mt-2 italic text-gray-500 text-xs">Nota: No recabamos ni almacenamos datos bancarios; toda transacción es procesada de forma encriptada a través de Stripe.</p>
                  </div>

                  <div>
                    <h5 className="font-bold text-purple-300 mb-2">Finalidades del Tratamiento</h5>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Creación, gestión y soporte técnico de su cuenta de usuario.</li>
                      <li>Gestión de accesos, lectura y descarga de su biblioteca digital.</li>
                      <li>Procesamiento logístico y envío de los productos físicos adquiridos.</li>
                      <li>Envío de promociones, novedades y boletines informativos (finalidad secundaria de la cual puede darse de baja).</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-bold text-purple-300 mb-2">Transferencias y Derechos ARCO</h5>
                    <p className="mb-2">Sus datos personales no son vendidos ni comercializados. Solo se comparten con proveedores de servicios técnicos indispensables, como Stripe.</p>
                    <p className="mb-2">Usted tiene derecho a conocer qué datos tenemos, rectificarlos, cancelarlos u oponerse a su uso (Derechos ARCO). Para ejercer estos derechos, incluyendo la cancelación definitiva de su cuenta, contacte a soporte: <strong>lamagick99@gmail.com</strong></p>
                    <p className="text-xs text-gray-400">Le informamos que por obligaciones del Código de Comercio y la legislación fiscal mexicana, los registros de transacciones y comprobantes de compra serán conservados por el periodo que dicte la ley aplicable, incluso si cancela su cuenta.</p>
                  </div>
                </div>
              )}

              {activeLegalTab === "cookies" && (
                <div className="space-y-6">
                  <h4 className="text-lg font-cinzel text-white mb-4">Política de Cookies</h4>
                  <p>Nuestra plataforma web utiliza cookies y tecnologías de rastreo para ofrecerle una experiencia segura y funcional.</p>
                  
                  <div>
                    <h5 className="font-bold text-purple-300 mb-2">Cookies Estrictamente Necesarias (Técnicas y de Sesión)</h5>
                    <p>Estas son herramientas tecnológicas indispensables para mantener su cuenta iniciada de forma segura, gestionar el acceso a sus libros electrónicos y permitir el correcto funcionamiento de la pasarela de pagos. Al ser esenciales para la operatividad del sitio, estas cookies no pueden ser deshabilitadas.</p>
                  </div>

                  <div>
                    <h5 className="font-bold text-purple-300 mb-2">Cookies Analíticas y de Marketing</h5>
                    <p>Estas cookies nos permiten contabilizar las visitas y fuentes de tráfico para poder medir y mejorar el rendimiento de nuestro sitio. Nos ayudan a saber qué páginas son las más o menos populares. Estas cookies son opcionales y puede habilitarlas o deshabilitarlas en cualquier momento desde el panel de Configuración de Cookies que aparece en la parte inferior de la pantalla.</p>
                  </div>
                </div>
              )}

            </div>
            
            <div className="p-4 border-t border-gray-800 text-right bg-black/50 rounded-b-2xl">
              <button 
                onClick={closeLegalModal}
                className="px-6 py-2 bg-purple-900/60 hover:bg-purple-800 text-white rounded-lg border border-purple-500/40 text-sm font-semibold transition-colors cursor-pointer"
              >
                Cerrar Documento
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}