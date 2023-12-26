import { Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.component';

export class PulpitPage {
  constructor(private page: Page) {}

  sideMenu = new SideMenuComponent(this.page);

  closePopUpButton = this.page.getByTestId('close-button');
  message = this.page.locator('#show_messages');
  moneyValue = this.page.locator('#money_value');
  userNameText = this.page.getByTestId('user-name');

  // custom payment
  transferReceiver = this.page.locator('#widget_1_transfer_receiver');
  transferAmount = this.page.locator('#widget_1_transfer_amount');
  transferTitle = this.page.locator('#widget_1_transfer_title');
  confirmButton = this.page.getByRole('button', { name: 'wykonaj' });

  // topup mobile
  topupReceiver = this.page.locator('#widget_1_topup_receiver');
  topupAmount = this.page.locator('#widget_1_topup_amount');
  topupAgreement = this.page.locator('#uniform-widget_1_topup_agreement span');
  topUpConfirmButton = this.page.getByRole('button', {
    name: 'doładuj telefon',
  });
}
