# To go further

## Lazy loading [doc](https://angular.dev/guide/routing/define-routes#lazily-loaded-components)
To implement lazy loading for standalone components, routes can be defined using dynamic imports within the Angular Router. By specifying a route that points to a standalone component, the application will only load that component's code when the user navigates to the corresponding route. This approach minimizes the initial bundle size, leading to faster load times, as resources are fetched only as needed. This pattern supports better organization of code and facilitates the loading of dependencies on-demand, improving the overall efficiency of larger applications.

## Form arrays [blog article](https://blog.angular-university.io/angular-form-array/)
We've previously talked about `FormGroup` and `FormControl`. Both those classes inherit from `AbstractControl`. A third class inherits from it: `FormArray`. It is the third building block of reactive forms. The purpose of `FormArray` is to track the value and validity of an array of `AbstractControl`s. It is particularly useful when the number of controls is not known at build time, for instance, they are based on data returned by the backend or the user has the possibility to add them dynamically. Take a form that enables you to declare any number of backup email addresses for your account. You cannot link the form controls via their names to the inputs in the template at build time.

## Error handling [blog article](https://www.tektutorialshub.com/angular/error-handling-in-angular-applications/)
Proper error handling is an important aspect of a well-designed application. Angular provides two building blocks to deal with errors: interceptors to deal with errors received from the backend and a `GlobalErrorHandler` to deal with client side errors. The article details a strategy to deal with both types of errors.

## Resolvers [doc](https://angular.dev/guide/routing/data-resolvers)
There are mainly two ways of dealing with a page that is heavily reliant on data received from the backend. Either load data after the page is loaded which will require a loading design and an error design for the page, in case the data is never received. Or load data before routing to the page. This alternative has the benefits of simplifying the user interface and the code. It is quite easy to implement with the Angular Router: a resolver needs to be passed to the `resolve` attribute of the route. The article explains the implementation in details.

## Translation
It is quite common for applications to either be displayed in the language of the browser or to leave the choice of the language to the user via a picker (or both). Angular provides a way to deal with translations with its internationalisation library: `@angular/localize`. Here is the [full documentation](https://angular.dev/guide/i18n) on how to localize an app using the official method.

Another solution with an easier implementation exists: using the `ngx-translate` library. Here is a well detailed [blog article](https://www.codeandweb.com/babeledit/tutorials/how-to-translate-your-angular-app-with-ngx-translate) about it

## Testing
You may have realised that when generating classes with the CLI (if the `--skipTests` flag isn't provided), they come with a counterpart test file. The Angular documentation provides several guides on how deal with tests.
- [Introduction](https://angular.dev/guide/testing)
- [Testing services](https://angular.dev/guide/testing/services)
- [Testing components](https://angular.dev/guide/testing/components-basics)
- [Testing directives](https://angular.dev/guide/testing/attribute-directives)
- [Testing pipes](https://angular.dev/guide/testing/pipes)

## Updating an Angular app
The Angular team provides a fantastic website (the [Angular Update Guide](https://update.angular.dev/)) to update Angular apps. After choosing the current version of your app and the targeted version, a detailed check list of all the steps required to make a successful update is provided.