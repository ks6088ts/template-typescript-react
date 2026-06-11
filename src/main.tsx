import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import type { TelemetryService } from './telemetry/TelemetryService'
import { createTelemetry } from './telemetry/createTelemetry'
import { NoopTelemetryProvider } from './telemetry/providers/NoopProvider'
import { TelemetryProvider } from './telemetry/react/TelemetryProvider'

async function bootstrap() {
  let telemetry: TelemetryService
  try {
    telemetry = await createTelemetry()
    await telemetry.initialize()
  } catch {
    telemetry = new NoopTelemetryProvider()
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <TelemetryProvider telemetry={telemetry}>
        <App />
      </TelemetryProvider>
    </StrictMode>,
  )
}

void bootstrap()
