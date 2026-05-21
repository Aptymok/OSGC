const cases: Array<Record<string, unknown>> = []

export function saveCase(data: Record<string, unknown>) {
  cases.push(data)
  return data
}

export function getCases() {
  return cases
}
