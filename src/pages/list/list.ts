import { Component } from '@angular/core';
import { DataFactory } from '../../providers/dataFactory';
import { IStore } from '../../common/tgCore';
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

  addNewItem = (e: Event) => {
    let modal = this.modalCtrl.create(AddItem);
    modal.present();
  }

}
