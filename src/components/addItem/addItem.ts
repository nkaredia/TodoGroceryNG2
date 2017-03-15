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
    console.log(this.getUnits(), 'dsfsdsd');
  }

  closeModal = (e: Event) => {
    this.viewCtrl.dismiss();
  }

  getUnitInString = (unit: UNIT) => {
    return UNIT[unit];
  }

  getUnits = () => {
    return Object.keys(UNIT).filter(i => isNaN(Number(UNIT[i])));
  }

}
