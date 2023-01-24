import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnDestroy } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { LoginRequest } from '@models/authentication/login-request'
import { AuthenticationService } from '@services/authentication.service'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { password } from 'src/app/utils/password.validator'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnDestroy {
  title = 'Authentication'
  errorMessage: string | null = null
  unsubscribe = new Subject()
  loginForm: FormGroup

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, password()]]
    })
  }

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
    return this.loginForm.value as LoginRequest
  }

  private errorHandler(error: HttpErrorResponse): void {
    this.errorMessage = error.error.error ?? `${error.status} - ${error.statusText}`
  }

  ngOnDestroy(): void {
    this.unsubscribe.next()
    this.unsubscribe.complete()
  }
}
