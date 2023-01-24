import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthenticationService } from '@services/authentication.service'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  title = 'Authentication'
  email = ''
  password = ''

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute
  ) {}

  login(): void {
    this.authenticationService.login()
    const returnUrl = this.route.snapshot.paramMap.get('returnUrl')
    this.router.navigateByUrl(returnUrl ? `/${returnUrl}` : '')
  }

}
