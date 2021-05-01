import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Film } from '@models/film'
import { Observable } from 'rxjs'
import { AuthenticationService } from './authentication.service'

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private baseUrl = 'api/movies'

  get headers(): HttpHeaders {
    return new HttpHeaders({
        Authorization: `Bearer ${this.authenticationService.token}`
      })
  }

  constructor(
    private authenticationService: AuthenticationService,
    private httpClient: HttpClient
  ) { }

  search(title: string): Observable<Film[]> {
    const options = {
      headers: this.headers,
      params: new HttpParams().set('title', title)
    }
    return this.httpClient.get<Film[]>(this.baseUrl + '/search', options)
  }
}
