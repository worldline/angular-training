# To go further

## Lazy loading ([doc](https://angular.io/guide/lazy-loading-ngmodules))
By deafault all `NgModule`s are loaded eagerly at the start-up of the application. For large applications, this is not optimal as modules that may not even be necessary for the user will be loaded, slowing down the application start time. Lazy loading is a design pattern that enables developers to declare routes in a way that will make the router load feature modules only if the user navigates to them. Lazy-loading can also be used for security purposes: it may not always be desired for the code of restricted areas to be eagerly loaded.

## Custom attribute ([doc](https://angular.io/guide/attribute-directives#building-an-attribute-directive)) and structural ([doc](https://angular.io/guide/structural-directives#creating-a-structural-directive)) directives
Built-in directives answer a lot of use cases but you may encounter situations where you'll need to create your own. A quite common use case is a structural directive to hide DOM elements depending on the permissions the user has.

## Form arrays ([doc](https://angular.io/guide/reactive-forms#creating-dynamic-forms))
We've previously seen about `FormGroup` and `FormControl`. Both those classes inherit from `AbstractControl`. A third class inherits from it: `FormArray`. It is the third building blocks of reactive forms. The purpose of `FormArray` is to track the value and validity of an array of `AbstractControl`s. It is particularly useful when the number of controls is not known at build time, for instance, they are based on data returned by the backend or the user has the possibility to add them dynamically. Take a form that enables you to declare any number of backup email addresses for your account. You cannot link the form controls via their names to the inputs in the template at build time.

## Error handling ([blog article](https://www.tektutorialshub.com/angular/error-handling-in-angular-applications/))
Proper error handling is an important aspect of a well-designed application. Angular provides two building blocks to deal with errors: interceptors to deal with errors received from the backend and a `GlobalErrorHandler` to deal with client side errors. The article details a strategy to deal with both types of errors.

## Resolvers ([bloc article](https://javascript.plainenglish.io/angular-resolver-for-prefetching-data-angular-guards-resolve-40fda257d666))
There are mainly two ways of dealing with a page that is heavily reliant on data received from the backend. Either load data after the page is loaded which will require a loading design and an error design for the page, in case the data is never received. Or load data before routing to the page. This alternative has the benefits of simplifying the user interface and the code. It is quite easy to implement with the Angular Router: a resolver needs to be passed to the `resolve` attribute of the route. The article explains the implementation in details.

## Translation
It is quite common for applications to either be displayed in the language of the browser or to leave the choice of the language to the user via a picker (or both). Angular provides a way to deal with translations with its internationalisation library: `@angular/localize`. Here is the [full documentation](https://angular.io/guide/i18n) on how to localize an app using the official method.

Another solution with an easier implementation exists: using the `ngx-translate` library. Here is a well detailed [blog article](https://www.codeandweb.com/babeledit/tutorials/how-to-translate-your-angular-app-with-ngx-translate) about it

## Testing
You may have realised that when generating classes with the CLI (if the `--skipTests` flag isn't provided), they come with a counterpart test file. The Angular documentation provides several guides on how deal with tests.
- [Introduction](https://angular.io/guide/testing)
- [Testing services](https://angular.io/guide/testing-services)
- [Testing components](https://angular.io/guide/testing-components-basics)
- [Testing directives](https://angular.io/guide/testing-attribute-directives)
- [Testing pipes](https://angular.io/guide/testing-pipes)

## Updating an Angular app
The Angular team provides a fantastic website (the [Angular Update Guide](https://update.angular.io/)) to update Angular apps. After choosing the current version of your app and the targeted version, a detailed check list of all the steps required to make a successful update is provided.