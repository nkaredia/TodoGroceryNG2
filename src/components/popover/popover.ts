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
    this.viewCtrl._nav.push(AboutPage, {theme: this.factory.appSettings.getValue().theme});
    setTimeout(()=>{
      this.viewCtrl.dismiss();
    }, 500);
  }

  changeTheme = (theme: string, themeColor: string) => {
    this.factory.changeTheme(theme, themeColor);
  }
}
