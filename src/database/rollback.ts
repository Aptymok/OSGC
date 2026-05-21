import { readFileSync } from 'node:fs'

export function loadSnapshot(path: string) {
  const raw = readFileSync(path, 'utf-8')
  return JSON.parse(raw)
}
