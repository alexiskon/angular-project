import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';




@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler):
  Observable<HttpEvent<unknown>> {
  request = request.clone({ setHeaders: { Authorization: "code.hub.ng5.token"} });
  return next.handle(request)
    .pipe(
      map((event: HttpEvent<unknown>) => {
        if (event instanceof HttpResponse) {
          if (event.status === 200) {
            console.log("200 status code");
          }
          else if (event.status === 203) {
            console.log("203 status code");
          }
        }
        return event;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
}
}
