import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LoginFormComponent } from './components/login-form/login-form.component'
import { StarRatingPipe } from './pipes/star-rating.pipe'
import { FilmComponent } from './components/film/film.component'
import { FilmSearchComponent } from './components/film-search/film-search.component'
import { NotFoundComponent } from './components/not-found/not-found.component'
import { AuthenticationInterceptor } from './interceptors/authentication.interceptor'

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    StarRatingPipe,
    FilmComponent,
    FilmSearchComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
