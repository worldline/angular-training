# Renforcez votre HTML

Angular apporte une syntaxe puissante aux templates. Dans le chapitre précédent, nous avons vu l'interpolation de texte `{{}}`. Dans ce chapitre, nous aborderons quelques éléments de ce système de syntaxe : la liaison de propriété, la liaison d'événement, la liaison de classe et de style, les directives d'attribut et les directives structurelles.

## Liaison de propriété

Pour lier un élément HTML à la propriété d'un composant, placez-le entre crochets `[]`. Les crochets, `[]`, obligent Angular à évaluer le côté droit de l'affectation en tant qu'expression dynamique. Sans les crochets, Angular traite le côté droit comme un littéral de chaîne et définit la propriété sur cette valeur statique. `[]` est la syntaxe pour la liaison de données unidirectionnelle avec des données circulant du composant vers le template.

```html
<a [href]="url">Link</a>
<button [disabled]="isUnchanged">Disabled Button</button>
```

**Exercice: Essayez de lier les attributs `src` et `width` de l'image**
<iframe height='500' width='100%' src="https://stackblitz.com/edit/angular-property-binding-training?ctl=1&embed=1&file=src/app/app.component.ts&hideNavigation=1"></iframe>

## Liaison de classe et de style
### Liaison de classe
Vous pouvez utiliser la liaison de classe pour ajouter et supprimer des noms de classe CSS de l'attribut `class` d'un élément. Pour créer une liaison de classe unique, utilisez le préfixe `class` suivi d'un point et du nom de la classe CSS, par exemple, `[class.sale]="onSale"`. Angular ajoute la classe lorsque l'expression liée, `onSale` est vraie, et supprime la classe lorsque l'expression est fausse.

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

### Liaison de style
Vous pouvez utiliser la liaison de style pour définir des styles de manière dynamique. Pour créer une liaison de style unique, utilisez le préfixe `style` suivi d'un point et du nom de la propriété de style CSS, par exemple, [style.width]="width" avec `width = "100px"` (width est un chaîne de caractères). En option, vous pouvez ajouter une extension d'unité comme `em` ou `%` : [style.width.px]="width" avec `width = 100` (width est un nombre).

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
Alternativement, vous pouvez basculer les styles et les classes via deux directives :

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

:::warning
L'utilisation de la syntaxe de liaison de style sans NgStyle est préférable. En raison des améliorations, `NgStyle` ne fournit plus de valeur significative par rapport à `[style]` et pourrait éventuellement être supprimé d'Angular à l'avenir.
:::

**Exercise: attribuer une classe et une couleur à chaque fantôme en utilisant la classe**
<iframe height='500' width='100%' src="https://stackblitz.com/edit/angular-attribute-directive-training?ctl=1&embed=1&file=src/app/app.component.ts&hideNavigation=1"></iframe>

## Directive NgModel

La directive NgModel vous permet de lier la valeur d'un champ de formulaire à un élément de données de composant. Il s'agit d'une liaison bidirectionnelle : la variable est mise à jour lorsque le contenu du champ change (typiquement par l'utilisateur) et vice versa. La syntaxe pour la liaison de données bidirectionnelle est `[()]`.

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
La directive `NgModel` ne fait pas partie des importations par défaut d'un `NgModule`. Vous devez l'ajouter vous-même : ajoutez `FormsModule` à la liste des importations de `AppModule`.
:::

**Exercice : utilisez NgModel sur les balises input, select, radio et checkbox**
<iframe height='500' width='100%' src="https://stackblitz.com/edit/angular-ngmodel-training?ctl=1&embed=1&file=src/app/app.component.html&hideNavigation=1"></iframe>


## Directive NgIf
Vous pouvez ajouter ou supprimer un élément en appliquant une directive `NgIf` à un élément hôte. Lorsque `NgIf` est faux, Angular supprime un élément et ses descendants du DOM. Angular se débarrasse ensuite de leurs composants, ce qui libère de la mémoire et des ressources. Si vous souhaitez uniquement masquer l'élément, vous pouvez utiliser `[hidden]` qui ajoute/supprime uniquement la propriété CSS `display:none` sur l'élément. `NgIf` est utile pour fournir un moyen de se prémunir contre les valeurs nulles.
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

**Exercise: use an NgIf to toggle the loader**

**Bonus: use an NgIf Else to conditionnally show either the data or the no data message**
<iframe height='500' width='100%' src="https://stackblitz.com/edit/angular-ngif-training?ctl=1&embed=1&file=src/app/app.component.ts&hideNavigation=1"></iframe>

