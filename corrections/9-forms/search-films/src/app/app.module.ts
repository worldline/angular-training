import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LoginFormComponent } from './components/login-form/login-form.component'
import { FilmComponent } from './components/film/film.component'
import { FilmSearchComponent } from './components/film-search/film-search.component'
import { StarRatingPipe } from './pipes/star-rating.pipe'
import { NotFoundComponent } from './components/not-found/not-found.component'
import { AuthenticationInterceptor } from './interceptors/authentication.interceptor'

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    FilmComponent,
    FilmSearchComponent,
    StarRatingPipe,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
