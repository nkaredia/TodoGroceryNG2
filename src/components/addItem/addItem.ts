import { Component } from '@angular/core';
import { ModalController, ViewController } from 'ionic-angular';

@Component({
  selector: 'tg-add-item',
  templateUrl: 'addItem.html'
})
export class AddItem {

  constructor(public modalCtrl: ModalController, private viewCtrl: ViewController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TgAddItemPage');
  }

  presentModal() {
    let modal = this.modalCtrl.create(AddItem);
    modal.present();
  }

  dissmiss() {
    this.viewCtrl.dismiss();
  }

}
