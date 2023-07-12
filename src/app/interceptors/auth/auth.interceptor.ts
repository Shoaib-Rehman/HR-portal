import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageState } from 'src/app/local-storage.state';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const modifiedRequest = request.clone({
      setHeaders: {
        'Authorization': `Bearer ${LocalStorageState.Tokan}`,
        'Custom-Header': 'your_custom_header_value'
      }
    });

    return next.handle(modifiedRequest);
  }
}
