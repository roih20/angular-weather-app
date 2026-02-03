import { Component, input, computed, inject } from '@angular/core';
import { EyeIcon } from '../../assets/icons/eye-icon';
import { SettingsService } from '../../core/services/settings.service';
import { DistancePipe } from '../../shared/pipes/distance.pipe';

@Component({
  selector: 'visibility',
  template: `
    <div class="dark:bg-gray-900 bg-white px-3 py-2 rounded-xl flex flex-col h-full">
      <h4 class="dark:text-gray-400 text-slate-700 text-sm font-medium flex items-center gap-x-1">
        <svg eye-icon class="w-4 h-4"></svg>
        VISIBILITY
      </h4>
      <p class="mt-2 dark:text-gray-100 text-slate-800 font-medium text-3xl flex-1">
        {{ viewDistance() | distance: distanceUnit() }} {{ distanceUnit() }}
      </p>
      <p class="mt-2 dark:text-gray-200 font-medium text-slate-800">
        {{ visibilityScale() }}
      </p>
    </div>
  `,
  imports: [EyeIcon, DistancePipe],
})
export class visibility {
  private settingsService = inject(SettingsService);
  viewDistance = input.required<number>();
  visibilityScale = computed(() => {
    const distance = this.viewDistance();

    if (distance <= 1) {
      return 'Near-zero visibility.';
    } else if (distance > 1 && distance < 6) {
      return 'Poor view.';
    } else if (distance >= 6 && distance < 10) {
      return 'Good view.';
    } else if (distance >= 10) {
      return 'Clear view.';
    } else {
      return '';
    }
  });

  distanceUnit = computed(() => this.settingsService.preferrerdDistanceUnit);
}
