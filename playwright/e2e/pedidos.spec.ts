import { test, expect } from '@playwright/test'

// AAA - Arrange, Act, Assert

test('deve consultar um pedido aprovado', async ({ page }) => {
  // Arrange
  await page.goto('http://localhost:5174/')  
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')
  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

  // Act
  await page.getByTestId('search-order-id').fill('VLO-VWPGNC')
  await page.getByRole('button', { name: 'Buscar Pedido' }).click();

  // Assert
  // await expect(page.getByTestId('order-result-id')).toBeVisible({timeout: 30000})
  // await expect(page.getByTestId('order-result-id')).toContainText('VLO-VWPGNC')
  await expect(page.getByText('VLO-VWPGNC')).toBeVisible({timeout: 10000})
  
  // await expect(page.getByTestId('order-result-status')).toBeVisible({timeout: 30000})
  // await expect(page.getByTestId('order-result-status')).toContainText('APROVADO')
  await expect(page.getByText('APROVADO')).toBeVisible()
})