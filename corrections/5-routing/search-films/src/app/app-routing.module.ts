import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { FilmSearchComponent } from './components/film-search/film-search.component'
import { LoginFormComponent } from './components/login-form/login-form.component'
import { NotFoundComponent } from './components/not-found/not-found.component'

const routes: Routes = [
  {path: 'login', component: LoginFormComponent},
  {path: 'search', component: FilmSearchComponent},
  {path: '', pathMatch: 'full', redirectTo: 'search'},
  {path: '**', component: NotFoundComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
