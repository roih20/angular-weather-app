import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HomeIcon } from '../../assets/icons/home-icon';
import { SettingsIcon } from '../../assets/icons/settings-icon';
import { SearchIcon } from '../../assets/icons/search-icon';

@Component({
  selector: 'navbar',
  template: `
    <nav
      class="dark:text-slate-300 dark:bg-gray-900 bg-white font-medium px-5 py-3 flex items-center justify-between rounded-xl lg:flex-col lg:h-full lg:justify-around "
    >
      <a routerLink="/" class="flex flex-col items-center space-y-1">
        <svg home-icon class="w-5 h-5"></svg>
        <span class="text-sm">Home</span>
      </a>
      <a routerLink="/explore" class="flex flex-col items-center space-y-1">
        <svg search-icon class="w-5 h-5"></svg>
        <span class="text-sm">Explore</span>
      </a>
      <a routerLink="/settings" class="flex flex-col items-center space-y-1">
        <svg settings-icon class="w-5 h-5"></svg>
        <span class="text-sm">Settings</span>
      </a>
    </nav>
  `,
  imports: [RouterLink, HomeIcon, SettingsIcon, SearchIcon],
})
export class Navbar {}
