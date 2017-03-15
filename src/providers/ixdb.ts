import Dexie from 'dexie';
import { TABLE } from '../common/tgCore';

export class IXDB {
  private __db: Dexie = null;
  constructor() {
    this.createDatabase();
    this.createTables();
  }

  async getAll<T>(table: TABLE): Promise<Array<T>> {
    return await this.__db
      .table<T>(this.table(table))
      .toArray();
  }

  async getOnce<T>(table: TABLE, key: string, compareWith: any): Promise<T> {
    return await this.__db
      .table<T>(this.table(table))
      .where(key)
      .equalsIgnoreCase(compareWith)
      .first();
  }

  async getBulk<T>(table: TABLE, key: string, compareWith: any): Promise<Array<T>> {
    return await this.__db
    .table<T>(this.table(table))
    .where(key)
    .equals(compareWith)
    .toArray();
  }

  async addOne<T>(table: TABLE, object: T): Promise<number> {
    return await this.__db
      .table<T>(this.table(table))
      .add(object);
  }

  async addOrReplaceOne<T>(table: TABLE, object: T): Promise<number> {
    return await this.__db
      .table<T>(this.table(table))
      .put(object);
  }

  async removeOne(table: TABLE, index: number): Promise<void> {
    return await this.__db
    .table(this.table(table))
    .delete(index);
  }

  private createTables = () => {
    if (this.__db !== null) {
      this.__db.version(1).stores({
        stores: '++id, name',
        items: '++id, storeId, name, quantity, unit, isChecked'
      });
    }
  }

  private createDatabase = () => {
    this.__db = new Dexie('tgDB');
  }

  private table = (table: TABLE): string => {
    return TABLE[table].toLowerCase();
  }

}

