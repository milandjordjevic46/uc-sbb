import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { first, flatMap, map, tap } from 'rxjs/operators';

import { Router } from '@angular/router';
import { LoaderService } from './loader.service';
import { ErrorHandlingService } from './error-handling.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(
    private loaderService: LoaderService,
    private errorHandlingService: ErrorHandlingService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loaderService.show();
    return next.handle(request).pipe(
      tap(
        (event) => {
          this.loaderService.hide();
        },
        (error) => {
          this.loaderService.hide();
          this.errorHandlingService.displayError('Something went wrong');
        }
      )
    );
  }
}
