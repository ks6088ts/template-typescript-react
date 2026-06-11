import { createContext, useContext } from 'react'

import type { TelemetryService } from '../TelemetryService'
import { NoopTelemetryProvider } from '../providers/NoopProvider'

export const TelemetryContext = createContext<TelemetryService>(
  new NoopTelemetryProvider(),
)

export function useTelemetry(): TelemetryService {
  return useContext(TelemetryContext)
}
