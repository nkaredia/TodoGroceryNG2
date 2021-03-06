import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ViewController } from 'ionic-angular';
import { UNIT, IItem } from '../../common/tgCore';
import { DataFactory } from '../../providers/dataFactory';

@Component({
  selector: 'tg-add-item',
  templateUrl: 'addItem.html'
})
export class AddItem implements OnInit {


  constructor(private viewCtrl: ViewController,
    private factory: DataFactory) {

  }

  ngOnInit() {
  }

  closeModal = (e: Event) => {
    this.viewCtrl.dismiss();
  }

  getUnitByKey = (unit: UNIT): any => {
    return UNIT[unit];
  }

  getUnits = () => {
    return Object.keys(UNIT).filter(i => isNaN(Number(UNIT[i])));
  }
  
  validateQuantity = (e: KeyboardEvent, f: NgForm) => {
    let num = Number(e.key);
    if(!isNaN(num) && Number(f.value.quantity) <= 9999999) {
      f.value.quantity += String(num);
    } else {
      e.preventDefault();
    }
  }

  addNewItem = (form: NgForm) => {
    if (form.value &&
      (form.value.name === '' || form.value.quantity === '' || form.value.unit === '')) {
      return;
    }
    let item: IItem = form.value;
    item.quantity = +item.quantity;
    this.viewCtrl.data.dismissCallback(item);
    this.viewCtrl.dismiss();
  }
 
}
