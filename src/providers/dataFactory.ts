import { BehaviorSubject } from 'rxjs';
import { IStore, IItem, TABLE } from '../common/tgCore';
import { IXDB } from '../providers/iXDb';
import { Injectable } from '@angular/core';


@Injectable()
export class DataFactory {

  public readonly stores: BehaviorSubject<Array<IStore>>;
  public readonly currentStore: BehaviorSubject<IStore>;
  public readonly items: BehaviorSubject<Array<IItem>>;

  public theme: BehaviorSubject<string>;

  constructor(private ixdb: IXDB) {
    this.stores = new BehaviorSubject<Array<IStore>>([]);
    this.currentStore = new BehaviorSubject<IStore>(null);
    this.items = new BehaviorSubject<Array<IItem>>([]);
    this.applyInitialTheme();
    this.initializeFirstTimeDatabase();
    this.currentStore.subscribe(this.subscribeCurrentStore);
    this.theme.subscribe(this.themeSubscriber);
  }


  // ITEM - Start

  addNewItem = async (item: IItem): Promise<number> => {
    let index = await this.ixdb.addOne<IItem>(TABLE.ITEMS, item);
    if (index > 0) {
      this.getCurrentStoreItems();
    }
    return index;
  }

  getCurrentStoreItems = async (): Promise<Array<IItem>> => {
    let items = await this.ixdb.getBulk<IItem>(TABLE.ITEMS, 'storeId', this.currentStore.getValue().id);
    this.items.next(items);
    return items;
  }

  updateItem = async (item: IItem): Promise<number> => {
    let index = await this.ixdb.addOrReplaceOne<IItem>(TABLE.ITEMS, item);
    if (index > 0) {
      this.getCurrentStoreItems();
    }
    return index;
  }

  deleteItem = async (item: IItem): Promise<number> => {
    let index = await this.ixdb.removeOne<IItem>(TABLE.ITEMS, item.id);
    if (index > 0) {
      this.getCurrentStoreItems();
    }
    return index;
  }

  deleteBulkItems = async (items: Array<IItem>): Promise<void> => {
   let indexes = items.map(i => i.id);
   await this.ixdb.removeBulk(TABLE.ITEMS, indexes);
   await this.getCurrentStoreItems();
   return void(0);
  }

  // ITEM - End

  // STORE - Start

  subscribeCurrentStore = (currentStore: IStore) => {
    if (currentStore !== null) {
      this.getCurrentStoreItems();
    }
  }

  getStoreByName = (name: string): IStore => {
    return this.stores.getValue().find(i => i.name.toLocaleLowerCase() === name.toLocaleLowerCase());
  }

  changeCurrentStore = (store: IStore) => {
    this.setStoreInLocal(store);
  }

  updateStore = async (store: IStore): Promise<number> => {
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

  addNewStore = async (store: IStore): Promise<number> => {
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

  changeTheme = (theme: string) => {
    this.theme.next(theme);
  }

  private themeSubscriber = (value: string) => {
    window.document.body.setAttribute('theme', value);
    localStorage.setItem('theme', value);
  }

  private applyInitialTheme = () => {
    let localTheme = localStorage.getItem('theme');
    if (localTheme === null) {
      this.theme = new BehaviorSubject<string>('md-blue');
    } else {
      this.theme = new BehaviorSubject<string>(localTheme);
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