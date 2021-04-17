# Data binding and directives

## Data binding

<iframe height='500' width='100%' src="https://stackblitz.com/edit/angular-property-binding-training?embed=1&file=src/app/app.component.ts&hideNavigation=1"></iframe>

## Directives

### Built-in attribute directives

### Built-in structural directives

:::v-pre
Present `<ng-container>`
:::

## Practical work: Film list

1. In the LoginFormComponent, add two fields `email` and `password` in the and use the `[(ngModel)]` directive on the email and password fields to bind them.
2. Add another `loggedIn` field initially set to `false`, then use event binding with `(ngSubmit)` on the form tag to set it to `true` when the form is submitted.
3. In `login-form.component.ts`, add the following HTML under the authentication form :

```html
<ul class="films">
  <li class="film card">
    <img
      class="poster"
      src="https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
    />
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
  </li>
</ul>
```

4. Use the `*ngIf` directive and `else` template binding to display the authentication form and hide the films list when `loggedIn === false`, and vice versa.
5. Add the following field in the LoginFormComponent:

```ts
films = [
  {
    title: "Titanic",
    released: "19 Dec 1997",
    director: "James Cameron",
    actors: "Leonardo DiCaprio, Kate Winslet, Billy Zane, Kathy Bates",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg",
    plot:
      "84 years later, a 100 year-old woman named Rose DeWitt Bukater tells the story to her granddaughter Lizzy Calvert, Brock Lovett, Lewis Bodine, Bobby Buell and Anatoly Mikailavich on the Keldysh about her life set in April 10th 1912, on a ship called Titanic when young Rose boards the departing ship with the upper-class passengers and her mother, Ruth DeWitt Bukater, and her fiancé, Caledon Hockley. Meanwhile, a drifter and artist named Jack Dawson and his best friend Fabrizio De Rossi win third-class tickets to the ship in a game. And she explains the whole story from departure until the death of Titanic on its first and last voyage April 15th, 1912 at 2:20 in the morning.",
    metascore: "75"
  },
  {
    title: "Blade Runner",
    released: "25 Jun 1982",
    director: "Ridley Scott",
    actors: "Harrison Ford, Rutger Hauer, Sean Young, Edward James Olmos",
    poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzMzJhZTEtOWM4NS00MTdhLTg0YjgtMjM4MDRkZjUwZDBlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
    plot:
      "A blade runner must pursue and terminate four replicants who stole a ship in space, and have returned to Earth to find their creator.",
    metascore: "89"
  },
  {
    title: "The Shining",
    released: "13 Jun 1980",
    director: "Stanley Kubrick",
    actors: "Jack Nicholson, Shelley Duvall, Danny Lloyd, Scatman Crothers",
    poster:
      "https://m.media-amazon.com/images/M/MV5BZWFlYmY2MGEtZjVkYS00YzU4LTg0YjQtYzY1ZGE3NTA5NGQxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    plot:
      "A family heads to an isolated hotel for the winter where an evil spiritual presence influences the father into violence, while his psychic son sees horrific forebodings from both past and future.",
    metascore: "63"
  }
]
```

6. Using the `*ngFor*` directive, repeat the `.film.card` element to display as many films as there is in the `films` list.
7. Complete the card with data from each film using property binding and interpolation.
8. **Bonus:** Use the `metascore` property to display a number of stars next to each film title.
9. **Bonus:** Use an `ng-container` tag to only display movies with a metacritic score above 70