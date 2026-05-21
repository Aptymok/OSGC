import React, { useMemo, useState } from 'react'

type Case = {
  folio: string
  provider: string
  contract: string
  status: string
  severity: string
  sla: number
  part: string
  technician: string
  bitacora: string
}

const INITIAL_CASES: Case[] = [
  { folio: 'INC001', provider: 'HP', contract: 'CA_10_CGI_2019', status: 'PENDIENTE', severity: 'AMARILLO', sla: 62, part: 'BISAGRAS', technician: 'LOPEZ', bitacora: 'Reporte recibido. Pendiente de seguimiento proveedor.' },
  { folio: 'INC002', provider: 'LENOVO', contract: 'CA_10_CGI_2019', status: 'VENCIDO', severity: 'ROJO', sla: 100, part: 'TARJETA PRINCIPAL', technician: 'SOSA', bitacora: 'SLA vencido. Requiere revision y escalamiento.' },
  { folio: 'INC003', provider: 'DELL', contract: 'CA_10_CGI_2019', status: 'CERRADO', severity: 'VERDE', sla: 18, part: 'TECLADO', technician: 'MARIN', bitacora: 'Caso cerrado correctamente.' }
]

const timeline = ['REPORTE_RECIBIDO', 'DIAGNOSTICO_REGISTRADO', 'PROVEEDOR_NOTIFICADO', 'SLA_EN_OBSERVACION']

export function App() {
  const [provider, setProvider] = useState('TODOS')
  const [severity, setSeverity] = useState('TODAS')
  const [selectedFolio, setSelectedFolio] = useState('INC002')

  const filtered = useMemo(() => INITIAL_CASES.filter(item => {
    const providerMatch = provider === 'TODOS' || item.provider === provider
    const severityMatch = severity === 'TODAS' || item.severity === severity
    return providerMatch && severityMatch
  }), [provider, severity])

  const selected = INITIAL_CASES.find(item => item.folio === selectedFolio) ?? INITIAL_CASES[0]
  const friction = INITIAL_CASES.length ? ((INITIAL_CASES.filter(item => item.status !== 'CERRADO').length + INITIAL_CASES.filter(item => item.status === 'VENCIDO').length) / INITIAL_CASES.length).toFixed(2) : '0'

  return (
    <div style={shell}>
      <aside style={nav}>
        <div style={brand}>OSGC</div>
        {['Resumen', 'Casos', 'SLA', 'Timeline', 'Proveedores', 'Supervisor'].map(item => <div key={item} style={navItem}>{item}</div>)}
      </aside>
      <main style={main}>
        <header style={header}>
          <div>
            <h1 style={h1}>Observatorio de Seguimiento de Garantias Contractuales</h1>
            <p style={muted}>Ingesta controlada, vigilancia SLA, friccion operacional y supervision humana.</p>
          </div>
          <div style={badge}>FASE 1 · SIN IA</div>
        </header>

        <section style={cards}>
          {card('Casos Totales', String(INITIAL_CASES.length))}
          {card('Pendientes', String(INITIAL_CASES.filter(c => c.status === 'PENDIENTE').length))}
          {card('Vencidos', String(INITIAL_CASES.filter(c => c.status === 'VENCIDO').length))}
          {card('Friccion', friction)}
        </section>

        <section style={panel}>
          <div style={panelTitle}>Ingesta controlada</div>
          <div style={uploadBox}>Arrastra aqui XLS/CSV exportado desde Power BI o MAI. La automatizacion real se habilita despues de validacion.</div>
        </section>

        <section style={filterBar}>
          <select style={select} value={provider} onChange={event => setProvider(event.target.value)}>
            {['TODOS', 'HP', 'LENOVO', 'DELL'].map(item => <option key={item}>{item}</option>)}
          </select>
          <select style={select} value={severity} onChange={event => setSeverity(event.target.value)}>
            {['TODAS', 'VERDE', 'AMARILLO', 'ROJO'].map(item => <option key={item}>{item}</option>)}
          </select>
        </section>

        <section style={grid2}>
          <div>
            <h2 style={sectionTitle}>Casos</h2>
            <table style={table}>
              <thead><tr>{['Folio','Proveedor','Contrato','Estado','Criticidad','SLA'].map(h => <th key={h} style={th}>{h}</th>)}</tr></thead>
              <tbody>
                {filtered.map(item => <tr key={item.folio} onClick={() => setSelectedFolio(item.folio)} style={row}>
                  <td style={td}>{item.folio}</td><td style={td}>{item.provider}</td><td style={td}>{item.contract}</td><td style={td}>{item.status}</td><td style={td}>{item.severity}</td><td style={td}>{item.sla}%</td>
                </tr>)}
              </tbody>
            </table>
          </div>
          <aside style={panelCompact}>
            <h2 style={sectionTitle}>Supervisor</h2>
            <div style={detailLine}>Caso: {selected.folio}</div>
            <div style={detailLine}>Proveedor: {selected.provider}</div>
            <div style={detailLine}>Parte: {selected.part}</div>
            <div style={detailLine}>Tecnico: {selected.technician}</div>
            <p style={muted}>{selected.bitacora}</p>
          </aside>
        </section>

        <section style={grid2}>
          <div style={panelCompact}>
            <h2 style={sectionTitle}>Timeline</h2>
            <div style={timelinePanel}>{timeline.map(item => <div key={item} style={timelineNode}>{item}</div>)}</div>
          </div>
          <div style={panelCompact}>
            <h2 style={sectionTitle}>Heatmap SLA</h2>
            <div style={heatmap}>{INITIAL_CASES.map(item => <div key={item.folio} style={heatCell}>{item.folio}<br />{item.sla}%<br />{item.severity}</div>)}</div>
          </div>
        </section>

        <section style={panel}>
          <div style={panelTitle}>Alertas</div>
          {INITIAL_CASES.filter(item => item.severity === 'ROJO').map(item => <div key={item.folio} style={alertLine}>{item.folio} requiere revision inmediata y posible escalamiento contractual.</div>)}
        </section>
      </main>
    </div>
  )
}

