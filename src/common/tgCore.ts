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
  doz = 0,
  gal = 1,
  gm = 2,
  kg = 3,
  lb = 4,
  lt = 5,
  pk = 6
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
    if (items && items.length > 0 && searchQuery && searchQuery.length > 0) {
      return items.filter((item) => {
        return item.name.toLowerCase().startsWith(searchQuery.toLowerCase());
      });
    }
    return items;
  }
}

export interface IAppSettings {
  theme: string;
  sortBy: ITEMSORT;
}

export enum ITEMSORT {
  new_last = 1,
  new_first = 2,
  name = 3,
  quantity = 4,
  unit = 5
}