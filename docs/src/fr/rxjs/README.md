# RxJS

[RxJS](https://rxjs.dev/guide/overview) est une librairie de programmation réactive utilisant les Observables. Cela facilite la composition de code asynchrone ou basé sur des callbacks.
Elle fait partie de la collection [ReactiveX](http://reactivex.io/) de librairies open source (RxJava, RxSwift, Rx.NET, RxScala...).
Elles partagent toutes une API très similaire, ce qui signifie que le transfert des compétences Rx d'un langage à un autre est très facile.

Le modèle ReactiveX d'`Observable` vous permet de traiter des flux d'événements asynchrones avec le même type d'opérations simples et composables que vous utilisez pour des collections d'éléments de données comme des tableaux, des opérations telles que `filter`, `map`, `flatMap`, ` reduce` et bien d'autres. Il vous libère d'enchevêtrements de callbacks et rend ainsi votre code plus lisible et moins sujet aux bugs.

La librairie fournit le type `Observable` ainsi que des fonctions utilitaires pour :
- convertir le code existant lié aux opérations asynchrones en observables
- itérer à travers les valeurs d'un flux
- mapper des valeurs à différents types
- filtrer des flux
- détecter les erreurs
- composer plusieurs flux

Ce chapitre n'entrera pas en profondeur dans les concepts de Rx, vous pouvez vous référer à la documentation officielle à cet effet. Cependant, il illustrera des situations courantes rencontrées dans les applications Angular.

:::warning
Ce chapitre est basé sur [RxJS v7](https://rxjs.dev/), la version utilisée par Angular 15.
:::

## L'Observable

Le chapitre précédent vous a montré l'utilisation de base des Observables. Voici ce que nous y avons vu :
- Les observables sont renvoyés par les méthodes du service `HttpClient`.
- Les observables ne sont exécutés qu'une fois subscribed
- La méthode subscribe prend un objet constitué de trois callbacks (next, error and complete) en paramètre.

Tout d'abord, illustrons les deuxième et troisième points :

<iframe height='500' width='100%' src="https://stackblitz.com/github/ocunidee/atpw-observable/tree/master?ctl=1&embed=1&file=src/app/app.component.ts&hideExplorer=1&hideNavigation=1&title=Observable"></iframe>

L'`Observable` déclenche 3 notifications next suivies d'une notification complete. Un Observable arrête d'émettre des valeurs parce qu'elles sont erronées (callback error) ou parce qu'elles se terminent (callback complete). Les deux événements s'excluent mutuellement.

## Création d'Observable

Dans une application Angular, vous aurez rarement à créer vous-même des observables. La plupart du temps, vous gérerez les flux que le framework a créés pour vous, tels que la gestion des résultats d'appels http, l'écoute d'événements du routeur ou l'écoute d'événements de formulaire lors de l'utilisation du `ReactiveFormsModule` (le nom du module révèle sa nature réactive). Cependant, vous pouvez rencontrer des situations où il peut vous incomber de créer un flux. Voici les principales façons dont cela pourrait se produire.

- interval ([marble](https://rxmarbles.com/#interval) / [documentation](https://rxjs.dev/api/index/function/interval))

```ts
interval(1000)
  .subscribe({ next: n => {
    console.log(`It's been ${n + 1} seconds since subscribing!`)
  } })
```

- transformation de promesse ([marble](https://rxmarbles.com/#from) / [documentation](https://rxjs.dev/api/index/function/from))

```ts
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('foo')
  }, 2000)
})

