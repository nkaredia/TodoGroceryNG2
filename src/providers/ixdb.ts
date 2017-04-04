import Dexie from 'dexie';
import { TABLE, ITEMSORT } from '../common/tgCore';

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

  getSortedBulk = async <T>(table: TABLE, key: string, compareWith: any, sort: ITEMSORT): Promise<Array<T>> => {
    let items = await this.__db
      .table<T>(this.table(table))
      .where(key)
      .equals(compareWith)
      .toArray();
    items = items.sort((left, right) => {
      if (typeof left[ITEMSORT[sort]] === 'number') {
        return left[ITEMSORT[sort]] - right[ITEMSORT[sort]];
      } else if (typeof left[ITEMSORT[sort]] === 'string') {
        return left[ITEMSORT[sort]].toString().toLowerCase().localeCompare(right[ITEMSORT[sort]].toString().toLowerCase());
      }
    });
    return items;
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

  removeBulk = async <T>(table: TABLE, index: Array<number>): Promise<void> => {
    return await this.__db
      .table(this.table(table))
      .bulkDelete(index);
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

