# Zero Trust y Risk Management Review

## Estado

OSGC mantiene principio de menor privilegio y separacion de capas.

## Controles actuales

- No hay conexion directa a MAI o SIRMAI.
- No hay IA autonoma.
- No hay envio automatico de correos.
- No hay cierre automatico de casos.
- La ingesta ocurre por archivos controlados.
- El runtime conserva auditoria.
- Los eventos son append-only a nivel operacional.
- El usuario humano conserva supervision.

## Riesgos vigentes

- El store actual es memoria, no persistencia segura.
- Falta autenticacion real.
- Falta control de roles en UI.
- Falta validacion de tamano y tipo de archivo.
- Falta sanitizacion profunda de CSV.
- Falta bitacora inmutable real.
- Falta separacion de entorno desarrollo/productivo.

## Mitigaciones siguientes

- Agregar limite de archivo.
- Validar extension y tipo MIME.
- Bloquear columnas inesperadas como metadata.
- Agregar RBAC.
- Agregar auditoria persistente.
- Evitar secretos en repo.
- Mantener IA fuera del runtime productivo.
