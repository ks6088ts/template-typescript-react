import { isTelemetryEnabled, telemetryConfig } from './config'
import type { TelemetryService } from './TelemetryService'
import { NoopTelemetryProvider } from './providers/NoopProvider'

export async function createTelemetry(): Promise<TelemetryService> {
  if (!isTelemetryEnabled) {
    return new NoopTelemetryProvider()
  }

  const { AppInsightsTelemetryProvider } = await import(
    './providers/AppInsightsProvider'
  )

  return new AppInsightsTelemetryProvider({
    connectionString: telemetryConfig.applicationInsightsConnectionString,
  })
}
