export function getPagination(searchParams: URLSearchParams) {
  const page = Math.max(1, Number(searchParams.get('page') ?? '1'))
  const limit = Math.min(100, Math.max(1, Number(searchParams.get('limit') ?? '25')))
  return { page, limit, offset: (page - 1) * limit }
}

export function applyCaseFilters(items: any[], searchParams: URLSearchParams) {
  const provider = searchParams.get('provider')
  const status = searchParams.get('status')
  const severity = searchParams.get('severity')

  return items.filter(item => {
    if (provider && item.provider !== provider) return false
    if (status && item.status !== status) return false
    if (severity && item.severity !== severity) return false
    return true
  })
}
