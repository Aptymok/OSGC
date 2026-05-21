import React from 'react'

type Case = { folio: string; provider: string; status: string; severity: string; sla: number; bitacora: string }

const cases: Case[] = [
  { folio: 'INC001', provider: 'HP', status: 'PENDIENTE', severity: 'AMARILLO', sla: 62, bitacora: 'Reporte recibido. Pendiente de seguimiento proveedor.' },
  { folio: 'INC002', provider: 'LENOVO', status: 'VENCIDO', severity: 'ROJO', sla: 100, bitacora: 'SLA vencido. Requiere revision y escalamiento.' },
  { folio: 'INC003', provider: 'DELL', status: 'CERRADO', severity: 'VERDE', sla: 18, bitacora: 'Caso cerrado correctamente.' }
]

const timeline = ['REPORTE_RECIBIDO','DIAGNOSTICO_REGISTRADO','PROVEEDOR_NOTIFICADO','SLA_EN_OBSERVACION']

export function App() {
  const selected = cases[1]
  return React.createElement('div', { style: shell }, [
    React.createElement('aside', { key: 'nav', style: nav }, ['Resumen', 'Casos', 'SLA', 'Timeline', 'Proveedores', 'Supervisor'].map(i => React.createElement('div', { key: i, style: navItem }, i))),
    React.createElement('main', { key: 'main', style: main }, [
      React.createElement('h1', { key: 'title' }, 'OSGC · Observatorio Operacional'),
      React.createElement('p', { key: 'subtitle' }, 'Seguimiento de Garantias Contractuales'),
      React.createElement('div', { key: 'cards', style: cards }, [card('Casos Totales', String(cases.length)), card('Pendientes', String(cases.filter(c => c.status === 'PENDIENTE').length)), card('Vencidos', String(cases.filter(c => c.status === 'VENCIDO').length)), card('Friccion', '0.42')]),
      React.createElement('section', { key: 'upload', style: panel }, ['Ingesta controlada', React.createElement('div', { key: 'u', style: uploadBox }, 'Arrastra aqui XLS/CSV exportado')]),
      React.createElement('section', { key: 'filters', style: filterBar }, ['Proveedor: TODOS', 'Contrato: TODOS', 'Criticidad: TODAS', 'SLA: ACTIVO'].map(x => React.createElement('button', { key: x, style: filterButton }, x))),
      React.createElement('h2', { key: 'casesTitle', style: sectionTitle }, 'Casos'),
      renderTable(),
      React.createElement('section', { key: 'detail', style: twoCols }, [
        React.createElement('div', { key: 'caseDetail', style: panel }, [React.createElement('h3', { key: 'h' }, `Detalle ${selected.folio}`), React.createElement('p', { key: 'p' }, selected.bitacora), React.createElement('p', { key: 's' }, `Estado: ${selected.status} · Criticidad: ${selected.severity}`)]),
        React.createElement('div', { key: 'heat', style: panel }, [React.createElement('h3', { key: 'h' }, 'Heatmap SLA'), React.createElement('div', { key: 'grid', style: heatmap }, cases.map(c => React.createElement('div', { key: c.folio, style: heatCell }, `${c.folio}\n${c.sla}%`)))])
      ]),
      React.createElement('h2', { key: 'timelineTitle', style: sectionTitle }, 'Timeline'),
      React.createElement('div', { key: 'timeline', style: timelinePanel }, timeline.map(item => React.createElement('div', { key: item, style: timelineNode }, item))),
      React.createElement('h2', { key: 'alertsTitle', style: sectionTitle }, 'Alertas'),
      React.createElement('div', { key: 'alerts', style: panel }, cases.filter(c => c.severity === 'ROJO').map(c => React.createElement('div', { key: c.folio }, `${c.folio} requiere revision inmediata`)))
    ])
  ])
}

function renderTable() { return React.createElement('table', { style: table }, [React.createElement('thead', { key: 'head' }, React.createElement('tr', {}, ['Folio','Proveedor','Estado','Criticidad','SLA'].map(h => React.createElement('th', { key: h, style: th }, h)))), React.createElement('tbody', { key: 'body' }, cases.map(c => React.createElement('tr', { key: c.folio }, [React.createElement('td', { key: 'f', style: td }, c.folio), React.createElement('td', { key: 'p', style: td }, c.provider), React.createElement('td', { key: 's', style: td }, c.status), React.createElement('td', { key: 'v', style: td }, c.severity), React.createElement('td', { key: 'sla', style: td }, `${c.sla}%`)])))]) }
function card(title: string, value: string) { return React.createElement('div', { key: title, style: cardStyle }, [React.createElement('div', { key: 't' }, title), React.createElement('div', { key: 'v', style: valueStyle }, value)]) }

const shell: React.CSSProperties = { background: '#0a0a0a', color: '#f3f3f3', minHeight: '100vh', fontFamily: 'Arial', display: 'flex' }
const nav: React.CSSProperties = { width: '220px', borderRight: '1px solid #222', padding: '24px', background: '#080808' }
const navItem: React.CSSProperties = { padding: '10px 0', color: '#aaa' }
const main: React.CSSProperties = { flex: 1, padding: '24px' }
const cards: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginTop: '24px' }
const cardStyle: React.CSSProperties = { border: '1px solid #2b2b2b', padding: '16px', borderRadius: '8px', background: '#121212' }
const valueStyle: React.CSSProperties = { fontSize: '28px', marginTop: '12px' }
const sectionTitle: React.CSSProperties = { marginTop: '32px' }
const table: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', background: '#111' }
const th: React.CSSProperties = { textAlign: 'left', padding: '10px', borderBottom: '1px solid #333' }
const td: React.CSSProperties = { padding: '10px', borderBottom: '1px solid #222' }
const panel: React.CSSProperties = { border: '1px solid #333', padding: '16px', borderRadius: '8px', background: '#111', marginTop: '24px' }
const uploadBox: React.CSSProperties = { border: '1px dashed #444', padding: '24px', marginTop: '12px', color: '#888' }
const timelinePanel: React.CSSProperties = { display: 'flex', gap: '10px', flexWrap: 'wrap' }
const timelineNode: React.CSSProperties = { border: '1px solid #333', borderRadius: '999px', padding: '10px 14px', background: '#111' }
const filterBar: React.CSSProperties = { display: 'flex', gap: '10px', marginTop: '18px', flexWrap: 'wrap' }
const filterButton: React.CSSProperties = { background: '#101010', border: '1px solid #333', color: '#ddd', padding: '8px 12px', borderRadius: '999px' }
const twoCols: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }
const heatmap: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }
const heatCell: React.CSSProperties = { border: '1px solid #333', padding: '18px', whiteSpace: 'pre-line', background: '#161616' }
