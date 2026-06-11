export interface TelemetryEvent {
  name: string;
  properties?: Record<string, string>;
}

export interface TelemetryException {
  exception: Error;
  properties?: Record<string, string>;
}

export interface TelemetryPageView {
  name?: string;
  uri?: string;
}

export interface TelemetryService {
  initialize(): void;
  trackEvent(event: TelemetryEvent): void;
  trackException(exception: TelemetryException): void;
  trackPageView(pageView?: TelemetryPageView): void;
  setAuthenticatedUser(userId: string): void;
  clearAuthenticatedUser(): void;
}
