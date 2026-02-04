import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/components/navbar';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <navbar
      class="fixed bottom-0 inset-x-0 mx-4 mb-4 sm:mx-6 lg:static lg:m-0 lg:py-4 lg:pl-4 xl:p-0 xl:h-228"
    ></navbar>
  `,
  imports: [RouterOutlet, Navbar],
  host: {
    class:
      'relative flex flex-col lg:static lg:flex-row-reverse lg:min-h-screen xl:max-w-6xl xl:mx-auto xl:justify-center xl:items-center xl:min-h-screen',
  },
})
export class App {}
