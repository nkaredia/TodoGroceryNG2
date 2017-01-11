import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActionSheetController, ModalController, AlertController } from 'ionic-angular';
import { TgDataFactory } from '../../providers/tg-data-factory';

@Component({
  selector: 'tg-menu',
  templateUrl: 'menu.html'
})
export class Menu implements OnInit {

  @Input() lists: Array<List> = [];
  @Output() listChange: EventEmitter<List> = new EventEmitter();
  isListsItemUpdating: boolean = false;

  constructor(private actionCtrl: ActionSheetController, private modalCtrl: ModalController, private alertCtrl: AlertController, private factory: TgDataFactory) {
    this.lists.push({ name: 'Untitles list' });
    for (let item of this.lists) {

    }
  }

  ngOnInit() {
    this.factory.getLists().subscribe((value) => {
      console.log('--nk--', value)
    }, (error) => {
      console.log('--nk--', error)
    }, () => {
      return;
    });
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

  changeList(list: List) {
    console.log('--nk', list);
    this.listChange.next(list);
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
    this.lists.push({ name: data.listName });
  }
}