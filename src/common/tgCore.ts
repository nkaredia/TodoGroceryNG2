import { Pipe, Injectable, PipeTransform } from '@angular/core';

export declare interface IStore {
  id?: number;
  name: string;
}

export declare interface IItem {
  id?: number;
  storeId: number;
  name: string;
  quantity: number;
  unit: UNIT;
  checked: boolean;
}

export enum UNIT {
  pk = 0,
  kg = 1,
  gm = 2,
  lb = 3,
  lt = 4,
  gal = 5,
  doz = 6
}

export enum TABLE {
  STORES = 0,
  ITEMS = 1
}

@Injectable()
@Pipe({
  name: 'searchFor'
})
export class SearchForPipe implements PipeTransform {
  transform(items: Array<IItem>, searchQuery: string) {
    // return items.filter((item) => {
    //   if (searchQuery && searchQuery[0] && searchQuery[0].length > 0) {
    //     return item.name.toLowerCase().startsWith(searchQuery[0].toLowerCase());
    //   } else {
    //     return true;
    //   }
    // });
    if (items && items.length > 0 && searchQuery && searchQuery.length > 0) {
      return items.filter((item) => {
        return item.name.toLowerCase().startsWith(searchQuery.toLowerCase());
      });
    }
    return items;
  }
}