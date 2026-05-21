# QA Total Audit Report

## Estado general

OSGC esta en estado PRE-BETA OPERACIONAL. La arquitectura modular existe, pero aun hay residuos legacy y rutas dobles que deben corregirse antes de release candidate.

## Hallazgos criticos

### 1. Script API apunta a archivo legacy

package.json ejecuta:

npm run api -> tsx server_api.ts

Pero la API operacional real vive en:

src/api/server.ts

Impacto: al correr npm run api se levanta una API antigua con mocks y no el runtime real.

Accion requerida:

Cambiar script api a:

"api": "tsx src/api/server.ts"

### 2. Hay API legacy en raiz

Archivo detectado:

server_api.ts

Contiene casos mock y endpoints basicos. Debe eliminarse o neutralizarse cuando package.json apunte a src/api/server.ts.

### 3. Existe BD declarada pero no BD ejecutando

Existe schema SQL en src/database/schema.ts con tablas:

- osgc_cases
- osgc_events
- osgc_audit
- osgc_ingestion_history
- osgc_snapshots

Pero no existe driver SQLite conectado ni repositories DB reales.

Estado: BD modelada, no operativa.

### 4. Doble ruta de estado

El pipeline de ingestion escribe en src/store/memory.ts.
Luego runtimeUploader hidrata src/runtime/osgcStore.ts.

Impacto: existe doble store y potencial divergencia de estado.

Accion requerida:

Unificar ingestion pipeline para escribir directamente en runtime store o repository DB.

### 5. Campos parcialmente mapeados

Schema DB usa:

sla_progress

Runtime usa:

slaProgress

Normalizer actualmente no conserva slaProgress desde CSV, por lo que pipeline calcula Number(item.slaProgress ?? 0) pero normalizeRows no lo retorna.

Impacto: SLA puede quedar siempre en 0 despues de normalizacion.

Accion requerida:

Actualizar normalizeRows para incluir slaProgress.

### 6. Seguridad parcial no conectada completa

Existen modulos:

- secure headers
- rate limiting
- audit hashing
- error masking
- RBAC
- upload policy
- sanitize

Pero no todos estan conectados al server.ts.

Impacto: controles existen, pero enforcement parcial.

### 7. Sanitizacion no aplicada en pipeline

sanitizeRow existe, pero parse/normalize no lo invocan.

Impacto: CSV puede entrar sin sanitizacion real.

### 8. Upload solo permite CSV

uploadPolicy permite solo csv. Esto es correcto para seguridad, pero contradice Fase 11 si se quiere XLSX operativo.

Accion requerida:

Agregar xlsx a allowed extensions solo cuando parser XLSX este instalado y probado.

### 9. XLSX depende de paquete no instalado

Se requiere instalar:

npm install xlsx

Sin eso, export/import XLSX fallara.

### 10. Auth existe pero no esta totalmente conectada a endpoints

Hay sesiones, permisos y middleware, pero server.ts no protege endpoints sensibles todavia.

Accion requerida:

Proteger export, audit, upload y write operations con requirePermission.

## Huerfanos probables

- server_api.ts
- ui_app.tsx neutralizado
- archivos legacy raiz tipo *_model.ts, *_engine.ts, *_repository.ts si aun existen

No se pudo listar arbol completo por limitacion del conector, pero las rutas legacy confirmadas deben limpiarse.

## Mapeo de campos actual

CSV esperado:

- folio
- provider
- contract
- status
- slaProgress

Runtime case:

- id
- folio
- provider
- contract
- status
- severity
- slaProgress

DB schema:

- id
- folio
- provider
- contract
- status
- severity
- sla_progress
- payload
- created_at
- updated_at

Riesgo:

slaProgress no esta bien preservado por normalizeRows.

## Seguridad actual

Fortalezas:

- upload policy
- file size limit
- CSV only
- CORS restringido a localhost
- X-Content-Type-Options
- RBAC modelado
- sesiones expiran
- audit runtime
- error masking disponible

Debilidades:

- rateLimit no conectado
- secure headers no conectados en sendJson
- RBAC no aplicado en endpoints
- audit hashing no aplicado
- sanitizacion no aplicada
- no hay CSRF real
- no hay secrets/env real por ambiente
- no hay SQLite real
- no hay logs append-only persistentes

## Prioridad inmediata

1. Corregir package.json para usar src/api/server.ts.
2. Neutralizar o borrar server_api.ts.
3. Agregar slaProgress a normalizeRows.
4. Aplicar sanitizeRow en pipeline.
5. Conectar secure headers en sendJson.
6. Conectar rateLimit en server.ts.
7. Proteger /api/audit y /api/export con RBAC.
8. Instalar xlsx si se requiere Fase 11 real.
9. Conectar SQLite real.
10. Ejecutar npm run check y npm run build.

## Resultado

OSGC tiene arquitectura institucional emergente, pero aun no debe declararse release candidate. Debe pasar primero por una fase de correccion de mapeo, limpieza legacy y enforcement de seguridad.
