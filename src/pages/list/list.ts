import { Component } from '@angular/core';
import { DataFactory } from '../../providers/dataFactory';
import { IStore, IItem } from '../../common/tgCore';
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
  }

  toggleSearch = (e: Event) => {
    this.search = !this.search;
  }

  searchFor = (e: Event) => {
    console.log(e);
  }

  changeCurrentStore = (store: IStore) => {
    if (this.menuCtrl) {
      this.menuCtrl.close();
    }
  }

  subscribeAddItem = (item: IItem) => {
    console.log(item);
  }

  addNewItem = (e: Event) => {
    let modal = this.modalCtrl.create(AddItem);
    modal.present();
    modal.subscribe(this.subscribeAddItem);
  }


}
