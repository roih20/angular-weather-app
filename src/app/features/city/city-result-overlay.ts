import { Component, input } from '@angular/core';
import { City } from '../../shared/types/types';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'city-result-overlay',
  template: `
    <ul class="dark:text-slate-200 font-medium mx-4 mt-3 sm:mx-6">
      @for (city of cities(); track city.id) {
        <li class="">
          <a class="block px-2 py-4" [routerLink]="['/explore', city.id]"
            >{{ city.name }}, {{ city.region }}, {{ city.country }}</a
          >
        </li>
      }
    </ul>
  `,
  imports: [RouterLink],
})
export class CityResultOverlay {
  cities = input.required<City[]>();
}
