import { Component, Output, EventEmitter } from '@angular/core';
import { DataFactory } from '../../providers/dataFactory';
import { IStore } from '../../common/tgCore';
import { AlertController, AlertOptions } from 'ionic-angular';

@Component({
  selector: 'tg-menu',
  templateUrl: 'menu.html'
})
export class Menu {

  @Output() onChange: EventEmitter<IStore> = new EventEmitter<IStore>();
  @Output() closeDrawer: EventEmitter<IStore>;
  stores: Array<IStore> = [];
  currentStore: IStore = null;

  constructor(private factory: DataFactory, private alertCtrl: AlertController) {
    this.closeDrawer = new EventEmitter<IStore>();
    this.registerSubscribers();
  }

  private selectStore = (e: Event, store: IStore) => {
    this.onChange.emit(store);
    this.closeDrawer.emit(null);
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
      this.factory.
    }
  }

  private addOrUpdateStore = (type: string, store?: IStore) => {
    let prompt = this.alertCtrl.create();
    prompt.present();
  }

  private alertOptions = {
    ADD: this.addStoreObject,
    UPDATE: this.updateStoreObject
  }

  private addStoreObject: AlertOptions = {
    title: 'ADD',
    message: 'Add a new Store',
    inputs: [{ name: 'store', placeholder: 'Store Name' }],
    buttons: [
      { text: 'Cancel', handler: data => { console.log('Cancel clicked'); } },
      { text: 'ADD', handler: data => { } }
    ]
  }

  private updateStoreObject: AlertOptions = {
    title: 'UPDATE',
    message: 'Update ',
    inputs: [{ name: 'store', placeholder: 'Store Name' }],
    buttons: [
      { text: 'Cancel', handler: data => { console.log('Cancel clicked'); } },
      { text: 'ADD', handler: data => { } }
    ]
  }

}
