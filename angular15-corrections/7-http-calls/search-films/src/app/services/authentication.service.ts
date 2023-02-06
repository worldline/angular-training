import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { LoginRequest } from '@models/login-request'
import { RegistrationRequest } from '@models/registration-request'
import { UserResponse } from '@models/user-response'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl = 'api/user'
  token: string | null = null

  constructor(private httpClient: HttpClient) {}

  login(loginRequest: LoginRequest): Observable<UserResponse> {
    return this.httpClient.post<UserResponse>(`${this.baseUrl}/login`, loginRequest)
  }

  register(loginRequest: LoginRequest): Observable<UserResponse> {
    const registrationRequest = new RegistrationRequest(
      loginRequest.email,
      loginRequest.password,
      'John',
      'Smith'
    )

    return this.httpClient.post<UserResponse>(`${this.baseUrl}/register`, registrationRequest)
  }

  get loggedIn(): boolean {
    return this.token != null
  }

  onLogout(): void {
    this.token = null
  }
}
