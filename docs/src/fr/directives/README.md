# Dynamisez votre HTML

Angular apporte une syntaxe puissante aux templates. Dans le chapitre précédent, nous avons vu l'interpolation de texte `{{}}`. Dans ce chapitre, nous aborderons quelques éléments de ce système de syntaxe : le *property binding*, l'*event binding*, le *class et style binding*, les directives d'attribut et les directives structurelles.

## Property binding

Pour lier un élément HTML à la propriété d'un composant, placez-le entre crochets `[]`. Les crochets, `[]`, obligent Angular à évaluer le côté droit de l'affectation en tant qu'expression dynamique. Sans les crochets, Angular traite le côté droit comme un littéral  et donne pour valeur à la propriété cette valeur statique. `[]` est la syntaxe pour le one-way data binding avec les données circulant du composant vers le template.

```html
<a [href]="url">Link</a>
<button [disabled]="isUnchanged">Disabled Button</button>
```

**Exercice: Essayez de lier les attributs `src` et `width` de l'image**
<iframe height='500' width='100%' src="https://stackblitz.com/edit/angular-property-binding-training?ctl=1&embed=1&file=src/app/app.component.ts&hideNavigation=1"></iframe>

## Class et style binding
### Class binding
Vous pouvez utiliser le class binding pour ajouter et supprimer des noms de classe CSS à l'attribut `class` d'un élément. Pour créer un class binding pour une seule classe, utilisez le préfixe `class` suivi d'un point et du nom de la classe CSS, par exemple, `[class.sale]="onSale"`. Angular ajoute la classe lorsque l'expression liée, `onSale`, est vraie et supprime la classe lorsque l'expression est fausse.

```html
<p [class.my-class-1]="isWarning"></p>
```

Plusieurs classes peuvent également être liées avec la syntaxe `[class]` :

```html
<!-- classExpression = "my-class-1 my-class-2 my-class-3" -->
<!-- classExpression = {my-class-1: true, my-class-2: false} -->
<!-- classExpression = ['my-class-1', 'my-class-2'] -->
<p [class]="classExpression"></p>
```

### Style binding
Vous pouvez utiliser le style binding pour définir des styles de manière dynamique. Pour créer un style binding pour une seule propriété de style CSS, utilisez le préfixe `style` suivi d'un point et du nom de la propriété de style CSS, par exemple, [style.width]="width" avec `width = "100px"` (width est un chaîne de caractères). En option, vous pouvez ajouter une extension d'unité comme `em` ou `%` : [style.width.px]="width" avec `width = 100` (width est un nombre).

```html
<!-- Style properties can be written in dash-case or camelCase -->
<nav [style.background-color]="expression"></nav>
<nav [style.backgroundColor]="expression"></nav>
```
Pour basculer entre plusieurs styles, lier à l'attribut `[style]` :
```html
<!-- styleExpression = "width: 100px; height: 100px; background-color: red;" -->
<!-- styleExpression = {width: '100px', height: '100px', backgroundColor: 'red'} -->
<p [style]="styleExpression"></p>
```

## Directives NgClass et NgStyle
Alternativement, vous pouvez dynamiquement activer plusieurs styles ou plusieurs classes à la fois via deux directives NgStyle et NgClass :

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

**Exercise: attribuer une classe et une couleur à chaque fantôme en utilisant [class], [style], [ngClass] ou [ngStyle]**
<iframe height='500' width='100%' src="https://stackblitz.com/edit/angular-attribute-directive-training?ctl=1&embed=1&file=src/app/app.component.ts&hideNavigation=1"></iframe>

## Directive NgModel

La directive NgModel vous permet de lier la valeur d'un champ de formulaire à une propriété du composant. Il s'agit d'une liaison bidirectionnelle : la propriété est mise à jour lorsque le contenu du champ change (typiquement par l'utilisateur) et vice versa. La syntaxe pour la liaison de données bidirectionnelle est `[()]`.

```html {3}
<label>
  What is your name ?
  <input [(ngModel)]="name">
</label>

<p>Hello {{ name }} !</p>
```
Testez-le vous-même :
<v-model-example />

::: warning Import
La directive `NgModel` ne fait pas partie des imports par défaut d'un `NgModule`. Vous devez l'ajouter vous-même : ajoutez `FormsModule` à la liste d'imports de l'`AppModule`.
:::

