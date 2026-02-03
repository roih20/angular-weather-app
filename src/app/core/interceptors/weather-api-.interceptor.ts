import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export function weatherApiInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  if (req.url.includes(environment.apiUrl)) {
    const newReq = req.clone({
      setParams: {
        key: environment.apiKey,
      },
    });

    return next(newReq);
  }

  return next(req);
}
