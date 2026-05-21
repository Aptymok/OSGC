export function exportPdfPlaceholder(title: string, payload: unknown) {
  return {
    ok: true,
    type: 'PDF_EXPORT_PLACEHOLDER',
    title,
    bytesEstimated: JSON.stringify(payload).length
  }
}
