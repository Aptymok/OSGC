export type MailStatus = 'DRAFT' | 'APPROVED' | 'SENT' | 'FAILED'

export interface MailQueueItem {
  id: string
  to: string
  subject: string
  body: string
  status: MailStatus
  retries: number
  createdAt: string
}

const queue: MailQueueItem[] = []

export function enqueueMail(item: Omit<MailQueueItem, 'id' | 'status' | 'retries' | 'createdAt'>) {
  const entry: MailQueueItem = {
    id: `${Date.now()}`,
    ...item,
    status: 'DRAFT',
    retries: 0,
    createdAt: new Date().toISOString()
  }

  queue.push(entry)
  return entry
}

export function listMailQueue() {
  return queue
}

export function approveMail(id: string) {
  const item = queue.find(entry => entry.id === id)
  if (!item) return null
  item.status = 'APPROVED'
  return item
}
