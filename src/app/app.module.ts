import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { List } from '../pages/list/list';
import { Menu } from '../components/menu/menu';
import { DataFactory } from '../providers/dataFactory';
import { IXDB } from '../providers/iXDb';

@NgModule({
  declarations: [
    MyApp,
    List,
    Menu
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    List,
    Menu
  ],
  providers: [IXDB, DataFactory]
})
export class AppModule { }
