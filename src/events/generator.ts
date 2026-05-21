export function generateCaseEvents(caseData: Record<string, unknown>) {
  return [
    {
      type: 'CASE_CREATED',
      caseFolio: caseData.folio,
      createdAt: new Date().toISOString()
    },
    {
      type: 'SLA_EVALUATED',
      caseFolio: caseData.folio,
      createdAt: new Date().toISOString()
    }
  ]
}
