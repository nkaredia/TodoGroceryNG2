import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Device } from '@ionic-native/device';
import { List } from '../pages/list/list';
import { DataFactory } from '../providers/dataFactory';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = List;
  currentTheme: string = '';

  constructor(private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private factory: DataFactory,
    private device: Device) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.show();
      splashScreen.hide();
      if (window && window['plugins'] && window['plugins']['headerColor'] && window['plugins']['headerColor']['tint']) {
        window['plugins']['headerColor']['tint'](this.factory.appSettings.getValue().themeColor);
      }
      platform.resume.subscribe((res) => {
        if (device.platform.toLowerCase() !== 'android') {
          this.changeTheme(this.factory.appSettings.getValue().theme);
        }
        if (window && window['plugins'] && window['plugins']['headerColor'] && window['plugins']['headerColor']['tint']) {
          window['plugins']['headerColor']['tint'](this.factory.appSettings.getValue().themeColor);
        }
      });
      this.factory.appSettings.subscribe(this.applyTheme);
    });
    String.prototype.capitalize = function () {
      return this.charAt(0).toUpperCase() + this.slice(1);
    }
  }

  private applyTheme = (v) => {
    if (window && window['plugins'] && window['plugins']['headerColor'] && window['plugins']['headerColor']['tint']) {
      window['plugins']['headerColor']['tint'](this.factory.appSettings.getValue().themeColor);
    }
    this.changeTheme(v);
  }

  private changeTheme = (v) => {
    if (v.theme !== this.currentTheme && this.device.platform && this.device.platform.toLowerCase() !== 'android') {
      switch (v.theme) {
        case 'md-grey':
          this.statusBar.backgroundColorByHexString('#263238');
          break;
        case 'md-green':
          this.statusBar.backgroundColorByHexString('#1B5E20');
          break;
        case 'md-red':
          this.statusBar.backgroundColorByHexString('#b71c1c');
          break;
        case 'md-purple':
          this.statusBar.backgroundColorByHexString('#311B92');
          break;
        default:
          this.statusBar.backgroundColorByHexString('#1A237E');
          break;
      }
    }
  }
}

declare global {
  interface String {
    capitalize(): string;
  }
}