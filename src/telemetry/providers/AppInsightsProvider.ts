import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';
import type {
  TelemetryService,
  TelemetryEvent,
  TelemetryException,
  TelemetryPageView,
} from '../TelemetryService';

export class AppInsightsProvider implements TelemetryService {
  private appInsights: ApplicationInsights;
  readonly reactPlugin: ReactPlugin;

  constructor(connectionString: string) {
    this.reactPlugin = new ReactPlugin();
    this.appInsights = new ApplicationInsights({
      config: {
        connectionString,
        extensions: [this.reactPlugin],
        enableAutoRouteTracking: true,
      },
    });
  }

  initialize(): void {
    this.appInsights.loadAppInsights();
  }

  trackEvent(event: TelemetryEvent): void {
    this.appInsights.trackEvent({
      name: event.name,
      properties: event.properties,
    });
  }

  trackException(exception: TelemetryException): void {
    this.appInsights.trackException({
      exception: exception.exception,
      properties: exception.properties,
    });
  }

  trackPageView(pageView?: TelemetryPageView): void {
    this.appInsights.trackPageView({
      name: pageView?.name,
      uri: pageView?.uri,
    });
  }

  setAuthenticatedUser(userId: string): void {
    this.appInsights.setAuthenticatedUserContext(userId);
  }

  clearAuthenticatedUser(): void {
    this.appInsights.clearAuthenticatedUserContext();
  }
}
