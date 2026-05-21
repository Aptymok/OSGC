import React from 'react'

export function IngestionPreview({ rows }: { rows: Array<Record<string, unknown>> }) {
  return (
    <div>
      <h3>Preview</h3>
      <table>
        <thead>
          <tr>
            <th>Folio</th>
            <th>Proveedor</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{String(row.folio ?? '')}</td>
              <td>{String(row.provider ?? '')}</td>
              <td>{String(row.status ?? '')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
