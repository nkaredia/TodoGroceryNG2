import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';

@Component({
  selector: 'tg-popover',
  templateUrl: 'popover.html'
})
export class Popover {

  constructor(public popoverCtrl: PopoverController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TgPopoverPage');
  }

  presentPopover(ev: Event) {
    let popover = this.popoverCtrl.create(Popover);
    popover.present({
      ev: ev
    });
  }

}
