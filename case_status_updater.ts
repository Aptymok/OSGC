export function updateCaseStatus(currentStatus: string, eventType: string) {
  const transitions: Record<string, string> = {
    REPORTE_RECIBIDO: 'PENDIENTE',
    DIAGNOSTICO_REGISTRADO: 'EN_DIAGNOSTICO',
    PROVEEDOR_NOTIFICADO: 'PROVEEDOR_NOTIFICADO',
    RESPALDO_ENTREGADO: 'RESPALDO_ENTREGADO',
    EQUIPO_REPARADO: 'REPARADO',
    EQUIPO_SUSTITUIDO: 'SUSTITUIDO',
    ENTREGA_USUARIO: 'CERRADO',
    NO_PROCEDE_GARANTIA: 'NO_PROCEDE',
    SLA_VENCIDO: 'VENCIDO'
  }

  return transitions[eventType] ?? currentStatus
}
