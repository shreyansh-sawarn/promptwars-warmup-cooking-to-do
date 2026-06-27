type Level = "INFO" | "WARN" | "ERROR";
export function log(level: Level, message: string, data?: Record<string, unknown>) {
  console.log(JSON.stringify({ severity: level, message, timestamp: new Date().toISOString(), ...data }));
}
export const logInfo  = (msg: string, d?: Record<string, unknown>) => log("INFO",  msg, d);
export const logWarn  = (msg: string, d?: Record<string, unknown>) => log("WARN",  msg, d);
export const logError = (msg: string, d?: Record<string, unknown>) => log("ERROR", msg, d);
