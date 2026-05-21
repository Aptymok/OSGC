import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'

const RUNTIME_DIR = './runtime'
const STORE_PATH = './runtime/osgc.store.json'

type StoreShape = {
  cases: Array<Record<string, unknown>>
  events: Array<Record<string, unknown>>
  audit: Array<Record<string, unknown>>
  ingestionHistory: Array<Record<string, unknown>>
  stream: Array<Record<string, unknown>>
}

const emptyStore: StoreShape = {
  cases: [],
  events: [],
  audit: [],
  ingestionHistory: [],
  stream: []
}

export function readFileStore(): StoreShape {
  if (!existsSync(RUNTIME_DIR)) {
    mkdirSync(RUNTIME_DIR, { recursive: true })
  }

  if (!existsSync(STORE_PATH)) {
    writeFileSync(STORE_PATH, JSON.stringify(emptyStore, null, 2))
    return emptyStore
  }

  return JSON.parse(readFileSync(STORE_PATH, 'utf-8')) as StoreShape
}

export function writeFileStore(store: StoreShape) {
  if (!existsSync(RUNTIME_DIR)) {
    mkdirSync(RUNTIME_DIR, { recursive: true })
  }

  writeFileSync(STORE_PATH, JSON.stringify(store, null, 2))
  return store
}
