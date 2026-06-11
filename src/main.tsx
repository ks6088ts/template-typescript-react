import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createTelemetry, TelemetryProvider } from './telemetry'

const { service, reactPlugin } = createTelemetry()
service.initialize()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TelemetryProvider service={service} reactPlugin={reactPlugin}>
      <App />
    </TelemetryProvider>
  </StrictMode>,
)
