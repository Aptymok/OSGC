export const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'no-referrer',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy': "default-src 'self'; connect-src 'self' http://localhost:4010; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'"
}
