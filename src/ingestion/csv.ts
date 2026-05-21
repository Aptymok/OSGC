export function parseCsv(text: string) {
  const lines = text.trim().split('\n')
  const headers = lines[0].split(',').map(header => header.trim())

  return lines.slice(1).map(line => {
    const values = line.split(',')
    const row: Record<string, string> = {}

    headers.forEach((header, index) => {
      row[header] = String(values[index] ?? '').trim()
    })

    return row
  })
}
