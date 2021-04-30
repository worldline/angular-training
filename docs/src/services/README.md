# Services

Along with components and directives, services are one of the main building blocks of an Angular application.

A component's only concern should be displaying data and not managing it. Services are where the Angular team advocates placing the business logic and data management of the application. Having a clear separation between the presentation layer and the other processings of the application increases reusability and modularity.

Creating a service with the CLI is done as follows:
```sh
ng generate service services/example
```

This will create the service and its associated test class in the `app/services` folder. It is a common practice to place services in a services folder, the CLI will create the folder if it doesn't already exists.

The following content is automatically generated in the `example.service.ts` file:
```ts
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class ExampleService {

}
```

When a component requires a service, the service should be added to its constructor in the following manner:

```ts{9}
import { Component } from '@angular/core'
import { ExampleService } from '@services/example.service'

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html'
})
export class ExampleComponent {
  constructor(private exampleService: ExampleService) {}
}
```

:::tip
Always declare a dependency to a service as private. Indeed the template should never directly access a service but always go through a property or a method exposed by the component class.
:::

## Dependency Injection

In the previous chapter, we've injected services provided by the `@angular/router` library in the components needing them. If you are familiar with Spring, you may not have thought much about it as it's one of the framework's mechanisms.

At bootstrap, Angular creates an application-wide injector. If other injectors are needed, Angular will create them along the way. The injector creates dependencies (most often in the form of services), and maintains a container of dependency instances that it reuses if possible. The injector gets the information about how to create or retrieve a dependency from a provider. A service usually acts as its own provider.

You may not have realised, but we have already used providers. In the pipe chapter, to use the `UpperCasePipe` in the component class instead of in the template, we added it to the providers array of the component.

When Angular discovers that a component depends on a service, it first checks if the injector has any existing instances of that service. If a requested service instance doesn't yet exist, the injector makes one using the registered provider, and adds it to the injector before returning the service to Angular. When all requested services have been resolved and returned, Angular can call the component's constructor with those services as arguments.

Dependencies can be provided at three levels:
- **root level:** this is the default behaviour when creating a service with the CLI. That is what `providedIn: 'root'` means. The *same instance* of the dependency is injected everywhere it is needed as if it were a singleton.
- **module level:** the dependency is added to the providers array of the `NgModule`. The module gets its own instance of the dependency
- **component level:** the dependency is added to the providers array of the component. Each instance of that component  gets its own instance of the dependency.

## Practical Work: State management
1. Generate an `AuthenticationService` with the CLI in the `app/services` folder
::: tip Alias
As the complexity of the folder structure of the applicationt increases, it is a good practice to add aliases in the `tsconfig.json` file
```json
"paths": {
  "@models/*": ["src/app/models/*"],
  "@services/*": ["src/app/services/*"],
  "@guards/*": ["src/app/guards/*"],
  "@pipes/*": ["src/app/pipes/*"],
  "@components/*": ["src/app/components/*"]
}
```
VsCode will automatically use those paths for the imports instead of relative ones that can be tough to read or debug.
:::
2. Move the `loggedIn` logic from the `AppComponent` to the service
3. Inject the service in the `LoginFormComponent` and use it.
4. Implement a logout method in the authentication service and add a logout button in the `AppComponent` that calls it and navigates back to the `LoginFormComponent`. Here is the html and css:

<code-group>
<code-block title="app.component.html">

```html
<div class="logout-container">
  <button>Logout</button>
</div>
<router-outlet></router-outlet>
```
</code-block>
<code-block title="app.component.scss">

```scss
.logout-container {
  display: flex;
  justify-content: flex-end;

  button {
    margin: 0;
    font-size: 1em;
  }
}
```
</code-block>
</code-group>

5. Conditionnally show the Logout button depending on the `loggedIn` status of the user
6. Use a navigation guard to redirect the user who wants to access the film search page to `/login` if he/she is not authenticated (make the CanActivate return true if the route can be accessed else return a `UrlTree` via the `createUrlTree` method of the `Router` service). To future-proof the guard, add a returnUrl as a queryParam to the returned `UrlTree` so that the `LoginFormComponent` knows where to navigate back to after authentication and modify the `LoginFormComponent` accordingly. To generate the navigation guard use the following CLI command:

```sh
ng generate guard guards/authentication
# ? Which interfaces would you like to implement? CanActivate
```

::: details Help for the UrlTree
```ts
this.router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url }})
```
:::

## The HttpClient


## Practical Work: Calling a backend

https://angular.io/guide/build#proxying-to-a-backend-server