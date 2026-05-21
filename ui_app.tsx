import React from 'react'

export function App() {
  return React.createElement(
    'div',
    {
      style: {
        background: '#0a0a0a',
        color: '#f3f3f3',
        minHeight: '100vh',
        padding: '24px',
        fontFamily: 'Arial'
      }
    },
    [
      React.createElement('h1', { key: 'title' }, 'OSGC · Observatorio Operacional'),
      React.createElement('p', { key: 'subtitle' }, 'Seguimiento de Garantias Contractuales'),
      React.createElement(
        'div',
        {
          key: 'cards',
          style: {
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '12px',
            marginTop: '24px'
          }
        },
        [
          card('Casos Totales', '128'),
          card('Pendientes', '34'),
          card('Vencidos', '12'),
          card('Friccion', '0.42')
        ]
      )
    ]
  )
}

function card(title: string, value: string) {
  return React.createElement(
    'div',
    {
      key: title,
      style: {
        border: '1px solid #2b2b2b',
        padding: '16px',
        borderRadius: '8px',
        background: '#121212'
      }
    },
    [
      React.createElement('div', { key: 't' }, title),
      React.createElement(
        'div',
        {
          key: 'v',
          style: {
            fontSize: '28px',
            marginTop: '12px'
          }
        },
        value
      )
    ]
  )
}
