[![test](https://github.com/ks6088ts/template-typescript-react/actions/workflows/test.yaml/badge.svg?branch=main)](https://github.com/ks6088ts/template-typescript-react/actions/workflows/test.yaml?query=branch%3Amain)
[![github-pages](https://github.com/ks6088ts/template-typescript-react/actions/workflows/github-pages.yaml/badge.svg?branch=main)](https://github.com/ks6088ts/template-typescript-react/actions/workflows/github-pages.yaml?query=branch%3Amain)

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## Application Insights telemetry

This template includes optional [Application Insights](https://learn.microsoft.com/azure/azure-monitor/app/javascript-sdk) RUM telemetry. When enabled it tracks page views, route transitions, unhandled exceptions, and custom events.

### Enabling telemetry

1. Copy `.env.template` to `.env.local`:

   ```sh
   cp .env.template .env.local
   ```

2. Set `VITE_APPLICATIONINSIGHTS_CONNECTION_STRING` to your Azure Application Insights connection string:

   ```dotenv
   VITE_APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx;IngestionEndpoint=https://...;
   ```

3. Restart the dev server (`pnpm dev`) or rebuild (`pnpm build`).

When the variable is **empty or not set**, the telemetry layer is completely disabled — no SDK code is loaded and no network requests are sent.

### Architecture

The telemetry layer follows a port & adapter pattern so that the UI never imports `@microsoft/applicationinsights-web` directly:

```
src/telemetry/
  TelemetryService.ts          # Port (interface)
  config.ts                    # Reads env var; exports isTelemetryEnabled
  createTelemetry.ts           # Factory — dynamically imports AppInsights only when enabled
  providers/
    AppInsightsProvider.ts     # Adapter — wraps @microsoft/applicationinsights-web
    NoopProvider.ts            # No-op implementation used when telemetry is disabled
  react/
    TelemetryProvider.tsx      # React Context Provider + AppInsightsErrorBoundary wrapper
    hooks.ts                   # useTelemetry() hook
```

### Tracking custom events

```tsx
import { useTelemetry } from './telemetry/react/hooks'

function MyComponent() {
  const telemetry = useTelemetry()

  return (
    <button onClick={() => telemetry.trackEvent('my_event', { key: 'value' })}>
      Click me
    </button>
  )
}
```

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
