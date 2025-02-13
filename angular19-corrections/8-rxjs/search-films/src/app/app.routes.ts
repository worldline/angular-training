import { Routes } from '@angular/router'
import { FilmSearchComponent } from '@components/film-search/film-search.component'
import { LoginFormComponent } from '@components/login-form/login-form.component'
import { NotFoundComponent } from '@components/not-found/not-found.component'
import { authenticationGuard } from '@guards/authentication.guard'

export const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'search', component: FilmSearchComponent, canActivate: [authenticationGuard]},
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
]
