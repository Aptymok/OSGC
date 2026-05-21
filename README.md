# OSGC · Observatorio de Seguimiento de Garantías Contractuales

OSGC estructura la ingesta, normalización, seguimiento SLA y trazabilidad de reportes de garantía derivados de Mesa de Ayuda Institucional, Power BI y archivos XLS/CSV.

## Fase actual

Fase 1 · Ingesta operacional controlada.

Esta fase no incluye IA, envío automático de correos, conexión directa a MAI/SIRMAI ni scraping. El objetivo inicial es crear columna vertebral operativa:

- casos
- eventos
- contratos
- reglas SLA
- criticidad
- trazabilidad

## Principios

- Todo cambio relevante se registra como evento.
- Los datos faltantes generan excepción documental.
- El cálculo SLA es determinista.
- La IA, cuando exista, será asistiva y bajo revisión humana.
- La fuente institucional no se modifica desde esta capa.

## Estructura

```txt
src/domain       Modelos base
src/ingestion    Validación y normalización
src/sla          Motor SLA determinista
docs             Documentación operativa
database         Esquema SQL inicial
samples          Archivos de ejemplo
```

## Inicio rápido

```bash
npm install
npm run check
```
