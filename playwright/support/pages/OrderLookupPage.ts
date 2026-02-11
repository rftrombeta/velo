import { Page } from '@playwright/test';

export class OrderLookupPage {
    constructor(private page: Page) { }

    async searchOrder(orderNumber: string) {
        await this.page.getByTestId('search-order-id').fill(orderNumber)
        await this.page.getByRole('button', { name: 'Buscar Pedido' }).click();
    }
}
