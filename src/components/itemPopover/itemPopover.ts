import { Component } from '@angular/core';
import { DataFactory } from '../../providers/dataFactory';
import {
  ViewController
} from 'ionic-angular';

@Component({
  selector: 'tg-item-popover',
  templateUrl: 'itemPopover.html'
})
export class ItemPopover {

  constructor(private viewCtrl: ViewController,
    private factory: DataFactory) {
  }
}
