import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http'
import { Observable } from 'rxjs'
import { AuthenticationService } from '@services/authentication.service'

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authenticationService.token
    if (token) {
      const cloned = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${this.authenticationService.token}`)
      })
      return next.handle(cloned)
    }

    return next.handle(request)
  }
}
