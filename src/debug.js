export function logRequest(method, params) {
  return console.log(`%c[DEBUG] req: ${method}`, "color:#66f", params)
}
export function logResponse(method, fields) {
  return console.log(`%c[DEBUG] res: ${method}`, "color:#66f", fields)
}
export function logError(method, err) {
  return console.log(`%c[DEBUG] err: ${method}`, "color:#f66", err)
}
