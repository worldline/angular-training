import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthenticationService } from './services/authentication.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  logout(): void {
    this.authenticationService.logout()
    this.router.navigateByUrl('/login')
  }

  get loggedIn(): boolean {
    return this.authenticationService.loggedIn
  }
}
