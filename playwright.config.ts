import { defineConfig } from '@playwright/test'

const baseURL = 'http://127.0.0.1:4173/template-typescript-react/'

// Run browsers headless by default. Set E2E_HEADED=true to watch the browser UI.
const headless = process.env.E2E_HEADED !== 'true'

export default defineConfig({
  testDir: './playwright',
  reporter: [['html', { open: 'never', outputFolder: 'playwright-report' }]],
  use: {
    baseURL,
    headless,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  webServer: {
    command:
      'pnpm build && pnpm exec vite preview --host 127.0.0.1 --port 4173',
    url: baseURL,
  },
})
