import { Toast, ToastOptions, ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';

export declare interface IStore {
  id?: number;
  name: string;
}

export declare interface IList {
  id?: number;
  store: IStore;
  name: string;
  quantity: number;
  unit: UNIT;
  checked: boolean;
}

export declare enum UNIT {
  pk = 0,
  kg = 1,
  lb = 2,
  lt = 3,
  gl = 4,
  dz = 5
}

export enum TABLE {
  STORES = 0,
  ITEMS = 1
}
