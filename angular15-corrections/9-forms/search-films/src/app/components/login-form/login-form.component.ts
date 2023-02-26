import { HttpErrorResponse } from '@angular/common/http'
import { Component, EventEmitter, OnDestroy, Output } from '@angular/core'
import { NonNullableFormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { LoginRequest } from '@models/login-request'
import { AuthenticationService } from '@services/authentication.service'
import { Subject, takeUntil } from 'rxjs'
import { password } from 'src/app/utils/password.validator'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnDestroy {
  title = 'Authentication'
  errorMessage = ''
  @Output() loggedIn = new EventEmitter<void>()
  unsubscribe = new Subject<void>()

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', [Validators.required, password()]]
  })

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private fb: NonNullableFormBuilder
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
    return new LoginRequest(
      this.loginForm.get('email')?.value ?? '',
      this.loginForm.get('password')?.value ?? ''
    )
  }

  private errorHandler(errorResponse: HttpErrorResponse): void {
    this.errorMessage = errorResponse.error.error ?? `${errorResponse.error.status} - ${errorResponse.error.statusText}`
  }

  ngOnDestroy(): void {
    this.unsubscribe.next()
    this.unsubscribe.complete()
  }
}
