import { Component, Input, OnInit } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { Popover } from '../../components/popover/popover';
import { AddItem } from '../../components/addItem/addItem';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { TgDataFactory } from '../../providers/tg-data-factory';
import 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Popover, AddItem]
})
export class HomePage implements OnInit {

  currentList: List;
  listItems: Array<ListItem>;

  constructor(public navCtrl: NavController,
    private popover: Popover,
    private menuCtrl: MenuController,
    private modalCtrl: AddItem,
    private factory: TgDataFactory) {
    this.menuCtrl.enable(true);
    this.listItems = [];
  }

  ngOnInit() {
    // this.menu.listClickObservable.subscribe((list:List) => {
    //   console.log('--nk from home', list);
    // }, (error: any) => {

    // }, () => {

    // })
    this.factory.getListItems().subscribe(value => {
      console.log('from home', value);
      this.listItems = value;
    }, error => {
      console.log(error);
    }, () => {

    })

  }

  changeCurrentList(list: List) {
    console.log('from home with love', list);
  }

  getCurrentList = (): string[] => {
    return ['a', 'b'];
  }

  presentPopover(ev: Event) {
    this.popover.presentPopover(ev);
  }

  addItem(ev: Event) {
    console.log('cliked');
    this.modalCtrl.presentModal();
  }

}
