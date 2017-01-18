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
  onListAdd: EventEmitter<{ newList: List, oldList: List }> = new EventEmitter<{ newList: List, oldList: List }>();
  onListEdit: EventEmitter<{ newList: List, oldList: List }> = new EventEmitter<{ newList: List, oldList: List }>();


  private lists: Array<List> = [];
  constructor(private actionCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private factory: TgDataFactory,
    private addlistModal: AddList,
    private viewCtrl: ViewController) {
    this.onChange.emit()
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
    this.registerEditListSubscriber();
  }

  registerAddListSubscriber = () => {
    this.onListAdd.subscribe((value: { newList: List, oldList: List }) => {
      console.log(value);
      this.factory.addNewList(value.newList.name).then(resolve => {
        this.lists.push(value.newList);
      });
    });
  }

  registerEditListSubscriber = () => {
    this.onListEdit.subscribe((value: { newList: List, oldList: List }) => {
      this.factory.editListByName(value.newList, value.oldList).then(resolve => {
        this.lists[this.lists.indexOf(value.oldList)] = value.newList;
      });
    });
  }

  registerGetListSubscriber = () => {
    this.factory.getLists().subscribe((value: Array<List>) => {
      if (value && value.length > 0) {
        this.lists = value;
      } else {
        this.factory.addNewList('Untitled Store').then(value => {
          this.lists = [{ name: 'Untitled Store' }];
        })
      }
    })
  }

  presentActionSheet(list: List) {
    let actionSheet = this.actionCtrl.create({
      title: 'Modify Store',
      buttons: [
        {
          text: 'Edit',
          role: 'edit',
          handler: () => {
            this.editList(list);
            console.log('Destructive clicked');
          }
        }, {
          text: 'Delete',
          handler: () => {
            console.log('Archive clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  addNewList() {
    let params: IAddListModel = {
      emitter: this.onListAdd,
      type: 'add',
      title: 'Add New Store',
      button: 'Add',
      placeholder: 'Store Name',
      listName: ''
    }
    let modal = this.modalCtrl.create(AddList, params);
    modal.present();
  }

  editList(list: List) {
    let params: IAddListModel = {
      emitter: this.onListEdit,
      type: 'edit',
      title: 'Edit Store',
      button: 'Edit',
      placeholder: 'Store Name',
      currentList: list,
      listName: list.name
    }
    let modal = this.modalCtrl.create(AddList, params);
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
