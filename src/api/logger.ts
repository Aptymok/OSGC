export function logRequest(method: string, path: string, status: number) {
  console.log(`[OSGC_API] ${new Date().toISOString()} ${method} ${path} ${status}`)
}
