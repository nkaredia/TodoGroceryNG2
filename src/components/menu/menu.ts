import { Component, Output, EventEmitter } from '@angular/core';
import { DataFactory } from '../../providers/dataFactory';
import { IStore } from '../../common/tgCore';
import {
  AlertController,
  AlertOptions,
  ActionSheetController,
  ActionSheetOptions
} from 'ionic-angular';

@Component({
  selector: 'tg-menu',
  templateUrl: 'menu.html'
})
export class Menu {

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
    this.actionSheetCtrl.create(this.createActionSheetOptions(store)).present();
  }

  addOrUpdateStore = (type: string, store?: IStore) => {
    let prompt = this.alertCtrl.create( this.generateAlertOptions(type, store));
    prompt.present();
  }

  generateAlertOptions = (type: string, store: IStore): AlertOptions => {
    let t = type.toLowerCase();
    return {
      title: t.toUpperCase(),
      message: t === 'add' ? 'Add a new Store' : 'Update ' + store.name,
      inputs: [{ name: 'store', placeholder: 'Store Name', value: t === 'update' ? store.name : '' }],
      buttons: [
        { text: 'Cancel', handler: data => { } },
        { text: t.capitalize(), handler: data => { this.handleAddOrUpdateStore(data.store, t.toUpperCase()); } }
      ]
    }
  }

  private handleAddOrUpdateStore = (store: IStore, type: string) => {
    if (type.toLowerCase() === 'add') {
      this.factory.addNewStore(store.name);
    } else {
      this.factory.updateStore(store.name);
    }
  }

  /**
   * Register All Subscribers here
   */

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

  //********************************************* */

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
