# Routing

Angular applications are mostly Single Page Applications (SPA). The server always serves a single HTML page, and navigation between the application pages/sections is managed on the client side in JavaScript. This approach allows smoother transitions between pages, and reduces the number of server calls needed to navigate between pages, improving the UX. This is essential for Progressive Web Apps or web applications that want to have offline features.

The routing of an SPA is therefore managed on the client side, and the Angular team provides a library for this purpose: `@angular/router`. This router allows you to associate routes (URLs) with Angular components.

For this chapter, we will use the *Personal Library* app as a running example. Besides the `AppComponent` which contains a `NavbarComponent` , the app has 5 "pages":
- Home
- Book list
- Book detail
- Author list
- Author detail

The targeted routing of the example app is as follows:

![Targeted routing](../assets/routing.png)

This [Stackblitz](https://stackblitz.com/edit/angular-routing-training-0?file=src/app/app-routing.module.ts) will serve as the base for the example.

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

Here is an example of an app with a dashboard secured with authentication:
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

**Exercise:** open the Stackblitz and define the following routes:
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

Using child routes makes the nesting between routes clearer and paves the way for lazy-loading. Here is how it would apply to the *Personal Library* app:

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

::: tip Hosting
When using `ng serve`, Angular automatically starts a development server that is configured specifically for an SPA specificities. In a production environment, you will need to configure a server such as an Nginx. For the routing to work properly, the server configuration needs to have a rewrite rule so that the `index.html` file (produced by building the app) is served for all the "routes". Otherwise, the user would hit a 404 error. For Nginx, this is what it could look like:
```
location / {
  try_files $uri $uri/ /index.html;
}
```
:::

## Router directives

In the Stackblitz, try navigating to components by replacing the URL in the address bar. As you can see, besides the `NavbarComponent`, no other component is displayed even though we have just defined routes in the `AppRoutingModule`. That is because we have not yet told Angular where those components should be inserted in the DOM.

### router-oulet
This is the purpose of the `RouterOutlet`. The `NavbarComponent` should remain displayed at all times which means that components should be inserted under it. Let's add the `router-outlet` in the `AppComponent`.

<code-group>
<code-block title="app.component.html">
```html
<app-navbar></app-navbar>
<router-outlet></router-outlet>
```
</code-block>
</code-group>

The `RouterOutlet` is one of the router directives that became available to the `AppComponent` because `AppModule` imports `AppRoutingModule` which exported `RouterModule`.

Try again to display the various components by changing the URL in the address bar, it should now work. The next step consists in enabling navigation via links directly within the application.

### routerLink

First, let's take care of the links in the `NavbarComponent`. Open the `navbar.component.html` file and change the code as follows:

<code-group>
<code-block title="navbar.component.html">
```html
<nav>
  <ul>
    <li><a routerLink='/home'>Home</a></li>
    <li><a routerLink='/authors'>Authors</a></li>
    <li><a routerLink='/books'>Books</a></li>
  </ul>
</nav>
```
</code-block>
</code-group>

You can now navigate via the navbar links. `routerLink` is the selector for the [RouterLink directive](https://angular.io/api/router/RouterLink) that turns user clicks into router navigations. It's another of the public directives in the `RouterModule`.

::: danger
Usually a link destination is specified via the `href` attribute. However, this is not the way to go for navigation within an SPA and should only be used for navigation to external URLs. Indeed, navigating via href in an SPA makes the entire app reload which is highly inefficient and offers very poor user experience.
:::

**Exercise:** Add navigation to book details and author details in their respective list components.

::: details Correction
You have two options, either use an absolute path starting with `/` which means the entire path needs to be supplied (like in `book-list.component.html`) or use a relative path to the current location (like in `author-list.component.html`).

```html
<!-- author-list.component.html -->
<h1>Authors ✍️</h1>
<ul>
  <li *ngFor="let author of authors">{{author.name}} <a routerLink="{{author.id}}">🔍</a></li>
</ul>

<!-- book-list.component.html -->
<h1>Books 📚</h1>
<ul>
  <li *ngFor="let book of books">{{book.title}} - {{book.author}} <a routerLink="/books/{{book.id}}">🔍</a></li>
</ul>
```

For the moment, only the data of the book with id 1 and the data of the author with id 1 is shown. Later in this chapter we will see how to extract the id present in the URL to select the proper data to display.
:::

**Exercise:** Add navigation in the `BookDetailComponent` to the `AuthorDetailComponent` and vice versa.

::: details Correction

```html
<!-- author-details.component.html -->
<h2>Books</h2>
<ul>
  <li *ngFor="let book of details.books">{{book.title}} <a routerLink="/books/{{book.id}}">🔍</a></li>
</ul>

<!-- book-details.component.html -->
<div class="info">
  <div><a routerLink="/authors/{{details.author.id}}">✍️</a></div>
  <p> {{details?.author.name}}</p>
</div>
```
:::

The `RouterLink` directive has a `queryParams` `Input`. This `Input` allows to pass optionnal parameters via query strings in the URL:
```html
<a routerLink="'/books" [queryParams]="{genre: 'Epic Fantasy'}">
  Epic Fantasy Books
</a>
```
The example generates the link: `/books?genre=Epic%20Fantasy`

### routerLinkActive

Navigating by clicking on the links in the `NavbarComponent` is now functional however, there's no feedback to the user regarding which link is active. This is the purpose of the `routerLinkActive` directive. It allows you to specify one or more CSS classes to add to the element when the linked route is active.

<code-group>
<code-block title="navbar.component.html">

```html
<nav>
  <ul>
    <li><a routerLinkActive='active' routerLink='/home'>Home</a></li>
    <li><a routerLinkActive='active' routerLink='/authors'>Authors</a></li>
    <li><a routerLinkActive='active' routerLink='/books'>Books</a></li>
  </ul>
</nav>
```
</code-block>
<code-block title="navbar.component.css">

```css
li a:hover:not(.active) {
  background-color: #111;
}

.active {
  background-color: cadetblue;
}

.active:hover {
  background-color: #256264;
}
```
</code-block>
</code-group>

## Router services

So far, we have mainly worked with the Angular `Router` from the template. The library also provides services to interact with it from a component class.

### ActivatedRoute service

The `ActivatedRoute` service describes the current state of the *router*. Through it, the component associated with the current route can extract information from the URL via the `paramMap` and `queryParamMap` properties.

`paramMap` and `queryParamMap` are Observables, a notion we will see more in detail in a later chapter. Observable allows to observe how information change over time. The `ActivatedRoute` service also provides a `snapshot` property to only get the state of the router at a given point in time. This property is enough to cover most cases.

To extract a parameter from a route, two steps are required:
1. Inject the `ActivatedRoute` service in the constructor of the component needing it
2. Retrieve the paramMap from the snapshot in the `OnInit` lifecycle hook

```ts{10,13}
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-example",
  templateUrl: "./exemple.component.html"
})
export class ExampleComponent implements OnInit {

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id: string = this.route.snapshot.paramMap.get("id");
  }
}
```

Let's go back to the *Personal Library* app. With the help of the `ActivatedRoute`, show the details of the proper author and book according to the route.

::: details Correction
```ts
// book-details.component.ts
export class BookDetailsComponent implements OnInit {
  details: BookDetail | null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.details = bookDetails.get(Number(id));
  }
}

// author-details.component.ts
export class AuthorDetailsComponent implements OnInit {
  details: AuthorDetail | null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.details = authorDetails.get(Number(id));
  }
}

```
:::

::: warning When to use snapshot
The `paramMap` and `queryParamMap` properties are `Observables` because of optimisations. Indeed, when navigating to the same route but with different paramaters (e.g. /books/123 => /books/456), Angular doesn't reload the component but propagates the new parameters via theses `Observables`.

What does it mean ? If you only allow the navigation to the same route via the address bar, you are covered when using the snapshot. However, if you provide a means to navigate to the same route via a link (such as a "Next" and "Previous" mechanism), you have to listen to the `paramMap`/`queryParamMap` changes.
:::

### Router service

Sometimes, it is necessary to trigger some actions before routing. This is what happens when we click on a login button. First, an http call is made and depending on the response, routing takes place. The `Router` service allows to trigger navigation from the component class.
1. Inject the `Router` service via the constructor
2. Use the `navigateByUrl` method to trigger the navigation. `navigateByUrl` always takes an absolute path. In case you would like to user a relative path, use the `navigate` method instead.

```ts{6,9}
@Component({
  selector: "app-example",
  templateUrl: "./example.component.html"
})
export class ExampleComponent {
  constructor(private router: Router) {}

  navigatePostLogin(): void {
    this.router.navigateByUrl('/dashboard')
  }
}
```

A full correction of the *Personal Library* app is available in this [stackblitz](https://stackblitz.com/edit/angular-routing-training-correction?file=src/app/book-list/book-list.component.ts).

## Practical Work: Router-based navigation

Let's implement the routing in our Film application.

1. During the project initial setup, the CLI asked if it should add Angular routing and we answered yes. The CLI installed the `@angular/router` library, you can check that in the dependencies declared in the `package.json`. It alo created the `app-routing.module.ts` file.
2. Add a `login` route linked to the `LoginFormComponent` and a `search` route linked to `FilmSearchComponent` in the `app-routing.module.ts` file.
3. Add a `<router-outlet></router-outlet>` at the top of the `AppComponent` template. You should now see the LoginComponent twice when navigating to `http://localhost:4200/login`.
4. Replace the switch between the `LoginFormComponent` and `FilmSearchComponent` currently based on an `*ngIf` by a navigation from one route to another. You will have to inject the Router service in the LoginFormComponent.

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

7. **Bonus:** Learn about [navigation guards](https://angular.io/api/router/CanActivate) to secure routes. We will implement one in the next chapter.
