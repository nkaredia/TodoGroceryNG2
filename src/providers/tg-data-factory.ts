import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { SQLite } from 'ionic-native';
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
export class TgDataFactory {

  private lists: Array<List> = [];
  private __db: Dexie;

  constructor(public http: Http) {
    console.log('Hello TgDataFactory Provider');
    this.__db = new Dexie('todoGroceryDB', {});
    this.__db.version(1).stores({
      listItem: "listName, name, quantity, unit"
    });
    //this.__db.table('listItem').put({listName: 'Untitled list', name: 'Apple', quantity: 5, unit: 3});

  }

  getListItems = (): Observable<Array<ListItem>> => {
    return new Observable<Array<ListItem>>((subscriber: Subscriber<Array<List>>) => {
      this.__db
        .table('listItem')
        .where('listName')
        .equalsIgnoreCase('untitled list')
        .toArray()
        .then((value) => {
          subscriber.next(value);
        }).catch((error) => {
          subscriber.next([]);
        });
    });
  }

  getLists = (): Observable<List> => {
    return new Observable<List>((subscriber: Subscriber<List>) => {
      let lists = window.localStorage.getItem('Lists');
      if (lists) {
        subscriber.next(JSON.parse(lists));
      } else {
        subscriber.error('Error getting data');
      }
    });
  }
}