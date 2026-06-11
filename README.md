[![test](https://github.com/ks6088ts/template-typescript-react/actions/workflows/test.yaml/badge.svg?branch=main)](https://github.com/ks6088ts/template-typescript-react/actions/workflows/test.yaml?query=branch%3Amain)
[![github-pages](https://github.com/ks6088ts/template-typescript-react/actions/workflows/github-pages.yaml/badge.svg?branch=main)](https://github.com/ks6088ts/template-typescript-react/actions/workflows/github-pages.yaml?query=branch%3Amain)

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## Application Insights (Telemetry)

This template includes optional Application Insights integration for real user monitoring (RUM). Telemetry is conditionally enabled based on an environment variable.

### Enabling Telemetry

1. Copy `.env.template` to `.env`:
   ```bash
   cp .env.template .env
   ```
2. Set your Application Insights connection string:
   ```dotenv
   VITE_APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx;IngestionEndpoint=https://...;
   ```
3. Start or build the application. Page views, route changes, unhandled exceptions, and custom events will be sent to Azure Monitor.

### Disabling Telemetry

Leave `VITE_APPLICATIONINSIGHTS_CONNECTION_STRING` empty or unset. When disabled, no telemetry code runs and no network requests are made to Azure.

### Architecture

The telemetry layer uses a clean architecture (port & adapter) pattern:

- **Port**: `TelemetryService` interface (`src/telemetry/TelemetryService.ts`)
- **Adapters**: `AppInsightsProvider` (active) / `NoopProvider` (disabled)
- **Factory**: `createTelemetry()` reads the env variable and instantiates the appropriate provider
- **React integration**: `TelemetryProvider` context, `useTelemetry()` hook, and `AppInsightsErrorBoundary`

UI components depend only on the `TelemetryService` abstraction, never on `@microsoft/applicationinsights-web` directly.

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
