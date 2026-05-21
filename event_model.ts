export type CaseEventType =
  | 'REPORTE_RECIBIDO'
  | 'EQUIPO_RECIBIDO'
  | 'DIAGNOSTICO_REGISTRADO'
  | 'GARANTIA_CONFIRMADA'
  | 'PROVEEDOR_NOTIFICADO'
  | 'SLA_INICIADO'
  | 'SLA_PROXIMO_A_VENCER'
  | 'SLA_VENCIDO'
  | 'RESPALDO_SOLICITADO'
  | 'RESPALDO_ENTREGADO'
  | 'EQUIPO_REPARADO'
  | 'EQUIPO_SUSTITUIDO'
  | 'ENTREGA_USUARIO'
  | 'REPORTE_CERRADO'
  | 'NO_PROCEDE_GARANTIA'
  | 'EXCEPCION_DOCUMENTAL'
  | 'EXCEPCION_OPERATIVA'
  | 'EXCEPCION_CONTRACTUAL'

export interface CaseEvent {
  id: string
  caseId: string
  type: CaseEventType
  occurredAt: string
  actor?: string
  source: 'manual' | 'import' | 'system'
  humanReviewRequired: boolean
  payload?: Record<string, unknown>
}
