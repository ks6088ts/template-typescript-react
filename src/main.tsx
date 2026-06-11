import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createTelemetry, TelemetryProvider } from './telemetry'

async function bootstrap() {
  const { service, reactPlugin } = await createTelemetry()
  service.initialize()

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <TelemetryProvider service={service} reactPlugin={reactPlugin}>
        <App />
      </TelemetryProvider>
    </StrictMode>,
  )
}

bootstrap()
