import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PaymentPage } from '../pages/payment.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Pulpit tests', () => {
  let paymentPage: PaymentPage;
  // Arrange
  let loginName = loginData.loginName;
  let password = loginData.password;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');

    const loginPage = new LoginPage(page);
    await loginPage.login(loginName, password);

    //await page.getByRole('link', { name: 'płatności' }).click();
    const puliptPage = new PulpitPage(page);
    await puliptPage.sideMenu.paymentButton.click();
    paymentPage = new PaymentPage(page);
  });

  test('Simple payment', async ({ page }) => {
    // Arange
    let transferReceiver = 'Jan Kowalski';
    let amount = '333';
    let accountNumber = '46 1324 8941 3614 5641 3564 65321';
    let expectedMessage = `Przelew wykonany! ${amount},00PLN dla ${transferReceiver}`;

    //Act
    await paymentPage.makeTransfer(transferReceiver, accountNumber, amount);

    // Assert
    await expect(paymentPage.message).toHaveText(expectedMessage);
  });
});
