import {
  ApplicationConfig,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { weatherApiInterceptor } from './core/interceptors/weather-api-.interceptor';

function applyTheme() {
  const theme = localStorage.getItem('theme');
  const systemPrefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.classList.toggle(
    'dark',
    theme === 'dark' || (theme === 'system' && systemPrefersDark),
  );
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([weatherApiInterceptor])),
    provideAppInitializer(() => {
      if (!localStorage.getItem('temperature')) {
        localStorage.setItem('temperature', 'fahrenheit');
      }

      if (!localStorage.getItem('windSpeed')) {
        localStorage.setItem('windSpeed', 'mph');
      }

      if (!localStorage.getItem('distance')) {
        localStorage.setItem('distance', 'mi');
      }

      if (!localStorage.getItem('theme')) {
        localStorage.setItem('theme', 'system');
      }

      applyTheme();
    }),
  ],
};
