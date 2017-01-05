import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TgPopoverPage } from '../pages/tg-popover/tg-popover';
import { TgMenuPage } from '../pages/tg-menu/tg-menu';
import { TgAddItemPage } from '../pages/tg-add-item/tg-add-item';
import { TgAddListPage } from '../pages/tg-add-list/tg-add-list';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TgPopoverPage,
    TgMenuPage,
    TgAddItemPage,
    TgAddListPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TgPopoverPage,
    TgMenuPage,
    TgAddItemPage,
    TgAddListPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }
