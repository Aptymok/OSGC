export function buildBitacoraTemplate(type: string) {
  const templates: Record<string, string> = {
    REPORTE_RECIBIDO: 'SE RECIBE EL REPORTE.',
    PROVEEDOR_NOTIFICADO: 'SE NOTIFICA AL PROVEEDOR.',
    EQUIPO_REPARADO: 'EL EQUIPO FUNCIONA CORRECTAMENTE.'
  }

  return templates[type] ?? 'EVENTO NO CONFIGURADO'
}
