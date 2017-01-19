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