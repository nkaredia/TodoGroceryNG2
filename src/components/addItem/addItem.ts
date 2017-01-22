import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import * as G from '../../globals';

@Component({
  selector: 'tg-add-item',
  templateUrl: 'addItem.html'
})
export class AddItem {

  currentList: List;
  addItemModel: ListItem;
  units;
  glo = G;

  constructor(private viewCtrl: ViewController, private params: NavParams) {
    this.currentList = params.data['currentList'];
    this.units = this.getUnits();
    this.addItemModel = {
      listName: this.currentList ? this.currentList.name : '',
      name: '',
      quantity: null,
      unit: G.UNIT.pack,
      isChecked: false
    }
  }

  ionViewDidLoad() {
  }

  dissmiss(add?: boolean) {
    this.viewCtrl.dismiss(add ? {addItemModel: this.addItemModel} : null);
  }

  getUnits() {
    let ret = [];
    for (let i in G.UNIT) {
      if (typeof G.UNIT[i] === 'string') {
        ret.push(G.UNIT[i]);
      }
    }
    return ret;
  }

  addNewItem() {
    console.log(this.addItemModel);
    this.dissmiss(true);
  }

  mapUnits(index) {
    return G.UNIT[index];
  }

  mapUnitsInNumber(index: string) {
    return G.UNIT[index];
  }

}
