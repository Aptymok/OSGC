import { useEffect, useState } from 'react'
import {
  hydrateCases,
  hydrateAudit,
  hydrateEvents,
  hydrateIngestionHistory,
  hydrateStream
} from '../runtime/osgcStore.js'

export function useRuntime() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTick(value => value + 1)
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  return {
    tick,
    cases: hydrateCases(),
    events: hydrateEvents(),
    audit: hydrateAudit(),
    ingestion: hydrateIngestionHistory(),
    stream: hydrateStream()
  }
}
