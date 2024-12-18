import { Page } from '@playwright/test';
import { ProductData } from '../types';
import { transformTextIntoId } from '../helpers/helpers';

export class ProductListingPage {
    constructor(private page: Page) { }

    async addToCart(product: ProductData) {
        const productIdPostfix = transformTextIntoId(product.name);
        await this.page.locator(`[data-test="add-to-cart-${productIdPostfix}"]`).click();
    }

    async goTo() {
        await this.page.goto('/inventory.html');
    }
}