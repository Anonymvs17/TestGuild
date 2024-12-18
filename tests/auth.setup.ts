import { test as setup, expect } from '@playwright/test';
import path from 'path';
import { LoginPage } from '../pages/LoginPage';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    // Wait until the page receives the cookies.
    //
    // Sometimes login flow sets cookies in the process of several redirects.
    // Wait for the final URL to ensure that the cookies are actually set.
    await page.waitForURL('/inventory.html');
    // End of authentication steps.

    await page.context().storageState({ path: authFile });
});