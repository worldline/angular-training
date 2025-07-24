# Pipes

Pipes are **data transformation functions** usable directly from the template in order to transform the data to be displayed at binding time. They are interesting in two main ways:
- they don't require to change the data in the component so that it is displayed in a user-friendly way
- they are declared once and can be reused in as many components as needed as they are independant from them

## Syntax

Angular pipe syntax is inspired by the unix shell pipes:

```html
<div>{{ user().lastName | uppercase  }}</div>
```

Parameters can be passed to pipes. They are placed after the pipe's name and separated by colons:

```html
<div>{{ user().registrationDate | date:'dd/MM/yyyy' }}</div>
<div>{{ user().registrationDate | date:'dd/MM/yyyy hh:mm':'UTC' }}</div>
<div>{{ user().registrationDate | date:'dd/MM/yyyy hh:mm':'+0200':'fr' }}</div>
```

Pipes can be chained:
```html
<div>{{ user().birthDate | date | uppercase }}</div>
```

## Built-in pipes

Angular provides over a [dozen built-in pipes](https://angular.dev/api?type=pipe) to cover common use cases. Here is a complete list of them:
- `AsyncPipe` unwraps a value from an asynchronous primitive
- `CurrencyPipe` transforms a number to a currency string according to locale rules
- `DatePipe` formats a date value according to locale rules
- `DecimalPipe` formats a value according to digit options and locale rules
- `I18nPluralPipe` maps a value to a string that pluralizes the value according to locale rules
- `I18nSelectPipe` generic selector that displays the string that matches the current value
- `JsonPipe` converts a value into its JSON-format representation, useful for debugging
- `KeyValuePipe` transforms Object or Map into an array of key value pairs
- `LowerCasePipe` transforms text to all lower case
- `PercentPipe` transforms a number to a percentage string, formatted according to locale rules
- `SlicePipe` creates a new Array or String containing a subset (slice) of the elements
- `TitleCasePipe` transforms text to title case
- `UpperCasePipe` transforms text to all upper case

::: warning Import
Pipes are not part of the default imports of a standalone component. You have to make the import yourself: add the class of the pipe to the imports array of your component's `@Component` decorator to make it available in the template.
:::

**Exercise: Format the price (in EUR) and the date ('EEEE dd MMMM y'), both in French**
<iframe height='500' width='100%' src="https://stackblitz.com/fork/github/ocunidee/atpw-builtin-pipe/tree/master?ctl=1&embed=1&file=src/app/app.component.html&hideNavigation=1&title=Built-in%20pipes"></iframe>

## Custom pipe

If built-in pipes do not cover a use case you encounter, Angular gives you the opportunity to create a custom one.

Creating a custom Pipe requires you to:
- create a class that implements the `PipeTransform` interface
- decorate it with the `@Pipe()` decorator

The CLI will take care of these points for us via the following [command](https://angular.dev/cli/generate/pipe):

```sh
ng generate pipe <name>
```

It generates the following file:
```ts
import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'demo'
})
export class DemoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null
  }

}
```
The `transform` method's first argument is the value on which the pipe is applied, the method then takes any number of arguments. It is recommanded to type all the arguments as well as the return type.

The pipe's name should be in lowerCamelCase. It is a good practice to make it start with your app's initials, just like for the selector of your components.

Just like any other class, pipes can make use of their constructor to benefit from dependency injection. It is possible to inject another pipe for instance. This is particularly useful when a built-in pipe is going to be used throughout the application with the same parameters. A custom pipe can serve as a wrapper so as to simplify the use of a built-in pipe.

In the following example, the discounted price is calculated given a discount rate. No catalogue data in the component is mutated to display the new price.

<iframe height='500' width='100%' src="https://stackblitz.com/fork/github/ocunidee/atpw-custom-pipe/tree/master?ctl=1&embed=1&file=src/app/discounted.pipe.ts&hideNavigation=1&title=Custom%20pipe"></iframe>

## Using a pipe outside the template

It is also possible to use pipes in a component class by injecting via the *inject* method and calling its transform method. The pipe needs to be added to the providers array of the component decorator or *ApplicationConfig*. When not used in the template, the pipe doesn't need to be present in the imports array of the component decorator.

```ts
import { Component, inject, signal } from '@angular/core'
import { UpperCasePipe } from '@angular/common'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ UpperCasePipe ]
})
export class AppComponent {
  private upperCasePipe = inject(UpperCasePipe)

  protected readonly title = signal(this.upperCasePipe.transform('title'))
}
```
## Practical work: format rating
1. Create a `starRating` pipe using the CLI in the folder `app/pipes`.
2. Implement the inside of the transform method so that a film's metascore is displayed with ★ to five ★★★★★ rating. Change the transform signature to make it more specific to your case.
3. Use this pipe in the template of the `LoginFormComponent`.
4. Commit

::: details Expected result
![Visual result of the pipe practical work 1](../assets/visual-1.png)

![Visual result of the pipe practical work 2](../assets/visual-3.png)
:::

## To go further
The difference between [pure and impure pipes](https://medium.com/@ghoul.ahmed5/pure-vs-impure-pipe-in-angular-2152cf073e4d)