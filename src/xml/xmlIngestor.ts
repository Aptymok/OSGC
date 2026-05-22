export async function ingestXmlCases(xml: string) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(xml, 'application/xml')

  const reports = Array.from(doc.querySelectorAll('reporte'))

  return reports.map(report => ({
    reportId: report.querySelector('Codigo')?.textContent?.trim() ?? '',
    requester: report.querySelector('Solicitante')?.textContent?.trim() ?? '',
    serialNumber: report.querySelector('Serie')?.textContent?.trim() ?? '',
    inventoryNumber: report.querySelector('Inventario')?.textContent?.trim() ?? '',
    maintenanceUrl: report.querySelector('ReporteMtto')?.textContent?.trim() ?? '',
    maiUrl: report.querySelector('ReporteMAI')?.textContent?.trim() ?? '',
    status: 'UNKNOWN'
  }))
}
