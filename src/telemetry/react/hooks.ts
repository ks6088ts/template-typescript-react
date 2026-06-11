import { createContext, useContext } from 'react';
import type { TelemetryService } from '../TelemetryService';
import { NoopProvider } from '../providers/NoopProvider';

const TelemetryContext = createContext<TelemetryService>(new NoopProvider());

export const TelemetryContextProvider = TelemetryContext.Provider;

export function useTelemetry(): TelemetryService {
  return useContext(TelemetryContext);
}
