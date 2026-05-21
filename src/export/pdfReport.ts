export function buildPdfReportPayload(title: string, sections: Array<{ title: string, content: unknown }>) {
  return {
    generatedAt: new Date().toISOString(),
    title,
    sections
  }
}
