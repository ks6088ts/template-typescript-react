export interface TelemetryService {
  trackEvent(name: string, properties?: Record<string, unknown>): void
  trackException(error: Error, properties?: Record<string, unknown>): void
  trackPageView(name?: string, properties?: Record<string, unknown>): void
  setAuthenticatedUser(userId: string): void
  clearAuthenticatedUser(): void
}
