import { Component, computed, output, signal } from '@angular/core';
import { SearchIcon } from '../../assets/icons/search-icon';

@Component({
  selector: 'search-bar',
  template: `
    <div
      class="dark:bg-gray-800 bg-white mx-4 mt-6 px-4 py-2 rounded-full flex items-center gap-x-1 sm:mx-6 xl:mt-0"
    >
      <svg search-icon class="w-5.5 h-5.5 dark:text-slate-200"></svg>
      <input
        type="text"
        placeholder="Search for a city"
        class="dark:placeholder:text-slate-200 placeholder:text-slate-800 text-slate-800 dark:text-slate-200 flex-1 w-full p-1 focus:outline-none"
        maxlength="50"
        (input)="onSearch($event.target.value)"
      />
    </div>
  `,
  imports: [SearchIcon],
})
export class SearchBar {
  //city = signal<string>('');
  query = output<string>();

  onSearch(query: string): void {
    //this.city.set(query);
    this.query.emit(query);
  }
}
