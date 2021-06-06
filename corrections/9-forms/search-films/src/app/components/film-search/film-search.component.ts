import { Component } from '@angular/core'
import { Film } from '@models/film'
import { FilmService } from '@services/film.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-film-search',
  templateUrl: './film-search.component.html',
  styleUrls: ['./film-search.component.scss']
})
export class FilmSearchComponent {
  films: Observable<Film[]> | null = null
  title = ''

  constructor(private filmService: FilmService) {}

  searchFilms(): void {
    this.films = this.filmService.search(this.title)
  }
}
