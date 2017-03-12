import { Component } from '@angular/core';
import { DataFactory } from '../../providers/dataFactory';
import { IStore } from '../../common/tgCore';
import {
  NavController,
  MenuController
} from 'ionic-angular';

@Component({
  selector: 'tg-list',
  templateUrl: 'list.html'
})
export class List {
  search: boolean;

  constructor(public navCtrl: NavController,
    private factory: DataFactory,
    private menuCtrl: MenuController) {
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
    this.menuCtrl.close();
  }

}