## Directive NgSwitch
`NgSwitch` échange conditionnellement le contenu de l'élément hôte en sélectionnant l'un des modèles intégrés en fonction de la valeur actuelle de conditionExpression.

```html
<div [ngSwitch]="myBeer">
  <div *ngSwitchCase="'Ale'">Short fermentation</div>
  <div *ngSwitchCase="'Lager'">Long fermentation</div>
  <div *ngSwitchCase="'Sour ale'">Crafted from wild yeasts</div>
  <div *ngSwitchDefault>No random knowledge for that type of beer, sorry.</div>
</div>
```

**Exercice : utilisez NgSwitch pour alterner le stade de croissance des plantes en fonction de la température de la saison**
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

`*ngIf` et `*ngFor` ne peuvent pas être placés en même temps sur un élément HTML. Pour répéter un bloc de HTML lorsqu'une condition particulière est vraie, soit un niveau supplémentaire de HTML doit être introduit, ce qui n'est pas toujours souhaitable et peut casser le style, soit la balise `<ng-container>` fournie par Angular peut être utilisée . `<ng-container>` n'est pas présent dans le DOM.

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
**Exercice : utilisez deux boucles NgFor pour afficher tout le contenu du panier (une boucle pour chaque type d'article, et dans cette boucle une autre boucle pour imprimer autant d'emoji de cet article que sa quantité)**

**Bonus : Un intrus est dans la corbeille de fruits, cachez le maïs avec un NgIf**
<iframe height='500' width='100%' src="https://stackblitz.com/edit/angular-ngfor-training?ctl=1&embed=1&file=src/app/app.component.html&hideNavigation=1"></iframe>

## Liaison d'événement
La liaison d'événements vous permet d'écouter et de répondre aux actions de l'utilisateur telles que les frappes, les mouvements de souris, les clics et les touches ou un événement personnalisé émis par un composant enfant. Pour lier à un événement, vous utilisez la syntaxe de liaison d'événement angulaire `()`.

```html
<button (click)="delete()">Delete</button>
```

**Exercice : utilisez des événements pour ajouter un singe lorsque vous cliquez sur le bouton et faites-lui ouvrir les yeux au survol de la souris**
<iframe height='500' width='100%' src="https://stackblitz.com/edit/angular-event-binding-training?ctl=1&embed=1&file=src/app/app.component.html&hideNavigation=1"></iframe>

## À propos des directives
Dans ce chapitre, nous avons vu 5 directives intégrées. Les directives sont des classes déclarées avec le décorateur `@Directive`.

Il existe trois types de directives :
- Les composants qui sont des directives avec un template (`@Component` hérite de `@Directive`)
- Directives d'attributs qui modifient l'apparence ou le comportement d'un élément
- Directive structurelle qui modifie la mise en page DOM en ajoutant et en supprimant des éléments DOM

**Quiz : Quelles directives intégrées sont des directives d'attribut et lesquelles sont des directives structurelles ?**

Vous pouvez en savoir plus sur la création de vos propres directives [ici](https://angular.io/guide/attribute-directives) et [ici](https://angular.io/guide/structural-directives).


## TP : Liste des films
1. Dans le composant LoginFormComponent, ajoutez deux champs `email` et `password` et utilisez la directive `[(ngModel)]` sur les champs email et mot de passe pour les lier.
2. Ajoutez un autre champ « loggedIn » initialement défini sur « false », puis utilisez la liaison d'événement avec « (ngSubmit) » sur la balise du formulaire pour le définir sur « true » lorsque le formulaire est soumis.
3. Dans `login-form.component.html`, ajoutez le code HTML suivant sous le formulaire d'authentification :

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

4. Utilisez la directive `*ngIf` et la liaison de template `else` pour afficher le formulaire d'authentification et masquer la liste des films lorsque `loggedIn === false`, et vice versa.
5. Ajoutez le champ suivant dans le composant LoginFormComponent :

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

6. En utilisant la directive `*ngFor`, répétez l'élément `.film.card` pour afficher autant de films qu'il y en a dans la liste `films`.
7. Complétez la carte avec les données de chaque film en utilisant la liaison des propriétés et l'interpolation.
8. **Bonus :** Utilisez la propriété `metascore` pour afficher un nombre d'étoiles à côté de chaque titre de film.
9. **Bonus :** Utilisez une balise `ng-container` pour afficher uniquement les films avec un score métacritique supérieur à 70