function card(title: string, value: string) {
  return <div style={cardStyle}><div style={muted}>{title}</div><div style={valueStyle}>{value}</div></div>
}

const shell: React.CSSProperties = { background: '#0a0a0a', color: '#f3f3f3', minHeight: '100vh', fontFamily: 'Arial, sans-serif', display: 'flex' }
const nav: React.CSSProperties = { width: 240, borderRight: '1px solid #222', padding: 24, background: '#080808' }
const brand: React.CSSProperties = { fontSize: 22, marginBottom: 28, letterSpacing: 2 }
const navItem: React.CSSProperties = { padding: '11px 0', color: '#aaa', borderBottom: '1px solid #141414' }
const main: React.CSSProperties = { flex: 1, padding: 28 }
const header: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', gap: 24, alignItems: 'flex-start' }
const h1: React.CSSProperties = { margin: 0, fontSize: 30 }
const muted: React.CSSProperties = { color: '#aaa' }
const badge: React.CSSProperties = { border: '1px solid #333', padding: '10px 14px', borderRadius: 999, color: '#bbb' }
const cards: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 24 }
const cardStyle: React.CSSProperties = { border: '1px solid #2b2b2b', padding: 16, borderRadius: 10, background: '#121212' }
const valueStyle: React.CSSProperties = { fontSize: 30, marginTop: 12 }
const panel: React.CSSProperties = { border: '1px solid #333', padding: 16, borderRadius: 10, background: '#111', marginTop: 24 }
const panelCompact: React.CSSProperties = { border: '1px solid #333', padding: 16, borderRadius: 10, background: '#111' }
const panelTitle: React.CSSProperties = { fontSize: 18, marginBottom: 12 }
const uploadBox: React.CSSProperties = { border: '1px dashed #444', padding: 24, color: '#888' }
const filterBar: React.CSSProperties = { display: 'flex', gap: 10, marginTop: 18, flexWrap: 'wrap' }
const select: React.CSSProperties = { background: '#101010', border: '1px solid #333', color: '#ddd', padding: '9px 12px', borderRadius: 8 }
const grid2: React.CSSProperties = { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginTop: 28 }
const sectionTitle: React.CSSProperties = { marginTop: 0 }
const table: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', background: '#111', border: '1px solid #222' }
const th: React.CSSProperties = { textAlign: 'left', padding: 10, borderBottom: '1px solid #333', color: '#bbb' }
const td: React.CSSProperties = { padding: 10, borderBottom: '1px solid #222' }
const row: React.CSSProperties = { cursor: 'pointer' }
const detailLine: React.CSSProperties = { padding: '7px 0', borderBottom: '1px solid #222' }
const timelinePanel: React.CSSProperties = { display: 'flex', gap: 10, flexWrap: 'wrap' }
const timelineNode: React.CSSProperties = { border: '1px solid #333', borderRadius: 999, padding: '10px 14px', background: '#151515' }
const heatmap: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }
const heatCell: React.CSSProperties = { border: '1px solid #333', padding: 18, background: '#161616', textAlign: 'center' }
const alertLine: React.CSSProperties = { padding: 10, background: '#1a1111', border: '1px solid #3a2222', borderRadius: 8 }
