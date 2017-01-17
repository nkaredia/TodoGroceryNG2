import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActionSheetController, ModalController, AlertController, ViewController } from 'ionic-angular';
import { TgDataFactory } from '../../providers/tg-data-factory';
import { AddList } from '../addlist/addlist';
import 'rxjs';

@Component({
  selector: 'tg-menu',
  templateUrl: 'menu.html',
  providers: [AddList]
})
export class Menu implements OnInit {

  @Output() onChange: EventEmitter<List> = new EventEmitter<List>();
  onListAdd: EventEmitter<List> = new EventEmitter<List>();


  private lists: Array<List> = [];
  constructor(private actionCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private factory: TgDataFactory,
    private addlistModal: AddList,
    private viewCtrl: ViewController) {
  }

  ngOnInit() {
    this.factory.getLists().subscribe((value) => {
      console.log('--nk--', value)
    }, (error) => {
      console.log('--nk--', error)
    }, () => {
      return;
    });
    this.registerSubscribers();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TgMenuPage');
  }

  registerSubscribers = () => {
    this.registerAddListSubscriber();
    this.registerGetListSubscriber();
  }

  registerAddListSubscriber = () => {
    this.onListAdd.subscribe((value: List) => {
      console.log(value);
      this.lists.push(value);
      this.factory.addNewList(value.name).then(value => {
      })
    });
  }

  registerGetListSubscriber = () => {
    this.factory.getLists().subscribe((value: Array<List>) => {
      if(value && value.length > 0) {
        this.lists = value;
      } else {
        this.factory.addNewList('Untitled Store').then(value => {
          this.lists = [{name: 'Untitled Store'}];
        })
      }
    })
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
    let modal = this.modalCtrl.create(AddList, { emitter: this.onListAdd });
    modal.present();
  }

  updateList() {

  }

  changeList(list: List) {
    console.log('--nk from menu', list);
    this.onChange.emit(list);
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

  newListHandler = (data: { listName: string }) => {
    console.log(data);
    this.lists.push({ name: data.listName });
  }
}
