# Routing




## Practical Work: Router-based navigation

1. During the project initial setup, the CLI asked if it should add Angular routing and we answered yes. The CLI installed the `@angular/router` library, you can check that in the dependencies declared in the `package.json`. It alo created the `app-routing.module.ts` file.
2. Add a `/login` route linked to the `LoginFormComponent` and a `/search` route linked to `FilmSearchComponent` in the `app-routing.module.ts` file.
3. Add a `<router-outlet></router-outlet>` at the top of the `AppComponent` template. You should now see the LoginComponent twice when navigatin to `http://localhost:4200/login`.
4. Replace the switch between the `LoginFormComponent` and `FilmSearchComponent` currently based on an `*ngIf` by a navigation from one route to another. You will have to inject the Router in the LoginFormComponent.

 **Question** Can you spot an issue with the way our current implementation works regarding security concerns?

5. Add a redirect on the empty route to the `FilmSearchComponent`

**Question** What do you think is the purpose of such a redirect?

6. **Bonus** Add a wildcard route and redirect to a new 404 component.
7. **Bonus** Use a navigation guard to redirect the user who wants to access the film search page to `/login` if he/she is not authenticated (Tip: for this you will need a service). To future-proof the guard, add a returnUrl so that the `LoginFormComponent` knows where to navigate back to after authentication and modify the `LoginFormComponent` accordingly.
