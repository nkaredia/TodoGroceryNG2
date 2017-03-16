import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { List } from '../pages/list/list';
import { Menu } from '../components/menu/menu';
import { DataFactory } from '../providers/dataFactory';
import { IXDB } from '../providers/iXDb';
import { AddItem } from '../components/addItem/addItem';

@NgModule({
  declarations: [
    MyApp,
    List,
    Menu,
    AddItem
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    List,
    Menu,
    AddItem
  ],
  providers: [IXDB, DataFactory]
})
export class AppModule { }
