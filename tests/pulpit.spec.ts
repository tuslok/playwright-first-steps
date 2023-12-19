import { test, expect } from '@playwright/test';

test.describe('Pulpit tests', () => {

  const url = 'https://demo-bank.vercel.app/';
  let loginName = 'testerek';
  let password = 'pa55word';

  test.only('Quick payment with correct data', async ({ page }) => {
    
    let receiverNumber = '2';
    let amountTransfer = '120,00';
    let titleTransfer = 'Pizza';
    
    await page.goto(url);
    await page.getByTestId('login-input').fill(loginName);
    await page.getByTestId('password-input').fill(password);
    await page.getByTestId('login-button').click();

    await page.locator('#widget_1_transfer_receiver').selectOption(receiverNumber);
    await page.locator('#widget_1_transfer_amount').fill(amountTransfer);
    await page.locator('#widget_1_transfer_title').fill(titleTransfer);

    await page.getByRole('button', { name: 'wykonaj' }).click();

    await expect(page.locator('#show_messages')).toHaveText(
      'Przelew wykonany! Chuck Demobankowy - 120,00PLN - Pizza',
    );
  });

  test.only('Sucessful mobile top-up', async ({ page }) => {
    
    let phoneNumber = '500 xxx xxx';
    let amountTopUp = '25,00';
    
    await page.goto(url);
    await page.getByTestId('login-input').fill(loginName);
    await page.getByTestId('password-input').fill(password);
    await page.getByTestId('login-button').click();

    await page.locator('#widget_1_topup_receiver').selectOption(phoneNumber);
    await page.locator('#widget_1_topup_amount').fill(amountTopUp);
    await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();

    await expect(page.locator('#show_messages')).toHaveText(
      'Doładowanie wykonane! 25,00PLN na numer 500 xxx xxx',
    );
  });
});
