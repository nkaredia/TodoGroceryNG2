import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { List } from '../pages/list/list';
import { Menu } from '../components/menu/menu';
import { DataFactory } from '../providers/dataFactory';
import { IXDB } from '../providers/iXDb';
import { AddItem } from '../components/addItem/addItem';
import { Popover } from '../components/popover/popover';
import { SearchForPipe } from '../common/tgCore';
import { ItemPopover } from '../components/itemPopover/itemPopover';
import { AboutPage } from '../pages/about/about';

@NgModule({
  declarations: [
    MyApp,
    List,
    Menu,
    AddItem,
    Popover,
    SearchForPipe,
    ItemPopover,
    AboutPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    List,
    Menu,
    AddItem,
    Popover,
    ItemPopover,
    AboutPage
  ],
  providers: [IXDB, DataFactory]
})
export class AppModule { }
