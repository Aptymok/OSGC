export function buildTimeline(events: Array<Record<string, unknown>>) {
  return [...events].sort((a, b) => {
    const aTime = new Date(String(a.occurredAt ?? '')).getTime()
    const bTime = new Date(String(b.occurredAt ?? '')).getTime()

    return aTime - bTime
  })
}
