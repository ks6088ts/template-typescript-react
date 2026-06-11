import { createContext, useContext } from 'react'
import type { TelemetryService } from '../TelemetryService'
import { NoopProvider } from '../providers/NoopProvider'

export const TelemetryContext = createContext<TelemetryService>(
  new NoopProvider(),
)

export function useTelemetry(): TelemetryService {
  return useContext(TelemetryContext)
}
