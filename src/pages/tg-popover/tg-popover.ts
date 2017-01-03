import { Component } from '@angular/core';
import { PopoverController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-tg-popover',
  templateUrl: 'tg-popover.html'
})
export class TgPopoverPage {

  constructor(public popoverCtrl: PopoverController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TgPopoverPage');
  }

  presentPopover(ev: Event) {
    let popover = this.popoverCtrl.create(TgPopoverPage);
    popover.present({
      ev: ev
    });
  }

}