from(promise1).subscribe({
  next: message => console.log(`The delayed message is '${message}'`),
  error: error => console.log(this.promiseMessage = 'There\'s been an error'),
  complete: () => console.log('Completed')
})
```

- transformation d'événement du navigateur ([documentation](https://rxjs.dev/api/index/function/fromEvent))

```ts
fromEvent(document, 'click').subscribe({ next: _ => console.log('Clicked!') })
```

Le Stackblitz suivant vous permet de jouer avec ces exemples :

<iframe height='500' width='100%' src="https://stackblitz.com/github/ocunidee/atpw-observable-creation/tree/master?ctl=1&embed=1&file=src/app/app.component.ts&hideExplorer=1&title=Observable%20creation"></iframe>

## Filtrage et mapping

Semblable à la fonction bien connue `Array.prototype.map`, l'opérateur `map` ([marble](https://rxmarbles.com/#map) / [documentation](https://rxjs.dev/api/operators/map)) applique une projection à chaque valeur et émet cette projection dans l'`Observable` de sortie.

Transformons l'exemple précédent concernant l'événement click sur le document pour qu'il imprime les coordonnées du clic :

<iframe height='500' width='100%' src="https://stackblitz.com/github/ocunidee/atpw-rx-operators/tree/master?ctl=1&embed=1&file=src/app/app.component.ts&hideExplorer=1&hideNavigation=1&title=Mapping%20and%20Filtering"></iframe>

::: tip Pipe
`pipe()` est une fonction utilisée pour composer des opérateurs tels que `map()`, `filter()`, `take()`... Les opérateurs sont appliqués au flux dans l'ordre où ils sont passés à la fonction pipe
:::

Similaire à la fonction `Array.prototype.filter`, l'opérateur `filter` ([marble](https://rxmarbles.com/#filter) / [documentation](https://rxjs.dev/api/operators/filter)) filtre les éléments émis par l'Observable source en n'émettant que ceux qui satisfont un prédicat spécifié.

```ts
from([1, 2, 3, 4, 5, 6, 7, 8])
  .pipe(filter(data => data % 2 === 0))
  .subscribe({ next: data => console.log(data) })
```

Cet extrait affichera :
```sh
2
4
6
8
```

**Exercice : En utilisant le Stackblitz précédent sur l'opération map, ne mettez à jour le message que pour les clics effectués dans les coordonnées comprises entre 0-100 sur les axes x et y.**

## La gestion des erreurs

Comme vu précédemment, la méthode `subscribe` prend un en paramètre un object qui a une callback `error`. Lorsque l'`Observable` émet en erreur, elle est exécutée à la place de la callback `next` et l'`Observable` cesse d'émettre.

```ts
this.userService.getUsers()
  .subscribe({
    next: users => console.log(`The following users exist in the system: ${users}`),
    error: error => console.log(`An error occurred: ${error}`),
    complete: () => console.log('Completed')
  })
```

Ce comportement n'est pas toujours celui souhaité. RxJS fournit un opérateur `catchError` ([documentation](https://rxjs.dev/api/operators/catchError)) pour traiter l'erreur de manière "silencieuse", ce qui signifie qu'il s'agit du callback `next` et non celui `error` qui est appelé.

Imaginons que vous vous attendiez à un tableau d'utilisateurs du backend mais qu'il vous renvoie une erreur HTTP 404, vous pouvez utiliser `catchError` pour renvoyer un tableau vide à la place, et continuer à générer une erreur pour d'autres erreurs HTTP.

```ts
this.userService.getUsers()
  .pipe(
    catchError(error => {
      if ((error as HttpErrorResponse).status === 404){
        return of([])
      }

      return throwError(error)
    })
  )
  .subscribe({
    next: users => console.log(`The following users exist in the system: ${users}`),
    error: error => console.log(`An error occurred: ${error}`),
    complete: () => console.log('Completed')
  })
