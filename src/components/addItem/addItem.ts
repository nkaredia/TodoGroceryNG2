import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { UNIT } from '../../common/tgCore';

@Component({
  selector: 'tg-add-item',
  templateUrl: 'addItem.html'
})
export class AddItem {
  unit: any;

  constructor(private viewCtrl: ViewController) {
  }

  closeModal = (e: Event) => {
    this.viewCtrl.dismiss();
  }

  getUnits = () => {
     return Object.keys(UNIT).filter(key => !isNaN(Number(UNIT[key])));
  }

}
