const connectionString =
  import.meta.env.VITE_APPLICATIONINSIGHTS_CONNECTION_STRING ?? ''

export const telemetryConnectionString = connectionString
export const isTelemetryEnabled = connectionString.trim().length > 0
