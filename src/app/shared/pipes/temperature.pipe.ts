import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperature',
})
export class TemperaturePipe implements PipeTransform {
  transform(value: number, unit: string): number {
    if (unit === 'celsius') {
      const celsius = ((value - 32.0) * 5.0) / 9.0;
      return Math.ceil(celsius);
    }

    return value;
  }
}
