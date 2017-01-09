import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { Popover } from '../../components/popover/popover';
import { AddItem } from '../../components/addItem/addItem';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Popover, AddItem]
})
export class HomePage {

  constructor(public navCtrl: NavController, 
              private popover: Popover, 
              private menuCtrl: MenuController,
              private modalCtrl: AddItem) {
    this.menuCtrl.enable(true);
  }

  presentPopover(ev: Event) {
    this.popover.presentPopover(ev);
  }

  addItem(ev: Event) {
    console.log('cliked');
    this.modalCtrl.presentModal();
  }

}
