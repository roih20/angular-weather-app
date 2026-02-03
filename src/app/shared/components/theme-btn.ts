import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'theme-btn',
  template: `
    <button
      class="p-1.5 rounded-lg w-full"
      [class]="
        value() === preferredTheme
          ? 'dark:bg-gray-700 dark:text-slate-200 bg-black text-white'
          : 'bg-transparent'
      "
      value="{{ value() }}"
      (click)="setTheme($event)"
    >
      {{ theme() }}
    </button>
  `,
})
export class ThemeBtn {
  theme = input.required<string>();
  value = input.required<string>();

  setTheme(event: PointerEvent) {
    const button = event.target as HTMLButtonElement;
    localStorage.setItem('theme', button.value);
    this.applyTheme();
  }

  get preferredTheme() {
    return localStorage.getItem('theme');
  }

  applyTheme() {
    const theme = this.preferredTheme;
    const systemPrefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle(
      'dark',
      theme === 'dark' || (theme === 'system' && systemPrefersDark),
    );
  }
}
