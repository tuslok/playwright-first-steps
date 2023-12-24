import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  loginName = this.page.getByTestId('login-input');
  password = this.page.getByTestId('password-input');
  loginButton = this.page.getByTestId('login-button');
  loginError = this.page.getByTestId('error-login-id');
  passwordError = this.page.getByTestId('error-login-password');
}
