import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distance',
})
export class DistancePipe implements PipeTransform {
  transform(value: number, unit: string): number {
    if (unit === 'km') {
      const mile = 1.609;
      return Math.ceil(value * mile);
    }

    return value;
  }
}
