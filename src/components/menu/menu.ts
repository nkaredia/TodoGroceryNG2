import { Component } from '@angular/core';
import { ActionSheetController, ModalController, AlertController } from 'ionic-angular';

@Component({
  selector: 'tg-menu',
  templateUrl: 'menu.html'
})
export class Menu {

  lists: Array<string> = [];
  isListsItemUpdating: boolean = false;

  constructor(private actionCtrl: ActionSheetController, private modalCtrl: ModalController, private alertCtrl: AlertController) {
    this.lists.push('Untitled List');
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

  addNewList() {
    this.openListPrompt('Add new list', 'Add');
  }

  updateList() {

  }

  openListPrompt(title: string, action: string) {
    let prompt = this.alertCtrl.create({
      title: title,
      inputs: [
        {
          name: 'listName',
          placeholder: 'List name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {

          }
        },
        {
          text: action,
          handler: this.newListHandler
        }
      ]
    });
    prompt.present();
  }

  private newListHandler = (data: { listName: string }) => {
    console.log(data);
    this.lists.push(data.listName);
  }
}