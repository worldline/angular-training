import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isLoggedIn = false

  onLogin(): void {
    this.isLoggedIn = true
  }

  onLogout(): void {
    this.isLoggedIn = false
  }
}
