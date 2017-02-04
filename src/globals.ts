import { Pipe, PipeTransform, Injectable } from '@angular/core';

export enum UNIT {
  pack,
  litre,
  gallon,
  kilogram,
  pound,
  dozen
}

export function mapUnitsInNumber(index: string) {
  return UNIT[index];
}

@Pipe({
  name: 'searchFor'
})
@Injectable()
export class SearchForPipe implements PipeTransform {
  transform(items: Array<ListItem>, searchQuery: Array<string>) {
    return items.filter((item) => {
      if (searchQuery && searchQuery[0] && searchQuery[0].length > 0) {
        return item.name.toLowerCase().startsWith(searchQuery[0])
      } else {
        return true;
      }
    });
  }
}