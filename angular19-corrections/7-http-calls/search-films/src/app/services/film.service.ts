import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Film } from '@models/film'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  baseUrl = 'api/movies/search'

  constructor(
    private http: HttpClient
  ) { }

  search(title: string): Observable<Film[]> {
    const options = {
      params: new HttpParams().set('title', title)
    }

    return this.http.get<Film[]>(this.baseUrl, options)
  }
}
