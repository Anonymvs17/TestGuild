import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly inventoryItemPrice: Locator;
  readonly itemQuantity: Locator;
  readonly inventoryItemName: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryItemPrice = page.locator('[data-test="inventory-item-price"]');
    this.itemQuantity = page.locator('[data-test="item-quantity"]');
    this.inventoryItemName = page.locator('[data-test="inventory-item-name"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}