export function detectDocumentException(row: Record<string, unknown>) {
  const missing = []

  if (!row.folio_mai) missing.push('folio_mai')
  if (!row.estado) missing.push('estado')
  if (!row.contrato) missing.push('contrato')

  return {
    hasException: missing.length > 0,
    missing
  }
}
