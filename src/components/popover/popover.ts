import { Component } from '@angular/core';
import { DataFactory } from '../../providers/dataFactory';
import {
  ViewController,
  NavController
} from 'ionic-angular';
import { AboutPage } from '../../pages/about/about';

@Component({
  selector: 'tg-popover',
  templateUrl: 'popover.html'
})
export class Popover {

  constructor(private viewCtrl: ViewController,
    private navCtrl: NavController,
    private factory: DataFactory) {
  }

  gotoAbout = () => {
    setTimeout(() => {
      this.viewCtrl.dismiss();
    }, 500);
    this.navCtrl.push(AboutPage, { theme: this.factory.appSettings.getValue().theme });
  }

  changeTheme = (theme: string, themeColor: string) => {
    this.factory.changeTheme(theme, themeColor);
  }
}
