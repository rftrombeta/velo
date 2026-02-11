import { test, expect } from '@playwright/test'
import { generateOrder } from '../support/helpers'
import { OrderLookupPage } from '../support/pages/OrderLookupPage'

test.describe('Consulta de Pedido', () => {
  test.beforeEach(async ({ page }) => {
    // Arrange
    await page.goto('http://localhost:5173/')
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')
    await page.getByRole('link', { name: 'Consultar Pedido' }).click()
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
  })

  test('deve consultar um pedido aprovado', async ({ page }) => {

    // Test Data
    const order = {
      number: 'VLO-VWPGNC',
      status: 'APROVADO',
      color: 'Glacier Blue',
      wheels: 'aero Wheels',
      customer: {
        name: 'Rodrigo Trombeta',
        email: 'rftrombeta@gmail.dev'
      },
      payment: 'À Vista'
    }

    // Act
    const orderLookupPage = new OrderLookupPage(page);
    await orderLookupPage.searchOrder(order.number);

    // Assert
    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - status:
        - img
        - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);

      const statusBadge = page.getByRole('status').filter({hasText: order.status})
      await expect(statusBadge).toContainClass('bg-green-100')
      await expect(statusBadge).toContainClass('text-green-700')

      const statusIcon = statusBadge.locator('svg')
      await expect(statusIcon).toContainClass('lucide-circle-check-big')

  })

  test('deve consultar um pedido reprovado', async ({ page }) => {

    // Test Data
    const order = {
      number: 'VLO-BRFMYX',
      status: 'REPROVADO',
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'Manuela Trombeta',
        email: 'manuela@gmail.dev'
      },
      payment: 'À Vista'
    }

    // Act
    const orderLookupPage = new OrderLookupPage(page);
    await orderLookupPage.searchOrder(order.number);

    // Assert
    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - status:
        - img
        - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);

      const statusBadge = page.getByRole('status').filter({hasText: order.status})
      await expect(statusBadge).toContainClass('bg-red-100')
      await expect(statusBadge).toContainClass('text-red-700')

      const statusIcon = statusBadge.locator('svg')
      await expect(statusIcon).toContainClass('lucide-circle-x')

  })

  test('deve consultar um pedido em analise', async ({ page }) => {

    // Test Data
    const order = {
      number: 'VLO-WJ5GLO',
      status: 'EM ANALISE',
      color: 'Lunar White',
      wheels: 'sport Wheels',
      customer: {
        name: 'Manoel Almeida',
        email: 'manoelalmeida@gmail.dev'
      },
      payment: 'À Vista'
    }

    // Act
    const orderLookupPage = new OrderLookupPage(page);
    await orderLookupPage.searchOrder(order.number);

    // Assert
    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - status:
        - img
        - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);

      const statusBadge = page.getByRole('status').filter({hasText: order.status})
      await expect(statusBadge).toContainClass('bg-amber-100')
      await expect(statusBadge).toContainClass('text-amber-700')

      const statusIcon = statusBadge.locator('svg')
      await expect(statusIcon).toContainClass('lucide-clock')

  })

  test('deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {

    // Test Data
    const order = generateOrder()

    // Act
    const orderLookupPage = new OrderLookupPage(page);
    await orderLookupPage.searchOrder(order.number);

    // Assert
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - img
      - heading "Pedido não encontrado" [level=3]
      - paragraph: Verifique o número do pedido e tente novamente
      `)
  })

})
