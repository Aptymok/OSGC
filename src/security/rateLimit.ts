type Bucket = {
  count: number
  resetAt: number
}

const buckets = new Map<string, Bucket>()

const WINDOW_MS = 60_000
const MAX_REQUESTS = 120

export function checkRateLimit(key: string) {
  const now = Date.now()
  const current = buckets.get(key)

  if (!current || now > current.resetAt) {
    buckets.set(key, {
      count: 1,
      resetAt: now + WINDOW_MS
    })

    return {
      ok: true,
      remaining: MAX_REQUESTS - 1
    }
  }

  if (current.count >= MAX_REQUESTS) {
    return {
      ok: false,
      remaining: 0
    }
  }

  current.count += 1

  return {
    ok: true,
    remaining: MAX_REQUESTS - current.count
  }
}
