import { parseCsv } from './import_csv.js'
import { saveCase } from './warranty_case_repository.js'

const sample = `folio_mai,proveedor,contrato,estado
INC001,HP,CA_10_CGI_2019,PENDIENTE`

const rows = parseCsv(sample)

rows.forEach(row => {
  saveCase(row)
})

console.log(rows)
