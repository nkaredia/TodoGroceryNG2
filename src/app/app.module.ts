import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Menu } from '../components/menu/menu';
import { TgDataFactory } from '../providers/tg-data-factory';
import { Popover } from '../components/popover/popover';
import { AddItem } from '../components/addItem/addItem';
import {IxDB} from '../providers/ixdb';
import {AddList} from '../components/addlist/addlist';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Menu,
    Popover,
    AddItem,
    AddList
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Popover,
    AddItem,
    AddList
  ],
  providers: [TgDataFactory, IxDB, { provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }
