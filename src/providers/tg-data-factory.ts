import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the TgDataFactory provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TgDataFactory {

  private Lists: Array<Array<Item>>;

  constructor(public http: Http) {
    console.log('Hello TgDataFactory Provider');
  }

  getCachedLists = (): Array<Array<Item>> => {
    return this.Lists;
  }

  getRefreshedLists = (): Array<Array<Item>> => {
    this.Lists = JSON.parse(window.localStorage.getItem('Lists'));
    return this.Lists;
  }

}


class Item {

  constructor() {
    this.itemName = '';
  }

  set itemName(item: string) {
    this.itemName = item;
  }

  get itemName(): string {
    return this.itemName;
  }

  set itemQuantity(item: string) {
    this.itemQuantity = item;
  }

  get itemQuantity(): string {
    return this.itemQuantity;
  }

  set itemUnit(item: string) {
    this.itemUnit = item;
  }

  get itemUnit(): string {
    return this.itemUnit;
  }

}