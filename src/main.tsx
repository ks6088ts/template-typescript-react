import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createTelemetry } from './telemetry/createTelemetry.ts'
import { TelemetryProvider } from './telemetry/react/TelemetryProvider.tsx'

const bundle = await createTelemetry()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TelemetryProvider bundle={bundle}>
      <App />
    </TelemetryProvider>
  </StrictMode>,
)
