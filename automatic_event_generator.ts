export function generateAutomaticEvents(caseData: Record<string, unknown>) {
  const events: string[] = []

  if (caseData.fecha_reporte) {
    events.push('REPORTE_RECIBIDO')
  }

  if (caseData.fecha_diagnostico) {
    events.push('DIAGNOSTICO_REGISTRADO')
  }

  if (caseData.fecha_notificacion) {
    events.push('PROVEEDOR_NOTIFICADO')
  }

  if (caseData.fecha_cierre) {
    events.push('REPORTE_CERRADO')
  }

  return events
}
