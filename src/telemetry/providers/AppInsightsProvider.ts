import React from 'react'
import {
  ApplicationInsights,
  type ICustomProperties,
} from '@microsoft/applicationinsights-web'
import {
  ReactPlugin,
  AppInsightsContext,
  AppInsightsErrorBoundary,
} from '@microsoft/applicationinsights-react-js'
import type { TelemetryService } from '../TelemetryService'

export { ReactPlugin }

function ErrorFallback() {
  return React.createElement('div', null, 'Something went wrong.')
}

export function createAppInsightsWrapper(
  reactPlugin: ReactPlugin,
): (props: { children: React.ReactNode }) => React.ReactElement {
  return function AppInsightsWrapper({ children }) {
    return React.createElement(
      AppInsightsContext.Provider,
      { value: reactPlugin },
      React.createElement(
        AppInsightsErrorBoundary,
        { appInsights: reactPlugin, onError: ErrorFallback, children },
        children,
      ),
    )
  }
}

export class AppInsightsProvider implements TelemetryService {
  private readonly appInsights: ApplicationInsights
  readonly reactPlugin: ReactPlugin

  constructor(connectionString: string) {
    this.reactPlugin = new ReactPlugin()
    this.appInsights = new ApplicationInsights({
      config: {
        connectionString,
        extensions: [this.reactPlugin],
        enableAutoRouteTracking: true,
        disableCookiesUsage: false,
      },
    })
    this.appInsights.loadAppInsights()
  }

  trackEvent(name: string, properties?: Record<string, unknown>): void {
    this.appInsights.trackEvent(
      { name },
      properties as ICustomProperties | undefined,
    )
  }

  trackException(error: Error, properties?: Record<string, unknown>): void {
    this.appInsights.trackException(
      { exception: error },
      properties as ICustomProperties | undefined,
    )
  }

  trackPageView(name?: string, properties?: Record<string, unknown>): void {
    this.appInsights.trackPageView(
      { name, properties: properties as ICustomProperties | undefined },
    )
  }

  setAuthenticatedUser(userId: string): void {
    this.appInsights.setAuthenticatedUserContext(userId)
  }

  clearAuthenticatedUser(): void {
    this.appInsights.clearAuthenticatedUserContext()
  }
}
