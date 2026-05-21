# SQLite Integration Plan

## Objetivo

Persistencia local segura para:
- casos
- eventos
- auditoria
- ingestion history
- SLA runtime

## Requisitos

- sqlite local
- adapter repository
- migraciones
- append-only audit
- backup exportable

## Tablas

- osgc_cases
- osgc_events
- osgc_audit
- osgc_ingestion

## Restricciones

- no guardar secretos
- no guardar credenciales
- no ejecutar SQL dinamico inseguro
