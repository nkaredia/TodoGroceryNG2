import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { IxDB } from '../providers/ixdb';

@Injectable()
export class TgDataFactory {
  public currentListItems: Subject<Array<ListItem>>;

  constructor(public http: Http, private ixdb: IxDB) {
    this.currentListItems = new Subject<Array<ListItem>>();
  }

  setListItemsByName = (listName: string) => {
    this.ixdb.getListItems(listName).subscribe(value => {
      this.currentListItems.next(value);
    })
  }

  getListItems = (listName: string): Observable<Array<ListItem>> => {
    return new Observable<Array<ListItem>>((subscriber: Subscriber<Array<List>>) => {
      this.ixdb.getListItems(listName).subscribe(value => {
        subscriber.next(value);
      }, error => {
        subscriber.error(error);
      });
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

  addNewListItem = (listItem: ListItem) => {
    return new Promise<number>((resolve, reject) => {
      this.ixdb.addNewListItem(listItem).subscribe(value => {
        if (!isNaN(value)) {
          resolve(value);
        } else {
          reject(value);
        }
      }, error => {
        reject(error);
      });
    })
  }

  checkItem = (item: ListItem) => {
    return new Promise<number>((resolve, reject) => {
      this.ixdb.checkItem(item).subscribe(value => {
        this.setPromise(value, resolve, reject);
      }, error => {
        reject(error);
      });
    });
  }

  deleteListItem = (item: ListItem) => {
    return new Promise<number>((resolve, reject) => {
      this.ixdb.deleteListItem(item).subscribe(value => {
        this.setPromise(value, resolve, reject);
      }, error => {
        reject(error);
      });
    });
  }

  getItemsInRange = (offset: number, listName: string) => {
    return new Promise<Array<ListItem>>((resolve, reject) => {
      this.ixdb.getItemsInRange(offset, listName).subscribe(value => {
        resolve(value);
      }, error => {
        reject(error);
      });
    });
  }

  private setPromise = (value, resolve, reject) => {
    if (!isNaN(value)) {
      resolve(value);
    } else {
      reject(value);
    }
  }
}
