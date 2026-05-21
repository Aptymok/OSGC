export const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS osgc_cases (
  id TEXT PRIMARY KEY,
  folio TEXT NOT NULL UNIQUE,
  provider TEXT NOT NULL,
  contract TEXT NOT NULL,
  status TEXT NOT NULL,
  severity TEXT NOT NULL,
  sla_progress INTEGER NOT NULL DEFAULT 0,
  payload TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS osgc_events (
  id TEXT PRIMARY KEY,
  case_folio TEXT NOT NULL,
  event_type TEXT NOT NULL,
  payload TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS osgc_audit (
  id TEXT PRIMARY KEY,
  actor TEXT NOT NULL,
  action TEXT NOT NULL,
  payload TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS osgc_ingestion_history (
  id TEXT PRIMARY KEY,
  file_name TEXT NOT NULL,
  rows_count INTEGER NOT NULL,
  status TEXT NOT NULL,
  payload TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS osgc_snapshots (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  payload TEXT NOT NULL,
  created_at TEXT NOT NULL
);
`
