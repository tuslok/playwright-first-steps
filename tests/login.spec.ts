import { test, expect } from '@playwright/test';

test.describe('User login to Demobank', () => {
  
  test.beforeEach(async ({ page }) => {
    const url = 'https://demo-bank.vercel.app/';
    await page.goto(url);
  });

  test('Successful login with correct credentials', async ({ page }) => {
    // Arrange
    let loginName = 'tester88';
    let password = 'pa55word';

    // Act
    await page.getByTestId('login-input').fill(loginName);
    await page.getByTestId('password-input').fill(password);
    await page.getByTestId('login-button').click();

    // Assert
    await expect(page.getByTestId('user-name')).toHaveText('Jan Demobankowy');
  });

  test('Unsuccessful Login with too short username', async ({ page }) => {
    // Arange
    let incorrectLoginName = 'tester';
    let expectedError = 'identyfikator ma min. 8 znaków';

    // Act
    await page.getByTestId('login-input').fill(incorrectLoginName);
    await page.getByTestId('password-input').click();

    // Assert
    await expect(page.getByTestId('error-login-id')).toHaveText(expectedError);
  });

  test('Unsuccessful Login with too short password', async ({ page }) => {
    // Arrange
    let loginName = 'testerek';
    let password = 'tooShor';
    let expectedError = 'hasło ma min. 8 znaków';

    // Act
    await page.getByTestId('login-input').fill(loginName);
    //await page.getByTestId('password-input').click();
    await page.getByTestId('password-input').fill(password);
    await page.getByTestId('password-input').blur();

    // Assert
    await expect(page.getByTestId('error-login-password')).toHaveText(
      expectedError,
    );
  });
});
