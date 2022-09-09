import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, last, map, tap } from 'rxjs/operators';
import { SpinnerService } from './spinner.service';


@Injectable()
export class HttpEventInterceptor implements HttpInterceptor {

  constructor(private spinner: SpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const hideSpinner = request.headers.get('hideSpinner');
    if (!!hideSpinner && hideSpinner === 'true') {
      return next.handle(request);
    }

    return next.handle(request)
    .pipe(
      tap(
        event => this.handleHttpEvent(event)
      )
    );
  }

  private handleHttpEvent(event: HttpEvent<any>) {
    switch (event.type) {
      case HttpEventType.Sent:
        this.spinner.showSpinner(true);
        break;
      case HttpEventType.UploadProgress:


      case HttpEventType.Response:
        this.spinner.showSpinner(false);
        break;

      default:
    }

  }


}
