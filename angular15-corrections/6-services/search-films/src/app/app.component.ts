import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthenticationService } from '@services/authentication.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'search-films'

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  get isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn
  }

  logout() {
    this.authenticationService.onLogout()
    this.router.navigate(['login'])
  }
}
