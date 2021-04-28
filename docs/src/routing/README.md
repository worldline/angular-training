# Routing

Angular applications are mostly Single Page Applications (SPA). The server always serves a single HTML page, and navigation between the application pages/sections is managed on the client side in JavaScript. This approach allows smoother transitions between pages, and reduces the number of server calls needed to navigate between pages, improving the UX. This is essential for Progressive Web Apps or web applications that want to have offline features.

The routing of an SPA is therefore managed on the client side, and the Angular team provides a library for this purpose: `@angular/router`. This router allows you to associate routes (URLs) with Angular components.

For this chapter, we will use the Personal Library app as a running exemple. Besides the `AppComponent` which contains a `NavbarComponent` , the app has 5 "pages":
- Home
- Book list
- Book detail
- Author list
- Author detail

The targeted routing of the exemple app is as follows:

![Targeted routing](../assets/routing.png)

This [Stackblitz](https://stackblitz.com/edit/angular-routing-training-0?file=src/app/app-routing.module.ts) will serve as the base for the exemple.

## Routing Module

In Angular, the best practice is to load and configure the router in a separate, top-level module that is dedicated to routing and imported by the root `AppModule`. By convention, the module class name is `AppRoutingModule` and it belongs in the `app-routing.module.ts` in the `src/app` folder.

In the exercise and in the practical work, it has already been generated for you, in case it hadn't been, here is how to generate it with the CLI:

```sh
ng generate module app-routing --flat --module=app
```

`--flat` signals the CLI not to create a folder for the routing module so that it is placed at the same level as the `app.module.ts` file and `--module=app` means that the routing module is to be added to the imports of the `AppModule`.

::: tip
Once your app grows and you start refactoring it in several modules, it is a good practice to define one routing module per feature module.
:::

The generated `AppRoutingModule` looks like this:

```ts
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

The `routes` array is where we tell the `Router` which component should be displayed when the user clicks on a link or enters a URL in the address bar.
A [Route](https://angular.io/api/router/Route) is mainly defined by a path and a component. It can also define a redirect, children routes, a path match strategy, guards, resolvers, lazy-loaded child routes, etc...

Here is an exemple of an app with a dashboard secured with authentication:
```ts
const routes: Routes = [
  {path: 'registration', component: RegistrationComponent},
  {path: 'forgotten-password', component: ForgottenPasswordComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: AuthenticationGuard},
  {path: '', pathMatch: 'full', redirectTo: '/dashboard'},
  {path: '**', redirectTo: '/dashboard'}
]
```
- `canActivate` allows you to define route guards. A route guard blocks the activation of the route if the condition it defines is not verified.
- `pathMatch: 'full'` forces the path to be matched against the entire URL. It is important to do this when redirecting empty-path routes. Otherwise, because an empty path is a prefix of any URL, the router would apply the redirect even when navigating to the redirect destination, creating an endless loop.
- `'**'`: is a wildcard which means it matches any URL

Open the Stackblitz and define the following routes:
- home: `/home` & empty route
- book list: `/books`
- detail of book with id 1: `/books/1`
- author list: book list: `/authors`
- detail of author with id 1: book list: `/authors/1`
- any other route should lead to the home page

::: tip Hint
`{ path: 'detail/:id', component: TransactionDetailComponent }` is a *parameterized* route where the colon (`:`) in the path indicates that `:id` is a placeholder for a specific transaction id.
:::

::: details Correction
```ts
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthorDetailsComponent } from "./author-details/author-details.component";
import { AuthorListComponent } from "./author-list/author-list.component";
import { BookDetailsComponent } from "./book-details/book-details.component";
import { BookListComponent } from "./book-list/book-list.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'authors', component: AuthorListComponent},
  {path: 'authors/:id', component: AuthorDetailsComponent},
  {path: 'books', component: BookListComponent},
  {path: 'books/:id', component: BookDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```
:::

Using child routes makes the nesting between routes clearer and paves the way for lazy-loading. Here is how it would apply to the Personal Library app:

::: details Correction with child routes
```ts
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'authors',
    children: [
      { path: '', component: AuthorListComponent, pathMatch: 'full' },
      { path: ':id', component: AuthorDetailsComponent }
    ]
  },
  {
    path: 'books',
    children: [
      { path: '', component: BookListComponent, pathMatch: 'full' },
      { path: ':id', component: BookDetailsComponent }
    ]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];
```
:::

## Router in the template



### router-oulet

### routerLink

## Router in the component class



## Practical Work: Router-based navigation

1. During the project initial setup, the CLI asked if it should add Angular routing and we answered yes. The CLI installed the `@angular/router` library, you can check that in the dependencies declared in the `package.json`. It alo created the `app-routing.module.ts` file.
2. Add a `login` route linked to the `LoginFormComponent` and a `search` route linked to `FilmSearchComponent` in the `app-routing.module.ts` file.
3. Add a `<router-outlet></router-outlet>` at the top of the `AppComponent` template. You should now see the LoginComponent twice when navigating to `http://localhost:4200/login`.
4. Replace the switch between the `LoginFormComponent` and `FilmSearchComponent` currently based on an `*ngIf` by a navigation from one route to another. You will have to inject the Router in the LoginFormComponent.

 **Question:** Can you spot an issue with the way our current implementation works regarding security concerns?

5. Add a redirect on the empty route `''` to the `FilmSearchComponent`

**Question:** What do you think is the purpose of such a redirect?

6. **Bonus:** Create a `NotFoundComponent` (404) with the CLI and add a wildcard route `'**'` that redirects to it. The code bellow is a proposition of the content of the 404 component. Add a `routerLink` on the `<a>` tag to go back to the search component.

<code-group>
<code-block title="HTML">

``` html
<h1>404</h1>
<p>Seems you are lost</p>
<p>Get back in<a> known territory</a></p>
```
</code-block>
<code-block title="SCSS">

``` scss
:host {
  text-align: center;
}
```
</code-block>
</code-group>

7. **Bonus:** Use a navigation guard to redirect the user who wants to access the film search page to `/login` if he/she is not authenticated (Tip: for this you will need a service). To future-proof the guard, add a returnUrl so that the `LoginFormComponent` knows where to navigate back to after authentication and modify the `LoginFormComponent` accordingly. (We will go over the correction of this quetion in the next chapter)
