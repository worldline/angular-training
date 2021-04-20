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
<code-group>
<code-block title="Parent component">
```ts
// app.component.html
<app-blog-post [title]="article.title" [content]="article.content"><app-blog-post>

// app.component.ts
import { Component } from "@angular/core";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  article = {
    title: "My first awesome article",
    content: "This content is super interesting"
  };
}
```
</code-block>

<code-block title="Child component">
```ts
// blog-post.component.html
<article>
  <h3>{{ title }}</h3>
  <p>{{ content }}</p>
</article>

// blog-post.component.ts
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-blog-post",
  templateUrl: "./blog-post.component.html",
  styleUrls: ["./blog-post.component.css"]
})
export class BlogPostComponent {
  @Input() title: string;
  @Input() content: string;
}
```
</code-block>
</code-group>

**Exercise: Pass down each book's info to the BookComponent**
<iframe height='500' width='100%' src="https://stackblitz.com/edit/angular-input-training?ctl=1&embed=1&file=src/app/book/book.component.ts&hideNavigation=1"></iframe>

### @Output()



**Exercise: Books are now borrowable, communicate when books are borrowed to their parent component**
<iframe height='500' width='100%' src="https://stackblitz.com/edit/angular-output-training?ctl=1&embed=1&file=src/app/book/book.component.html&hideNavigation=1"></iframe>

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
