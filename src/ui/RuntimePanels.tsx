import React from 'react'

export function RuntimePanels(props: {
  stream: Array<Record<string, unknown>>
  audit: Array<Record<string, unknown>>
  ingestion: Array<Record<string, unknown>>
}) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
      <section style={panel}>
        <h3>Operational Stream</h3>
        {props.stream.slice(0, 5).map((item, index) => (
          <div key={index}>{String(item.type ?? 'EVENT')}</div>
        ))}
      </section>

      <section style={panel}>
        <h3>Audit</h3>
        {props.audit.slice(0, 5).map((item, index) => (
          <div key={index}>{String(item.action ?? 'AUDIT')}</div>
        ))}
      </section>

      <section style={panel}>
        <h3>Ingestion History</h3>
        {props.ingestion.slice(0, 5).map((item, index) => (
          <div key={index}>{String(item.createdAt ?? '')}</div>
        ))}
      </section>
    </div>
  )
}

const panel: React.CSSProperties = {
  border: '1px solid #333',
  background: '#111',
  padding: 16,
  borderRadius: 10
}
