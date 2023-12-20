import { test, expect } from '@playwright/test';

test.describe('Pulpit tests', () => {
  // Arrange
  const loginName = 'testerek';
  const password = 'pa55word';

  test.beforeEach(async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('login-input').fill(loginName);
    await page.getByTestId('password-input').fill(password);
    await page.getByTestId('login-button').click();
  });

  test('Quick payment with correct data', async ({ page }) => {
    // Arange
    let receiverNumber = '2';
    let amountTransfer = '120,00';
    let titleTransfer = 'Pizza'; 

    //Act
    await page
      .locator('#widget_1_transfer_receiver')
      .selectOption(receiverNumber);
    await page.locator('#widget_1_transfer_amount').fill(amountTransfer);
    await page.locator('#widget_1_transfer_title').fill(titleTransfer);

    await page.getByRole('button', { name: 'wykonaj' }).click();

    // Assert
    await expect(page.locator('#show_messages')).toHaveText(
      'Przelew wykonany! Chuck Demobankowy - 120,00PLN - Pizza',
    );
  });

  test('Sucessful mobile top-up', async ({ page }) => {
    // Arrange
    let phoneNumber = '500 xxx xxx';
    let amountTopUp = '25,00';

    // Act
    await page.locator('#widget_1_topup_receiver').selectOption(phoneNumber);
    await page.locator('#widget_1_topup_amount').fill(amountTopUp);
    await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();

    // Assert
    await expect(page.locator('#show_messages')).toHaveText(
      'Doładowanie wykonane! 25,00PLN na numer 500 xxx xxx',
    );
  });
});
