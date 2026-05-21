export function sanitizeCell(value: string) {
  return value
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .trim()
}

export function sanitizeRow(row: Record<string, string>) {
  const sanitized: Record<string, string> = {}

  Object.entries(row).forEach(([key, value]) => {
    sanitized[key] = sanitizeCell(String(value))
  })

  return sanitized
}
