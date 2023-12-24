import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('User login to Demobank', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Successful login with correct credentials', async ({ page }) => {
    // Arrange
    let loginName = loginData.loginName;
    let password = loginData.password;
    const loginPage = new LoginPage(page);

    // Act

    await loginPage.loginName.fill(loginName);
    await loginPage.password.fill(password);
    await loginPage.loginButton.click();

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
    let loginName = loginData.loginName;
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
