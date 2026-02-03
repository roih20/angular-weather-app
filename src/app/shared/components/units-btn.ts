import { Component, signal, input } from '@angular/core';

@Component({
  selector: 'units-btn',
  template: `
    <button
      type="button"
      class="w-full p-1.5 rounded-lg"
      value="{{ value() }}"
      (click)="setUnit($event)"
      [class]="
        value() === preferredUnit
          ? 'dark:bg-gray-700 dark:text-slate-200 text-white bg-black'
          : 'bg-transparent'
      "
    >
      {{ unit() }}
    </button>
  `,
})
export class UnitsBtn {
  unit = input.required<string>();
  value = input.required<string>();
  unitType = input.required<string>();

  setUnit(event: PointerEvent) {
    const button = event.target as HTMLButtonElement;
    localStorage.setItem(this.unitType(), button.value);
  }

  get preferredUnit() {
    return localStorage.getItem(this.unitType());
  }
}
