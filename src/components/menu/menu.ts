import { Component, OnInit, Input, EventEmitter, Output, Directive } from '@angular/core';
import { ActionSheetController, ModalController, AlertController } from 'ionic-angular';
import { TgDataFactory } from '../../providers/tg-data-factory';
import 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

@Component({
  selector: 'tg-menu',
  templateUrl: 'menu.html'
})
export class Menu implements OnInit {

  @Output() onChange: EventEmitter<List> = new EventEmitter<List>();


  private lists: Array<List> = [];
  constructor(private actionCtrl: ActionSheetController, private modalCtrl: ModalController, private alertCtrl: AlertController, private factory: TgDataFactory) {
    this.lists.push({ name: 'Untitles list' });
    console.log(this);
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

  private ionViewDidLoad() {
    console.log('ionViewDidLoad TgMenuPage');
  }

  private presentActionSheet() {
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

  private addNewList() {
    this.openListPrompt('Add new list', 'Add');
  }

  updateList() {

  }

  private changeList(list: List) {
    console.log('--nk from menu', list);
    this.onChange.emit(list);
  }

  private openListPrompt(title: string, action: string) {
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