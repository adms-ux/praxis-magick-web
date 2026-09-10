import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Vercel inyecta automáticamente el país en este encabezado
  const country = request.headers.get('x-vercel-ip-country') || 'MX';
  
  // Países hispanohablantes (lista básica)
  const spanishSpeakingCountries = ['MX', 'ES', 'AR', 'CO', 'PE', 'VE', 'CL', 'EC', 'GT', 'CU', 'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PR', 'PA', 'UY', 'GQ'];
  
  // Determinar idioma basado en el país de la IP
  const language = spanishSpeakingCountries.includes(country) ? 'es' : 'en';

  // Clonar los encabezados de la solicitud y agregar nuestro idioma detectado
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-user-language', language);

  // Continuar con la respuesta pero llevando la información del idioma
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Guardar en una cookie por si el usuario quiere cambiarlo manualmente después
  if (!request.cookies.has('user-lang')) {
    response.cookies.set('user-lang', language, { path: '/' });
  }

  return response;
}

// Configuración para que el middleware no corra en imágenes o archivos internos
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)',
  ],
};