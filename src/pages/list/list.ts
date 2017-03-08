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
    console.log('v', this.factory.stores.getValue());
    this.factory.stores.subscribe((v) => {
      console.log('vvvv', v);
    });
    console.log(TABLES, TABLES[TABLES.STORES], TABLES[TABLES['STORES']]);
  }

  toggleSearch = (e: Event) => {
    this.search = !this.search;
  }

  searchFor = (e: Event) => {
    console.log(e);
  }

  changeCurrentStore(store: IStore) {
    console.log(store, "dcdcsd");
    this.factory.currentStore.next(store);
  }

}

enum TABLES {
  STORES = 0,
  ITEMS = 1
}