**Exercice : utilisez [(ngModel)] sur les balises input, select, radio et checkbox**
<iframe height='500' width='100%' src="https://stackblitz.com/edit/angular-ngmodel-training?ctl=1&embed=1&file=src/app/app.component.html&hideNavigation=1"></iframe>


## Directive NgIf
Vous pouvez ajouter ou supprimer un élément en appliquant une directive `NgIf` à un élément hôte. Lorsque `NgIf` est faux, Angular supprime un élément et ses descendants du DOM. Angular supprime ensuite les instances des classes de ces composants s'il en existe, ce qui libère de la mémoire et des ressources. Si vous souhaitez uniquement masquer l'élément, vous pouvez utiliser `[hidden]` qui ajoute/supprime uniquement la propriété CSS `display:none` sur l'élément. `NgIf` est utile pour fournir un moyen de se prémunir contre les valeurs nulles.
```html
<!--Will only show Hello, ... if currentCustomer is not null or undefined-->
<div *ngIf="currentCustomer">Hello, {{currentCustomer.name}}</div>
```
::: warning
Soyez prudent lorsque vous utilisez `NgIf` pour tester la nullité sur des valeurs numériques car `0` est une valeur fausse.
:::

Vous pouvez fournir une instruction else comme suit :
```html
<div *ngIf="condition; else elseBlock">Content to render when condition is true.</div>

<ng-template #elseBlock>Content to render when condition is false.</ng-template>
```
`<ng-template>` crée un fragment de template, il n'est pas rendu par défaut. `#elseBlock` est une variable de template qui permet d'obtenir une référence au `<ng-template>`.

**Exercice: utilisez un `*ngIf` pour montrer/cacher le loader**

**Bonus: utilisez un `*ngIf else` pour conditionnellement montrer soit les données soit le message comme quoi les données ne sont pas disponibles**
<iframe height='500' width='100%' src="https://stackblitz.com/edit/angular-ngif-training?ctl=1&embed=1&file=src/app/app.component.ts&hideNavigation=1"></iframe>

## Directive NgSwitch
`NgSwitch` échange conditionnellement le contenu de l'élément hôte en sélectionnant l'un des template enfants en fonction de la valeur actuelle de l'expression.

```html
<div [ngSwitch]="myBeer">
  <div *ngSwitchCase="'Ale'">Short fermentation</div>
  <div *ngSwitchCase="'Lager'">Long fermentation</div>
  <div *ngSwitchCase="'Sour ale'">Crafted from wild yeasts</div>
  <div *ngSwitchDefault>No random knowledge for that type of beer, sorry.</div>
</div>
```

**Exercice : utilisez `*ngSwitch` pour alterner le stade de croissance des plantes en fonction de la température de la saison**
<iframe height='500' width='100%' src="https://stackblitz.com/edit/angular-ngswitch-training?ctl=1&embed=1&file=src/app/app.component.html&hideNavigation=1"></iframe>

## Directive NgFor
Vous pouvez utiliser la directive NgFor pour présenter une liste d'éléments. L'élément sur lequel `NgFor` est placé sera répété pour chaque élément de l'itérable.

```html
<div *ngFor="let item of items">{{item.name}}</div>

<!-- With a local variable for the index -->
<div *ngFor="let item of items; let i = index">{{i}}: {{item.name}}</div>

<!-- With a local variable to know whether it is an even item -->
<div *ngFor="let item of items; let isEven = even">
  {{item.name}} is {{isEven ? 'even': 'odd'}}
</div>
```
Les valeurs exportées suivantes sont également disponibles pour être associées à des variables locales : `count`, `first`, `last`, `odd`.

`*ngIf` et `*ngFor` ne peuvent pas être placés en même temps sur un élément HTML. Pour répéter un bloc d'HTML lorsqu'une condition particulière est vraie, soit un niveau supplémentaire d'HTML doit être introduit, ce qui n'est pas toujours souhaitable et peut casser le style, soit la balise `<ng-container>` fournie par Angular peut être utilisée . `<ng-container>` n'est pas présent dans le DOM.

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
**Exercice : utilisez deux boucles `*ngFor` pour afficher tout le contenu du panier (une boucle pour chaque type d'article, et dans cette boucle une autre boucle pour imprimer autant d'emoji de cet article que sa quantité)**

