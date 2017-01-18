import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { Popover } from '../../components/popover/popover';
import { AddItem } from '../../components/addItem/addItem';
import { TgDataFactory } from '../../providers/tg-data-factory';
import { IxDB } from '../../providers/ixdb';
import 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Popover, AddItem]
})
export class HomePage implements OnInit {

  listItems: Array<ListItem>;

  constructor(public navCtrl: NavController,
    private popover: Popover,
    private menuCtrl: MenuController,
    private modalCtrl: AddItem,
    private factory: TgDataFactory,
    private ixdb: IxDB) {
    this.menuCtrl.enable(true);
    this.listItems = [];
    this.factory.setListItemsByName('untitled list');
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

    this.factory.currentListItems.subscribe(value => {
      this.listItems = value;
    })

    // this.ixdb.getListItems('untitled list').subscribe(value => {
    //   console.log(value, '---nk---------------');
    //   this.listItems = value;
    // })
  }

  closeMenuDrawer() {
    this.menuCtrl.close();
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
