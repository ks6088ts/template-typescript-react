import type { ReactNode } from 'react'
import { TelemetryContext } from './hooks'
import type { TelemetryBundle } from '../createTelemetry'

interface TelemetryProviderProps {
  bundle: TelemetryBundle
  children: ReactNode
}

export function TelemetryProvider({ bundle, children }: TelemetryProviderProps) {
  const { service, Wrapper } = bundle

  const inner = (
    <TelemetryContext.Provider value={service}>
      {children}
    </TelemetryContext.Provider>
  )

  if (!Wrapper) {
    return inner
  }

  return <Wrapper>{inner}</Wrapper>
}
