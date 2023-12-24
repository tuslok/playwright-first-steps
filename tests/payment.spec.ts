import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('Pulpit tests', () => {
  // Arrange
  let loginName = loginData.loginName;
  let password = loginData.password;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');

    const loginPage = new LoginPage(page);
    await loginPage.loginName.fill(loginName);
    await loginPage.password.fill(password);
    await loginPage.loginButton.click();

    //    await page.getByTestId('login-input').fill(loginName);
    //    await page.getByTestId('password-input').fill(password);
    //    await page.getByTestId('login-button').click();
    await page.getByRole('link', { name: 'płatności' }).click();
  });

  test('Simple payment', async ({ page }) => {
    // Arange
    let transferReceiver = 'Jan Kowalski';
    let amount = '333';
    let accountNumber = '46 1324 8941 3614 5641 3564 65321';
    let expectedMessage = `Przelew wykonany! ${amount},00PLN dla ${transferReceiver}`;
    //Act

    await page.getByTestId('transfer_receiver').fill(transferReceiver);
    await page.getByTestId('form_account_to').fill(accountNumber);
    await page.getByTestId('form_amount').fill(amount);
    await page.getByRole('button', { name: 'wykonaj przelew' }).click();
    await page.getByTestId('close-button').click();
    // Assert

    await expect(page.locator('#show_messages')).toHaveText(expectedMessage);
  });
});
