import { Component } from '@angular/core';
import { ActionSheetController, ModalController, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-tg-menu',
  templateUrl: 'tg-menu.html'
})
export class TgMenuPage {

  constructor(private actionCtrl: ActionSheetController, private modalCtrl: ModalController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TgMenuPage');
  }

  presentActionSheet() {
    let actionSheet = this.actionCtrl.create({
      title: 'Modify your album',
      buttons: [
        {
          text: 'Destructive',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        }, {
          text: 'Archive',
          handler: () => {
            console.log('Archive clicked');
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  presentModal() {
    let modal = this.modalCtrl.create(AddList);
    modal.present();
  }

}



@Component({
  template: `
    Hello World
  `
})
class AddList {
  constructor(private viewCtrl: ViewController) {

  }

  dissmiss() {
    this.viewCtrl.dismiss();
  }


}
