import { Component, Output, EventEmitter } from '@angular/core';
import { DataFactory } from '../../providers/dataFactory';
import { IStore } from '../../common/tgCore';
import { AlertController, AlertOptions, ActionSheetController, ActionSheetOptions } from 'ionic-angular';

@Component({
  selector: 'tg-menu',
  templateUrl: 'menu.html'
})
export class Menu {
  private addStoreObject: AlertOptions = {
    title: 'ADD',
    message: 'Add a new Store',
    inputs: [{ name: 'store', placeholder: 'Store Name' }],
    buttons: [
      { text: 'Cancel', handler: data => { console.log('Cancel clicked'); } },
      { text: 'ADD', handler: data => { this.handleAddOrUpdateStore(data.store, 'ADD'); } }
    ]
  }

  private updateStoreObject: AlertOptions = {
    title: 'UPDATE',
    message: 'Update ',
    inputs: [{ name: 'store', placeholder: 'Store Name' }],
    buttons: [
      { text: 'Cancel', handler: data => { this.handleAddOrUpdateStore(data.store, 'UPDATE'); } },
      { text: 'UPDATE', handler: data => { } }
    ]
  }

  private alertOptions = {
    ADD: this.addStoreObject,
    UPDATE: this.updateStoreObject
  }

  @Output() onChange: EventEmitter<IStore> = new EventEmitter<IStore>();
  @Output() closeDrawer: EventEmitter<IStore>;
  stores: Array<IStore> = [];
  currentStore: IStore = null;

  constructor(private factory: DataFactory,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController) {
    this.closeDrawer = new EventEmitter<IStore>();
    this.registerSubscribers();
  }

  selectStore = (e: Event, store: IStore) => {
    this.onChange.emit(store);
    this.closeDrawer.emit(null);
  }

  openStoreOptions = (store: IStore) => {
    console.log('long press');
    this.actionSheetCtrl.create(this.createActionSheetOptions(store)).present();
  }

  addOrUpdateStore = (type: string, store?: IStore) => {
    let options = this.alertOptions[type.toUpperCase()];
    if (store && type.toUpperCase() === 'UPDATE') {
      options.message = 'Update' + store.name
    }
    let prompt = this.alertCtrl.create(options);
    prompt.present();
  }

  private registerSubscribers = () => {
    this.factory.stores.subscribe(this.subscribeStores);
    this.factory.currentStore.subscribe(this.subscribeCurrentStore);
  }

  private subscribeStores = (stores: Array<IStore>) => {
    this.stores = stores;
  }

  private subscribeCurrentStore = (current) => {
    this.currentStore = current;
  }

  private handleAddOrUpdateStore = (store: IStore, type: string) => {
    if (type.toLowerCase() === 'add') {
      this.factory.addNewStore(store.name);
    } else {
      this.factory.updateStore(store.name);
    }
  }

  private createActionSheetOptions(store: IStore): ActionSheetOptions {
    return {
      title: 'Modify your Store',
        buttons: [
          {
            text: 'Delete',
            role: 'destructive',
            icon: 'trash',
            handler: () => {
              console.log('Destructive clicked');
            }
          }, {
            text: 'Update',
            icon: 'create',
            handler: () => {
              console.log('Archive clicked');
              this.addOrUpdateStore('UPDATE', store);
            }
          }, {
            text: 'Cancel',
            role: 'cancel',
            icon: 'close',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
    }
  }
}
