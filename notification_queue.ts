const notifications: Array<Record<string, unknown>> = []

export function enqueueNotification(notification: Record<string, unknown>) {
  notifications.push({
    ...notification,
    createdAt: new Date().toISOString()
  })
}

export function getNotifications() {
  return notifications
}
