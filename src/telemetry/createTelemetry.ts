import type { ReactNode, ReactElement } from 'react'
import { isTelemetryEnabled, telemetryConnectionString } from './config'
import { NoopProvider } from './providers/NoopProvider'
import type { TelemetryService } from './TelemetryService'

export interface TelemetryBundle {
  service: TelemetryService
  Wrapper?: (props: { children: ReactNode }) => ReactElement
}

export async function createTelemetry(): Promise<TelemetryBundle> {
  if (!isTelemetryEnabled) {
    return { service: new NoopProvider() }
  }

  const { AppInsightsProvider, createAppInsightsWrapper } = await import(
    './providers/AppInsightsProvider'
  )
  const provider = new AppInsightsProvider(telemetryConnectionString)
  const Wrapper = createAppInsightsWrapper(provider.reactPlugin)
  return { service: provider, Wrapper }
}
