export function buildChronology(
  events: Array<Record<string, unknown>>
) {
  return events.map(event => ({
    timestamp: event.createdAt,
    label: event.type,
    provider: event.provider,
    contract: event.contract
  }))
}
