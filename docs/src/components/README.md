# Components

## View encapsulation and styling

### Encapsulation

:::warning
Styles specified in the component's style file are not inherited by any components nested within the template nor by any content projected into the component.
:::

### `:host` selector

## Lifecycle

## Communication between child and parent components

### @Input()

### @Output()

### Local variable in the template

### @ViewChild

## Content projection

## Practical work: Decompose the app
1. Refactor the `LoginFormComponent` to extract the code and template related to a film details. To that purpose, create with the CLI a `FilmComponent`, there will be as many instances of `FilmComponent` as there are films. Use `@Input()` to pass data from the `LoginFormComponent` to each `FilmComponent`.
2. Create another component with the CLI: `FilmSearchComponent`. It will contain a search form and the `FilmComponent` list below:

```html
<div id="search-film">
  <form>
    <label for="search">Search :</label>
    <input id="search" type="text" />
  </form>

  <ul class="films">
    <!-- list of <app-film> -->
  </ul>
</div>
```

3. Insert this `FilmSearchComponent` alongside the `LoginFormComponent` in the `AppComponent` and move the corresponding code in this new component.
4. Display the `FilmSearchComponent` component only if the user is logged in. You will have to communicate the `loggedIn` variable from the `LoginFormComponent` to the `AppComponent` via an `@Output()`.
5. In the `FilmSearchComponent`, assign the `films` variable to an empty `[]` array initially. When submitting the search form, run a `searchFilms()` method that will put the 3 sample films in this list.
