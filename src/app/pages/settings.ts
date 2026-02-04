import { Component } from '@angular/core';
import { UnitsBtn } from '../shared/components/units-btn';
import { ThemeBtn } from '../shared/components/theme-btn';

@Component({
  selector: 'app-settings',
  template: `
    <h1 class="dark:text-slate-300 font-semibold text-xl mt-8 text-center sm:text-2xl">Settings</h1>
    <h2 class="dark:text-gray-400 font-semibold text-lg mt-6 ml-5 sm:ml-7 sm:text-xl">Units</h2>
    <div class="dark:bg-gray-900 bg-white mx-4 p-3 rounded-xl mt-2.5 sm:mx-6">
      <h3 class=" dark:text-gray-400 font-medium sm:text-lg">Temperature</h3>
      <div
        class="dark:text-slate-300 bg-gray-100 font-medium text-sm flex items-center dark:bg-gray-950 p-1 mt-2 rounded-xl sm:text-base sm:mt-3"
      >
        <units-btn
          unit="Celsius(°C)"
          unitType="temperature"
          value="celsius"
          class="w-full"
        ></units-btn>
        <units-btn
          unit="Fahrenheit(°F)"
          unitType="temperature"
          value="fahrenheit"
          class="w-full"
        ></units-btn>
      </div>
      <hr class="dark:border-gray-700 border-gray-300 my-4" />
      <h3 class=" dark:text-gray-400 font-medium sm:text-lg">Wind Speed</h3>
      <div
        class="dark:text-slate-300 text-sm flex items-center dark:bg-gray-950 bg-gray-100 p-1 mt-2 rounded-xl sm:mt-3 sm:text-base"
      >
        <units-btn unit="mph" unitType="windSpeed" value="mph" class="w-full"></units-btn>
        <units-btn unit="km/h" unitType="windSpeed" value="km/h" class="w-full"></units-btn>
        <units-btn unit="m/s" unitType="windSpeed" value="m/s" class="w-full"></units-btn>
      </div>
      <hr class="dark:border-gray-700 border-gray-300 my-4" />
      <h3 class=" dark:text-gray-400 font-medium sm:text-lg">Distance</h3>
      <div
        class="dark:text-slate-300 text-sm flex items-center dark:bg-gray-950 bg-gray-100 p-1 mt-2 rounded-xl sm:mt-3 sm:text-base"
      >
        <units-btn unit="Miles (mi)" unitType="distance" value="mi" class="w-full"></units-btn>
        <units-btn unit="Kilometers (km)" unitType="distance" value="km" class="w-full"></units-btn>
      </div>
    </div>
    <h2 class="dark:text-gray-400 font-semibold mt-5 ml-5 text-lg sm:text-xl sm:ml-7">Theme</h2>
    <div class="dark:bg-gray-900 bg-white mx-4 p-3 rounded-xl mt-2.5 sm:mx-6">
      <h3 class="dark:text-gray-400 font-medium sm:text-lg">Select Theme</h3>
      <div
        class="dark:bg-gray-950 bg-gray-100 text-sm dark:text-slate-300 p-1 mt-2 rounded-xl flex items-center sm:mt-3 sm:text-base"
      >
        <theme-btn theme="Light" value="light" class="w-full"></theme-btn>
        <theme-btn theme="Dark" value="dark" class="w-full"></theme-btn>
        <theme-btn theme="System" value="system" class="w-full"></theme-btn>
      </div>
    </div>
    <div class="mt-8 mx-4 sm:mx-6">
      <button
        (click)="restoreDefaults()"
        class="dark:bg-gray-900 bg-white p-4 rounded-full w-full dark:text-blue-600 text-left font-medium"
      >
        Restore Defaults
      </button>
    </div>
  `,
  imports: [UnitsBtn, ThemeBtn],
  host: {
    class: 'overflow-y-auto h-140 sm:h-170 md:h-200 lg:h-full lg:w-full',
  },
})
export class SettingsPage {
  restoreDefaults() {
    localStorage.setItem('temperature', 'fahrenheit');
    localStorage.setItem('windSpeed', 'mph');
    localStorage.setItem('distance', 'mi');
  }
}
