type StreamListener = (payload: unknown) => void

const listeners: StreamListener[] = []

export function publishEvent(payload: unknown) {
  listeners.forEach(listener => listener(payload))
}

export function subscribeToEvents(listener: StreamListener) {
  listeners.push(listener)
}
