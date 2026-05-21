CREATE TABLE osgc_cases (
  id INTEGER PRIMARY KEY,
  folio VARCHAR(100),
  provider VARCHAR(100),
  contract_code VARCHAR(100),
  status VARCHAR(100),
  severity VARCHAR(50),
  created_at TIMESTAMP
);

CREATE TABLE osgc_events (
  id INTEGER PRIMARY KEY,
  case_folio VARCHAR(100),
  event_type VARCHAR(100),
  payload TEXT,
  created_at TIMESTAMP
);

CREATE TABLE osgc_audit (
  id INTEGER PRIMARY KEY,
  actor VARCHAR(100),
  action VARCHAR(100),
  created_at TIMESTAMP
);
