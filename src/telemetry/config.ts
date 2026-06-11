const applicationInsightsConnectionString =
  import.meta.env.VITE_APPLICATIONINSIGHTS_CONNECTION_STRING?.trim() ?? ''

export const telemetryConfig = {
  applicationInsightsConnectionString,
}

export const isTelemetryEnabled =
  telemetryConfig.applicationInsightsConnectionString.length > 0
