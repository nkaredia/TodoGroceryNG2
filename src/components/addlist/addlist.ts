import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { TgDataFactory } from '../../providers/tg-data-factory';



@Component({
  selector: 'tg-list-modal',
  templateUrl: 'addlist.html'
})
export class AddList {

  private addListModel: IAddListModel;

  constructor(private viewCtrl: ViewController,
    private navParams: NavParams,
    private tgDataFactory: TgDataFactory) {
    this.addListModel = this.navParams.data;
  }

  ionViewDidLoad() {
  }


  dissmiss() {
    this.viewCtrl.dismiss();
  }

  addNewList(e: Event) {
    e.preventDefault();
    if (this.addListModel.listName.trim().length > 0) {
      this.tgDataFactory.hasList(this.addListModel.listName).subscribe(value => {
        if (!value) {
          this.addListModel.emitter.emit({ newList: { name: this.addListModel.listName }, oldList: this.addListModel.currentList });
          this.dissmiss();
        } else {
        }
      });
    }
  }

}
