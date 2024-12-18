import { CheckoutPage } from '../pages/CheckoutPage';
import { standardProduct } from '../testdata/products';
import { AddressData } from '../types';
import { CheckoutConfirmationPage } from '../pages/CheckoutConfirmationPage';
import { CheckoutPrecondition } from '../preconditions/CheckoutPrecondition';
import test, { expect } from '@playwright/test';
import { validAddress } from '../testdata/addresses';

test.beforeEach(async ({ page }) => {
  const prepareCheckout = new CheckoutPrecondition(page);
  await prepareCheckout.prepareCheckout(standardProduct);
});

//to reuse existing logged in session
test.use({ storageState: 'playwright/.auth/user.json' });

test('I can checkout a product', async ({ page }) => {
  const checkoutPage = new CheckoutPage(page);
  const checkoutConfirmationPage = new CheckoutConfirmationPage(page);

  await checkoutPage.fillCheckoutForm(validAddress);
  await checkoutPage.proceedToFinalCheckoutPage();
  await checkoutPage.finishOrder();
  await checkoutConfirmationPage.checkoutCompleted();
});

test('I need to provide firstname in the checkout', async ({ page }) => {
  const checkoutPage = new CheckoutPage(page);
  const address: AddressData = {
    firstName: '',
    lastName: 'Lastname',
    postcode: '3031',
  }
  await checkoutPage.fillCheckoutForm(address);
  await checkoutPage.proceedToFinalCheckoutPage();
  await checkoutPage.verifyErrorMessage('Error: First Name is required');
});

test('I need to provide lastname in the checkout', async ({ page }) => {
  const checkoutPage = new CheckoutPage(page);

  const address: AddressData = {
    firstName: 'Firstname',
    lastName: '',
    postcode: '3031',
  }

  await checkoutPage.fillCheckoutForm(address);
  await checkoutPage.proceedToFinalCheckoutPage();
  await checkoutPage.verifyErrorMessage('Error: Last Name is required');
});

test('I need to provide postcode in the checkout', async ({ page }) => {
  const checkoutPage = new CheckoutPage(page);

  const address: AddressData = {
    firstName: 'Firstname',
    lastName: 'Lastname',
    postcode: '',
  }
  await checkoutPage.fillCheckoutForm(address);
  await checkoutPage.proceedToFinalCheckoutPage();
  await checkoutPage.verifyErrorMessage('Error: Postal Code is required');
});

test('I can complete checkout after correcting my address data', async ({ page }) => {
  const checkoutPage = new CheckoutPage(page);
  const checkoutConfirmationPage = new CheckoutConfirmationPage(page);
  //not providing any data
  await checkoutPage.proceedToFinalCheckoutPage();

  await checkoutPage.fillCheckoutForm(validAddress);
  await checkoutPage.proceedToFinalCheckoutPage();
  await checkoutPage.finishOrder();
  await checkoutConfirmationPage.checkoutCompleted();
});

test('I can cancel my order from the final checkout page', async ({ page }) => {
  const checkoutPage = new CheckoutPage(page);

  await checkoutPage.fillCheckoutForm(validAddress);
  await checkoutPage.proceedToFinalCheckoutPage();
  await checkoutPage.cancelOrder();
  await page.waitForURL('/inventory.html');
});