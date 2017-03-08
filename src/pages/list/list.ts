import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataFactory } from '../../providers/dataFactory';
import { IStore } from '../../common/tgCore';

@Component({
  selector: 'tg-list',
  templateUrl: 'list.html'
})
export class List {
  search: boolean;

  constructor(public navCtrl: NavController,
    private factory: DataFactory) {
    this.search = false;
    this.factory.stores.subscribe((v) => {
    });
  }

  toggleSearch = (e: Event) => {
    this.search = !this.search;
  }

  searchFor = (e: Event) => {
    console.log(e);
  }

  changeCurrentStore(store: IStore) {
    this.factory.currentStore.next(store);
  }

}

enum TABLES {
  STORES = 0,
  ITEMS = 1
}