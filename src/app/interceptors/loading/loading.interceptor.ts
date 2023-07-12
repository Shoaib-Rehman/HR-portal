import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import {
  LoadingOverlayRef,
  LoadingService,
} from 'src/app/services/loader/loader.service';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let loadingRef: LoadingOverlayRef;

    Promise.resolve(null).then(() => (loadingRef = this.loadingService.open()));

    return next.handle(request).pipe(
      tap((event: any) => {
        if (event instanceof HttpResponse && loadingRef) {
          loadingRef.close();
        }
      }),
      catchError((error: any) => {
        if (loadingRef) {
          loadingRef.close();
        }

        return throwError(error);
      })
    );
  }
}
