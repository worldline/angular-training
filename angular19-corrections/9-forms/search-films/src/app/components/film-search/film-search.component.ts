import { AsyncPipe } from '@angular/common'
import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { FilmComponent } from '@components/film/film.component'
import { Film } from '@models/film'
import { FilmService } from '@services/film.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-film-search',
  imports: [FormsModule, FilmComponent, AsyncPipe],
  templateUrl: './film-search.component.html',
  styleUrl: './film-search.component.scss'
})
export class FilmSearchComponent {
  films: Observable<Film[]> | undefined

  constructor(
    private filmService: FilmService
  ) {}

  searchFilms(title: string): void {
    this.films = this.filmService.search(title)
  }
}
