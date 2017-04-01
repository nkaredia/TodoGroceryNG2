import { Component } from '@angular/core';
import { DataFactory } from '../../providers/dataFactory';
import { IStore, IItem, UNIT } from '../../common/tgCore';
import {
  NavController,
  MenuController,
  ModalController,
  PopoverController
} from 'ionic-angular';
import { AddItem } from '../../components/addItem/addItem';
import { Popover } from '../../components/popover/popover';
import { ItemPopover } from '../../components/itemPopover/itemPopover';

@Component({
  selector: 'tg-list',
  templateUrl: 'list.html'
})
export class List {
  private search: boolean;
  private searchQuery: string;
  private selectItemInProgress: boolean;
  private selectedItemsToRemove: Array<IItem>;
  private toggleAllItems: boolean;
  private allItemsSelected: boolean;

  constructor(public navCtrl: NavController,
    private factory: DataFactory,
    private menuCtrl: MenuController,
    private modalCtrl: ModalController,
    private popoverCtrl: PopoverController) {
    this.search = false;
    this.selectItemInProgress = false;
    this.selectedItemsToRemove = [];
    this.toggleAllItems = false;
    this.allItemsSelected = false;
    this.registerSubscribers();
  }

  registerSubscribers = () => {
    this.factory.currentStore.subscribe(this.changeCurrentStore);
    this.factory.items.subscribe(this.subscribeItems);
  };

  toggleSearch = (e: Event) => {
    this.search = !this.search;
  };

  searchFor = (e: Event) => {
    this.searchQuery = e.srcElement['value'];
  };

  changeCurrentStore = (store: IStore) => {
    if (this.menuCtrl) {
      this.menuCtrl.close();
    }
  };

  subscribeAddItem = async (item: IItem) => {
    item.checked = false;
    item.storeId = this.factory.currentStore.getValue().id;
    this.factory.addNewItem(item);
  };

  checkItem = (item: IItem) => {
    if (!this.selectItemInProgress) {
      item.checked = !item.checked;
      this.factory.updateItem(item);
    }
  }

  deleteItem = (item: IItem) => {
    this.factory.deleteItem(item);
  }

  subscribeItems = (items: Array<IItem>) => {
  };

  addNewItem = (e: Event) => {
    let modal = this.modalCtrl.create(AddItem);
    modal.present();
    modal.subscribe(this.subscribeAddItem);
  }

  getUnitByIndex = (unit: UNIT) => {
    return UNIT[unit].toLowerCase();
  }

  openPopover = (e: Event) => {
    let popover = this.popoverCtrl.create(Popover);
    popover.present({
      ev: e
    });
  }

  openItemPopover = (e: Event) => {
    let popover = this.popoverCtrl.create(ItemPopover);
    popover.present({
      ev: e
    });
  }

  enableSelectItems = (e: Event, item: IItem) => {
    e.preventDefault();
    console.log('item long press', e);
    this.selectItemInProgress = true;

  }

  disableSelectItems = (e: Event) => {
    this.selectItemInProgress = false;
    this.selectedItemsToRemove = [];
  }

  selectItem = (e: Event, item: IItem) => {
    let __item = this.selectedItemsToRemove.find(i => i.id === item.id);
    let isChecked = e.srcElement.parentNode.previousSibling['classList'].contains('checkbox-checked');
    if (!__item && isChecked) {
      this.selectedItemsToRemove.push(item);
      this.toggleAllItems = this.factory.items.getValue().length === this.selectedItemsToRemove.length ? true : false;
    } else if (__item && !isChecked) {
      this.selectedItemsToRemove = this.selectedItemsToRemove.filter(i => i.id !== item.id);
      this.toggleAllItems = false;
    }
  }

  toggleSelectAllItems = (e: Event, isChecked: boolean) => {
    this.toggleAllItems = isChecked;
    this.allItemsSelected = null;
    setTimeout(() => {
      this.allItemsSelected = isChecked;
    }, 0);
    this.selectedItemsToRemove = this.toggleAllItems ? this.factory.items.getValue() : [];
  }
}
