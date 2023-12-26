import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

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
  });

  test('Quick payment with correct data', async ({ page }) => {
    // Arange
    let receiverNumber = '2';
    let amountTransfer = '120,00';
    let titleTransfer = 'Pizza';
    const puliptPage = new PulpitPage(page);

    //Act
    await page
      .locator('#widget_1_transfer_receiver')
      .selectOption(receiverNumber);
    await puliptPage.transferAmount.fill(amountTransfer);
    await puliptPage.transferTitle.fill(titleTransfer);
    await puliptPage.confirmButton.click();

    // Assert
    await expect(puliptPage.message).toHaveText(
      'Przelew wykonany! Chuck Demobankowy - 120,00PLN - Pizza',
    );
  });

  test('Sucessful mobile top-up', async ({ page }) => {
    // Arrange
    let phoneNumber = '500 xxx xxx';
    let amountTopUp = '25,00';
    const puliptPage = new PulpitPage(page);

    // Act

    await puliptPage.topupReceiver.selectOption(phoneNumber);
    await puliptPage.topupAmount.fill(amountTopUp);
    await puliptPage.topupAgreement.click();
    await puliptPage.topUpConfirmButton.click();
    await puliptPage.closePopUpButton.click();

    // Assert
    await expect(puliptPage.message).toHaveText(
      'Doładowanie wykonane! 25,00PLN na numer 500 xxx xxx',
    );
  });

  test('Correct balance after mobile top-up', async ({ page }) => {
    // Arrange
    let phoneNumber = '500 xxx xxx';
    let amountTopUp = '25';
    const initialBalance = await page.locator('#money_value').innerText();
    const expectResult = Number(initialBalance) - Number(amountTopUp);
    const pulpitPage = new PulpitPage(page);

    // Act
    await pulpitPage.topupReceiver.selectOption(phoneNumber);
    await pulpitPage.topupAmount.fill(amountTopUp);
    await pulpitPage.topupAgreement.click();

    await pulpitPage.topUpConfirmButton.click();
    await pulpitPage.closePopUpButton.click();

    //await page.getByRole('button', { name: 'doładuj telefon' }).click();
    //await page.getByTestId('close-button').click();

    // Assert
    await expect(pulpitPage.moneyValue).toHaveText(`${expectResult}`);
  });
});
