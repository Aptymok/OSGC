export function maskError(error: unknown) {
  console.error(error)

  return {
    ok: false,
    error: 'INTERNAL_SERVER_ERROR'
  }
}
