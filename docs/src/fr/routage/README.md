# Routage

Les applications Angular sont principalement des applications à page unique (SPA). Le serveur sert toujours une seule page HTML, et la navigation entre les pages/sections de l'application est gérée côté client en JavaScript. Cette approche permet des transitions plus fluides entre les pages et réduit le nombre d'appels de serveur nécessaires pour naviguer entre les pages, améliorant ainsi l'UX. Ceci est essentiel pour les applications Web progressives ou les applications Web qui souhaitent disposer de fonctionnalités hors ligne.

Le routage d'un SPA est donc géré côté client, et l'équipe Angular met à disposition une librairie à cet effet : `@angular/router`. Ce routeur vous permet d'associer des routes (URL) avec des composants Angular.

Pour ce chapitre, nous utiliserons l'application *Bibliothèque personnelle* comme exemple d'exécution. Outre le `AppComponent` qui contient un `NavbarComponent`, l'application a 5 "pages":
- Accueil
- Liste de livres
- Détail du livre
- Liste des auteurs
- Détails sur l'auteur

Le routage ciblé de l'exemple d'application est le suivant :

![Targeted routing](../../assets/routing.png)

Ce [Stackblitz](https://stackblitz.com/edit/angular-routing-training-0?file=src/app/app-routing.module.ts) servira de base pour l'exemple.

## Module de routage

Dans Angular, la meilleure pratique consiste à charger et à configurer le routeur dans un module de niveau supérieur distinct, dédié au routage et importé par la racine `AppModule`. Par convention, le nom de classe du module est `AppRoutingModule` et il appartient au `app-routing.module.ts` dans le dossier `src/app`.

Dans l'exercice et dans les travaux pratiques, il a déjà été généré pour vous, au cas où il ne l'aurait pas été, voici comment le générer avec CLI :

```sh
ng generate module app-routing --flat --module=app
```

`--flat` signale à la CLI de ne pas créer de dossier pour le module de routage afin qu'il soit placé au même niveau que le fichier `app.module.ts` et `--module=app` signifie que le module de routage est à ajouter aux importations du `AppModule`.

::: tip
Une fois que votre application grandit et que vous commencez à la refactoriser en plusieurs modules, il est recommandé de définir un module de routage par module de fonctionnalité.
:::

Le `AppRoutingModule` généré ressemble à ceci :

```ts
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

Le tableau `routes` est l'endroit où nous indiquons au `routeur` quel composant doit être affiché lorsque l'utilisateur clique sur un lien ou entre une URL dans la barre d'adresse.
Une [Route](https://angular.io/api/router/Route) est principalement définie par un chemin et un composant. Il peut également définir une redirection, des routes enfants, une stratégie de correspondance de chemin, des gardes, des résolveurs, des routes enfants lazy-loaded, etc...

Voici un exemple d'application avec un tableau de bord sécurisé avec authentification :
```ts
const routes: Routes = [
  {path: 'registration', component: RegistrationComponent},
  {path: 'forgotten-password', component: ForgottenPasswordComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: AuthenticationGuard},
  {path: '', pathMatch: 'full', redirectTo: '/dashboard'},
  {path: '**', redirectTo: '/dashboard'}
]
```
- `canActivate` vous permet de définir des gardes de route. Une garde de route bloque l'activation de la route si la condition qu'elle définit n'est pas vérifiée.
- `pathMatch: 'full'` force le chemin à être comparé à l'URL entière. Il est important de le faire lors de la redirection des routes à chemin vide. Sinon, parce qu'un chemin vide est un préfixe de n'importe quelle URL, le routeur appliquerait la redirection même lors de la navigation vers la destination de redirection, créant une boucle sans fin.
- `'**'`: est un caractère générique qui signifie qu'il correspond à n'importe quelle URL

**Exercice :** ouvrez le Stackblitz et définissez les routes suivants :
- accueil: `/home` & route vide
- liste des livres : `/books`
- détail du livre avec id 1 : `/books/1`
- liste des auteurs : liste des livres : `/authors`
- détail de l'auteur avec l'identifiant 1 : liste des livres : `/authors/1`
- tout autre route doit conduire à la page d'accueil

::: tip Hint
`{ path: 'detail/:id', component: TransactionDetailComponent }` est une route *paramétrée* où les deux points (`:`) dans le chemin indiquent que `:id` est un espace réservé pour un identifiant de transaction spécifique.
:::

::: details Correction
```ts
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthorDetailsComponent } from "./author-details/author-details.component";
import { AuthorListComponent } from "./author-list/author-list.component";
import { BookDetailsComponent } from "./book-details/book-details.component";
import { BookListComponent } from "./book-list/book-list.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'authors', component: AuthorListComponent},
  {path: 'authors/:id', component: AuthorDetailsComponent},
  {path: 'books', component: BookListComponent},
  {path: 'books/:id', component: BookDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```
:::

L'utilisation de routes enfants rend l'imbrication entre les routes plus claire et ouvre la voie au lazy-loading. Voici comment cela s'appliquerait à l'application *Personal Library* :

::: details Correction with child routes
```ts
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'authors',
    children: [
      { path: '', component: AuthorListComponent, pathMatch: 'full' },
      { path: ':id', component: AuthorDetailsComponent }
    ]
  },
  {
    path: 'books',
    children: [
      { path: '', component: BookListComponent, pathMatch: 'full' },
      { path: ':id', component: BookDetailsComponent }
    ]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];
