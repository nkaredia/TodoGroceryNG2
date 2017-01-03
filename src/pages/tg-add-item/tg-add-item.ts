import { Component } from '@angular/core';
import { ModalController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-tg-add-item',
  templateUrl: 'tg-add-item.html'
})
export class TgAddItemPage {

  constructor(public modalCtrl: ModalController, private viewCtrl: ViewController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TgAddItemPage');
  }

  presentModal() {
    let modal = this.modalCtrl.create(TgAddItemPage);
    modal.present();
  }

  dissmiss() {
    this.viewCtrl.dismiss();
  }

}
