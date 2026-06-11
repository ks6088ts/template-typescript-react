import type { TelemetryService } from '../TelemetryService'

export class NoopProvider implements TelemetryService {
  trackEvent(): void {}
  trackException(): void {}
  trackPageView(): void {}
  setAuthenticatedUser(): void {}
  clearAuthenticatedUser(): void {}
}
