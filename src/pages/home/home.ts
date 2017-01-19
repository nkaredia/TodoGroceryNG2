import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, ModalController } from 'ionic-angular';
import { Popover } from '../../components/popover/popover';
import { AddItem } from '../../components/addItem/addItem';
import { TgDataFactory } from '../../providers/tg-data-factory';
import { IxDB } from '../../providers/ixdb';
import * as G from '../../globals';
import 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Popover, AddItem]
})
export class HomePage implements OnInit {

  listItems: Array<ListItem>;
  currentlist: List;
  newItem: ListItem;

  glo = G;

  constructor(public navCtrl: NavController,
    private popover: Popover,
    private menuCtrl: MenuController,
    private factory: TgDataFactory,
    private ixdb: IxDB,
    private modalCtrl: ModalController,
    private addItemCtrl: AddItem) {
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
    this.currentlist = list;
    this.getAllListItems();
  }

  getAllListItems = () => {
    this.factory.getListItems(this.currentlist.name).subscribe(value => {
      console.log('from home', value);
      this.listItems = value;
    }, error => {
      console.log(error);
    }, () => {

    });
  }

  getCurrentList = (): string[] => {
    return ['a', 'b'];
  }

  presentPopover(ev: Event) {
    this.popover.presentPopover(ev);
  }

  addItem(ev: Event) {
    console.log('cliked');
    let modal = this.modalCtrl.create(AddItem, { currentList: this.currentlist });
    modal.present();
    modal.onDidDismiss(value => {
      console.log('dissmiss', value);
      if (value && value.addItemModel) {
        this.newItem = value.addItemModel;
        this.factory.addNewListItem(this.newItem).then(value => {
          this.getAllListItems();
        }).catch(error => {
          console.log("Error adding new list item");
        });
      }
    });
  }

  checkItem = (item: ListItem) => {
    //this.listItems[this.listItems.indexOf(item)].isChecked = !this.listItems[this.listItems.indexOf(item)].isChecked;
    let checkItem = this.listItems[this.listItems.indexOf(item)];
    checkItem.isChecked = !checkItem.isChecked;
    this.factory.checkItem(checkItem).then(value => {
      //this.listItems[this.listItems.indexOf(item)].isChecked = !this.listItems[this.listItems.indexOf(item)].isChecked;
    })
    .catch(error => {
      console.log('error checking item');
    });
  }

}
