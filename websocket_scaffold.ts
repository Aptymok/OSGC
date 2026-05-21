type Listener = (payload: unknown) => void

const listeners: Listener[] = []

export function subscribe(listener: Listener) {
  listeners.push(listener)
}

export function publish(payload: unknown) {
  listeners.forEach(listener => listener(payload))
}
