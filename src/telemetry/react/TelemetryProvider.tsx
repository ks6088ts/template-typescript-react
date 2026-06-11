import { type ReactNode, lazy, Suspense } from 'react';
import type { ReactPlugin } from '@microsoft/applicationinsights-react-js';
import type { TelemetryService } from '../TelemetryService';
import { TelemetryContextProvider } from './hooks';

interface TelemetryProviderProps {
  service: TelemetryService;
  reactPlugin?: ReactPlugin;
  children: ReactNode;
}

const AppInsightsErrorBoundaryWrapper = lazy(() =>
  import('@microsoft/applicationinsights-react-js').then((mod) => ({
    default: mod.AppInsightsErrorBoundary,
  })),
);

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
      <Suspense fallback={content}>
        <AppInsightsErrorBoundaryWrapper
          onError={ErrorFallback}
          appInsights={reactPlugin}
        >
          {content}
        </AppInsightsErrorBoundaryWrapper>
      </Suspense>
    );
  }

  return content;
}
