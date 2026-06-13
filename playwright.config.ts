import { defineConfig } from '@playwright/test'

const baseURL = 'http://127.0.0.1:4173/template-typescript-react/'

export default defineConfig({
  testDir: './playwright',
  reporter: [['html', { open: 'never', outputFolder: 'playwright-report' }]],
  use: {
    baseURL,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'pnpm build && pnpm exec vite preview --host 127.0.0.1 --port 4173',
    url: baseURL,
  },
})
