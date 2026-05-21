export async function importPowerBiExport(source: string) {
  return {
    source,
    importedAt: new Date().toISOString(),
    status: 'READY_FOR_NORMALIZATION'
  }
}
