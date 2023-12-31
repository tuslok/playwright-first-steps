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

  async makeMobileTopUp(
    phoneNumber: string,
    amountTopUp: string,
  ): Promise<void> {
    await this.topupReceiver.selectOption(phoneNumber);
    await this.topupAmount.fill(amountTopUp);
    await this.topupAgreement.click();
    await this.topUpConfirmButton.click();
    //await this.closePopUpButton.click();
  }

  async makeQuickPayment(
    receiverNumber: string,
    amountTransfer: string,
    titleTransfer: string,
  ): Promise<void> {
    await this.transferReceiver.selectOption(receiverNumber);
    await this.transferAmount.fill(amountTransfer);
    await this.transferTitle.fill(titleTransfer);
    await this.confirmButton.click();
    //await this.closePopUpButton.click();
  }
}