```

**Question : Qu'est-ce qui sera imprimé sur la console en cas d'erreur 404 renvoyée par le backend ? En cas de 500 ?**

## Composition de flux
Les flux peuvent être composés à de nombreuses fins. Pour étudier cette notion dans un environnement plus simple, nous ne l'étudierons que dans le cadre d'appels backend.

Il est assez courant de devoir enchaîner les appels backend. Par exemple, l'utilisateur vient de modifier une ressource et vous souhaitez que votre page affiche ses détails mis à jour. Certains backends renvoient les détails de la ressource mise à jour dans le corps de la réponse à l'appel d'édition. Cependant, certains renvoient simplement une réponse HTTP 200 ou 204 sans corps. Cela signifie que l'appel de modification et l'appel de détail doivent être chaînés pour mettre à jour l'interface utilisateur. RxJS fournit plusieurs opérateurs pour enchaîner les événements de manière déclarative. Nous utiliserons l'opérateur `switchMap` ([documentation](https://rxjs.dev/api/operators/switchMap) / [marble](https://rxmarbles.com/#switchMap)) dans ce cas. Vous pouvez l'essayer dans le Stackblitz ci-dessous (cliquez n'importe où sur l'aperçu et voyez ce qu'il se passe dans la console, cliquez à nouveau et voyez comment les choses changent dans la console).

<iframe height='500' width='100%' src="https://stackblitz.com/edit/switchmap-training?ctl=1&devtoolsheight=33&embed=1&file=index.ts&hideExplorer=1&hideNavigation=1&title=SwitchMap%20exemple"></iframe>

**Question : A partir de cet exemple, qu'apprenez-vous sur le fonctionnement de switchMap ? (Regarder le diagramme marble peut aider)**
Adaptons l'exemple ci-dessus au contexte des appels backend chaînés :

<iframe height='500' width='100%' src="https://stackblitz.com/github/ocunidee/atpw-switchMap/tree/master?ctl=1&embed=1&file=src/app/app.component.ts&hideExplorer=1&hideNavigation=1&title=SwitchMap%20exercise"></iframe>

Un autre opérateur utile pour combiner les appels est `exhaustMap` ([documentation](https://rxjs.dev/api/operators/exhaustMap)). Alors que `switchMap` annule l'abonnement à l'Observable projeté précédent, exhaustMap ignore les nouveaux événements tant que l'Observable projeté précédent n'est pas terminé.

:::danger Ne pas imbriquer les subscribes
Un piège très courant avec RxJS est d'imbriquer des subscribes. RxJS fournit de nombreux opérateurs afin que vous n'ayez jamais à mélanger du code synchrone et asynchrone.
Pourquoi ne pas les mélanger ?
 - c'est du code spaghetti qui devient difficile à lire et à maintenir car il ne bénéficie plus du caractère déclaratif de RxJS,
 - cela rend difficile de composer des observables,
 - cela provoque des fuites de mémoire.

Le plus souvent, on le fait sans s'en rendre compte. Par exemple, dans la callback next d'un subscribe, vous appelez une méthode qui a un subscribe. C'est de l'imbrication de subscribes.

Exemple de ce que vous ne devriez PAS faire :
<iframe height='500' width='100%' src="https://stackblitz.com/github/ocunidee/atpw-switchMap/tree/nested-subscribe?ctl=1&embed=1&file=src/app/app.component.ts&hideExplorer=1&hideNavigation=1&title=Don't nest subscribes"></iframe>
:::

## Unsubscribing

Pour le moment nous avons vu comment subscribe à un Observable. Pour éviter les fuites de mémoire avec les Observables de longue durée, vous devez vous unsubscribe de leur flux.

Réutilisons notre exemple de routage précédent pour illustrer comment les fuites mémoire peuvent se produire. Un Observable interval est créé dans la méthode ngOnInit du composant de détails du livre.
**Accédez aux détails d'un livre et regardez la console. Puis quittez la page et revenez. Que se passe-t-il dans la console ? Qu'est-ce que ça veut dire ?**

<iframe height='500' width='100%' src="https://stackblitz.com/github/ocunidee/atpw-routing/tree/memory-leak?ctl=1&embed=1&file=src/app/book-details/book-details.component.ts&hideExplorer=1&hideNavigation=1&title=Memory leak"></iframe>

Quand unsubscribe ? Si vous n'avez aucune certitude que l'`Observable` s'achèvera ou qu'il produira une erreur, vous devez unsubscribe manuellement. Le `HttpClient` complète toujours l'Observable qu'il renvoie après avoir reçu une réponse. Donc, théoriquement, si vous ne rencontrez que des Observables du `HttpClient`, vous n'avez pas à unsubscribe. Dans les autres cas, **soyez prudent et unsubscribe**.

Comment unsubscribe ? En utilisant l'opérateur `takeUntilDestroyed` et en lui passant un `destroyRef`.

Corrigons la fuite de mémoire de l'exemple précédent.

<iframe height='500' width='100%' src="https://stackblitz.com/github/ocunidee/atpw-routing/tree/memory-leak-fix?ctl=1&embed=1&file=src/app/book-details/book-details.component.ts&hideExplorer=1&hideNavigation=1&title=takeUntilDestroyed"></iframe>

## Pipe async 

Invoquer la méthode subscribe sur un `Observable` et enregistrer la valeur dans une propriété du composant n'est pas le seul moyen d'afficher les valeurs de l'`Observable`. Angular fournit un pipe à appliquer directement sur un `Observable`.

<CodeGroup>
<CodeGroupItem title="Component class">

```ts
export class AppComponent {
  counter: Observable<number> = interval(1000)
}
```
</CodeGroupItem>

<CodeGroupItem title="Component template">

```html
<p>{{counter | async}}</p>
```
</CodeGroupItem>
</CodeGroup>

Pour les objets, une syntaxe alternative existe pour éviter d'utiliser de manière répétitive le pipe async pour accéder à chaque champ. Sachant que chaque pipe `async` crée une souscription et trigger de nouveau l'exécution de l'`Observable`, c'est à éviter :

<CodeGroup>
<CodeGroupItem title="Component template">

```html
<!-- A EVITER -->
<p>{{(user | async)?.firstName}}</p>
<p>{{(user | async)?.lastName}}</p>
<p>{{(user | async)?.age}}</p>

