# Routing

Angular applications are mostly Single Page Applications (SPA). The server always serves a single HTML page, and navigation between the application pages/sections is managed on the client side in JavaScript. This approach allows smoother transitions between pages, and reduces the number of server calls needed to navigate between pages. This is essential for Progressive Web Apps or web applications that want to have offline features.

The routing of an SPA is therefore managed on the client side, and the Angular team provides a library for this purpose: `@angular/router`. This router allows you to associate routes (URLs) with Angular components.

For this chapter, we will use a personal library app as a running exemple. Besides the `AppComponent` which contains a `NavbarComponent` , the app has 5 "pages":
- Home
- Book list
- Book detail
- Author list
- Author detail

The targeted routing of the exemple app is as follows:

![Targeted routing](../assets/routing.png)

The following Stackblitz will serve as the base for the exemple.

<iframe height='500' width='100%' src="https://stackblitz.com/edit/angular-routing-training-0?embed=1&file=src/app/app-routing.module.ts&hideNavigation=1"></iframe>


## Routing Module

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
