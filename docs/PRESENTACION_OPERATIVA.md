# OSGC · Presentacion operativa

## Que presentar

OSGC es un observatorio operacional para seguimiento de garantias contractuales.

No se presenta como IA. Se presenta como una plataforma de trazabilidad, SLA, riesgo y supervision humana.

## Problema actual

- Seguimiento manual de garantias.
- Dependencia de reportes exportados.
- Bitacoras no normalizadas.
- Riesgo de vencimiento SLA no visible.
- Poca trazabilidad operacional.
- Dificultad para identificar friccion por proveedor, contrato o tipo de falla.

## Propuesta

Implementar una capa operacional que ingesta XLS/CSV exportado desde Power BI o MAI, normaliza casos, calcula SLA, genera eventos, muestra alertas y conserva auditoria.

## Valor institucional

- Reduce seguimiento manual.
- Mejora control SLA.
- Prepara auditorias.
- Ordena evidencia contractual.
- Permite supervision humana por diseno.
- Prepara gobernanza futura de IA sin introducir IA de forma prematura.

## Estado del prototipo

- Frontend React/Vite.
- Pipeline CSV.
- Validacion y normalizacion.
- Runtime store.
- Eventos.
- Auditoria.
- Historial de ingesta.
- SLA watchdog.
- Dashboard operacional.

## Mensaje clave

El sistema no reemplaza Mesa de Ayuda. Observa, estructura y controla el seguimiento contractual de garantias.
