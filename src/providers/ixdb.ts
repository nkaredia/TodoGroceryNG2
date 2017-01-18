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
    console.log('Hello IxDB Provider');
    this.__db = new Dexie('tgDB');
    this.__db.version(1).stores({
      listItems: '++id, listName, name, quantity, unit, isChecked',
      LISTS: '++id, name'
    });
    // this.__db.table<ListItem>('listItems').bulkAdd([
    //   { listName: 'Untitled List', name: 'qwerty', quantity: 5, unit: 1, isChecked: false },
    //   { listName: 'Untitled List', name: 'asdfg', quantity: 2, unit: 5, isChecked: false }
    // ]).then((value) => {
    //   console.log(value, '---nk');
    // })
    // this.__db.table<List>('LISTS').bulkAdd([
    //   {name: 'Untitled List'},
    //   {name: 'Walmart'}
    // ]);
    this.__db.table('listItems').toArray().then((v) => {
      console.log(v);
    });
    this.__db.table('LISTS').toArray().then((items: Array<List>) => {
      console.log(items);
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
          subscriber.next(value);
        })
        .catch(error => {
          subscriber.next(error);
        });
    });
  }

}