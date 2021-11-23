import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenPersistenceService } from 'src/modules/auth/token-persistence.service';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenPersistenceService) {}

  ignoreRules = [{ method: 'GET', test: /comments$/ }];

  shouldInterceptRequest(req: HttpRequest<any>) {
    return !this.ignoreRules.find(
      (rule) => req.method === rule.method && req.url.match(rule.test)
    );
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.tokenService.get().pipe(
      mergeMap((token) => {
        if (token && this.shouldInterceptRequest(request)) {
          request = request.clone({
            setHeaders: {
              Authorization: `Token ${token}`,
            },
          });
        }
        return next.handle(request);
      })
    );
  }
}
