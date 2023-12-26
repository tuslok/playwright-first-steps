import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  loginName = this.page.getByTestId('login-input');
  password = this.page.getByTestId('password-input');
  loginButton = this.page.getByTestId('login-button');
  loginError = this.page.getByTestId('error-login-id');
  passwordError = this.page.getByTestId('error-login-password');

  async login(loginName: string, password: string): Promise<void> {
    await this.loginName.fill(loginName);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}