```
:::

::: tip Hosting
Lors de l'utilisation de `ng serve`, Angular démarre automatiquement un serveur de développement configuré spécifiquement pour les spécificités d'un SPA. Dans un environnement de production, vous devrez configurer un serveur tel qu'un Nginx. Pour que le routage fonctionne correctement, la configuration du serveur doit avoir une règle de réécriture afin que le fichier `index.html` (produit en construisant l'application) soit servi pour toutes les "routes". Sinon, l'utilisateur rencontrerait une erreur 404. Pour Nginx, voici à quoi cela pourrait ressembler :
```
location / {
  try_files $uri $uri/ /index.html;
}
```
:::

## Directives du routeur

Dans le Stackblitz, essayez de naviguer vers les composants en remplaçant l'URL dans la barre d'adresse. Comme vous pouvez le voir, à part le `NavbarComponent`, aucun autre composant n'est affiché même si nous venons de définir des routes dans le `AppRoutingModule`. C'est parce que nous n'avons pas encore dit à Angular où ces composants doivent être insérés dans le DOM.

### router-outlet
C'est le but du `RouterOutlet`. Le `NavbarComponent` doit rester affiché à tout moment, ce qui signifie que les composants doivent être insérés en dessous. Ajoutons le `router-outlet` dans le `AppComponent`.

<code-group>
<code-block title="app.component.html">
```html
<app-navbar></app-navbar>
<router-outlet></router-outlet>
```
</code-block>
</code-group>

Le `RouterOutlet` est l'une des directives de routeur qui sont devenues disponibles pour le `AppComponent` car `AppModule` importe `AppRoutingModule` qui a exporté `RouterModule`.

Essayez à nouveau d'afficher les différents composants en modifiant l'URL dans la barre d'adresse, cela devrait maintenant fonctionner. L'étape suivante consiste à activer la navigation via des liens directement au sein de l'application.

### routerLink

Tout d'abord, occupons-nous des liens dans le `NavbarComponent`. Ouvrez le fichier `navbar.component.html` et modifiez le code comme suit :

<code-group>
<code-block title="navbar.component.html">
```html
<nav>
  <ul>
    <li><a routerLink='/home'>Home</a></li>
    <li><a routerLink='/authors'>Authors</a></li>
    <li><a routerLink='/books'>Books</a></li>
  </ul>
</nav>
```
</code-block>
</code-group>

Vous pouvez maintenant naviguer via les liens de la barre de navigation. `routerLink` est le sélecteur de la [directive RouterLink](https://angular.io/api/router/RouterLink) qui transforme les clics de l'utilisateur en navigations de routeur. C'est une autre des directives publiques du `RouterModule`.

::: danger
Habituellement, une destination de lien est spécifiée via l'attribut `href`. Cependant, ce n'est pas la voie à suivre pour la navigation au sein d'un SPA et ne doit être utilisé que pour la navigation vers des URL externes. En effet, naviguer via href dans une SPA (Single Page Application) fait recharger l'ensemble de l'application, ce qui est très inefficace et offre une très mauvaise expérience utilisateur.
:::

**Exercice :** Ajoutez la navigation vers les détails du livre et les détails de l'auteur dans leurs composants de liste respectifs.

Vous avez deux options, soit utiliser un chemin absolu commençant par `/` ce qui signifie que le chemin entier doit être fourni (comme dans `book-list.component.html`) ou utiliser un chemin relatif vers l'emplacement actuel (comme dans `author-list.component.html`).

```html
<!-- author-list.component.html -->
<h1>Authors ✍️</h1>
<ul>
  <li *ngFor="let author of authors">{{author.name}} <a routerLink="{{author.id}}">🔍</a></li>
