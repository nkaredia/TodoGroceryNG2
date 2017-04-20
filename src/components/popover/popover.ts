import { Component } from '@angular/core';
import { DataFactory } from '../../providers/dataFactory';
import {
  ViewController
} from 'ionic-angular';
import { AboutPage } from '../../pages/about/about';

@Component({
  selector: 'tg-popover',
  templateUrl: 'popover.html'
})
export class Popover {

  constructor(private viewCtrl: ViewController,
    private factory: DataFactory) {
  }

  gotoAbout = () => {
    this.viewCtrl.getNav().push(AboutPage, {theme: this.factory.appSettings.getValue().theme});
    this.viewCtrl.dismiss();
  }

  changeTheme = (theme: string, themeColor: string) => {
    this.factory.changeTheme(theme, themeColor);
  }
}
