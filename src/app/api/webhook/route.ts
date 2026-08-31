import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
      const data = await request.json();
          
              // Aquí sacamos la llave del cofre fuerte
                  const webhookUrl = process.env.MAKE_WEBHOOK_URL; 

                      if (!webhookUrl) {
                            return NextResponse.json({ error: "Falta configuración del servidor" }, { status: 500 });
                                }

                                    // El servidor hace el envío a Make sin que nadie lo vea
                                        await fetch(webhookUrl, {
                                              method: 'POST',
                                                    headers: { 'Content-Type': 'application/json' },
                                                          body: JSON.stringify(data),
                                                              });

                                                                  return NextResponse.json({ success: true });
                                                                    } catch (error) {
                                                                        return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 });
                                                                          }
                                                                          }