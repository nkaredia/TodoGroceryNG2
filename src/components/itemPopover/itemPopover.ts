import { Component } from '@angular/core';
import { DataFactory } from '../../providers/dataFactory';
import { ITEMSORT } from '../../common/tgCore';
import {
  ViewController
} from 'ionic-angular';

@Component({
  selector: 'tg-item-popover',
  templateUrl: 'itemPopover.html'
})
export class ItemPopover {
  sortQueries: Array<ISortPopoverObject>;
  constructor(private viewCtrl: ViewController,
    private factory: DataFactory) {
    this.sortQueries = [
      { label: 'Newest Last', value: ITEMSORT.new_last },
      { label: 'Newest First', value: ITEMSORT.new_first },
      { label: 'Sort by Name', value: ITEMSORT.name },
      { label: 'Sort by Quantity', value: ITEMSORT.quantity },
      { label: 'Sort by Unit', value: ITEMSORT.unit }
    ]
  }

  deleteAllItems = (e: Event) => {
    this.factory.deleteBulkItems(this.factory.items.getValue());
  }

  changeSortQuery = (sort: ISortPopoverObject) => {
    this.factory.changeSort(sort.value);
  }
}

interface ISortPopoverObject {
  label: string;
  value: ITEMSORT;
  checked?: boolean;
}
