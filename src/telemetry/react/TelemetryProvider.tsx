import { type ReactNode } from 'react';
import { AppInsightsErrorBoundary } from '@microsoft/applicationinsights-react-js';
import type { ReactPlugin } from '@microsoft/applicationinsights-react-js';
import type { TelemetryService } from '../TelemetryService';
import { TelemetryContextProvider } from './hooks';

interface TelemetryProviderProps {
  service: TelemetryService;
  reactPlugin?: ReactPlugin;
  children: ReactNode;
}

function ErrorFallback() {
  return <h1>An error occurred. Please refresh the page.</h1>;
}

export function TelemetryProvider({
  service,
  reactPlugin,
  children,
}: TelemetryProviderProps) {
  const content = (
    <TelemetryContextProvider value={service}>
      {children}
    </TelemetryContextProvider>
  );

  if (reactPlugin) {
    return (
      <AppInsightsErrorBoundary
        onError={ErrorFallback}
        appInsights={reactPlugin}
      >
        {content}
      </AppInsightsErrorBoundary>
    );
  }

  return content;
}
