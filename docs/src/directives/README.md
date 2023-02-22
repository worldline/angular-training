# Empower your HTML

Angular brings powerful syntax to templates. In the previous chapter, we've seen text interpolation `{{}}`. In this chapter, we will tackle some elements of this syntax system: property binding, event binding, class and style binding, attribute directives and structural directives.

## Property binding

To bind an HTML element to a component's property, enclose it in square brackets `[]`. The brackets, `[]`, cause Angular to evaluate the right-hand side of the assignment as a dynamic expression. Without the brackets, Angular treats the right-hand side as a string literal and sets the property to that static value. `[]` is the syntax for one-way data binding with data flowing from the component to the template.

```html
<a [href]="url">Link</a>
<button [disabled]="isUnchanged">Disabled Button</button>
```

**Exercise: try to link the `src` and `width` attributes of the image**
<iframe height='500' width='100%' src="https://stackblitz.com/edit/angular-property-binding-training?ctl=1&embed=1&file=src/app/app.component.ts&hideNavigation=1"></iframe>

## Class and style binding
### Class binding
You can use class binding to add and remove CSS class names from an element's `class` attribute. To create a single class binding, use the prefix `class` followed by a dot and the name of the CSS class, for example, `[class.sale]="onSale"`. Angular adds the class when the bound expression, `onSale`, is truthy and it removes the class when the expression is falsy.

```html
<p [class.my-class-1]="isWarning"></p>
```

Multiple classes can also be bound with the `[class]` syntax:

```html
<!-- classExpression = "my-class-1 my-class-2 my-class-3" -->
<!-- classExpression = {my-class-1: true, my-class-2: false} -->
<!-- classExpression = ['my-class-1', 'my-class-2'] -->
<p [class]="classExpression"></p>
```

### Style binding
You can use style binding to set styles dynamically. To create a single style binding, use the prefix `style` followed by a dot and the name of the CSS style property, for example, [style.width]="width" with `width = "100px"` (width is a string). Optionally, you can add a unit extension like `em` or `%`: [style.width.px]="width" with `width = 100` (width is a number).

```html
<!-- Style properties can be written in dash-case or camelCase -->
<nav [style.background-color]="expression"></nav>
<nav [style.backgroundColor]="expression"></nav>
```
To toggle multiple styles, bind to the `[style]` attribute:
```html
<!-- styleExpression = "width: 100px; height: 100px; background-color: red;" -->
<!-- styleExpression = {width: '100px', height: '100px', backgroundColor: 'red'} -->
<p [style]="styleExpression"></p>
```

## NgClass and NgStyle directive
Alternatively, you can toggle several styles or several classes in one go via two directives NgStyle et NgClass:

```html
<!-- toggle the "special" class on/off with a property -->
<div [ngClass]="isSpecial ? 'special' : ''">This div is special</div>

<!-- toggle the "saveable" class on/off depending on canSave -->
<!-- toggle the "modified" class on/off depending on isUnchanged -->
<!-- toggle the "special" class on/off depending on isSpecial -->
<div [ngClass]="{saveable: canSave, modified: !isUnchanged, special: isSpecial}">
  NgClass test div
</div>

<div [ngStyle]="{
  'font-style': canSave ? 'italic' : 'normal',
  'font-weight': !isUnchanged ? 'bold' : 'normal',
  'font-size': isSpecial ? '24px' : '12px'
}">
  NgStyle test div
</div>
```

**Exercise: assign a class and a color to each ghost using [class], [style], [ngClass] and [ngStyle]**
<iframe height='500' width='100%' src="https://stackblitz.com/edit/angular-attribute-directive-training?ctl=1&embed=1&file=src/app/app.component.ts&hideNavigation=1"></iframe>

## NgModel directive

The NgModel directive allows you to bind the value of a form field to a component data item. It is a two-way binding: the variable is updated when the content of the field changes (typically by the user) and vice versa. The syntax for two-way data binding is `[()]`.

```html {3}
<label>
  What is your name ?
  <input [(ngModel)]="name">
</label>

<p>Hello {{ name }} !</p>
```
Test it yourself:
<v-model-example />

::: warning Import
The `NgModel` directive is not part of the default imports of an `NgModule`. You have to add it yourself: add `FormsModule` to the `AppModule`'s imports list.
:::

**Exercise: use [(ngModel)] on input, select, radio and checkbox tags**
<iframe height='500' width='100%' src="https://stackblitz.com/edit/angular-ngmodel-training?ctl=1&embed=1&file=src/app/app.component.html&hideNavigation=1"></iframe>


## NgIf directive
You can add or remove an element by applying an `NgIf` directive to a host element. When `NgIf` is false, Angular removes an element and its descendants from the DOM. Angular then disposes of their class instances if there are any, which frees up memory and resources. If you only want to hide the element you can use `[hidden]` which only adds/removes the `display:none` CSS property on the element. `NgIf` is helpful in providing a way to guard against null or undefined values.
```html
<!--Will only show Hello, ... if currentCustomer is not null or undefined-->
<div *ngIf="currentCustomer">Hello, {{currentCustomer.name}}</div>
```
::: warning
Be careful when using `NgIf` to test nullability on numeric values as `0` is a falsy value.
:::

