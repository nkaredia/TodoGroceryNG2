import { Component } from '@angular/core';
import { DataFactory } from '../../providers/dataFactory';
import { IStore, IItem, UNIT } from '../../common/tgCore';
import {
  NavController,
  MenuController,
  ModalController
} from 'ionic-angular';
import { AddItem } from '../../components/addItem/addItem';

@Component({
  selector: 'tg-list',
  templateUrl: 'list.html'
})
export class List {
  search: boolean;

  constructor(public navCtrl: NavController,
    private factory: DataFactory,
    private menuCtrl: MenuController,
    private modalCtrl: ModalController) {
    this.search = false;
    this.registerSubscribers();
  }

  registerSubscribers = () => {
    this.factory.currentStore.subscribe(this.changeCurrentStore);
    this.factory.items.subscribe(this.subscribeItems);
  };

  toggleSearch = (e: Event) => {
    this.search = !this.search;
  };

  searchFor = (e: Event) => {
  };

  changeCurrentStore = (store: IStore) => {
    if (this.menuCtrl) {
      this.menuCtrl.close();
    }
  };

  subscribeAddItem = async (item: IItem) => {
    item.checked = false;
    item.storeId = this.factory.currentStore.getValue().id;
    await this.factory.addNewItem(item);
  };

  checkItem = (item: IItem) => {
    item.checked = !item.checked;
    this.factory.updateItem(item);
  }

  subscribeItems = (items: Array<IItem>) => {
  };

  addNewItem = (e: Event) => {
    let modal = this.modalCtrl.create(AddItem);
    modal.present();
    modal.subscribe(this.subscribeAddItem);
  }

  getUnitByIndex = (unit: UNIT) => {
    return UNIT[unit].toLowerCase();
  }

}
