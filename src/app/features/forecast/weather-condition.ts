import { Component, input } from '@angular/core';
import { WeatherCondition as WeatherOptions } from '../../shared/enums/weather-condition.enum';
import { SunIcon } from '../../assets/icons/sun-icon';
import { MoonIcon } from '../../assets/icons/moon-icon';
import { CloudyIcon } from '../../assets/icons/cloudy-icon';
import { SunCloudyIcon } from '../../assets/icons/sun-cloudy-icon';
import { MoonCloudyIcon } from '../../assets/icons/moon-cloudy-icon';
import { MistIcon } from '../../assets/icons/mist-icon';
import { RainyIcon } from '../../assets/icons/rainy-icon';
import { SnowyIcon } from '../../assets/icons/snowy-icon';
import { SnowflakeIcon } from '../../assets/icons/snowflake';
import { FoggyIcon } from '../../assets/icons/foggy-icon';

@Component({
  selector: 'weather-condition',
  template: ` @switch (condition()) {
    @case (weatherCondition.OVERCAST)
    @case (weatherCondition.CLOUDY) {
      <svg cloudy-icon class="w-7 h-7 dark:text-white text-gray-800"></svg>
    }
    @case (weatherCondition.PARTLY_CLOUDY)
    @case (weatherCondition.PARTLY_CLOUDY_2) {
      @if (isDay() !== undefined) {
        @if (isDay()) {
          <svg sun-cloudy class="w-7 h-7 dark:text-white text-gray-800"></svg>
        } @else {
          <svg moon-cloudy class="w-7 h-7 dark:text-white text-gray-800"></svg>
        }
      } @else {
        <svg sun-cloudy class="w-7 h-7 dark:text-white text-gray-800"></svg>
      }
    }
    @case (weatherCondition.CLEAR) {
      @if (isDay() !== undefined) {
        @if (isDay()) {
          <svg sun-icon class="w-7 h-7 dark:text-white text-gray-800"></svg>
        } @else {
          <svg moon-icon class="w-7 h-7 dark:text-white text-gray-800"></svg>
        }
      } @else {
        <svg sun-icon class="w-7 h-7 dark:text-white text-gray-800"></svg>
      }
    }
    @case (weatherCondition.SUNNY) {
      <svg sun-icon class="w-7 h-7 dark:text-white text-gray-800"></svg>
    }
    @case (weatherCondition.MIST) {
      <svg mist-icon class="w-7 h-7 dark:text-white text-gray-800"></svg>
    }
    @case (weatherCondition.RAINY)
    @case (weatherCondition.MODERATE_RAIN)
    @case (weatherCondition.LIGHT_RAIN)
    @case (weatherCondition.THUNDER_STORM) {
      <svg rainy-icon class="w-7 h-7 dark:text-white text-gray-800"></svg>
    }
    @case (weatherCondition.SNOWY)
    @case (weatherCondition.MODERATE_SNOW)
    @case (weatherCondition.FREEZING_RAIN) {
      <svg snowy-icon class="w-7 h-7 dark:text-white text-gray-800"></svg>
    }
    @case (weatherCondition.HEAVY_SNOW) {
      <svg snowflake-icon class="w-7 h-7 dark:text-white text-gray-800"></svg>
    }
    @case (weatherCondition.FREEZING_FOG) {
      <svg foggy-icon class="w-7 h-7 dark:text-white text-gray-800"></svg>
    }
  }`,
  imports: [
    SunIcon,
    MoonIcon,
    CloudyIcon,
    SunCloudyIcon,
    MoonCloudyIcon,
    MistIcon,
    RainyIcon,
    SnowyIcon,
    SnowflakeIcon,
    FoggyIcon,
  ],
})
export class WeatherCondition {
  condition = input.required<string>();
  isDay = input<boolean>();
  weatherCondition = WeatherOptions;
}
