import { HttpErrorResponse } from '@angular/common/http'
import { Component, DestroyRef, inject } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { LoginRequest } from '@models/authentication/login-request'
import { AuthenticationService } from '@services/authentication.service'
import { password } from 'app/utils/password.validator'

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  fb = inject(NonNullableFormBuilder)
  title = 'Authentication'
  errorMessage = ''

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', [Validators.required, password()]]
  })

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private destroyRef: DestroyRef
  ) {
  }

  login() {
    this.errorMessage = ''
    this.authenticationService.login(this.loginRequest)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: response => {
          this.authenticationService.token = response.token
          const postLoginUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl')
          this.router.navigateByUrl(postLoginUrl ? `/${postLoginUrl}` : '')
        },
        error: errorResponse => this.errorHandler(errorResponse)
      })
  }

  register(): void {
    this.errorMessage = ''
    this.authenticationService.register(this.loginRequest)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({ error: errorResponse => this.errorHandler(errorResponse) })
  }

  private errorHandler(errorResponse: HttpErrorResponse): void {
    this.errorMessage = errorResponse.error.error ?? `${errorResponse.error.status} - ${errorResponse.error.statusText}`
  }

  get loginRequest(): LoginRequest {
    return new LoginRequest(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
  }
}
