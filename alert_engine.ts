export function buildAlert(item: Record<string, unknown>) {
  const status = String(item.status ?? '')
  const severity = String(item.severity ?? '')

  if (status === 'VENCIDO' || severity === 'ROJO') {
    return { active: true, level: 'CRITICAL', message: 'Caso requiere revision inmediata' }
  }

  if (severity === 'NARANJA') {
    return { active: true, level: 'WARNING', message: 'Caso proximo a vencimiento' }
  }

  return { active: false, level: 'OK', message: 'Sin alerta activa' }
}
