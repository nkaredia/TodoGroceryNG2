import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { TgDataFactory } from '../../providers/tg-data-factory';


@Component({
  selector: 'tg-list-modal',
  templateUrl: 'addlist.html'
})
export class AddList {

  listName: string;

  constructor(private viewCtrl: ViewController,
    private navParams: NavParams,
    private tgDataFactory: TgDataFactory) {
    console.log(this.navParams);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TgAddItemPage');
  }


  dissmiss() {
    this.viewCtrl.dismiss();
  }

  addNewList(e: Event) {
    e.preventDefault();
    console.log(this.listName);
    if (this.listName.trim().length > 0) {
      this.tgDataFactory.hasList(this.listName).subscribe(value => {
        if (!value) {
          this.navParams.data['emitter'].emit({name: this.listName});
          this.dissmiss();
        } else {
          console.log('list already exists');
        }
      });
    }
  }

}
