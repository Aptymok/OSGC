export interface OperationalEvent {
  id: string
  type: string
  caseFolio: string
  createdAt: string
  payload?: Record<string, unknown>
}
