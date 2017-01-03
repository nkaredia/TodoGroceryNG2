import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { TgPopoverPage } from '../tg-popover/tg-popover';
import { TgAddItemPage } from '../tg-add-item/tg-add-item';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [TgPopoverPage, TgAddItemPage]
})
export class HomePage {

  constructor(public navCtrl: NavController, 
              private popoverPage: TgPopoverPage, 
              private menuCtrl: MenuController,
              private modalCtrl: TgAddItemPage) {
    this.menuCtrl.enable(true);
  }

  presentPopover(ev: Event) {
    this.popoverPage.presentPopover(ev);
  }

  addItem(ev: Event) {
    console.log('cliked');
    this.modalCtrl.presentModal();
  }

}
