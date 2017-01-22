import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import Dexie from 'dexie';
import 'rxjs/add/operator/map';

/*
  Generated class for the TgDataFactory provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class IxDB {

  private __db: Dexie;

  constructor() {
    this.__db = new Dexie('tgDB');
    this.__db.version(1).stores({
      listItems: '++id, listName, name, quantity, unit, isChecked',
      LISTS: '++id, name'
    });
    //     this.__db.table<ListItem>('listItems').bulkAdd([{"listName":"Costco","name":"Caramel","quantity":5,"unit":4,"isChecked":false},
    // {"listName":"Walmart","name":"Cake","quantity":20,"unit":4,"isChecked":true},
    // {"listName":"Costco","name":"Lays","quantity":14,"unit":3,"isChecked":false},
    // {"listName":"Costco","name":"Chocolate","quantity":8,"unit":5,"isChecked":true},
    // {"listName":"Costco","name":"Fanta","quantity":11,"unit":3,"isChecked":true},
    // {"listName":"Walmart","name":"Burger","quantity":11,"unit":4,"isChecked":true},
    // {"listName":"Costco","name":"Chocolate","quantity":5,"unit":5,"isChecked":false},
    // {"listName":"Walmart","name":"Bread","quantity":6,"unit":5,"isChecked":true},
    // {"listName":"Walmart","name":"Juice","quantity":6,"unit":5,"isChecked":true},
    // {"listName":"Walmart","name":"Dough","quantity":13,"unit":5,"isChecked":false},
    // {"listName":"Costco","name":"Chocolate","quantity":18,"unit":2,"isChecked":false},
    // {"listName":"Costco","name":"Chocolate","quantity":18,"unit":2,"isChecked":false},
    // {"listName":"Walmart","name":"Dough","quantity":12,"unit":3,"isChecked":true},
    // {"listName":"Costco","name":"Coca Cola","quantity":10,"unit":1,"isChecked":false},
    // {"listName":"Walmart","name":"Chocolate","quantity":2,"unit":4,"isChecked":false},
    // {"listName":"Walmart","name":"Apple","quantity":2,"unit":5,"isChecked":false},
    // {"listName":"Walmart","name":"Lays","quantity":19,"unit":3,"isChecked":false},
    // {"listName":"Walmart","name":"Wheat","quantity":7,"unit":2,"isChecked":false},
    // {"listName":"Costco","name":"Apple","quantity":18,"unit":1,"isChecked":false},
    // {"listName":"Walmart","name":"Chips","quantity":16,"unit":4,"isChecked":true},
    // {"listName":"Walmart","name":"Burger","quantity":14,"unit":2,"isChecked":false},
    // {"listName":"Costco","name":"Coca Cola","quantity":14,"unit":2,"isChecked":true},
    // {"listName":"Costco","name":"Orange","quantity":15,"unit":2,"isChecked":false},
    // {"listName":"Walmart","name":"Chocolate","quantity":12,"unit":3,"isChecked":false},
    // {"listName":"Walmart","name":"Cake","quantity":13,"unit":2,"isChecked":true},
    // {"listName":"Costco","name":"Snack","quantity":20,"unit":3,"isChecked":true},
    // {"listName":"Costco","name":"Juice","quantity":17,"unit":4,"isChecked":true},
    // {"listName":"Costco","name":"Snack","quantity":11,"unit":5,"isChecked":false},
    // {"listName":"Costco","name":"Bread","quantity":14,"unit":4,"isChecked":false},
    // {"listName":"Walmart","name":"Bread","quantity":18,"unit":1,"isChecked":false},
    // {"listName":"Costco","name":"Chocolate","quantity":16,"unit":1,"isChecked":false},
    // {"listName":"Costco","name":"Apple","quantity":10,"unit":2,"isChecked":true},
    // {"listName":"Walmart","name":"Bread","quantity":5,"unit":4,"isChecked":false},
    // {"listName":"Walmart","name":"Snack","quantity":8,"unit":2,"isChecked":false},
    // {"listName":"Walmart","name":"Fanta","quantity":16,"unit":3,"isChecked":true},
    // {"listName":"Costco","name":"Bread","quantity":18,"unit":2,"isChecked":false},
    // {"listName":"Costco","name":"Milk","quantity":1,"unit":3,"isChecked":false},
    // {"listName":"Walmart","name":"Burger","quantity":11,"unit":2,"isChecked":false},
    // {"listName":"Walmart","name":"Mango","quantity":19,"unit":5,"isChecked":false},
    // {"listName":"Walmart","name":"Lays","quantity":20,"unit":2,"isChecked":false},
    // {"listName":"Walmart","name":"Fanta","quantity":6,"unit":4,"isChecked":false},
    // {"listName":"Costco","name":"Wheat","quantity":16,"unit":3,"isChecked":false},
    // {"listName":"Walmart","name":"Wheat","quantity":11,"unit":5,"isChecked":false},
    // {"listName":"Costco","name":"Lays","quantity":14,"unit":1,"isChecked":false},
    // {"listName":"Costco","name":"Lays","quantity":8,"unit":5,"isChecked":true},
    // {"listName":"Walmart","name":"Cake","quantity":2,"unit":1,"isChecked":false},
    // {"listName":"Costco","name":"Burger","quantity":7,"unit":5,"isChecked":true},
    // {"listName":"Costco","name":"Apple","quantity":15,"unit":1,"isChecked":false},
    // {"listName":"Walmart","name":"Coca Cola","quantity":2,"unit":2,"isChecked":true},
    // {"listName":"Costco","name":"Apple","quantity":3,"unit":2,"isChecked":false},
    // {"listName":"Walmart","name":"Coca Cola","quantity":17,"unit":2,"isChecked":false},
    // {"listName":"Costco","name":"Mango","quantity":8,"unit":3,"isChecked":false},
    // {"listName":"Walmart","name":"Banana","quantity":11,"unit":3,"isChecked":false},
    // {"listName":"Costco","name":"Coca Cola","quantity":20,"unit":4,"isChecked":true},
    // {"listName":"Walmart","name":"Juice","quantity":6,"unit":3,"isChecked":false},
    // {"listName":"Costco","name":"Chocolate","quantity":20,"unit":5,"isChecked":false},
    // {"listName":"Walmart","name":"Coca Cola","quantity":3,"unit":1,"isChecked":true},
    // {"listName":"Walmart","name":"Wheat","quantity":13,"unit":4,"isChecked":true},
    // {"listName":"Walmart","name":"Dough","quantity":6,"unit":5,"isChecked":true},
    // {"listName":"Costco","name":"Orange","quantity":7,"unit":5,"isChecked":false},
    // {"listName":"Walmart","name":"Lays","quantity":8,"unit":5,"isChecked":false},
    // {"listName":"Walmart","name":"Chocolate","quantity":17,"unit":5,"isChecked":false},
    // {"listName":"Costco","name":"Orange","quantity":17,"unit":3,"isChecked":false},
    // {"listName":"Walmart","name":"Cake","quantity":8,"unit":5,"isChecked":false},
    // {"listName":"Costco","name":"Coca Cola","quantity":18,"unit":5,"isChecked":false},
    // {"listName":"Costco","name":"Fanta","quantity":20,"unit":1,"isChecked":true},
    // {"listName":"Costco","name":"Bread","quantity":20,"unit":1,"isChecked":true},
    // {"listName":"Costco","name":"Wheat","quantity":9,"unit":1,"isChecked":false},
    // {"listName":"Walmart","name":"Mango","quantity":11,"unit":2,"isChecked":true},
    // {"listName":"Walmart","name":"Banana","quantity":17,"unit":1,"isChecked":true},
    // {"listName":"Costco","name":"Dough","quantity":2,"unit":1,"isChecked":true},
    // {"listName":"Costco","name":"Apple","quantity":5,"unit":5,"isChecked":true},
    // {"listName":"Costco","name":"Fanta","quantity":12,"unit":4,"isChecked":false},
    // {"listName":"Costco","name":"Burger","quantity":19,"unit":4,"isChecked":false},
    // {"listName":"Walmart","name":"Apple","quantity":1,"unit":1,"isChecked":true},
    // {"listName":"Walmart","name":"Mango","quantity":10,"unit":2,"isChecked":false},
    // {"listName":"Walmart","name":"Orange","quantity":10,"unit":2,"isChecked":true},
    // {"listName":"Walmart","name":"Chips","quantity":8,"unit":2,"isChecked":true},
    // {"listName":"Walmart","name":"Orange","quantity":12,"unit":4,"isChecked":true},
    // {"listName":"Walmart","name":"Juice","quantity":17,"unit":1,"isChecked":false},
    // {"listName":"Walmart","name":"Orange","quantity":5,"unit":1,"isChecked":true},
    // {"listName":"Costco","name":"Bread","quantity":7,"unit":1,"isChecked":true},
    // {"listName":"Walmart","name":"Dough","quantity":15,"unit":3,"isChecked":true},
    // {"listName":"Costco","name":"Banana","quantity":20,"unit":5,"isChecked":true},
    // {"listName":"Walmart","name":"Fanta","quantity":15,"unit":4,"isChecked":false},
    // {"listName":"Walmart","name":"Burger","quantity":9,"unit":5,"isChecked":true},
    // {"listName":"Costco","name":"Mango","quantity":19,"unit":1,"isChecked":false},
    // {"listName":"Costco","name":"Dough","quantity":14,"unit":5,"isChecked":true},
    // {"listName":"Walmart","name":"Snack","quantity":2,"unit":4,"isChecked":false},
    // {"listName":"Costco","name":"Wheat","quantity":18,"unit":5,"isChecked":false},
    // {"listName":"Walmart","name":"Burger","quantity":4,"unit":1,"isChecked":false},
    // {"listName":"Costco","name":"Chips","quantity":10,"unit":5,"isChecked":false},
    // {"listName":"Walmart","name":"Apple","quantity":13,"unit":1,"isChecked":true},
    // {"listName":"Walmart","name":"Cake","quantity":12,"unit":4,"isChecked":false},
    // {"listName":"Costco","name":"Milk","quantity":11,"unit":2,"isChecked":true},
    // {"listName":"Walmart","name":"Coca Cola","quantity":18,"unit":5,"isChecked":false},
    // {"listName":"Walmart","name":"Orange","quantity":15,"unit":5,"isChecked":false},
    // {"listName":"Costco","name":"Lays","quantity":3,"unit":3,"isChecked":false},
    // {"listName":"Costco","name":"Juice","quantity":10,"unit":1,"isChecked":true},
    // {"listName":"Costco","name":"Juice","quantity":13,"unit":4,"isChecked":true},
    // {"listName":"Walmart","name":"Snack","quantity":17,"unit":2,"isChecked":true},
    // {"listName":"Costco","name":"Apple","quantity":16,"unit":1,"isChecked":true},
    // {"listName":"Walmart","name":"Orange","quantity":18,"unit":1,"isChecked":true},
    // {"listName":"Walmart","name":"Orange","quantity":18,"unit":3,"isChecked":false},
    // {"listName":"Costco","name":"Bread","quantity":15,"unit":3,"isChecked":false},
    // {"listName":"Costco","name":"Chips","quantity":18,"unit":2,"isChecked":true},
    // {"listName":"Costco","name":"Dough","quantity":4,"unit":3,"isChecked":true},
    // {"listName":"Walmart","name":"Cake","quantity":1,"unit":4,"isChecked":false},
    // {"listName":"Costco","name":"Lays","quantity":4,"unit":1,"isChecked":false},
    // {"listName":"Costco","name":"Caramel","quantity":10,"unit":5,"isChecked":true},
    // {"listName":"Walmart","name":"Bread","quantity":9,"unit":5,"isChecked":false},
    // {"listName":"Walmart","name":"Banana","quantity":6,"unit":3,"isChecked":false},
    // {"listName":"Costco","name":"Banana","quantity":9,"unit":1,"isChecked":false},
    // {"listName":"Walmart","name":"Cake","quantity":1,"unit":3,"isChecked":true},
    // {"listName":"Walmart","name":"Snack","quantity":2,"unit":2,"isChecked":false},
    // {"listName":"Costco","name":"Snack","quantity":2,"unit":2,"isChecked":true},
    // {"listName":"Walmart","name":"Mango","quantity":4,"unit":4,"isChecked":true},
    // {"listName":"Walmart","name":"Snack","quantity":19,"unit":5,"isChecked":false},
    // {"listName":"Costco","name":"Chips","quantity":14,"unit":4,"isChecked":true},
    // {"listName":"Costco","name":"Milk","quantity":10,"unit":1,"isChecked":true},
    // {"listName":"Costco","name":"Wheat","quantity":8,"unit":5,"isChecked":false},
    // {"listName":"Walmart","name":"Wheat","quantity":11,"unit":4,"isChecked":false},
    // {"listName":"Walmart","name":"Burger","quantity":5,"unit":1,"isChecked":false},
    // {"listName":"Walmart","name":"Fanta","quantity":12,"unit":1,"isChecked":false},
    // {"listName":"Costco","name":"Milk","quantity":18,"unit":1,"isChecked":true},
    // {"listName":"Walmart","name":"Snack","quantity":2,"unit":2,"isChecked":true},
    // {"listName":"Costco","name":"Coca Cola","quantity":7,"unit":2,"isChecked":true},
    // {"listName":"Walmart","name":"Cake","quantity":2,"unit":4,"isChecked":false},
    // {"listName":"Walmart","name":"Chocolate","quantity":20,"unit":3,"isChecked":true},
    // {"listName":"Costco","name":"Mango","quantity":20,"unit":3,"isChecked":true},
    // {"listName":"Walmart","name":"Mango","quantity":7,"unit":4,"isChecked":false},
    // {"listName":"Walmart","name":"Snack","quantity":9,"unit":1,"isChecked":false},
    // {"listName":"Walmart","name":"Chocolate","quantity":4,"unit":2,"isChecked":true},
    // {"listName":"Walmart","name":"Milk","quantity":16,"unit":1,"isChecked":true},
    // {"listName":"Walmart","name":"Snack","quantity":15,"unit":2,"isChecked":false},
    // {"listName":"Costco","name":"Wheat","quantity":3,"unit":1,"isChecked":true},
    // {"listName":"Costco","name":"Bread","quantity":8,"unit":2,"isChecked":false},
    // {"listName":"Walmart","name":"Chocolate","quantity":15,"unit":3,"isChecked":true},
    // {"listName":"Costco","name":"Caramel","quantity":16,"unit":5,"isChecked":false},
    // {"listName":"Walmart","name":"Juice","quantity":10,"unit":5,"isChecked":false},
    // {"listName":"Walmart","name":"Burger","quantity":3,"unit":3,"isChecked":false},
    // {"listName":"Walmart","name":"Chips","quantity":5,"unit":4,"isChecked":true},
    // {"listName":"Walmart","name":"Burger","quantity":16,"unit":3,"isChecked":true},
    // {"listName":"Walmart","name":"Lays","quantity":1,"unit":3,"isChecked":false},
    // {"listName":"Walmart","name":"Fanta","quantity":9,"unit":3,"isChecked":false},
    // {"listName":"Walmart","name":"Juice","quantity":17,"unit":5,"isChecked":false},
    // {"listName":"Walmart","name":"Chips","quantity":10,"unit":4,"isChecked":false},
    // {"listName":"Walmart","name":"Mango","quantity":10,"unit":3,"isChecked":false},
    // {"listName":"Costco","name":"Chips","quantity":15,"unit":3,"isChecked":true},
    // {"listName":"Walmart","name":"Chips","quantity":3,"unit":5,"isChecked":false},
    // {"listName":"Walmart","name":"Bread","quantity":3,"unit":1,"isChecked":true},
    // {"listName":"Walmart","name":"Coca Cola","quantity":8,"unit":5,"isChecked":true},
    // {"listName":"Walmart","name":"Chips","quantity":10,"unit":2,"isChecked":true},
    // {"listName":"Walmart","name":"Chocolate","quantity":17,"unit":3,"isChecked":false},
    // {"listName":"Walmart","name":"Dough","quantity":19,"unit":3,"isChecked":false},
    // {"listName":"Costco","name":"Cake","quantity":16,"unit":1,"isChecked":true},
    // {"listName":"Costco","name":"Chips","quantity":8,"unit":5,"isChecked":true},
    // {"listName":"Costco","name":"Dough","quantity":2,"unit":1,"isChecked":true},
    // {"listName":"Costco","name":"Chips","quantity":19,"unit":2,"isChecked":false},
    // {"listName":"Costco","name":"Chocolate","quantity":7,"unit":3,"isChecked":true},
    // {"listName":"Costco","name":"Chocolate","quantity":2,"unit":4,"isChecked":false},
    // {"listName":"Walmart","name":"Coca Cola","quantity":8,"unit":4,"isChecked":true},
    // {"listName":"Costco","name":"Banana","quantity":11,"unit":3,"isChecked":false},
    // {"listName":"Costco","name":"Milk","quantity":2,"unit":5,"isChecked":true},
    // {"listName":"Costco","name":"Lays","quantity":3,"unit":1,"isChecked":false},
    // {"listName":"Walmart","name":"Chips","quantity":6,"unit":5,"isChecked":true},
    // {"listName":"Walmart","name":"Chips","quantity":8,"unit":3,"isChecked":false},
    // {"listName":"Costco","name":"Dough","quantity":1,"unit":1,"isChecked":true},
    // {"listName":"Costco","name":"Coca Cola","quantity":17,"unit":3,"isChecked":true},
    // {"listName":"Costco","name":"Banana","quantity":2,"unit":3,"isChecked":false},
    // {"listName":"Costco","name":"Snack","quantity":13,"unit":2,"isChecked":false},
    // {"listName":"Costco","name":"Coca Cola","quantity":4,"unit":3,"isChecked":true},
    // {"listName":"Walmart","name":"Coca Cola","quantity":15,"unit":3,"isChecked":true},
    // {"listName":"Costco","name":"Bread","quantity":9,"unit":4,"isChecked":false},
    // {"listName":"Walmart","name":"Caramel","quantity":14,"unit":5,"isChecked":true},
    // {"listName":"Walmart","name":"Orange","quantity":14,"unit":1,"isChecked":false},
    // {"listName":"Walmart","name":"Chips","quantity":3,"unit":4,"isChecked":false},
    // {"listName":"Walmart","name":"Chocolate","quantity":3,"unit":2,"isChecked":false},
    // {"listName":"Walmart","name":"Apple","quantity":16,"unit":4,"isChecked":true},
    // {"listName":"Costco","name":"Dough","quantity":1,"unit":2,"isChecked":true},
    // {"listName":"Walmart","name":"Chocolate","quantity":5,"unit":2,"isChecked":false},
    // {"listName":"Walmart","name":"Juice","quantity":2,"unit":5,"isChecked":true},
    // {"listName":"Walmart","name":"Coca Cola","quantity":9,"unit":2,"isChecked":false},
    // {"listName":"Costco","name":"Chocolate","quantity":16,"unit":3,"isChecked":false},
    // {"listName":"Walmart","name":"Apple","quantity":12,"unit":4,"isChecked":false},
    // {"listName":"Walmart","name":"Cake","quantity":2,"unit":3,"isChecked":true},
    // {"listName":"Walmart","name":"Wheat","quantity":10,"unit":2,"isChecked":false},
    // {"listName":"Walmart","name":"Chocolate","quantity":12,"unit":1,"isChecked":true},
    // {"listName":"Walmart","name":"Apple","quantity":16,"unit":1,"isChecked":false},
    // {"listName":"Costco","name":"Mango","quantity":20,"unit":2,"isChecked":true},
    // {"listName":"Costco","name":"Chocolate","quantity":4,"unit":3,"isChecked":true},
    // {"listName":"Walmart","name":"Wheat","quantity":4,"unit":3,"isChecked":false},
    // {"listName":"Costco","name":"Lays","quantity":9,"unit":4,"isChecked":true},
    // {"listName":"Costco","name":"Chocolate","quantity":11,"unit":3,"isChecked":true},
    // {"listName":"Costco","name":"Wheat","quantity":10,"unit":5,"isChecked":true},
    // {"listName":"Costco","name":"Orange","quantity":12,"unit":5,"isChecked":false},
    // {"listName":"Walmart","name":"Mango","quantity":11,"unit":3,"isChecked":false},
    // {"listName":"Walmart","name":"Chocolate","quantity":15,"unit":4,"isChecked":true},
    // {"listName":"Costco","name":"Mango","quantity":7,"unit":2,"isChecked":true},
    // {"listName":"Walmart","name":"Mango","quantity":5,"unit":4,"isChecked":false},
    // {"listName":"Costco","name":"Chocolate","quantity":13,"unit":4,"isChecked":true},
    // {"listName":"Walmart","name":"Orange","quantity":14,"unit":5,"isChecked":true},
    // {"listName":"Costco","name":"Caramel","quantity":16,"unit":1,"isChecked":true},
    // {"listName":"Costco","name":"Snack","quantity":3,"unit":4,"isChecked":false},
    // {"listName":"Walmart","name":"Fanta","quantity":19,"unit":4,"isChecked":true},
    // {"listName":"Costco","name":"Bread","quantity":7,"unit":3,"isChecked":false},
    // {"listName":"Costco","name":"Snack","quantity":5,"unit":5,"isChecked":true},
    // {"listName":"Costco","name":"Banana","quantity":9,"unit":1,"isChecked":false},
    // {"listName":"Walmart","name":"Caramel","quantity":19,"unit":2,"isChecked":true},
    // {"listName":"Walmart","name":"Fanta","quantity":2,"unit":2,"isChecked":false},
    // {"listName":"Costco","name":"Milk","quantity":2,"unit":2,"isChecked":true},
    // {"listName":"Walmart","name":"Banana","quantity":9,"unit":5,"isChecked":true},
    // {"listName":"Costco","name":"Juice","quantity":9,"unit":5,"isChecked":false},
    // {"listName":"Walmart","name":"Mango","quantity":12,"unit":1,"isChecked":true},
    // {"listName":"Walmart","name":"Caramel","quantity":4,"unit":4,"isChecked":true},
    // {"listName":"Walmart","name":"Orange","quantity":19,"unit":4,"isChecked":false},
    // {"listName":"Costco","name":"Dough","quantity":19,"unit":4,"isChecked":false},
    // {"listName":"Walmart","name":"Cake","quantity":11,"unit":1,"isChecked":false},
    // {"listName":"Walmart","name":"Mango","quantity":8,"unit":1,"isChecked":true},
    // {"listName":"Walmart","name":"Apple","quantity":17,"unit":1,"isChecked":false},
    // {"listName":"Costco","name":"Chips","quantity":6,"unit":3,"isChecked":true},
    // {"listName":"Costco","name":"Burger","quantity":5,"unit":4,"isChecked":true},
    // {"listName":"Walmart","name":"Orange","quantity":3,"unit":5,"isChecked":false},
    // {"listName":"Costco","name":"Cake","quantity":19,"unit":3,"isChecked":false},
    // {"listName":"Costco","name":"Juice","quantity":1,"unit":1,"isChecked":true},
    // {"listName":"Costco","name":"Apple","quantity":6,"unit":4,"isChecked":false},
    // {"listName":"Costco","name":"Banana","quantity":19,"unit":5,"isChecked":true},
    // {"listName":"Walmart","name":"Mango","quantity":2,"unit":5,"isChecked":true},
    // {"listName":"Costco","name":"Apple","quantity":6,"unit":1,"isChecked":false},
    // {"listName":"Costco","name":"Chips","quantity":2,"unit":1,"isChecked":true},
    // {"listName":"Walmart","name":"Wheat","quantity":5,"unit":1,"isChecked":false},
    // {"listName":"Walmart","name":"Orange","quantity":17,"unit":2,"isChecked":true},
    // {"listName":"Costco","name":"Snack","quantity":5,"unit":4,"isChecked":false},
    // {"listName":"Walmart","name":"Wheat","quantity":8,"unit":4,"isChecked":true},
    // {"listName":"Costco","name":"Coca Cola","quantity":15,"unit":5,"isChecked":false},
    // {"listName":"Costco","name":"Apple","quantity":1,"unit":2,"isChecked":false},
    // {"listName":"Walmart","name":"Chocolate","quantity":11,"unit":4,"isChecked":true},
    // {"listName":"Costco","name":"Coca Cola","quantity":4,"unit":2,"isChecked":false},
    // {"listName":"Walmart","name":"Coca Cola","quantity":18,"unit":3,"isChecked":false},
    // {"listName":"Costco","name":"Dough","quantity":17,"unit":5,"isChecked":true},
    // {"listName":"Walmart","name":"Bread","quantity":3,"unit":2,"isChecked":false},
    // {"listName":"Costco","name":"Wheat","quantity":9,"unit":3,"isChecked":false},
    // {"listName":"Costco","name":"Caramel","quantity":10,"unit":1,"isChecked":false},
    // {"listName":"Walmart","name":"Bread","quantity":20,"unit":5,"isChecked":false},
    // {"listName":"Walmart","name":"Juice","quantity":1,"unit":1,"isChecked":false},
    // {"listName":"Walmart","name":"Cake","quantity":20,"unit":5,"isChecked":false},
    // {"listName":"Walmart","name":"Dough","quantity":3,"unit":2,"isChecked":true},
    // {"listName":"Walmart","name":"Caramel","quantity":4,"unit":1,"isChecked":false},
    // {"listName":"Walmart","name":"Mango","quantity":14,"unit":3,"isChecked":true},
    // {"listName":"Walmart","name":"Lays","quantity":3,"unit":3,"isChecked":true},
    // {"listName":"Costco","name":"Milk","quantity":9,"unit":2,"isChecked":false},
    // {"listName":"Walmart","name":"Dough","quantity":20,"unit":4,"isChecked":false},
    // {"listName":"Walmart","name":"Lays","quantity":16,"unit":2,"isChecked":false},
    // {"listName":"Costco","name":"Juice","quantity":2,"unit":2,"isChecked":true},
    // {"listName":"Costco","name":"Apple","quantity":11,"unit":5,"isChecked":true},
    // {"listName":"Walmart","name":"Lays","quantity":14,"unit":3,"isChecked":true},
    // {"listName":"Costco","name":"Mango","quantity":8,"unit":2,"isChecked":false},
    // {"listName":"Walmart","name":"Juice","quantity":8,"unit":5,"isChecked":true},
    // {"listName":"Costco","name":"Wheat","quantity":18,"unit":4,"isChecked":false},
    // {"listName":"Walmart","name":"Apple","quantity":16,"unit":5,"isChecked":true},
    // {"listName":"Costco","name":"Juice","quantity":6,"unit":1,"isChecked":false},
    // {"listName":"Costco","name":"Chocolate","quantity":5,"unit":2,"isChecked":false},
    // {"listName":"Walmart","name":"Cake","quantity":7,"unit":3,"isChecked":true},
    // {"listName":"Walmart","name":"Fanta","quantity":11,"unit":3,"isChecked":true},
    // {"listName":"Walmart","name":"Banana","quantity":3,"unit":2,"isChecked":false},
    // {"listName":"Costco","name":"Bread","quantity":13,"unit":1,"isChecked":false},
    // {"listName":"Costco","name":"Snack","quantity":8,"unit":2,"isChecked":true},
    // {"listName":"Walmart","name":"Burger","quantity":7,"unit":2,"isChecked":false},
    // {"listName":"Walmart","name":"Banana","quantity":19,"unit":5,"isChecked":false},
    // {"listName":"Costco","name":"Juice","quantity":14,"unit":1,"isChecked":false},
    // {"listName":"Costco","name":"Banana","quantity":13,"unit":1,"isChecked":false},
    // {"listName":"Costco","name":"Juice","quantity":20,"unit":2,"isChecked":true},
    // {"listName":"Costco","name":"Dough","quantity":19,"unit":3,"isChecked":false},
    // {"listName":"Costco","name":"Chocolate","quantity":20,"unit":1,"isChecked":true},
    // {"listName":"Costco","name":"Mango","quantity":18,"unit":1,"isChecked":true},
    // {"listName":"Walmart","name":"Mango","quantity":4,"unit":5,"isChecked":false},
    // {"listName":"Walmart","name":"Lays","quantity":17,"unit":2,"isChecked":false},
    // {"listName":"Costco","name":"Milk","quantity":10,"unit":1,"isChecked":true},
    // {"listName":"Costco","name":"Orange","quantity":18,"unit":5,"isChecked":true},
    // {"listName":"Walmart","name":"Banana","quantity":6,"unit":3,"isChecked":false},
    // {"listName":"Costco","name":"Juice","quantity":1,"unit":5,"isChecked":true},
    // {"listName":"Costco","name":"Milk","quantity":8,"unit":5,"isChecked":true},
    // {"listName":"Costco","name":"Cake","quantity":13,"unit":5,"isChecked":true},
    // {"listName":"Walmart","name":"Chips","quantity":6,"unit":5,"isChecked":false},
    // {"listName":"Walmart","name":"Bread","quantity":4,"unit":5,"isChecked":false},
    // {"listName":"Walmart","name":"Banana","quantity":16,"unit":1,"isChecked":true},
    // {"listName":"Walmart","name":"Bread","quantity":18,"unit":4,"isChecked":true},
    // {"listName":"Walmart","name":"Snack","quantity":9,"unit":3,"isChecked":false},
    // {"listName":"Costco","name":"Chocolate","quantity":13,"unit":5,"isChecked":true},
    // {"listName":"Costco","name":"Mango","quantity":1,"unit":1,"isChecked":true},
    // {"listName":"Walmart","name":"Apple","quantity":12,"unit":2,"isChecked":true},
    // {"listName":"Costco","name":"Coca Cola","quantity":9,"unit":2,"isChecked":true},
    // {"listName":"Walmart","name":"Wheat","quantity":9,"unit":1,"isChecked":true},
    // {"listName":"Walmart","name":"Burger","quantity":17,"unit":2,"isChecked":false},
    // {"listName":"Costco","name":"Apple","quantity":1,"unit":1,"isChecked":false},
    // {"listName":"Walmart","name":"Juice","quantity":2,"unit":2,"isChecked":false},
    // {"listName":"Walmart","name":"Wheat","quantity":10,"unit":3,"isChecked":false},
    // {"listName":"Walmart","name":"Mango","quantity":8,"unit":3,"isChecked":true},
    // {"listName":"Walmart","name":"Lays","quantity":13,"unit":3,"isChecked":true},
    // {"listName":"Walmart","name":"Caramel","quantity":4,"unit":1,"isChecked":false},
    // {"listName":"Walmart","name":"Caramel","quantity":18,"unit":4,"isChecked":false},
    // {"listName":"Costco","name":"Chips","quantity":4,"unit":3,"isChecked":true},
    // {"listName":"Walmart","name":"Coca Cola","quantity":20,"unit":1,"isChecked":true},
    // {"listName":"Walmart","name":"Orange","quantity":12,"unit":1,"isChecked":false},
    // {"listName":"Walmart","name":"Burger","quantity":20,"unit":5,"isChecked":false},
    // {"listName":"Costco","name":"Wheat","quantity":7,"unit":1,"isChecked":true},
    // {"listName":"Walmart","name":"Dough","quantity":8,"unit":5,"isChecked":false},
    // {"listName":"Costco","name":"Wheat","quantity":20,"unit":3,"isChecked":true},
    // {"listName":"Walmart","name":"Mango","quantity":15,"unit":2,"isChecked":false},
    // {"listName":"Costco","name":"Cake","quantity":12,"unit":5,"isChecked":true},
    // {"listName":"Costco","name":"Mango","quantity":6,"unit":2,"isChecked":false},
    // {"listName":"Costco","name":"Juice","quantity":14,"unit":2,"isChecked":false},
    // {"listName":"Walmart","name":"Banana","quantity":18,"unit":2,"isChecked":false},
    // {"listName":"Walmart","name":"Juice","quantity":7,"unit":2,"isChecked":true},
    // {"listName":"Costco","name":"Dough","quantity":2,"unit":3,"isChecked":true},
    // {"listName":"Costco","name":"Banana","quantity":16,"unit":3,"isChecked":false},
    // {"listName":"Walmart","name":"Snack","quantity":13,"unit":4,"isChecked":true},
    // {"listName":"Costco","name":"Chocolate","quantity":5,"unit":2,"isChecked":false},
    // {"listName":"Costco","name":"Apple","quantity":9,"unit":2,"isChecked":true},
    // {"listName":"Costco","name":"Snack","quantity":17,"unit":1,"isChecked":false},
    // {"listName":"Costco","name":"Wheat","quantity":13,"unit":3,"isChecked":false},
    // {"listName":"Walmart","name":"Bread","quantity":15,"unit":5,"isChecked":false},
    // {"listName":"Costco","name":"Orange","quantity":14,"unit":4,"isChecked":false},
    // {"listName":"Costco","name":"Cake","quantity":9,"unit":4,"isChecked":true},
    // {"listName":"Walmart","name":"Orange","quantity":17,"unit":1,"isChecked":false},
    // {"listName":"Costco","name":"Mango","quantity":3,"unit":5,"isChecked":true},
    // {"listName":"Walmart","name":"Bread","quantity":15,"unit":5,"isChecked":true},
    // {"listName":"Walmart","name":"Dough","quantity":20,"unit":4,"isChecked":false},
    // {"listName":"Walmart","name":"Banana","quantity":5,"unit":3,"isChecked":true},
    // {"listName":"Costco","name":"Caramel","quantity":19,"unit":2,"isChecked":false},
    // {"listName":"Costco","name":"Lays","quantity":9,"unit":4,"isChecked":true},
    // {"listName":"Costco","name":"Mango","quantity":15,"unit":5,"isChecked":false},
    // {"listName":"Costco","name":"Milk","quantity":4,"unit":2,"isChecked":true},
    // {"listName":"Costco","name":"Banana","quantity":8,"unit":2,"isChecked":true},
    // {"listName":"Walmart","name":"Fanta","quantity":15,"unit":5,"isChecked":true},
    // {"listName":"Walmart","name":"Mango","quantity":13,"unit":1,"isChecked":false},
    // {"listName":"Walmart","name":"Chips","quantity":3,"unit":2,"isChecked":true},
    // {"listName":"Costco","name":"Milk","quantity":16,"unit":1,"isChecked":true},
    // {"listName":"Costco","name":"Bread","quantity":6,"unit":3,"isChecked":false},
    // {"listName":"Costco","name":"Burger","quantity":19,"unit":1,"isChecked":false},
    // {"listName":"Costco","name":"Wheat","quantity":20,"unit":4,"isChecked":true},
    // {"listName":"Costco","name":"Fanta","quantity":11,"unit":1,"isChecked":true},
    // {"listName":"Walmart","name":"Wheat","quantity":4,"unit":1,"isChecked":true},
    // {"listName":"Costco","name":"Mango","quantity":12,"unit":3,"isChecked":false},
    // {"listName":"Walmart","name":"Milk","quantity":18,"unit":2,"isChecked":true},
    // {"listName":"Costco","name":"Milk","quantity":16,"unit":4,"isChecked":false},
    // {"listName":"Walmart","name":"Chocolate","quantity":2,"unit":3,"isChecked":false},
    // {"listName":"Walmart","name":"Chips","quantity":8,"unit":5,"isChecked":false},
    // {"listName":"Walmart","name":"Snack","quantity":1,"unit":4,"isChecked":true},
    // {"listName":"Costco","name":"Apple","quantity":10,"unit":5,"isChecked":true},
    // {"listName":"Costco","name":"Apple","quantity":20,"unit":1,"isChecked":false},
    // {"listName":"Costco","name":"Coca Cola","quantity":5,"unit":2,"isChecked":false},
    // {"listName":"Walmart","name":"Chips","quantity":3,"unit":4,"isChecked":false},
    // {"listName":"Walmart","name":"Apple","quantity":20,"unit":1,"isChecked":true},
    // {"listName":"Costco","name":"Wheat","quantity":18,"unit":3,"isChecked":false},
    // {"listName":"Walmart","name":"Mango","quantity":10,"unit":3,"isChecked":false},
    // {"listName":"Costco","name":"Bread","quantity":9,"unit":4,"isChecked":false},
    // {"listName":"Walmart","name":"Caramel","quantity":2,"unit":5,"isChecked":false},
    // {"listName":"Costco","name":"Snack","quantity":5,"unit":5,"isChecked":true},
    // {"listName":"Walmart","name":"Mango","quantity":6,"unit":3,"isChecked":true},
    // {"listName":"Costco","name":"Fanta","quantity":6,"unit":3,"isChecked":false},
    // {"listName":"Walmart","name":"Banana","quantity":4,"unit":4,"isChecked":true},
    // {"listName":"Costco","name":"Snack","quantity":18,"unit":2,"isChecked":true},
    // {"listName":"Costco","name":"Cake","quantity":18,"unit":2,"isChecked":true},
    // {"listName":"Walmart","name":"Milk","quantity":19,"unit":1,"isChecked":false},
    // {"listName":"Costco","name":"Mango","quantity":13,"unit":4,"isChecked":true},
    // {"listName":"Walmart","name":"Snack","quantity":6,"unit":2,"isChecked":false},
    // {"listName":"Costco","name":"Apple","quantity":1,"unit":2,"isChecked":true},
    // {"listName":"Costco","name":"Lays","quantity":8,"unit":3,"isChecked":false},
    // {"listName":"Costco","name":"Fanta","quantity":16,"unit":5,"isChecked":true},
    // {"listName":"Walmart","name":"Orange","quantity":4,"unit":1,"isChecked":false},
    // {"listName":"Walmart","name":"Cake","quantity":19,"unit":1,"isChecked":true},
    // {"listName":"Costco","name":"Wheat","quantity":2,"unit":2,"isChecked":true},
    // {"listName":"Costco","name":"Cake","quantity":7,"unit":3,"isChecked":true},
    // {"listName":"Walmart","name":"Chips","quantity":12,"unit":1,"isChecked":false},
    // {"listName":"Walmart","name":"Bread","quantity":12,"unit":2,"isChecked":true},
    // {"listName":"Walmart","name":"Chocolate","quantity":19,"unit":1,"isChecked":true},
    // {"listName":"Costco","name":"Orange","quantity":2,"unit":4,"isChecked":false},
    // {"listName":"Walmart","name":"Lays","quantity":9,"unit":3,"isChecked":false},
    // {"listName":"Walmart","name":"Burger","quantity":12,"unit":5,"isChecked":false},
    // {"listName":"Walmart","name":"Coca Cola","quantity":16,"unit":5,"isChecked":true},
    // {"listName":"Costco","name":"Bread","quantity":16,"unit":2,"isChecked":false},
    // {"listName":"Costco","name":"Bread","quantity":1,"unit":3,"isChecked":true},
    // {"listName":"Walmart","name":"Mango","quantity":14,"unit":4,"isChecked":false},
    // {"listName":"Costco","name":"Caramel","quantity":16,"unit":4,"isChecked":false},
    // {"listName":"Walmart","name":"Bread","quantity":5,"unit":2,"isChecked":false},
    // {"listName":"Walmart","name":"Mango","quantity":5,"unit":4,"isChecked":true},
    // {"listName":"Costco","name":"Banana","quantity":18,"unit":1,"isChecked":false},
    // {"listName":"Costco","name":"Orange","quantity":4,"unit":5,"isChecked":false},
    // {"listName":"Walmart","name":"Bread","quantity":13,"unit":3,"isChecked":true},
    // {"listName":"Walmart","name":"Fanta","quantity":18,"unit":4,"isChecked":false},
    // {"listName":"Walmart","name":"Coca Cola","quantity":1,"unit":2,"isChecked":true},
    // {"listName":"Costco","name":"Bread","quantity":14,"unit":1,"isChecked":false},
    // {"listName":"Costco","name":"Orange","quantity":16,"unit":2,"isChecked":true},
    // {"listName":"Walmart","name":"Lays","quantity":15,"unit":3,"isChecked":false},
    // {"listName":"Costco","name":"Dough","quantity":20,"unit":5,"isChecked":false},
    // {"listName":"Walmart","name":"Burger","quantity":12,"unit":1,"isChecked":true},
    // {"listName":"Walmart","name":"Snack","quantity":9,"unit":1,"isChecked":false},
    // {"listName":"Walmart","name":"Banana","quantity":4,"unit":1,"isChecked":false},
    // {"listName":"Walmart","name":"Fanta","quantity":15,"unit":2,"isChecked":false},
    // {"listName":"Costco","name":"Burger","quantity":5,"unit":3,"isChecked":true},
    // {"listName":"Walmart","name":"Dough","quantity":19,"unit":1,"isChecked":true},
    // {"listName":"Walmart","name":"Caramel","quantity":15,"unit":1,"isChecked":false},
    // {"listName":"Walmart","name":"Milk","quantity":9,"unit":1,"isChecked":true},
    // {"listName":"Walmart","name":"Fanta","quantity":18,"unit":5,"isChecked":false},
    // {"listName":"Walmart","name":"Cake","quantity":13,"unit":2,"isChecked":true},
    // {"listName":"Walmart","name":"Apple","quantity":16,"unit":4,"isChecked":false},
    // {"listName":"Walmart","name":"Banana","quantity":14,"unit":4,"isChecked":false},
    // {"listName":"Walmart","name":"Caramel","quantity":13,"unit":3,"isChecked":true},
    // {"listName":"Walmart","name":"Chocolate","quantity":1,"unit":4,"isChecked":true},
    // {"listName":"Costco","name":"Chips","quantity":11,"unit":5,"isChecked":true},
    // {"listName":"Walmart","name":"Apple","quantity":7,"unit":2,"isChecked":true},
    // {"listName":"Costco","name":"Banana","quantity":6,"unit":1,"isChecked":false},
    // {"listName":"Costco","name":"Coca Cola","quantity":3,"unit":5,"isChecked":true},
    // {"listName":"Costco","name":"Lays","quantity":6,"unit":3,"isChecked":false},
    // {"listName":"Walmart","name":"Lays","quantity":3,"unit":2,"isChecked":true},
    // {"listName":"Costco","name":"Bread","quantity":7,"unit":3,"isChecked":true},
    // {"listName":"Walmart","name":"Dough","quantity":20,"unit":5,"isChecked":false},
    // {"listName":"Costco","name":"Lays","quantity":8,"unit":5,"isChecked":false},
    // {"listName":"Walmart","name":"Caramel","quantity":12,"unit":2,"isChecked":true},
    // {"listName":"Costco","name":"Fanta","quantity":6,"unit":5,"isChecked":true},
    // {"listName":"Costco","name":"Banana","quantity":13,"unit":5,"isChecked":false},
    // {"listName":"Walmart","name":"Lays","quantity":1,"unit":3,"isChecked":false},
    // {"listName":"Costco","name":"Chocolate","quantity":9,"unit":1,"isChecked":true},
    // {"listName":"Costco","name":"Lays","quantity":2,"unit":1,"isChecked":true},
    // {"listName":"Walmart","name":"Banana","quantity":7,"unit":1,"isChecked":true},
    // {"listName":"Costco","name":"Banana","quantity":16,"unit":1,"isChecked":false},
    // {"listName":"Walmart","name":"Wheat","quantity":17,"unit":4,"isChecked":false},
    // {"listName":"Costco","name":"Chocolate","quantity":20,"unit":3,"isChecked":false},
    // {"listName":"Walmart","name":"Juice","quantity":7,"unit":2,"isChecked":false},
    // {"listName":"Walmart","name":"Caramel","quantity":4,"unit":2,"isChecked":false},
    // {"listName":"Costco","name":"Dough","quantity":18,"unit":3,"isChecked":false},
    // {"listName":"Walmart","name":"Coca Cola","quantity":5,"unit":1,"isChecked":false},
    // {"listName":"Walmart","name":"Milk","quantity":16,"unit":5,"isChecked":false},
    // {"listName":"Costco","name":"Caramel","quantity":17,"unit":4,"isChecked":false},
    // {"listName":"Walmart","name":"Fanta","quantity":3,"unit":1,"isChecked":false},
    // {"listName":"Costco","name":"Banana","quantity":16,"unit":1,"isChecked":true},
    // {"listName":"Costco","name":"Chips","quantity":4,"unit":2,"isChecked":true},
    // {"listName":"Walmart","name":"Orange","quantity":5,"unit":2,"isChecked":false},
    // {"listName":"Costco","name":"Caramel","quantity":12,"unit":3,"isChecked":false},
    // {"listName":"Costco","name":"Dough","quantity":4,"unit":2,"isChecked":true},
    // {"listName":"Costco","name":"Coca Cola","quantity":13,"unit":3,"isChecked":false},
    // {"listName":"Walmart","name":"Caramel","quantity":1,"unit":1,"isChecked":false},
    // {"listName":"Costco","name":"Orange","quantity":13,"unit":4,"isChecked":false},
    // {"listName":"Walmart","name":"Snack","quantity":13,"unit":1,"isChecked":false},
    // {"listName":"Walmart","name":"Chips","quantity":15,"unit":3,"isChecked":false},
    // {"listName":"Costco","name":"Bread","quantity":14,"unit":4,"isChecked":false},
    // {"listName":"Costco","name":"Coca Cola","quantity":14,"unit":4,"isChecked":true},
    // {"listName":"Walmart","name":"Dough","quantity":9,"unit":5,"isChecked":true},
    // {"listName":"Costco","name":"Milk","quantity":12,"unit":3,"isChecked":false},
    // {"listName":"Costco","name":"Milk","quantity":2,"unit":1,"isChecked":true},
    // {"listName":"Walmart","name":"Caramel","quantity":5,"unit":4,"isChecked":true},
    // {"listName":"Costco","name":"Chips","quantity":6,"unit":1,"isChecked":true},
    // {"listName":"Walmart","name":"Chocolate","quantity":4,"unit":3,"isChecked":false},
    // {"listName":"Walmart","name":"Lays","quantity":17,"unit":2,"isChecked":true},
    // {"listName":"Walmart","name":"Chips","quantity":4,"unit":5,"isChecked":true},
    // {"listName":"Costco","name":"Juice","quantity":4,"unit":3,"isChecked":false},
    // {"listName":"Walmart","name":"Cake","quantity":8,"unit":3,"isChecked":true},
    // {"listName":"Costco","name":"Apple","quantity":6,"unit":1,"isChecked":false},
    // {"listName":"Costco","name":"Snack","quantity":17,"unit":4,"isChecked":true},
    // {"listName":"Costco","name":"Bread","quantity":13,"unit":5,"isChecked":false},
    // {"listName":"Costco","name":"Orange","quantity":7,"unit":3,"isChecked":true},
    // {"listName":"Costco","name":"Bread","quantity":7,"unit":4,"isChecked":false},
    // {"listName":"Costco","name":"Cake","quantity":5,"unit":3,"isChecked":false},
    // {"listName":"Walmart","name":"Snack","quantity":18,"unit":2,"isChecked":false},
    // {"listName":"Walmart","name":"Coca Cola","quantity":1,"unit":2,"isChecked":false},
    // {"listName":"Walmart","name":"Orange","quantity":5,"unit":1,"isChecked":false},
    // {"listName":"Costco","name":"Apple","quantity":10,"unit":2,"isChecked":true},
    // {"listName":"Costco","name":"Dough","quantity":17,"unit":1,"isChecked":false},
    // {"listName":"Walmart","name":"Orange","quantity":8,"unit":1,"isChecked":true},
    // {"listName":"Walmart","name":"Bread","quantity":19,"unit":3,"isChecked":false},
    // {"listName":"Walmart","name":"Chocolate","quantity":10,"unit":4,"isChecked":false},
    // {"listName":"Walmart","name":"Snack","quantity":3,"unit":3,"isChecked":false},
    // {"listName":"Walmart","name":"Caramel","quantity":7,"unit":5,"isChecked":true},
    // {"listName":"Costco","name":"Orange","quantity":12,"unit":4,"isChecked":false},
    // {"listName":"Costco","name":"Lays","quantity":7,"unit":5,"isChecked":true},
    // {"listName":"Costco","name":"Orange","quantity":2,"unit":2,"isChecked":false},
    // {"listName":"Costco","name":"Snack","quantity":14,"unit":2,"isChecked":true},
    // {"listName":"Costco","name":"Chips","quantity":7,"unit":5,"isChecked":true},
    // {"listName":"Walmart","name":"Bread","quantity":4,"unit":5,"isChecked":true},
    // {"listName":"Walmart","name":"Dough","quantity":11,"unit":5,"isChecked":false},
    // {"listName":"Costco","name":"Chips","quantity":14,"unit":5,"isChecked":true},
    // {"listName":"Walmart","name":"Banana","quantity":12,"unit":3,"isChecked":true},
    // {"listName":"Walmart","name":"Lays","quantity":2,"unit":5,"isChecked":true},
    // {"listName":"Walmart","name":"Chocolate","quantity":15,"unit":3,"isChecked":true},
    // {"listName":"Walmart","name":"Bread","quantity":2,"unit":4,"isChecked":true},
    // {"listName":"Costco","name":"Juice","quantity":14,"unit":5,"isChecked":false},
    // {"listName":"Costco","name":"Burger","quantity":2,"unit":5,"isChecked":false},
    // {"listName":"Walmart","name":"Chocolate","quantity":15,"unit":1,"isChecked":true},
    // {"listName":"Costco","name":"Lays","quantity":19,"unit":4,"isChecked":true},
    // {"listName":"Walmart","name":"Cake","quantity":18,"unit":3,"isChecked":true},
    // {"listName":"Costco","name":"Wheat","quantity":20,"unit":1,"isChecked":false},
    // {"listName":"Costco","name":"Milk","quantity":8,"unit":3,"isChecked":false},
    // {"listName":"Walmart","name":"Banana","quantity":6,"unit":2,"isChecked":true},
    // {"listName":"Costco","name":"Wheat","quantity":13,"unit":4,"isChecked":false},
    // {"listName":"Walmart","name":"Lays","quantity":4,"unit":2,"isChecked":true},
    // {"listName":"Costco","name":"Lays","quantity":6,"unit":4,"isChecked":true},
    // {"listName":"Walmart","name":"Juice","quantity":16,"unit":4,"isChecked":false},
    // {"listName":"Costco","name":"Caramel","quantity":5,"unit":1,"isChecked":true},
    // {"listName":"Costco","name":"Chocolate","quantity":5,"unit":4,"isChecked":true}]).then((value) => {
    //       console.log(value, '---nk');
    //     })
    // this.__db.table<List>('LISTS').bulkAdd([
    //   {name: 'Untitled List'},
    //   {name: 'Walmart'}
    // ]);
    this.__db.table('listItems').toArray().then((v) => {
    });
    this.__db.table('LISTS').toArray().then((items: Array<List>) => {
    });
  }

  getListItems = (listName: string) => {
    return new Observable<Array<ListItem>>((subscriber: Subscriber<Array<ListItem>>) => {
      this.__db.table('listItems').where('listName').equalsIgnoreCase(listName).toArray().then((items: Array<ListItem>) => {
        subscriber.next(items);
      })
    });
  }

  getAllList = (): Observable<Array<List>> => {
    return new Observable<Array<List>>((subscriber: Subscriber<Array<List>>) => {
      this.__db.table('LISTS').toArray().then((items: Array<List>) => {
        subscriber.next(items);
      });
    });
  }

  getListByName = (name: string) => {
    return new Observable<List>((subscriber: Subscriber<List>) => {
      this.__db.table('LISTS').where('name').equalsIgnoreCase(name).first().then(value => {
        subscriber.next(value);
      });
    });
  }

  addNewList = (name: string) => {
    return new Observable<number>((subscriber: Subscriber<number>) => {
      this.__db.table('LISTS').add({ name: name }).then(value => {
        subscriber.next(value);
      }, error => {
        subscriber.error(error);
      });
    });
  }

  editListByName = (newList: List, oldList: List) => {
    return new Observable<number>((subscriber: Subscriber<number>) => {
      this.__db.table('LISTS')
        .where('name')
        .equals(oldList.name)
        .modify({ name: newList.name })
        .then(value => {
          subscriber.next(value);
        })
        .catch(error => {
          subscriber.next(error);
        });
    });
  }

  deleteListByName = (list: List) => {
    return new Observable<number>((subscriber: Subscriber<number>) => {
      this.__db.table('LISTS')
        .where('name')
        .equals(list.name)
        .delete()
        .then(value => {
          this.deleteItemByListName(list.name).subscribe(value => {
            subscriber.next(value);
          }, error => {
            subscriber.error(error);
          });
        })
        .catch(error => {
          subscriber.next(error);
        });
    });
  }

  addNewListItem = (listItem: ListItem) => {
    return new Observable<number>((subscriber: Subscriber<number>) => {
      this.__db.table('listItems').add(listItem).then(value => {
        subscriber.next(value);
      }).catch(error => {
        subscriber.next(error);
      });
    });
  }

  checkItem = (item: ListItem) => {
    return new Observable<number>((subscriber: Subscriber<number>) => {
      this.__db.table('listItems')
        .where('id')
        .equals(item['id'])
        .modify({ isChecked: item.isChecked })
        .then(value => {
          subscriber.next(value);
        })
        .catch(error => {
          subscriber.next(error);
        });
    });
  }

  deleteListItem = (item: ListItem) => {
    return new Observable<number>((subscriber: Subscriber<number>) => {
      this.__db.table('listItems')
        .where('id')
        .equals(item['id'])
        .delete()
        .then(value => {
          subscriber.next(value);
        })
        .catch(error => {
          subscriber.error(error);
        })
    });
  }

  deleteItemByListName = (list: string) => {
    return new Observable<number>((subscriber: Subscriber<number>) => {
      this.__db.table('listItems')
        .where('listName')
        .equals(list)
        .delete()
        .then(value => {
          subscriber.next(value);
        })
        .catch(error => {
          subscriber.error(error);
        })
    });
  }

  getItemsInRange = (offset: number, listName: string) => {
    return new Observable<Array<ListItem>>((subscriber: Subscriber<Array<ListItem>>) => {
      this.__db.table('listItems')
        .where('listName')
        .equalsIgnoreCase(listName)
        .offset(offset)
        .limit(20)
        .toArray()
        .then(value => {
          subscriber.next(value);
        })
        .catch(error => {
          subscriber.error(error);
        });
    });
  }

}