import crypto from 'node:crypto'

export function hashAuditPayload(payload: unknown) {
  return crypto
    .createHash('sha256')
    .update(JSON.stringify(payload))
    .digest('hex')
}
