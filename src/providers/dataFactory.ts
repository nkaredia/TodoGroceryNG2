import { BehaviorSubject } from 'rxjs';
import { IStore, IItem, UNIT, TABLE } from '../common/tgCore';
import { IXDB } from '../providers/iXDb';
import { Injectable } from '@angular/core';


@Injectable()
export class DataFactory {

  public readonly stores: BehaviorSubject<Array<IStore>>;
  public readonly currentStore: BehaviorSubject<IStore>;
  public readonly items: BehaviorSubject<Array<IItem>>;

  constructor(private ixdb: IXDB) {
    this.stores = new BehaviorSubject<Array<IStore>>([]);
    this.currentStore = new BehaviorSubject<IStore>(null);
    this.items = new BehaviorSubject<Array<IItem>>([]);
    this.initializeFirstTimeDatabase();
    this.currentStore.subscribe(this.subscribeCurrentStore)
  }


  // ITEM - Start

  async addNewItem(item: IItem): Promise<number> {
    return await this.ixdb.addOne<IItem>(TABLE.ITEMS, item);
  }

  async getCurrentStoreItems(storeId: number) {
    let items = await this.ixdb.getBulk<IItem>(TABLE.ITEMS, 'storeId', storeId);
    this.items.next(items);
    return items;
  }

  // ITEM - End

  // STORE - Start

  subscribeCurrentStore = (currentStore: IStore) => {
    if(currentStore !== null) {
      this.getCurrentStoreItems(currentStore.id);
    }
  }

  getStoreByName = (name: string): IStore => {
    return this.stores.getValue().find(i => i.name.toLocaleLowerCase() === name.toLocaleLowerCase());
  }

  changeCurrentStore = (store: IStore) => {
    this.setStoreInLocal(store);
  }

  async updateStore(store: IStore): Promise<number> {
    if (await this.ixdb.getOnce(TABLE.STORES, 'name', store.name)) {
      throw new Error('Store already exists');
    }
    let index = await this.ixdb.addOrReplaceOne(TABLE.STORES, store);
    if (index === 0) {
      throw new Error('Unable to update store');
    }
    this.getAllStores();
    return index;
  }

  async addNewStore(store: IStore): Promise<number> {
    if (await this.ixdb.getOnce(TABLE.STORES, 'name', store.name)) {
      throw new Error('Store already exists');
    }
    let index = await this.ixdb.addOne(TABLE.STORES, store);
    if (index === 0) {
      throw new Error('Unable to create store');
    }
    this.getAllStores();
    return index;
  }

  private getStoreFromLocal = () => {
    return JSON.parse(localStorage.getItem('currentStore'));
  }

  private setStoreInLocal = (store: IStore) => {
    localStorage.setItem('currentStore', JSON.stringify(store));
    this.currentStore.next(store);
  }

  private async getAllStores(): Promise<Array<IStore>> {
    let __stores = await this.ixdb.getAll<IStore>(TABLE.STORES);
    this.stores.next(__stores);
    return __stores;
  }

  private async initializeFirstTimeDatabase() {
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