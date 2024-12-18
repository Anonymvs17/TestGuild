import { Page } from '@playwright/test';
import { ProductData } from '../types';
import { transformTextIntoId } from '../helpers/helpers';

export class ProductPage {
    constructor(private page: Page) { }

    async goToCart() {
        await this.page.locator('[data-test="shopping-cart-link"]').click();
    }
}