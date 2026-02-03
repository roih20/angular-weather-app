import { Routes } from '@angular/router';
import { HomePage } from './pages/home';
import { cityTitleResolver } from './core/resolvers/city-title.resolver';

export const routes: Routes = [
  {
    path: '',
    title: 'Home - Weather App',
    component: HomePage,
  },
  {
    path: 'settings',
    title: 'Settings - Weather App',
    loadComponent: () => import('./pages/settings').then((m) => m.SettingsPage),
  },
  {
    path: 'explore',
    title: 'Explore cities - Weather App',
    loadComponent: () => import('./pages/explore').then((m) => m.ExplorePage),
  },
  {
    path: 'explore/:id',
    title: cityTitleResolver,
    loadComponent: () => import('./pages/city').then((m) => m.CityWeather),
  },
];
