import { BehaviorSubject } from 'rxjs';
import { IStore, IItem, TABLE, IAppSettings, ITEMSORT } from '../common/tgCore';
import { IXDB } from '../providers/iXDb';
import { Injectable } from '@angular/core';


@Injectable()
export class DataFactory {

  public readonly stores: BehaviorSubject<Array<IStore>>;
  public readonly currentStore: BehaviorSubject<IStore>;
  public readonly items: BehaviorSubject<Array<IItem>>;
  public appSettings: BehaviorSubject<IAppSettings>;

  constructor(private ixdb: IXDB) {
    this.stores = new BehaviorSubject<Array<IStore>>([]);
    this.currentStore = new BehaviorSubject<IStore>(null);
    this.items = new BehaviorSubject<Array<IItem>>([]);
    this.appSettings = new BehaviorSubject<IAppSettings>({ theme: 'md-blue', sortBy: ITEMSORT.name, themeColor: '#283593' });
    this.initializeAppSettings();
    this.initializeFirstTimeDatabase();
    this.currentStore.subscribe(this.subscribeCurrentStore);
    this.appSettings.subscribe(this.appSettingsSubscriber);
  }

  /**
   * 
   * App Settings
   */

  public changeTheme = (theme: string, themeColor: string) => {
    let settings = this.appSettings.getValue();
    settings.theme = theme;
    settings.themeColor = themeColor;
    this.changeSettings(settings);
  }

  public changeSort = (sort: ITEMSORT) => {
    let settings = this.appSettings.getValue();
    settings.sortBy = sort;
    this.changeSettings(settings);
    this.getCurrentStoreItems();
  }

  private initializeAppSettings = () => {
    let settings = localStorage.getItem('appSettings');
    if (settings !== null && settings !== undefined) {
      this.appSettings.next(JSON.parse(settings));
    } else {
      this.changeSettings(this.appSettings.getValue());
    }
  }

  private changeSettings = (settings: IAppSettings) => {
    this.setLocalSettings(settings);
    this.appSettings.next(settings);
  }

  private setLocalSettings = (settings: IAppSettings) => {
    localStorage.setItem('appSettings', JSON.stringify(settings));
  }

  private appSettingsSubscriber = (settings: IAppSettings) => {
    window.document.body.setAttribute('theme', settings.theme);
  }

  // ITEM - Start

  public addNewItem = async (item: IItem): Promise<number> => {
    let index = await this.ixdb.addOne<IItem>(TABLE.ITEMS, item);
    if (index > 0) {
      this.getCurrentStoreItems();
    }
    return index;
  }

  public getCurrentStoreItems = async (): Promise<Array<IItem>> => {
    let sort = this.appSettings.getValue().sortBy;
    let items = (sort === ITEMSORT.new_first || sort === ITEMSORT.new_last) ?
      await this.ixdb.getBulk<IItem>(TABLE.ITEMS, 'storeId', this.currentStore.getValue().id) :
      await this.ixdb.getSortedBulk<IItem>(TABLE.ITEMS, 'storeId', this.currentStore.getValue().id, sort);
    items = sort === ITEMSORT.new_first ? items.reverse() : items;
    this.items.next(items);
    return items;
  }

  public updateItem = async (item: IItem): Promise<number> => {
    let index = await this.ixdb.addOrReplaceOne<IItem>(TABLE.ITEMS, item);
    if (index > 0) {
      this.getCurrentStoreItems();
    }
    return index;
  }

  public deleteItem = async (item: IItem): Promise<number> => {
    let index = await this.ixdb.removeOne<IItem>(TABLE.ITEMS, item.id);
    if (index > 0) {
      this.getCurrentStoreItems();
    }
    return index;
  }

  public deleteBulkItems = async (items: Array<IItem>): Promise<void> => {
    let indexes = items.map(i => i.id);
    await this.ixdb.removeBulk(TABLE.ITEMS, indexes);
    await this.getCurrentStoreItems();
    return void (0);
  }

  // ITEM - End

  // STORE - Start

  public subscribeCurrentStore = (currentStore: IStore) => {
    if (currentStore !== null) {
      this.getCurrentStoreItems();
    }
  }

  public getStoreByName = (name: string): IStore => {
    return this.stores.getValue().find(i => i.name.toLocaleLowerCase() === name.toLocaleLowerCase());
  }

  public changeCurrentStore = (store: IStore) => {
    this.setStoreInLocal(store);
  }

  public updateStore = async (store: IStore): Promise<number> => {
    if (await this.ixdb.getOnce(TABLE.STORES, 'name', store.name)) {
      throw new Error('Store already exists');
    }
    let index = await this.ixdb.addOrReplaceOne(TABLE.STORES, store);
    if (index === 0) {
      throw new Error('Unable to update store');
    }
    await this.getAllStores();
    this.setStoreInLocal(this.stores.getValue()[index - 1]);
    return index;
  }

  public addNewStore = async (store: IStore): Promise<number> => {
    if (await this.ixdb.getOnce(TABLE.STORES, 'name', store.name)) {
      throw new Error('Store already exists');
    }
    let index = await this.ixdb.addOne(TABLE.STORES, store);
    if (index === 0) {
      throw new Error('Unable to create store');
    }
    await this.getAllStores();
    this.setStoreInLocal(this.stores.getValue()[index - 1]);
    return index;
  }

  public deleteStore = async (store: IStore) => {
    await this.ixdb.removeOne<IStore>(TABLE.STORES, store.id)
    await this.getAllStores();
    await this.ixdb.removeByKey(TABLE.ITEMS, 'storeId', store.id);
    if (this.currentStore.getValue().id === store.id) {
      this.changeCurrentStore(this.stores.getValue()[0]);
    }
  }

  private getStoreFromLocal = (): IStore => {
    return JSON.parse(localStorage.getItem('currentStore'));
  }

  private setStoreInLocal = (store: IStore) => {
    localStorage.setItem('currentStore', JSON.stringify(store));
    this.currentStore.next(store);
  }

  private getAllStores = async (): Promise<Array<IStore>> => {
    let __stores = await this.ixdb.getAll<IStore>(TABLE.STORES);
    this.stores.next(__stores);
    return __stores;
  }

  private initializeFirstTimeDatabase = async () => {
    let stores: Array<IStore> = await this.ixdb.getAll<IStore>(TABLE.STORES);
    if (!stores || stores.length === 0) {
      let index = await this.ixdb.addOne<IStore>(TABLE.STORES, { name: 'Untitled Store' });
      if (!index || index === 0) {
        throw new Error('Unable to create default store');
      }
      this.getAllStores();
      this.setStoreInLocal(await this.ixdb.getOnce<IStore>(TABLE.STORES, 'name', 'Untitled Store'));
    } else {
      this.stores.next(stores);
      this.currentStore.next(this.getStoreFromLocal());
    }
  }
}