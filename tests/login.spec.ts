import { test, expect } from '@playwright/test';

test.describe('User login to Demobank', () => {

  const url = 'https://demo-bank.vercel.app/';

  test('Successful login with correct credentials', async ({ page }) => {
    await page.goto(url);
    await page.getByTestId('login-input').fill('tester88');
    await page.getByTestId('password-input').fill('pa55w0rd');
    await page.getByTestId('login-button').click();

    await expect(page.getByTestId('user-name')).toHaveText('Jan Demobankowy');

  });

  test('Unsuccessful Login with too short username', async ({ page }) => {
    await page.goto(url);
    await page.getByTestId('login-input').fill('testr88');
    await page.getByTestId('password-input').click();

    await expect(page.getByTestId('error-login-id')).toHaveText('identyfikator ma min. 8 znaków');

  });

  test('Unsuccessful Login with too short password', async ({ page }) => {
    await page.goto(url);
    await page.getByTestId('login-input').fill('tester88');
    //await page.getByTestId('password-input').click();
    await page.getByTestId('password-input').fill('pa5w0rd');
    await page.getByTestId('password-input').blur();

    await expect(page.getByTestId('error-login-password')).toHaveText('hasło ma min. 8 znaków');

  });

});