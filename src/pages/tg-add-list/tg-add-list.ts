import { Component } from '@angular/core';
import { ModalController, ViewController } from 'ionic-angular';


/*
  Generated class for the TgAddList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tg-add-list',
  templateUrl: 'tg-add-list.html'
})
export class TgAddListPage {
  constructor(public modalCtrl: ModalController, private viewCtrl: ViewController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TgAddItemPage');
  }

  presentModal() {
    let modal = this.modalCtrl.create(TgAddListPage);
    modal.present();
  }

  dissmiss() {
    this.viewCtrl.dismiss();
  }


}
