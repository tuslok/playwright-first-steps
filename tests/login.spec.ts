import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('User login to Demobank', () => {
  let loginPage: LoginPage;
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    loginPage = new LoginPage(page);
  });

  test('Successful login with correct credentials', async ({ page }) => {
    // Arrange
    let loginName = loginData.loginName;
    let password = loginData.password;

    // Act
    await loginPage.login(loginName, password);

    // Assert
    const puliptPage = new PulpitPage(page);
    await expect(puliptPage.userNameText).toHaveText('Jan Demobankowy');
  });

  test('Unsuccessful Login with too short username', async ({ page }) => {
    // Arange
    let incorrectLoginName = 'tester';
    let expectedError = 'identyfikator ma min. 8 znaków';

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

    // Act
    await loginPage.loginName.fill(loginName);
    await loginPage.password.fill(password);
    await loginPage.password.blur();

    // Assert
    await expect(loginPage.passwordError).toHaveText(expectedError);
  });
});
