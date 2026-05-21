import type { OperationalEvent } from '../domain/event.js'
import type { Repository } from './repository.js'

const memoryEvents: OperationalEvent[] = []

export class EventRepository implements Repository<OperationalEvent> {
  async create(data: OperationalEvent) {
    memoryEvents.push(data)
    return data
  }

  async list() {
    return memoryEvents
  }

  async findById(id: string) {
    return memoryEvents.find(item => item.id === id) ?? null
  }
}
