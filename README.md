[![test](https://github.com/ks6088ts/template-typescript-react/actions/workflows/test.yaml/badge.svg?branch=main)](https://github.com/ks6088ts/template-typescript-react/actions/workflows/test.yaml?query=branch%3Amain)
[![github-pages](https://github.com/ks6088ts/template-typescript-react/actions/workflows/github-pages.yaml/badge.svg?branch=main)](https://github.com/ks6088ts/template-typescript-react/actions/workflows/github-pages.yaml?query=branch%3Amain)

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Frontend Telemetry (Optional)

This template supports conditional frontend telemetry with Application Insights and OpenTelemetry (OTLP/HTTP).

1. Copy `.env.template` to `.env.local`
2. Configure one or both providers in `.env.local`
   - `VITE_APPLICATIONINSIGHTS_CONNECTION_STRING` for Application Insights
   - `VITE_OTEL_EXPORTER_OTLP_ENDPOINT` for OpenTelemetry Collector (example: `http://localhost:4318`)
   - `VITE_OTEL_SERVICE_NAME` (optional, default: `template-typescript-react`)
3. Run `pnpm dev` or `pnpm build`

If both provider settings are set, telemetry is sent to both providers. If all provider settings are empty, telemetry stays fully disabled (no-op).

### Local OpenTelemetry visualization (Collector + Grafana LGTM)

1. Start local observability stack:
   ```bash
   docker compose -f docker/compose.yaml up
   ```
2. Configure `.env.local`:
   ```bash
   VITE_OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318
   VITE_OTEL_SERVICE_NAME=template-typescript-react
   ```
3. Start the app (`pnpm dev`) and interact with the UI
4. Open Grafana at `http://localhost:3000`

The default collector config allows CORS from `http://localhost:5173` so browser OTLP/HTTP exports work in Vite dev mode.

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
