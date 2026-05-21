export const SQLITE_ADAPTER_PLAN = {
  driver: 'sqlite',
  runtime: 'better-sqlite3 | sqlite3',
  goals: [
    'persist runtime cases',
    'persist audit',
    'persist events',
    'persist ingestion history'
  ],
  constraints: [
    'append only audit',
    'no dynamic sql',
    'parameterized queries only',
    'local encrypted backups'
  ]
}
