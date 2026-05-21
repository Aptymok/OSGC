import React, { useState } from 'react'
import { processRuntimeUpload } from './runtimeUploader.js'
import { RuntimePanels } from './RuntimePanels.js'
import { useRuntime } from './useRuntime.js'

export function App() {
  const runtime = useRuntime()
  const [message, setMessage] = useState('Esperando CSV')
  const cases = runtime.cases

  async function onUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    const result = await processRuntimeUpload(file)
    setMessage(result.ok ? `Filas: ${result.created.length}` : 'Error de validacion')
  }

  return (
    <div style={shell}>
      <h1>OSGC Runtime</h1>
      <p>Ingesta, SLA, eventos, auditoria e hidratacion.</p>
      <input type="file" accept=".csv" onChange={onUpload} />
      <p>{message}</p>
      <section style={cards}>
        <div style={card}>Casos: {cases.length}</div>
        <div style={card}>Eventos: {runtime.events.length}</div>
        <div style={card}>Audit: {runtime.audit.length}</div>
        <div style={card}>Ingestas: {runtime.ingestion.length}</div>
      </section>
      <table style={table}>
        <thead><tr><th>Folio</th><th>Proveedor</th><th>Estado</th><th>SLA</th></tr></thead>
        <tbody>{cases.map((item: any, index: number) => <tr key={index}><td>{item.folio}</td><td>{item.provider}</td><td>{item.status}</td><td>{item.slaProgress}</td></tr>)}</tbody>
      </table>
      <RuntimePanels stream={runtime.stream} audit={runtime.audit} ingestion={runtime.ingestion} />
    </div>
  )
}

const shell: React.CSSProperties = { background: '#0a0a0a', color: '#eee', minHeight: '100vh', padding: 24, fontFamily: 'Arial' }
const cards: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, margin: '24px 0' }
const card: React.CSSProperties = { border: '1px solid #333', padding: 16, background: '#111' }
const table: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', marginBottom: 24 }
