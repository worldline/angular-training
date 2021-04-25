# Pipes

Pipes are **data transformation functions** usable directly from the template in order to transform the data to be displayed at binding time. They are interesting in two main ways:
- they don't require to change the data in the component so that it is displayed in a user-friendly way
- they are delcared once and can be reused in as many components as needed as they are independant from them

## Syntax

Angular pipe syntax is inspired by the unix shell pipes':

```html
<div>{{ user.lastName | uppercase  }}</div>
```

Parameters can be passed to pipes. They are placed after the pipe's name and seperated by colons:

```html
<div>{{ user.registrationDate | date:'dd/MM/yyyy' }}</div>
<div>{{ user.registrationDate | date:'dd/MM/yyyy hh:mm':'UTC' }}</div>
<div>{{ user.registrationDate | date:'dd/MM/yyyy hh:mm':'+0200':'fr' }}</div>
```

Pipes can be chained:
```html
<div>{{ user.birthDate | date | uppercase }}</div>
```

## Built-in pipes

Angular provides over a [dozen built-in pipes](https://angular.io/api?type=pipe) to cover common use cases. Here is a complete list of them:
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

**Exercise: Format the price (in EUR) and the date ('EEEE MMMM y'), both in French**
<iframe height='500' width='100%' src="https://stackblitz.com/edit/angular-currency-pipe-training-example?ctl=1&embed=1&file=src/app/app.component.html&hideNavigation=1"></iframe>

## Custom pipe

If built-in pipes do not cover a use case you encounter, Angular gives you the opportunity to create a custom one.

Creating a custom Pipe requires to:
- create a class that implements the `PipeTransform` interface
- decorate it with the `@Pipe()` decorator
- add it to the `declarations` (and `exports` if need be) of its associated module

The CLI will take care of these three points for us via the following [command](https://angular.io/cli/generate#pipe):

```sh
ng generate pipe <name>
```

It generates the following file:
```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'demo'
})
export class DemoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
```
The `transform` method's first argument is the value on which the pipe is applied, the method then takes any number of arguments. It is recommanded to type all the arguments as well as the return type.

The pipe's name should be in lowerCamelCase. It is a good practice to make it start with your app's initials, just like for the selector of your components.

Just like any other class, pipes can make use of their constructor to benefit from dependency injection. It is possible to inject another pipe for instance. This is particularly useful when a built-in pipe is going to be used throughout the application with the same parameters. A custom pipe can serve as a wrapper so as to simplify the use of a built-in pipe.

In the following example, the discounted price is calculated given a discount rate. No catalogue data in the component is mutated to display the new price.

<iframe height='500' width='100%' src="https://stackblitz.com/edit/angular-pipe-exemple?embed=1&file=src/app/discounted.pipe.ts&ctl=1&hideNavigation=1"></iframe>

## Using a pipe outside the template

It is also possible to use pipes in a component class by injecting it in its constructor and calling its transform method. The pipe needs to be imported in the module to which the component belongs and added to the providers of the component or of the module.

```ts
import { Component } from '@angular/core';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ UpperCasePipe ]
})
export class AppComponent {

  constructor(private upperCasePipe: UpperCasePipe) {}

  title = this.upperCasePipe.transform('title');
}
```
## Practical work: format rating
1. Create a `starRating` pipe using the CLI in `app/pipes`.
2. Implement the inside of the transform methods so that a film's metascore is displayed with ★ to five ★★★★★ rating.
3. Use this pipe in the template of the `LoginFormComponent`.