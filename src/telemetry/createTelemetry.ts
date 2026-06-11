import type { TelemetryService } from './TelemetryService';
import { telemetryConfig } from './config';
import { NoopProvider } from './providers/NoopProvider';
import { AppInsightsProvider } from './providers/AppInsightsProvider';

export interface TelemetryInstance {
  service: TelemetryService;
  reactPlugin?: import('@microsoft/applicationinsights-react-js').ReactPlugin;
}

export function createTelemetry(): TelemetryInstance {
  if (!telemetryConfig.isEnabled) {
    return { service: new NoopProvider() };
  }

  const provider = new AppInsightsProvider(telemetryConfig.connectionString);
  return {
    service: provider,
    reactPlugin: provider.reactPlugin,
  };
}
