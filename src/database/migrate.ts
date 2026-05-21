import { writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { SCHEMA_SQL } from './schema.js'

if (!existsSync('./runtime')) {
  mkdirSync('./runtime')
}

writeFileSync('./runtime/osgc.schema.sql', SCHEMA_SQL)

console.log('OSGC migration artifact generated')