You can provide an else statement as follows:
```html
<div *ngIf="condition; else elseBlock">Content to render when condition is true.</div>

<ng-template #elseBlock>Content to render when condition is false.</ng-template>
```
`<ng-template>` creates a template fragment, it is not rendered by default. `#elseBlock` is a template variable that enables to gain a reference to the `<ng-template>`.

**Exercise: use an *ngIf to toggle the loader**

**Bonus: use an *ngIf else to conditionnally show either the data or the no data message**
<iframe height='500' width='100%' src="https://stackblitz.com/edit/angular-ngif-training?ctl=1&embed=1&file=src/app/app.component.ts&hideNavigation=1"></iframe>

## NgSwitch directive
`NgSwitch` conditionally swaps the content of the host element by selecting one of the embedded templates based on the current value of condition expression.

```html
<div [ngSwitch]="myBeer">
  <div *ngSwitchCase="'Ale'">Short fermentation</div>
  <div *ngSwitchCase="'Lager'">Long fermentation</div>
  <div *ngSwitchCase="'Sour ale'">Crafted from wild yeasts</div>
  <div *ngSwitchDefault>No random knowledge for that type of beer, sorry.</div>
</div>
```

**Exercise: use *ngSwitch to alternate plant growth stage according to the season's temperature**
<iframe height='500' width='100%' src="https://stackblitz.com/edit/angular-ngswitch-training?ctl=1&embed=1&file=src/app/app.component.html&hideNavigation=1"></iframe>

## NgFor directive
You can use the NgFor directive to present a list of items. The element on which `NgFor` is placed will be repeated for each element in the iterable.

```html
<div *ngFor="let item of items">{{item.name}}</div>

<!-- With a local variable for the index -->
<div *ngFor="let item of items; let i = index">{{i}}: {{item.name}}</div>

<!-- With a local variable to know whether it is an even item -->
<div *ngFor="let item of items; let isEven = even">
  {{item.name}} is {{isEven ? 'even': 'odd'}}
</div>
```
The following exported values are also available to be aliased to local variables: `count`, `first`, `last`, `odd`.

`*ngIf` and `*ngFor` cannot be placed at the same time on an HTML element. To repeat a block of HTML when a particular condition is true, either an extra level of HTML needs to be introduced which isn't always desirable and can break the styling or the `<ng-container>` tag provided by Angular can be used. `<ng-container>` is not present in the DOM.

```html
<!-- Without ng-container -->
<div *ngIf="condition">
  <div *ngFor="let item of items">{{item.name}}</div>
</div>

<!-- With ng-container -->
<ng-container *ngIf="condition">
  <div *ngFor="let item of items">{{item.name}}</div>
</ng-container>
```
**Exercise: use two *ngFor loops to display all the contents of the basket (one loop for each type of item, and within that loop another loop to print as many emoji of that item as its quantity)**

**Bonus: An intruder is in the fruit basket, hide the corn with an *ngIf**
<iframe height='500' width='100%' src="https://stackblitz.com/edit/angular-ngfor-training?ctl=1&embed=1&file=src/app/app.component.html&hideNavigation=1"></iframe>

## Event binding
Event binding allows you to listen for and respond to user actions such as keystrokes, mouse movements, clicks, and touches or a custom event emitted by a child component. To bind to an event you use the Angular event binding syntax `()`.

```html
<button (click)="delete()">Delete</button>
```

**Exercise: use events to add a monkey when clicking the button, and make them open their eyes on mouse hover**
<iframe height='500' width='100%' src="https://stackblitz.com/edit/angular-event-binding-training?ctl=1&embed=1&file=src/app/app.component.html&hideNavigation=1"></iframe>

## About directives
In this chapter, we have seen 5 built-in directives. Directives are classes declared with the `@Directive` decorator.

There are three types of directives:
- Components which are directives with a template (`@Component` inherits from `@Directive`)
- Attribute directives which change the appearance or behavior of an element
- Structural directives which change the DOM layout by adding and removing DOM elements

**Quizz: Which built-in directives are attribute directives and which are structural directives?**

