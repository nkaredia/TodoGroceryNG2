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
