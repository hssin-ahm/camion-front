import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserAuthService } from '../services/user-auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { setLoadingSpinner } from 'src/app/store/shared/shared.action';
import { logout } from '../state/auth.actions';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.headers.get('No-Auth') === 'True') {
      return next.handle(req.clone());
    }

    const token = this.userAuthService.getToken();

    req = this.addToken(req, token);
    // this.store.dispatch(setLoadingSpinner({ status: true }));

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        // this.store.dispatch(setLoadingSpinner({ status: false }));
        if (err.status == 401) {
          this.store.dispatch(logout());
        } else if (err.status === 403) {
          this.router.navigate(['/forbidden/403']);
        }
        return throwError('Some thing is wrong');
      })
    );
    // .pipe(
    //   map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
    //     if (evt instanceof HttpResponse) {
    // this.store.dispatch(setLoadingSpinner({ status: false }));
    //     }
    //     return evt;
    //   })
    // );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
