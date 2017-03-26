import { Component } from '@angular/core';
import { DataFactory } from '../../providers/dataFactory';
import {
  ViewController
} from 'ionic-angular';

@Component({
  selector: 'tg-popover',
  templateUrl: 'popover.html'
})
export class Popover {

  constructor(private viewCtrl: ViewController,
    private factory: DataFactory) {
  }

  changeTheme = (theme: string) => {
    this.factory.changeTheme(theme);
  }
}
