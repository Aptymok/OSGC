export function calculateFrictionIndex(data: {
  expiredCases: number
  pendingCases: number
  totalCases: number
}) {
  if (data.totalCases === 0) return 0

  return Number(((data.expiredCases + data.pendingCases) / data.totalCases).toFixed(2))
}
