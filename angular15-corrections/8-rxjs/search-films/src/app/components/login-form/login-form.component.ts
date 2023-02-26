import { HttpErrorResponse } from '@angular/common/http'
import { Component, EventEmitter, OnDestroy, Output } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { LoginRequest } from '@models/login-request'
import { AuthenticationService } from '@services/authentication.service'
import { Subject, takeUntil } from 'rxjs'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnDestroy {
  title = 'Authentication'
  email = ''
  password = ''
  errorMessage = ''
  @Output() loggedIn = new EventEmitter<void>()
  unsubscribe = new Subject<void>()

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService
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
      .subscribe({ error: error => this.errorHandler(error) })
  }

  get loginRequest(): LoginRequest {
    return new LoginRequest(this.email, this.password)
  }

  private errorHandler(errorResponse: HttpErrorResponse): void {
    this.errorMessage = errorResponse.error.error ?? `${errorResponse.error.status} - ${errorResponse.error.statusText}`
  }

  ngOnDestroy(): void {
    this.unsubscribe.next()
    this.unsubscribe.complete()
  }
}
