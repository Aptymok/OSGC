import React from 'react'

const cases = [
  { folio: 'INC001', provider: 'HP', status: 'PENDIENTE', severity: 'AMARILLO' },
  { folio: 'INC002', provider: 'LENOVO', status: 'VENCIDO', severity: 'ROJO' },
  { folio: 'INC003', provider: 'DELL', status: 'CERRADO', severity: 'VERDE' }
]

export function App() {
  return React.createElement(
    'div',
    { style: shell },
    [
      React.createElement('h1', { key: 'title' }, 'OSGC · Observatorio Operacional'),
      React.createElement('p', { key: 'subtitle' }, 'Seguimiento de Garantias Contractuales'),
      React.createElement('div', { key: 'cards', style: cards }, [
        card('Casos Totales', String(cases.length)),
        card('Pendientes', String(cases.filter(c => c.status === 'PENDIENTE').length)),
        card('Vencidos', String(cases.filter(c => c.status === 'VENCIDO').length)),
        card('Friccion', '0.42')
      ]),
      React.createElement('h2', { key: 'casesTitle', style: sectionTitle }, 'Casos'),
      React.createElement('table', { key: 'table', style: table }, [
        React.createElement('thead', { key: 'head' }, React.createElement('tr', {}, ['Folio','Proveedor','Estado','Criticidad'].map(h => React.createElement('th', { key: h, style: th }, h)))),
        React.createElement('tbody', { key: 'body' }, cases.map(c => React.createElement('tr', { key: c.folio }, [
          React.createElement('td', { key: 'f', style: td }, c.folio),
          React.createElement('td', { key: 'p', style: td }, c.provider),
          React.createElement('td', { key: 's', style: td }, c.status),
          React.createElement('td', { key: 'v', style: td }, c.severity)
        ])))
      ]),
      React.createElement('h2', { key: 'alertsTitle', style: sectionTitle }, 'Alertas'),
      React.createElement('div', { key: 'alerts', style: panel }, cases.filter(c => c.severity === 'ROJO').map(c => React.createElement('div', { key: c.folio }, `${c.folio} requiere revision inmediata`)))
    ]
  )
}

function card(title: string, value: string) {
  return React.createElement('div', { key: title, style: cardStyle }, [
    React.createElement('div', { key: 't' }, title),
    React.createElement('div', { key: 'v', style: valueStyle }, value)
  ])
}

const shell: React.CSSProperties = { background: '#0a0a0a', color: '#f3f3f3', minHeight: '100vh', padding: '24px', fontFamily: 'Arial' }
const cards: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginTop: '24px' }
const cardStyle: React.CSSProperties = { border: '1px solid #2b2b2b', padding: '16px', borderRadius: '8px', background: '#121212' }
const valueStyle: React.CSSProperties = { fontSize: '28px', marginTop: '12px' }
const sectionTitle: React.CSSProperties = { marginTop: '32px' }
const table: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', background: '#111' }
const th: React.CSSProperties = { textAlign: 'left', padding: '10px', borderBottom: '1px solid #333' }
const td: React.CSSProperties = { padding: '10px', borderBottom: '1px solid #222' }
const panel: React.CSSProperties = { border: '1px solid #333', padding: '16px', borderRadius: '8px', background: '#111' }
