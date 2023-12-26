import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

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
    const puliptPage = new PulpitPage(page);
    await expect(puliptPage.userNameText).toHaveText('Jan Demobankowy');
  });

  test('Unsuccessful Login with too short username', async ({ page }) => {
    // Arange
    let incorrectLoginName = 'tester';
    let expectedError = 'identyfikator ma min. 8 znaków';
    const loginPage = new LoginPage(page);

    // Act
    await loginPage.loginName.fill(incorrectLoginName);
    await loginPage.password.click();

    // Assert
    await expect(loginPage.loginError).toHaveText(expectedError);
  });

  test('Unsuccessful Login with too short password', async ({ page }) => {
    // Arrange
    let loginName = loginData.loginName;
    let password = 'tooShor';
    let expectedError = 'hasło ma min. 8 znaków';
    const loginPage = new LoginPage(page);

    // Act
    await loginPage.loginName.fill(loginName);
    await loginPage.password.fill(password);
    await loginPage.password.blur();

    // Assert
    await expect(loginPage.passwordError).toHaveText(expectedError);
  });
});
