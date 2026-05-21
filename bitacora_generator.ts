export function generateBitacoraEntry(data: Record<string, string>) {
  return `EL ${data.fecha} A LAS ${data.hora} SE RECIBE EL REPORTE Y SE ASIGNA A ${data.tecnico} PARA SU ATENCION;`
}
