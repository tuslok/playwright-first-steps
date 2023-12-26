import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Pulpit tests', () => {
  let pulpitPage: PulpitPage;

  // Arrange
  let loginName = loginData.loginName;
  let password = loginData.password;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');

    const loginPage = new LoginPage(page);
    await loginPage.loginName.fill(loginName);
    await loginPage.password.fill(password);
    await loginPage.loginButton.click();

    pulpitPage = new PulpitPage(page);
  });

  test('Quick payment with correct data', async ({ page }) => {
    // Arange
    let receiverNumber = '2';
    let amountTransfer = '120,00';
    let titleTransfer = 'Pizza';

    //Act
    await pulpitPage.transferReceiver.selectOption(receiverNumber);
    await pulpitPage.transferAmount.fill(amountTransfer);
    await pulpitPage.transferTitle.fill(titleTransfer);
    await pulpitPage.confirmButton.click();

    // Assert
    await expect(pulpitPage.message).toHaveText(
      'Przelew wykonany! Chuck Demobankowy - 120,00PLN - Pizza',
    );
  });

  test('Sucessful mobile top-up', async ({ page }) => {
    // Arrange
    let phoneNumber = '500 xxx xxx';
    let amountTopUp = '25,00';

    // Act

    await pulpitPage.topupReceiver.selectOption(phoneNumber);
    await pulpitPage.topupAmount.fill(amountTopUp);
    await pulpitPage.topupAgreement.click();
    await pulpitPage.topUpConfirmButton.click();
    await pulpitPage.closePopUpButton.click();

    // Assert
    await expect(pulpitPage.message).toHaveText(
      'Doładowanie wykonane! 25,00PLN na numer 500 xxx xxx',
    );
  });

  test('Correct balance after mobile top-up', async ({ page }) => {
    // Arrange
    let phoneNumber = '500 xxx xxx';
    let amountTopUp = '25';
    const initialBalance = await page.locator('#money_value').innerText();
    const expectResult = Number(initialBalance) - Number(amountTopUp);

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