</ul>

<!-- book-list.component.html -->
<h1>Books 📚</h1>
<ul>
  <li *ngFor="let book of books">{{book.title}} - {{book.author}} <a routerLink="/books/{{book.id}}">🔍</a></li>
</ul>
```

Pour le moment, seules les données du livre avec l'id 1 et les données de l'auteur avec l'id 1 sont affichées. Plus loin dans ce chapitre, nous verrons comment extraire l'identifiant présent dans l'URL pour sélectionner les données appropriées à afficher.
:::

**Exercice:** Ajoutez la navigation dans le `BookDetailComponent` au `AuthorDetailComponent` et vice versa.

::: details Correction

```html
<!-- author-details.component.html -->
<h2>Books</h2>
<ul>
  <li *ngFor="let book of details.books">{{book.title}} <a routerLink="/books/{{book.id}}">🔍</a></li>
</ul>

<!-- book-details.component.html -->
<div class="info">
  <div><a routerLink="/authors/{{details.author.id}}">✍️</a></div>
  <p> {{details?.author.name}}</p>
</div>
```
:::

La directive `RouterLink` a un `Query Params` `Input`. Cet `Input` permet de passer des paramètres facultatifs via des chaînes de requête dans l'URL :
```html
<a routerLink="'/books" [queryParams]="{genre: 'Epic Fantasy'}">
  Epic Fantasy Books
</a>
```
L'exemple génère le lien : `/books?genre=Epic%20Fantasy`

### routerLinkActive

La navigation en cliquant sur les liens dans le `NavbarComponent` est maintenant fonctionnelle ; cependant, il n'y a aucun retour à l'utilisateur concernant le lien actif. C'est le but de la directive `routerLinkActive`. Il vous permet de spécifier une ou plusieurs classes CSS à ajouter à l'élément lorsque la route liée est active.

<code-group>
<code-block title="navbar.component.html">

```html
<nav>
  <ul>
    <li><a routerLinkActive='active' routerLink='/home'>Home</a></li>
    <li><a routerLinkActive='active' routerLink='/authors'>Authors</a></li>
    <li><a routerLinkActive='active' routerLink='/books'>Books</a></li>
  </ul>
</nav>
```
</code-block>
<code-block title="navbar.component.css">

```css
li a:hover:not(.active) {
  background-color: #111;
}

.active {
  background-color: cadetblue;
}

.active:hover {
  background-color: #256264;
}
```
</code-block>
</code-group>

## Services de routeur

Jusqu'à présent, nous avons principalement travaillé avec le "Router" Angular du template. La bibliothèque fournit également des services pour interagir avec elle à partir d'une classe de composants.

### Service ActivatedRoute

Le service `ActivatedRoute` décrit l'état actuel du *routeur*. Grâce à lui, le composant associé à la route actuelle peut extraire des informations de l'URL via les propriétés `paramMap` et `queryParamMap`.

`paramMap` et `queryParamMap` sont des Observables, une notion que nous verrons plus en détail dans un chapitre ultérieur. Observable permet d'observer comment les informations évoluent dans le temps. Le service `ActivatedRoute` fournit également une propriété `snapshot` pour obtenir uniquement l'état du routeur à un moment donné. Cette propriété est suffisante pour couvrir la plupart des cas.

Pour extraire un paramètre d'une route, deux étapes sont nécessaires :
1. Injectez le service 'ActivatedRoute' dans le constructeur du composant qui en a besoin
2. Récupérez le paramMap depuis le snapshot dans le hook de cycle de vie `OnInit`

```ts{10,13}
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-example",
  templateUrl: "./exemple.component.html"
})
export class ExampleComponent implements OnInit {

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id: string = this.route.snapshot.paramMap.get("id");
  }
}
```

Revenons à l'application *Personal Library*. Avec l'aide de `ActivatedRoute`, montrez les détails de l'auteur et du livre appropriés en fonction de la route.

::: details Correction
```ts
// book-details.component.ts
export class BookDetailsComponent implements OnInit {
  details: BookDetail | null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.details = bookDetails.get(Number(id));
  }
}

