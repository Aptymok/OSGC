export function buildStream(
  events: Array<Record<string, unknown>>
) {
  return events
    .sort((a, b) => {
      const left = new Date(
        String(a.createdAt ?? 0)
      ).getTime()

      const right = new Date(
        String(b.createdAt ?? 0)
      ).getTime()

      return left - right
    })
    .map(event => ({
      type: event.type,
      provider: event.provider,
      timestamp: event.createdAt
    }))
}
