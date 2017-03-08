import Dexie from 'dexie';
import { IStore } from '../common/tgCore';

export class IXDB {
  private __db: Dexie = null;
  constructor() {
    this.createDatabase();
    this.createTables();
  }

  async getStoreByName(name: string): Promise<IStore> {
    return await this.__db.table<IStore>('stores')
      .where('name')
      .equalsIgnoreCase(name)
      .first();
  }

  async getAllStores(): Promise<Array<IStore>> {
    return await this.__db.table<IStore>('stores').toArray();
  }

  async updateStore(name: string): Promise<number> {
    return await this.__db.table<IStore>('stores').put({ name: name });
  }

  async addNewStore(name: string): Promise<number> {
    return await this.__db.table<IStore>('stores').add({ name: name });
  }

  async addOrReplaceData<T>(data: T, table: TABLES, queryType: QUERYTYPE): Promise<number> {
    return await this.__db.table<T>(TABLES[table])[QUERYTYPE[queryType]](data);
  }

  private createTables = () => {
    if (this.__db !== null) {
      this.__db.version(1).stores(
        { stores: '++id, name' }
      )
    }
  }

  private createDatabase = () => {
    this.__db = new Dexie('tgDB');
  }

}

enum QUERYTYPE {
  ADD = 0,
  REPLACE = 1
}

enum TABLES {
  STORES = 0,
  ITEMS = 1
}