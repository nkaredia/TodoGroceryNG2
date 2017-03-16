import { Component, Output, EventEmitter } from '@angular/core';
import { DataFactory } from '../../providers/dataFactory';
import { IStore } from '../../common/tgCore';
import {
  AlertController,
  AlertOptions,
  ActionSheetController,
  ActionSheetOptions,
  ToastController,
  ToastOptions
} from 'ionic-angular';

@Component({
  selector: 'tg-menu',
  templateUrl: 'menu.html'
})
export class Menu {
  stores: Array<IStore> = [];
  currentStore: IStore = null;

  constructor(private factory: DataFactory,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private toastCtrl: ToastController) {
    this.registerSubscribers();
  }

  selectStore = (e: Event, store: IStore) => {
    this.factory.changeCurrentStore(store);
  }

  openStoreOptions = (store: IStore) => {
    this.actionSheetCtrl.create(this.createActionSheetOptions(store)).present();
  }

  addOrUpdateStore = (type: string, store?: IStore) => {
    let prompt = this.alertCtrl.create(this.generateAlertOptions(type, store));
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
        { text: t.capitalize(), handler: data => { this.handleAddOrUpdateStore(data.store, t, store && store.id ? store.id : null); } }
      ]
    }
  }

  private handleAddOrUpdateStore = (store: string, type: string, id?: number) => {
    if (type.toLowerCase() === 'add') {
      this.factory.addNewStore({ name: store }).catch(this.catchAddStoreError);
    } else {
      this.factory.updateStore({ name: store, id: id }).catch(this.catchUpdateStoreError);
    }
  }

  private catchAddStoreError = (error) => {
    console.log(error);
    this.toastCtrl.create(this.generateToastOptions(error, 0)).present();
  }

  private catchUpdateStoreError = (error) => {
    console.log(error);
    this.toastCtrl.create(this.generateToastOptions(error, 0)).present();
  }

  /**
   * Register All Subscribers here
   */

  private registerSubscribers = () => {
    this.factory.stores.subscribe(this.subscribeStores);
    this.factory.currentStore.subscribe(this.subscribeCurrentStore);
  }

  private subscribeStores(stores: Array<IStore>) {
    console.log(stores);
    this.stores = stores;
  }

  private subscribeCurrentStore = (current) => {
    console.log('cs', current);
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

  private generateToastOptions(message: string, type: number): ToastOptions {
    return {
      message: message,
      duration: 5000,
      position: 'top',
      cssClass: type === 1 ? 'toast-success' : 'toast-error',
      showCloseButton: true
    }
  }
}
