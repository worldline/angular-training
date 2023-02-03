import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LoginFormComponent } from './components/login-form/login-form.component'
import { StarRatingPipe } from './pipes/star-rating.pipe'
import { FilmComponent } from './components/film/film.component'
import { FilmSearchComponent } from './components/film-search/film-search.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    StarRatingPipe,
    FilmComponent,
    FilmSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
