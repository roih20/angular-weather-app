import { Component, input } from '@angular/core';
import { FeelsLike } from '../../features/weather-information/feels-like';
import { UvIndex } from '../../features/weather-information/uv-index';
import { WindData } from '../../features/weather-information/wind-data';
import { visibility } from '../../features/weather-information/visibility';
import { Humidity } from '../../features/weather-information/humidity';
import { Wind } from '../types/types';
@Component({
  selector: 'additional-weather-information',
  template: `
    <div class="grid grid-cols-2 gap-4 mt-4 sm:mt-0 sm:gap-3 sm:h-full">
      <feels-like [temperature]="temperature()"></feels-like>
      <uv-index [uvIndex]="uvIndex()"></uv-index>
      <wind-data class="col-span-2" [windInfo]="wind()"></wind-data>
      <visibility [viewDistance]="viewDistance()"></visibility>
      <humidity [dewpointDegree]="dewpointDegree()" [humidityLevel]="humidityLevel()"></humidity>
    </div>
  `,
  imports: [FeelsLike, UvIndex, WindData, visibility, Humidity],
})
export class AdditionalWeatherInformation {
  temperature = input.required<number>();
  uvIndex = input.required<number>();
  viewDistance = input.required<number>();
  humidityLevel = input.required<number>();
  dewpointDegree = input.required<number>();
  wind = input.required<Wind>();
}
