import type { TelemetryService } from './TelemetryService';
import type { ReactPlugin } from '@microsoft/applicationinsights-react-js';
import { telemetryConfig } from './config';
import { NoopProvider } from './providers/NoopProvider';

export interface TelemetryInstance {
  service: TelemetryService;
  reactPlugin?: ReactPlugin;
}

export async function createTelemetry(): Promise<TelemetryInstance> {
  if (!telemetryConfig.isEnabled) {
    return { service: new NoopProvider() };
  }

  const { AppInsightsProvider } = await import(
    './providers/AppInsightsProvider'
  );
  const provider = new AppInsightsProvider(telemetryConfig.connectionString);
  return {
    service: provider,
    reactPlugin: provider.reactPlugin,
  };
}
