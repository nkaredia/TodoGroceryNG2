import Dexie from 'dexie';
import { TABLE } from '../common/tgCore';

export class IXDB {
  private __db: Dexie = null;
  constructor() {
    this.createDatabase();
    this.createTables();
  }

  getAll = async <T>(table: TABLE): Promise<Array<T>> => {
    return await this.__db
      .table<T>(this.table(table))
      .toArray();
  };

  getOnce = async <T>(table: TABLE, key: string, compareWith: any): Promise<T> => {
    return await this.__db
      .table<T>(this.table(table))
      .where(key)
      .equalsIgnoreCase(compareWith)
      .first();
  };

  getBulk = async <T>(table: TABLE, key: string, compareWith: any): Promise<Array<T>> => {
    return await this.__db
      .table<T>(this.table(table))
      .where(key)
      .equals(compareWith)
      .toArray();
  }

  addOne = async <T>(table: TABLE, object: T): Promise<number> => {
    return await this.__db
      .table<T>(this.table(table))
      .add(object);
  }

  addOrReplaceOne = async <T>(table: TABLE, object: T): Promise<number> => {
    return await this.__db
      .table<T>(this.table(table))
      .put(object);
  }

  removeOne = async <T>(table: TABLE, index: number): Promise<number> => {
    return await this.__db
      .table(this.table(table))
      .where('id')
      .equals(index)
      .delete();
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

