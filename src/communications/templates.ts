export function providerAlertTemplate(data: Record<string, unknown>) {
  return {
    subject: `OSGC :: ALERTA SLA :: ${data.provider}`,
    body: `Proveedor: ${data.provider}\nContrato: ${data.contract}\nFolio: ${data.folio}\nEstado: ${data.status}\nSLA: ${data.slaProgress}`
  }
}

export function escalationTemplate(data: Record<string, unknown>) {
  return {
    subject: `OSGC :: ESCALAMIENTO :: ${data.provider}`,
    body: `El caso requiere atención inmediata por vencimiento o presión SLA.`
  }
}
