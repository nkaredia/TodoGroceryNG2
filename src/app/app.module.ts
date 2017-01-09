import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Menu } from '../components/menu/menu';
import { TgDataFactory } from '../providers/tg-data-factory';
import { Popover } from '../components/popover/popover';
import { AddItem } from '../components/addItem/addItem';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Menu,
    Popover,
    AddItem
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Popover,
    AddItem
  ],
  providers: [TgDataFactory, { provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }
