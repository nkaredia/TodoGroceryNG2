import { Component, Output, EventEmitter } from '@angular/core';
import { DataFactory } from '../../providers/dataFactory';
import { IStore } from '../../common/tgCore';
import { AlertController } from 'ionic-angular';

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
    console.log(store, "menu");
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

  private addOrUpdateStore = (type: string, store?: IStore) => {
    let prompt = this.alertCtrl.create({
      title: type.toUpperCase(),
      message: type.toUpperCase() === 'ADD' ? 'Add new Store' : 'Update ' + store.name,
      inputs: [
        {
          name: 'Store',
          placeholder: 'Store Name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }
}
