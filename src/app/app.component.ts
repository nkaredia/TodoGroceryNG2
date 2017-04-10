import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { List } from '../pages/list/list';
import { DataFactory } from '../providers/dataFactory';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = List;
  currentTheme: string = '';

  constructor(public platform: Platform, private factory: DataFactory) {
    this.initializeApp();
    String.prototype.capitalize = function () {
      return this.charAt(0).toUpperCase() + this.slice(1);
    }
  }

  private changeTheme = (v) => {
    if (v.theme !== this.currentTheme) {
      switch (v.theme) {
        case 'md-grey':
          StatusBar.backgroundColorByHexString('#263238');
          break;
        case 'md-green':
          StatusBar.backgroundColorByHexString('#1B5E20');
          break;
        case 'md-red':
          StatusBar.backgroundColorByHexString('#b71c1c');
          break;
        case 'md-purple':
          StatusBar.backgroundColorByHexString('#311B92');
          break;
        default:
          StatusBar.backgroundColorByHexString('#1A237E');
          break;
      }
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.show();
      Splashscreen.hide();
      this.platform.resume.subscribe((res) => {
        this.changeTheme(this.factory.appSettings.getValue().theme);
      });
      this.factory.appSettings.subscribe(this.changeTheme);
    });
  }
}


declare global {
  interface String {
    capitalize(): string;
  }
}