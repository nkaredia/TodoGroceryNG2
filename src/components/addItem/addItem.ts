import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { UNIT } from '../../globals';

@Component({
  selector: 'tg-add-item',
  templateUrl: 'addItem.html'
})
export class AddItem {

  currentList: List;
  addItemModel: ListItem;

  constructor(private viewCtrl: ViewController, private params: NavParams) {
    this.currentList = params.data['currentList'];
    this.addItemModel = {
      listName: 'this.currentList.name',
      name: 'abc',
      quantity: null,
      unit: UNIT.pack,
      isChecked: false
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TgAddItemPage');
  }

  dissmiss() {
    this.viewCtrl.dismiss();
  }

}