You can find more about building your own directives [here](https://angular.io/guide/attribute-directives) and [here](https://angular.io/guide/structural-directives).


## Practical work: Film list
1. In the LoginFormComponent, add two fields *email* (`email = ''`) and *password* (`password = ''`) in the and use the `[(ngModel)]` directive on the email and password inputs to bind them. Remember the warning in the NgModel section of the chapter: don't forget to import the `FormsModule` in the module to use the NgModel directive.
2. Add another `loggedIn` field initially set to `false`, then use event binding with `(ngSubmit)` on the form tag to set it to `true` when the form is submitted (create a method `login()` in the component's class for that).
3. In `login-form.component.html`, add the following HTML under the authentication form :

```html
<ul class="films">
  <li class="film card">
    <img
      class="poster"
      src="https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
    />
    <div>
      <p class="title">
        Titanic
        <span class="rating">★★★★</span>
      </p>
      <dl>
        <dt>Release date</dt>
        <dd>07/01/1998</dd>
        <dt>Director</dt>
        <dd>James Cameron</dd>
        <dt>Actors</dt>
        <dd>Leonardo DiCaprio, Kate Winslet, Billy Zane, Kathy Bates</dd>
      </dl>
      <p class="plot">
        84 years later, a 100 year-old woman named Rose DeWitt Bukater tells the
        story to her granddaughter Lizzy Calvert, Brock Lovett, Lewis Bodine,
        Bobby Buell and Anatoly Mikailavich on the Keldysh about her life set in
        April 10th 1912, on a ship called Titanic when young Rose boards the
        departing ship with the upper-class passengers and her mother, Ruth DeWitt
        Bukater, and her fiancé, Caledon Hockley. Meanwhile, a drifter and artist
        named Jack Dawson and his best friend Fabrizio De Rossi win third-class
        tickets to the ship in a game. And she explains the whole story from
        departure until the death of Titanic on its first and last voyage April
        15th, 1912 at 2:20 in the morning.
      </p>
    </div>
  </li>
</ul>
```

4. Use the `*ngIf` directive and `else` template binding to display the authentication form and hide the films list when `loggedIn === false`, and vice versa.
5. Add the following model in the *src/app/models* folder, name the file *film.ts*:

```ts
export interface Film {
  title: string
  released: string
  director: string
  actors: string
  poster: string
  plot: string
  metascore: string
}
```

6. Add the following field in the class of the LoginFormComponent (you should get an error and be offered a fix suggestion to import the Film model in the component, you will see the @models alias in action):

```ts
films: Film[] = [
  {
    title: 'Titanic',
    released: '19 Dec 1997',
    director: 'James Cameron',
    actors: 'Leonardo DiCaprio, Kate Winslet, Billy Zane, Kathy Bates',
    poster: 'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg',
    plot: `84 years later, a 100 year-old woman named Rose DeWitt Bukater tells the story to her granddaughter Lizzy Calvert, Brock Lovett, Lewis Bodine, Bobby Buell and Anatoly Mikailavich on the Keldysh about
    her life set in April 10th 1912, on a ship called Titanic when young Rose boards the departing ship with the upper-class passengers and her mother, Ruth DeWitt Bukater, and her fiancé, Caledon Hockley.
    Meanwhile, a drifter and artist named Jack Dawson and his best friend Fabrizio De Rossi win third-class tickets to the ship in a game. And she explains the whole story from departure until the death of Titanic
    on its first and last voyage April 15th, 1912 at 2:20 in the morning.`,
    metascore: '75'
  },
  {
    title: 'Blade Runner',
    released: '25 Jun 1982',
    director: 'Ridley Scott',
    actors: 'Harrison Ford, Rutger Hauer, Sean Young, Edward James Olmos',
    poster: 'https://m.media-amazon.com/images/M/MV5BNzQzMzJhZTEtOWM4NS00MTdhLTg0YjgtMjM4MDRkZjUwZDBlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
    plot: 'A blade runner must pursue and terminate four replicants who stole a ship in space, and have returned to Earth to find their creator.',
    metascore: '89'
  },
  {
    title: 'The Shining',
    released: '13 Jun 1980',
    director: 'Stanley Kubrick',
    actors: 'Jack Nicholson, Shelley Duvall, Danny Lloyd, Scatman Crothers',
    poster: 'https://m.media-amazon.com/images/M/MV5BZWFlYmY2MGEtZjVkYS00YzU4LTg0YjQtYzY1ZGE3NTA5NGQxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    plot: 'A family heads to an isolated hotel for the winter where an evil spiritual presence influences the father into violence, while his psychic son sees horrific forebodings from both past and future.',
    metascore: '63'
  }
]
```

7. Using the `*ngFor` directive, repeat the `.film.card` element to display as many films as there is in the `films` list. At this stage you are seeing Titanic three times, let's take care of this in the next step.
8. Complete the card with data from each film using property binding and interpolation.
9. **Bonus:** Use the `metascore` property to display a number of stars (from 1 to 5 ★) next to each film title. (Create a method `starRating` returning a string containing the right number of stars)
10. **Bonus:** Use an `ng-container` tag to only display movies with a metacritic score above 70 (moving forward we won't need this change so revert it once you have managed to make it work).
11. Don't forget to commit.

::: details Expected result
![Visual result of the directive practical work 1](../assets/visual-1.png)

![Visual result of the directive practical work 2](../assets/visual-2b.png)
:::
