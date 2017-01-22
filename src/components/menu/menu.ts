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
  @Output() closeDrawer: EventEmitter<any> = new EventEmitter<any>();

  onListAdd: EventEmitter<{ newList: List, oldList: List }> = new EventEmitter<{ newList: List, oldList: List }>();
  onListEdit: EventEmitter<{ newList: List, oldList: List }> = new EventEmitter<{ newList: List, oldList: List }>();


  private lists: Array<List> = [];
  private currentStore: List;

  constructor(private actionCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private factory: TgDataFactory,
    private addlistModal: AddList,
    private viewCtrl: ViewController) {
  }

  ngOnInit() {
    // this.factory.getLists().subscribe((value) => {
    //   console.log('--nk--', value)
    // }, (error) => {
    //   console.log('--nk--', error)
    // }, () => {
    //   return;
    // });
    this.registerSubscribers();
  }

  ionViewDidLoad() {
  }

  registerSubscribers = () => {
    this.registerAddListSubscriber();
    this.registerGetListSubscriber();
    this.registerEditListSubscriber();
  }

  registerAddListSubscriber = () => {
    this.onListAdd.subscribe((value: { newList: List, oldList: List }) => {
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
        let local = JSON.parse(window.localStorage.getItem('currentStore'));
        this.changeList(local ? local : this.lists[0]);
      } else {
        this.factory.addNewList('Untitled Store').then(value => {
          this.lists = [{ name: 'Untitled Store' }];
          this.changeList({ name: 'Untitled Store' });
        });
      }
    });
  }

  presentActionSheet(list: List) {
    let actionSheet = this.actionCtrl.create({
      title: 'Modify Store',
      buttons: [
        {
          text: 'Edit',
          icon: 'md-create',
          handler: () => {
            this.editList(list);
          }
        }, {
          text: 'Delete',
          icon: 'trash',
          role: 'destructive',
          handler: () => {
            this.deleteList(list);
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

  deleteList(list: List) {
    let confirm = this.alertCtrl.create({
      title: 'Delete '.concat(list.name).concat('?'),
      message: 'Are you sure you want to delete '.concat(list.name)
        .concat('? All items in ')
        .concat(list.name)
        .concat(' will be deleted.'),
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.factory.deleteListByName(list).then(value => {
              this.lists.splice(this.lists.indexOf(list), 1);
              this.changeList(this.lists[0]);
            }).catch(error => {

            });
          }
        }
      ]
    });
    confirm.present();
  }

  updateList() {

  }

  changeList(list: List, closeDrawer?: boolean) {
    this.onChange.emit(list);
    this.currentStore = list;
    window.localStorage.setItem('currentStore', JSON.stringify(this.currentStore));
    if(closeDrawer) {
      this.closeDrawer.emit(true);
    }
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
    this.lists.push({ name: data.listName });
  }
}
