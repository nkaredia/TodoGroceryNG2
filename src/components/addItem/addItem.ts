import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ViewController } from 'ionic-angular';
import { UNIT, IItem } from '../../common/tgCore';

@Component({
  selector: 'tg-add-item',
  templateUrl: 'addItem.html'
})
export class AddItem implements OnInit {


  constructor(private viewCtrl: ViewController) {
    console.log(this.getUnits(), 'dsfsdsd');
    
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

  addNewItem = (form: NgForm) => {
    if (form.value &&
      (form.value.name === '' || form.value.quantity === '' || form.value.unit === '')) {
        return;
    }
    let item: IItem = form.value;
    this.viewCtrl.emit(item);
    this.viewCtrl.dismiss();
  }

}
