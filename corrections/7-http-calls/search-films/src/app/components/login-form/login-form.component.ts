import { HttpErrorResponse } from '@angular/common/http'
import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { LoginRequest } from '@models/authentication/login-request'
import { AuthenticationService } from 'src/app/services/authentication.service'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  title = 'Authentication'
  email = ''
  password = ''
  errorMessage: string | null = null

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute
  ) {}

  login(): void {
    this.authenticationService.login(this.loginRequest)
      .subscribe(
        response => {
          this.authenticationService.token = response.token
          const returnUrl = this.route.snapshot.paramMap.get('returnUrl')
          this.router.navigateByUrl(returnUrl ? `/${returnUrl}` : '')
        },
        error => this.errorHandler(error)
      )
  }

  register(): void {
    this.authenticationService.register(this.loginRequest)
      .subscribe(
        response => {},
        error => this.errorHandler(error)
      )
  }

  get loginRequest(): LoginRequest {
    return new LoginRequest(this.email, this.password)
  }

  private errorHandler(error: HttpErrorResponse): void {
    this.errorMessage = error.error.error ?? `${error.status} - ${error.statusText}`
  }
}