**Bonus : Un intrus est dans la corbeille de fruits, cachez le maïs avec un `*ngIf`**
<iframe height='500' width='100%' src="https://stackblitz.com/edit/angular-ngfor-training?ctl=1&embed=1&file=src/app/app.component.html&hideNavigation=1"></iframe>

## Event binding
L'event binding permet d'écouter et de répondre aux actions de l'utilisateur telles que les frappes, les mouvements de souris, les clics et les touchers ou un événement custom émis par un composant enfant. Pour lier le composant à un événement, utilisez la syntaxe d'event binding d'Angular `()`.

```html
<button (click)="delete()">Delete</button>
```

**Exercice : utilisez des événements pour ajouter un singe lorsque vous cliquez sur le bouton et faites-lui ouvrir les yeux au survol de la souris**
<iframe height='500' width='100%' src="https://stackblitz.com/edit/angular-event-binding-training?ctl=1&embed=1&file=src/app/app.component.html&hideNavigation=1"></iframe>

## À propos des directives
Dans ce chapitre, nous avons vu 5 directives intégrées. Les directives sont des classes déclarées avec le décorateur `@Directive`.

Il existe trois types de directives :
- Les composants qui sont des directives avec un template (`@Component` hérite de `@Directive`)
- Les directives d'attributs qui modifient l'apparence ou le comportement d'un élément
- Directive structurelle qui modifie la mise en page DOM en ajoutant et en supprimant des éléments DOM

**Quiz : Quelles directives fournies par Angular sont des directives d'attribut et lesquelles sont des directives structurelles ?**

Vous pouvez en savoir plus sur la création de vos propres directives [ici](https://angular.io/guide/attribute-directives) et [ici](https://angular.io/guide/structural-directives).


## TP : Liste des films
1. Dans le composant LoginFormComponent, ajoutez deux champs `email` et `password` et utilisez la directive `[(ngModel)]` sur les inputs email et mot de passe pour les lier. Rappelez-vous de l'avertissement dans le paragraphe sur le NgModel : n'oubliez pas d'importer le `FormsModule` dans le module pour utiliser la directive NgModel.
2. Ajoutez un autre champ `loggedIn` initialement défini à `false`, puis utilisez l'event binding avec `(ngSubmit)` sur la balise `form` pour le passer à `true` lorsque le formulaire est soumis (créez une méthode `login()` dans la classe du composant pour ça).
3. Dans `login-form.component.html`, ajoutez le code HTML suivant sous le formulaire d'authentification :

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

4. Utilisez la directive `*ngIf else` pour afficher le formulaire d'authentification et masquer la liste des films lorsque `loggedIn === false`, et vice versa.
5. Ajoutez le modèle suivant dans le dossier *src/app/models*, nommez le fichier film.ts :

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

6. Ajoutez le champ suivant dans la classe du composant LoginFormComponent (VSCode devrait vous affichez un erreur et vous proposez d'importer le modèle Film dans le composant, vous devriez voir l'alias @models utilisé dans l'import) :

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

7. En utilisant la directive `*ngFor`, répétez l'élément `.film.card` pour afficher autant de films qu'il y en a dans la liste `films`. A ce stade, le Titanic est affiché trois fois, occupons-nous de ça dans l'étape suivante.
8. Complétez la carte avec les données de chaque film en utilisant le property binding et l'interpolation.
9. **Bonus :** Utilisez la propriété `metascore` pour afficher un nombre d'étoiles (de 1 à 5 ★) à côté de chaque titre de film (créez une méthode `starRating` retournant une string comportant le bon nombre d'étoiles à cet effet).
10. **Bonus :** Utilisez une balise `ng-container` pour afficher uniquement les films avec un score métacritique supérieur à 70 (dans la suite du TP, nous n'aurons pas besoin de ce changement, ne le conservez pas une fois que vous êtes arrivé à le faire marcher).
11. N'oubliez pas de commiter.

::: details Résultat attendu
![Résultat visuel du TP sur les directives 1](../../assets/visual-1.png)

![Résultat visuel du TP sur les directives 2](../../assets/visual-2b.png)
:::
