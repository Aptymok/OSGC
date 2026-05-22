export async function evaluateMaiStatus(payload: {
  deliveryDate?: string
  repairedDate?: string
  providerReported?: boolean
  noWarranty?: boolean
  backupDelivered?: boolean
}) {
  if (payload.noWarranty) {
    return 'NO_WARRANTY'
  }

  if (payload.deliveryDate && payload.repairedDate) {
    return 'CLOSED'
  }

  if (payload.backupDelivered) {
    return 'BACKUP_DELIVERED'
  }

  if (payload.providerReported) {
    return 'WITH_PROVIDER'
  }

  return 'OPEN'
}
