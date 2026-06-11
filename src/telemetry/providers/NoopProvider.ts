import type { TelemetryService } from '../TelemetryService';

export class NoopProvider implements TelemetryService {
  initialize(): void {
    // no-op
  }
  trackEvent(): void {
    // no-op
  }
  trackException(): void {
    // no-op
  }
  trackPageView(): void {
    // no-op
  }
  setAuthenticatedUser(): void {
    // no-op
  }
  clearAuthenticatedUser(): void {
    // no-op
  }
}
