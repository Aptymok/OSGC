export interface TimelineNode {
  id: string
  label: string
  timestamp: string
  severity?: string
}

export interface TimelineView {
  caseId: string
  nodes: TimelineNode[]
}
