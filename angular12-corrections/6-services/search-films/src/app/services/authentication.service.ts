import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  loggedIn = false
  constructor() { }

  login(): void {
    this.loggedIn = true
  }

  logout(): void {
    this.loggedIn = false
  }
}
