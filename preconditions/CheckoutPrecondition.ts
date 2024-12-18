import { expect, Page } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { ProductData} from '../types';
import { ProductListingPage } from '../pages/ProductListingPage';

export class CheckoutPrecondition {
    constructor(private page: Page) { }

    async prepareCheckout(product: ProductData) {
        const productPage = new ProductPage(this.page);
        const cartPage = new CartPage(this.page);
        const productListingPage = new ProductListingPage(this.page);

        await productListingPage.goTo();
        await productListingPage.addToCart(product);
        await productPage.goToCart();
        await expect(cartPage.itemQuantity).toContainText('1');
        await cartPage.checkout();
    }
}