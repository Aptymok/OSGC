export function renderTimeline(events: Array<Record<string, unknown>>) {
  return events
    .map(event => {
      return `[${event.occurredAt}] ${event.type}`
    })
    .join('\n')
}
