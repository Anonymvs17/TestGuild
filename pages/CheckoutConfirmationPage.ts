import { Page, type Locator } from '@playwright/test';

export class CheckoutConfirmationPage {
  readonly page: Page;
  readonly checkoutCompleteLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutCompleteLocator = page.locator('[data-test="checkout-complete"]');
  }

  async checkoutCompleted() {
    return this.checkoutCompleteLocator.isVisible();
  }
}