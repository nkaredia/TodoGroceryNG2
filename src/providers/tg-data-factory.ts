import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { IxDB } from '../providers/ixdb';

/*
  Generated class for the TgDataFactory provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TgDataFactory {
  public currentListItems: Subject<Array<ListItem>>;

  constructor(public http: Http, private ixdb: IxDB) {
    console.log('Hello TgDataFactory Provider');
    this.currentListItems = new Subject<Array<ListItem>>();
  }

  setListItemsByName = (listName: string) => {
    this.ixdb.getListItems(listName).subscribe(value => {
      this.currentListItems.next(value);
    })
  }

  getListItems = (): Observable<Array<ListItem>> => {
    return new Observable<Array<ListItem>>((subscriber: Subscriber<Array<List>>) => {
    });
  }

  hasList = (name: string): Observable<boolean> => {
    return new Observable<boolean>((subscriber: Subscriber<boolean>) => {
      this.ixdb.getListByName(name).subscribe((value: List) => {
        subscriber.next(value && value.name ? value.name.toLowerCase() === name.toLowerCase() : false);
      })
    });
  }

  getLists = (): Observable<Array<List>> => {
    return new Observable<Array<List>>((subscriber: Subscriber<Array<List>>) => {
      this.ixdb.getAllList().subscribe((value: Array<List>) => {
        subscriber.next(value);
      });
    });
  }

  addNewList = (name: string) => {
    return new Promise<number>((resolve, reject) => {
      this.ixdb.addNewList(name).subscribe(value => {
        resolve(value);
      }, error => {
        reject(error);
      });
    });
  }

  editListByName = (newList: List, oldList: List) => {
    return new Promise<number>((resolve, reject) => {
      this.ixdb.editListByName(newList, oldList).subscribe(value => {
        if (!isNaN(value)) {
          resolve(value);
        } else {
          reject(value);
        }
      }, error => {
        reject(error);
      });
    });
  }

  deleteListByName = (list: List) => {
    return new Promise<number>((resolve, reject) => {
      this.ixdb.deleteListByName(list).subscribe(value => {
        if (!isNaN(value)) {
          resolve(value);
        } else {
          reject(value);
        }
      }, error => {
        reject(error);
      });
    });
  }
}