// author-details.component.ts
export class AuthorDetailsComponent implements OnInit {
  details: AuthorDetail | null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.details = authorDetails.get(Number(id));
  }
}

```
:::

::: warning Quand utiliser snapshot
Les propriétés `paramMap` et `queryParamMap` sont `Observables` en raison des optimisations. En effet, lorsqu'on navigue sur la même route mais avec des paramètres différents (e.g. /books/123 => /books/456), Angular ne recharge pas le composant mais propage les nouveaux paramètres via ces `Observables`.

Qu'est-ce que ça veut dire ? Si vous autorisez uniquement la navigation vers la même route via la barre d'adresse, vous êtes couvert lors de l'utilisation de snapshot. Cependant, si vous fournissez un moyen de naviguer vers la même route via un lien (comme un mécanisme "Suivant" et "Précédent"), vous devez écouter les modifications de `paramMap`/`queryParamMap`.
:::

### Service de routeur

Parfois, il est nécessaire de déclencher certaines actions avant le routage. C'est ce qui se passe lorsque nous cliquons sur un bouton de connexion. Tout d'abord, un appel http est effectué et en fonction de la réponse, le routage a lieu. Le service `Router` permet de déclencher la navigation depuis la classe du composant.
1. Injecter le service 'Router' via le constructeur
2. Utilisez la méthode `navigateByUrl` pour déclencher la navigation. `navigateByUrl` prend toujours un chemin absolu. Si vous souhaitez utiliser un chemin relatif, utilisez plutôt la méthode `navigate`.

```ts{6,9}
@Component({
  selector: "app-example",
  templateUrl: "./example.component.html"
})
export class ExampleComponent {
  constructor(private router: Router) {}

  navigatePostLogin(): void {
    this.router.navigateByUrl('/dashboard')
  }
}
```

Une correction complète de l'application *Personal Library* est disponible dans ce [stackblitz](https://stackblitz.com/edit/angular-routing-training-correction?file=src/app/book-list/book-list.component.ts).

## TP : Navigation basée sur un routeur

Implémentons le routage de l'application Film.

1. Lors de la configuration initiale du projet, la CLI a demandé si elle devait ajouter le routage Angular et nous avons répondu oui. La CLI a installé la bibliothèque `@angular/router`, vous pouvez le vérifier dans les dépendances déclarées dans le `package.json`. Il a également créé le fichier `app-routing.module.ts`.
2. Ajoutez une route `login` liée au `LoginFormComponent` et une route `search` liée à `FilmSearchComponent` dans le fichier `app-routing.module.ts`.
3. Ajoutez un `<router-outlet></router-outlet>` en haut du template `AppComponent`. Vous devriez maintenant voir le composant LoginComponent deux fois lorsque vous naviguez vers `http://localhost:4200/login`.
4. Remplacer le commutateur entre le `LoginFormComponent` et le `FilmSearchComponent` actuellement basé sur un `*ngIf` par une navigation d'une route à une autre. Vous devrez injecter le service Router dans le LoginFormComponent.

 **Question:** Pouvez-vous repérer un problème dans le fonctionnement de notre implémentation actuelle en ce qui concerne les problèmes de sécurité ?

5. Ajouter une redirection sur la route vide `''` vers le `FilmSearchComponent`

**Question:** À votre avis, quel est le but d'une telle redirection ?

6. **Bonus:** Créez un `NotFoundComponent` (404) avec CLI et ajoutez une route générique `'**'` qui redirige vers celui-ci. Le code ci-dessous est une proposition du contenu du composant 404. Ajoutez un `routerLink` sur la balise `<a>` pour revenir au composant de recherche.

<code-group>
<code-block title="HTML">

``` html
<h1>404</h1>
<p>Seems you are lost</p>
<p>Get back in<a> known territory</a></p>
```
</code-block>
<code-block title="SCSS">

``` scss
:host {
  text-align: center;
}
```
</code-block>
</code-group>

7. **Bonus:** En savoir plus sur les [gardes de navigation](https://angular.io/api/router/CanActivate) pour sécuriser les routes. Nous allons en implémenter un dans le chapitre suivant.