<!-- METHODE À PREFEREE -->
@if (user | async as user) {
  <p>{{user.firstName}}</p>
  <p>{{user.lastName}}</p>
  <p>{{user.age}}</p>
}

<!-- EN UTILISANT LA SYNTAXE @let -->
@let unwrappedUser = user | async;
<p>{{unwrappedUser?.firstName}}</p>
<p>{{unwrappedUser?.lastName}}</p>
<p>{{unwrappedUser?.age}}</p>
```
</CodeGroupItem>
<CodeGroupItem title="Component class">

```ts{2}
@Component({
  selector: 'app-root',
  imports: [AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  user: Observable<User> = interval(1000).pipe(map(_ => new User('John', 'Snow', 28)))
}

class User {
  constructor(
    public firstName: string,
    public lastName: string,
    public age: number
  ) {}
}
```
</CodeGroupItem>
</CodeGroup>

Aucun subscribe n'étant effectué, il n'est pas nécessaire d'unsubscribe. Le pipe async s'en charge pour nous.

## Sommaire

::: tip Points clés à retenir
- Unsubscribe ou utilisez le pipe async
- N'imbriquez jamais les subscribes, trouvez plutôt les bons opérateurs
:::

Voici un tableau des opérateurs les plus couramment utilisés.

| Zone           | Opérateurs                                                    |
| -------------- |---------------------------------------------------------------|
| Création       | from, of, fromEvent, interval                                 |
| Filtrage       | filter, takeUntil, take, distinctUntilChanged                 |
| Transformation | switchMap, exhaustMap, concatMap, mergeMap, map               |
| Combination    | combineLatest, concat, merge, startWith, withLatestFrom, zip  |
| Utilitaire     | tap, finalize, catchError                                     |

Il existe également deux constantes `Observable` : `NEVER` (n'émet ni valeurs ni erreurs ni la notification complete) et `EMPTY` (n'émet aucun élément et émet immédiatement une notification complete). `EMPTY` est très utile comme valeur de retour de l'opérateur `catchError`.

Pour vous aider à décider quel opérateur correspond à votre cas d'utilisation, la documentation RxJS fournit un [arbre de décision d'opérateur](https://rxjs.dev/operator-decision-tree). Cela aide également à découvrir les nombreux opérateurs fournis par RxJS.

## TP

1. Dans le fichier `film-search.component.ts`, arrêtez de subscribe à la réponse de recherche et utilisez plutôt un pipe async dans le template. N'oubliez pas d'ajouter l'`AsyncPipe` au tableau `imports`.
2. Même si cela n'est pas strictement nécessaire dans ces cas, vous pouvez vous unsubscribe des appels à login et register dans le `LoginFormComponent` en utilisant la technique `takeUntilDestroyed`.
