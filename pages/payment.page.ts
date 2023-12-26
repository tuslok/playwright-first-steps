import { Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.component';

export class PaymentPage {
  constructor(private page: Page) {}

  sideMenu = new SideMenuComponent(this.page);

  paymentReceiver = this.page.getByTestId('transfer_receiver');
  accountNumber = this.page.getByTestId('form_account_to');
  amount = this.page.getByTestId('form_amount');
  sendTransferButton = this.page.getByRole('button', {
    name: 'wykonaj przelew',
  });
  closePopupButton = this.page.getByTestId('close-button');
  message = this.page.locator('#show_messages');
}
