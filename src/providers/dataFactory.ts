import { BehaviorSubject } from 'rxjs';
import { IStore, IList, UNIT } from '../common/tgCore';
import { IXDB } from '../providers/iXDb';
import { Injectable } from '@angular/core';


@Injectable()
export class DataFactory {

  public readonly stores: BehaviorSubject<Array<IStore>>;
  public readonly currentStore: BehaviorSubject<IStore>;

  constructor(private ixdb: IXDB) {
    this.stores = new BehaviorSubject<Array<IStore>>([]);
    this.currentStore = new BehaviorSubject<IStore>(null);
    this.getAllStores();
  }

  

  getStoreByName = (name: string): IStore => {
    return this.stores.getValue().find(i => i.name.toLocaleLowerCase() === name.toLocaleLowerCase());
  }

  async updateStore(name: string) {
    return await this.ixdb.updateStore(name);
  }

  async addNewStore(name: string) {
    return await this.ixdb.addNewStore(name);
  }

  private subscribe = () => {
   this.currentStore.subscribe((value) => {
    this.setLocalCurrentStore(value);
   }); 
  }

  private setLocalCurrentStore(store: IStore) {
    localStorage.setItem('currentStore', JSON.stringify(store));
  }

  private getLocalCurrentStore(): IStore {
    let val = localStorage.getItem('currentStore');
    return val ? JSON.parse(val) : {};
  }

  private async getAllStores(): Promise<Array<IStore>> {
    try {
      let _store = await this.ixdb.getAllStores();
      if (_store && _store.length > 0) {
        this.stores.next(_store);
        return Promise.resolve(_store);
      } else if (await this.ixdb.addNewStore('Untitled Store') > 0) {
        this.getAllStores();
        this.currentStore.next(this.stores.getValue()[0]);
        return Promise.resolve(this.stores.getValue());
      }
    } catch (error) {
      return Promise.reject('Error getting data FACTORY');
    } finally {
      this.currentStore.next(this.getLocalCurrentStore());
    }
  }

}