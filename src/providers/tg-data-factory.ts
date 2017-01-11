import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import { Subscriber } from 'rxjs/Subscriber';
import 'rxjs/add/operator/map';

/*
  Generated class for the TgDataFactory provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TgDataFactory {

  private lists: Array<List> = [];

  constructor(public http: Http) {
    console.log('Hello TgDataFactory Provider');
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