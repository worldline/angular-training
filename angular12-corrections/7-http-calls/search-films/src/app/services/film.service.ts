import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Film } from '@models/film'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private baseUrl = 'api/movies'

  constructor(
    private httpClient: HttpClient
  ) { }

  search(title: string): Observable<Film[]> {
    const options = {
      params: new HttpParams().set('title', title)
    }
    return this.httpClient.get<Film[]>(this.baseUrl + '/search', options)
  }
}
