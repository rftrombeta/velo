import { test, expect } from '@playwright/test'

test('webApp deve estar online', async ({ page }) => {
  await page.goto('http://localhost:5174')

  await expect(page).toHaveTitle(/Velô by Papito/)
})
