import { test, expect } from '@playwright/test';

test.describe('Pulpit tests', () => {
  test.only('Quick payment with correct data', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('Testerow');
    await page.getByTestId('password-input').fill('password');
    await page.getByTestId('login-button').click();

    await page.locator('#widget_1_transfer_receiver').selectOption('2');
    await page.locator('#widget_1_transfer_amount').fill('120,00');
    await page.locator('#widget_1_transfer_title').fill('Pizza');

    await page.getByRole('button', { name: 'wykonaj' }).click();

    await expect(page.locator('#show_messages')).toHaveText(
      'BUGPrzelew wykonany! Chuck Demobankowy - 120,00PLN - Pizza',
    );
  });

  test('Sucessful mobile top-up', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('testowas');
    await page.getByTestId('password-input').fill('tedsgdsg');
    await page.getByTestId('login-button').click();

    await page.locator('#widget_1_topup_receiver').selectOption('504 xxx xxx');
    await page.locator('#widget_1_topup_amount').fill('25');
    await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();

    await expect(page.locator('#show_messages')).toHaveText(
      'Doładowanie wykonane! 25,00PLN na numer 504 xxx xxx',
    );
  });
});
