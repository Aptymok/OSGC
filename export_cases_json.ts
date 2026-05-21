export function exportCasesJson(cases: Array<Record<string, unknown>>) {
  return JSON.stringify(cases, null, 2)
}
