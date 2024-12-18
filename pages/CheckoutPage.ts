import { expect, Page, type Locator } from '@playwright/test';
import { AddressData } from '../types';

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly errorMsg: Locator;
  readonly cancelOrderButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel = page.locator('[data-test="tax-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
    this.errorMsg = page.locator('[data-test="error"]');
    this.cancelOrderButton = page.locator('[data-test="cancel"]');
  }

  private async fillFirstName(firstName: string) {
    await this.firstNameInput.fill(firstName);
  }

  private async fillLastName(lastName: string) {
    await this.lastNameInput.fill(lastName);
  }

  private async fillPostalCode(postalCode: string) {
    await this.postalCodeInput.fill(postalCode);
  }

  private async clickContinueButton() {
    await this.continueButton.click();
  }

  async proceedToFinalCheckoutPage(){
    await this.clickContinueButton();
  }
  

  async fillCheckoutForm(address: AddressData) {
    await this.fillFirstName(address.firstName);
    await this.fillLastName(address.lastName);
    await this.fillPostalCode(address.postcode);
  }

  async finishOrder() {
    await this.finishButton.click();
  }

  async getSubtotalLabel() {
    return this.subtotalLabel;
  }

  async getTaxLabel() {
    return this.taxLabel;
  }

  async getTotalLabel() {
    return this.totalLabel;
  }

  async verifyErrorMessage(expectedText: string) {
    await expect(this.errorMsg).toHaveText(expectedText);
  }

  async cancelOrder() {
    await this.cancelOrderButton.click();
  }
}