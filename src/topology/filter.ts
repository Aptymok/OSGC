export function filterByDate(
  items: Array<Record<string, unknown>>,
  start: string,
  end: string
) {
  const startTime = new Date(start).getTime()
  const endTime = new Date(end).getTime()

  return items.filter(item => {
    const value = new Date(
      String(item.createdAt ?? 0)
    ).getTime()

    return value >= startTime && value <= endTime
  })
}
