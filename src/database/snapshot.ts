import { writeFileSync, mkdirSync, existsSync } from 'node:fs'

export function createRuntimeSnapshot(label: string, payload: unknown) {
  if (!existsSync('./runtime/snapshots')) {
    mkdirSync('./runtime/snapshots', { recursive: true })
  }

  const fileName = `./runtime/snapshots/${Date.now()}-${label}.json`

  writeFileSync(fileName, JSON.stringify(payload, null, 2))

  return fileName
}
