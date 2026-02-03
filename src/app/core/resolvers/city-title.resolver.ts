import { ResolveFn } from '@angular/router';

export const cityTitleResolver: ResolveFn<string> = (route, state) => {
  const cityId = route.paramMap.get('id')!;
  return `${cityId} - Weather App`;
};
