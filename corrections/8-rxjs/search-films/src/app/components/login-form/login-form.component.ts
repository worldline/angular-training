import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnDestroy } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { LoginRequest } from '@models/authentication/login-request'
import { AuthenticationService } from '@services/authentication.service'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnDestroy {
  title = 'Authentication'
  email = ''
  password = ''
  errorMessage: string | null = null
  unsubscribe = new Subject()

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute
  ) {}

  login(): void {
    this.authenticationService.login(this.loginRequest)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: response => {
          this.authenticationService.token = response.token
          const returnUrl = this.route.snapshot.paramMap.get('returnUrl')
          this.router.navigateByUrl(returnUrl ? `/${returnUrl}` : '')
        },
        error: error => this.errorHandler(error)
      })
  }

  register(): void {
    this.authenticationService.register(this.loginRequest)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: response => {},
        error: error => this.errorHandler(error)
      })
  }

  get loginRequest(): LoginRequest {
    return new LoginRequest(this.email, this.password)
  }

  private errorHandler(error: HttpErrorResponse): void {
    this.errorMessage = error.error.error ?? `${error.status} - ${error.statusText}`
  }

  ngOnDestroy(): void {
    this.unsubscribe.next()
    this.unsubscribe.complete()
  }
}
