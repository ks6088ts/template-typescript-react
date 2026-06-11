const connectionString =
  import.meta.env.VITE_APPLICATIONINSIGHTS_CONNECTION_STRING ?? '';

export const telemetryConfig = {
  connectionString,
  isEnabled: connectionString.trim().length > 0,
} as const;
