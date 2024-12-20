import test from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const user = 'standard_user';
const password = 'secret_sauce';

test('A user can login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(user, password);
    await page.waitForURL('/inventory.html');
});