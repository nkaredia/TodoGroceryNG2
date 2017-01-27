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
  searchItems: Array<ListItem>;

  glo = G;
  showSearchBar: boolean;

  constructor(public navCtrl: NavController,
    private popover: Popover,
    private menuCtrl: MenuController,
    private factory: TgDataFactory,
    private ixdb: IxDB,
    private modalCtrl: ModalController,
    private addItemCtrl: AddItem) {
    this.menuCtrl.enable(true);
    this.listItems = [];
    this.searchItems = this.listItems;
    this.factory.setListItemsByName('untitled list');
    this.showSearchBar = false;
  }

  ngOnInit() {
  }

  closeMenuDrawer() {
    this.menuCtrl.close();
  }

  openSearchBar(e: Event) {
    this.showSearchBar = true;
    setTimeout(() => {
      document.getElementById('srbar').classList.add('animate');
      document.getElementById('srbar-back').classList.add('animate');
    }, 10);
  }

  search = (query: Event) => {
    this.searchItems = this.listItems;
    if(query.srcElement['value'].length === 0) {
      this.searchItems = this.listItems;
    } else {
      this.searchItems = this.listItems.filter((value: ListItem, index: number) => {
        return value.name.startsWith(query.srcElement['value']);
      });
    }
  }

  hideSearchBar() {
    this.showSearchBar = false;
  }

  changeCurrentList(list: List) {
    this.currentlist = list;
    this.listItems = [];
    this.getMoreItems(null);
  }

  getAllListItems = () => {
    this.factory.getListItems(this.currentlist.name).subscribe(value => {
      this.listItems = value;
    }, error => {
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
    let modal = this.modalCtrl.create(AddItem, { currentList: this.currentlist });
    modal.present();
    modal.onDidDismiss(value => {
      if (value && value.addItemModel) {
        this.newItem = value.addItemModel;
        this.factory.addNewListItem(this.newItem).then(value => {
          this.getAllListItems();
        }).catch(error => {
        });
      }
    });
  }

  deleteItem = (item: ListItem) => {
    this.factory.deleteListItem(item).then(value => {
      this.listItems.splice(this.listItems.indexOf(item), 1);
    }).catch(error => {
    });
  }

  checkItem = (item: ListItem) => {
    let checkItem = this.listItems[this.listItems.indexOf(item)];
    checkItem.isChecked = !checkItem.isChecked;
    this.factory.checkItem(checkItem)
      .then(value => {
      })
      .catch(error => {
      });
  }

  getMoreItems = (e: any) => {
    this.factory.getItemsInRange(
      this.listItems.length,
      this.currentlist.name
    ).then((value: Array<ListItem>) => {
      this.listItems = this.listItems.concat(value);
      this.searchItems = this.listItems;
      if (e && e.complete) {
        e.complete();
      }
    }).catch(error => {
      console.error(error);
    });
  }

}
