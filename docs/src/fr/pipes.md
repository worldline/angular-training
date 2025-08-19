# Pipes

Les pipes sont des **fonctions de transformation de données** utilisables directement depuis le template afin de transformer les données à afficher au moment du binding. Ils sont intéressants de deux manières principales :
- ils ne nécessitent pas de modifier les données dans le composant pour qu'elles s'affichent de manière user-friendly
- ils sont déclarés une seule fois et peuvent être réutilisés dans autant de composants que nécessaire car ils en sont indépendants
  
## Syntaxe

La syntaxe des pipes Angular est inspirée de celle du shell Unix

```html
<div>{{ user().lastName | uppercase  }}</div>
```

Des paramètres peuvent être passés aux pipes. Ils sont placés après le nom du pipe et séparés par des deux-points :

```html
<div>{{ user().registrationDate | date:'dd/MM/yyyy' }}</div>
<div>{{ user().registrationDate | date:'dd/MM/yyyy hh:mm':'UTC' }}</div>
<div>{{ user().registrationDate | date:'dd/MM/yyyy hh:mm':'+0200':'fr' }}</div>
```

Les pipes peuvent être enchaînés :
```html
<div>{{ user().birthDate | date | uppercase }}</div>
```

## Pipes intégrés

Angular fournit plus d'une [douzaine de pipes intégrés](https://angular.dev/api?type=pipe) pour couvrir les cas d'utilisation courants. Voici leur liste complète :
- `AsyncPipe` déballe une valeur d'une primitive asynchrone
- `CurrencyPipe` transforme un nombre en une chaîne de caractère formatée avec la devise selon les règles de locale
- `DatePipe` formate une valeur de date selon les règles de locale
- `DecimalPipe` formate une valeur en fonction d'option de formatage des décimales et des règles de locale
- `I18nPluralPipe` fait correspondre une valeur à une chaîne de caractère qui pluralise la valeur selon les règles de locale
- `I18nSelectPipe` sélecteur générique qui affiche la chaîne de caractère qui correspond à la valeur actuelle
- `JsonPipe` convertit une valeur en sa représentation au format JSON, utile pour le débogage
- `KeyValuePipe` transforme l'objet ou la Map en un tableau de paires clé-valeur
- `LowerCasePipe` transforme le texte en minuscules
- `PercentPipe` transforme un nombre en une chaîne de caractères formatée avec en pourcentage, selon les règles de locale
- `SlicePipe` crée un nouveau tableau ou chaîne de caractère contenant un sous-ensemble (tranche) des éléments
- `TitleCasePipe` transforme le texte en casse de titre
- `UpperCasePipe` transforme le texte en majuscules

::: warning Import
Les pipes ne font pas partie des imports par défaut du composant depuis le passage aux standalone components. Vous devez faire l'import vous-même en ajoutant la classe du pipe que vous souhaitez utiliser dans le template au tableau d'imports du décorateur `@Component` du composant.
:::

**Exercice : Formatez le prix (en EUR) et la date ('EEEE dd MMMM y'), tous deux en français**
<iframe height='500' width='100%' src="https://stackblitz.com/fork/github/ocunidee/atpw-builtin-pipe/tree/master?ctl=1&embed=1&file=src/app/app.component.html&hideNavigation=1&title=Built-in%20pipes"></iframe>

## Custom pipe

Si les pipes intégrés ne couvrent pas un cas d'utilisation que vous rencontrez, Angular vous donne la possibilité d'en créer un personnalisé.

Pour créer un Pipe personnalisé, vous devez :
- créer une classe qui implémente l'interface `PipeTransform`
- décorez-la avec le décorateur `@Pipe()`

Le CLI s'occupera de ces points pour nous via la [commande suivante](https://angular.dev/cli/generate/pipe):

```sh
ng generate pipe <name>
```

Il génère le fichier suivant :
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
Le premier argument de la méthode `transform` est la valeur sur laquelle le pipe est appliqué, la méthode prend ensuite n'importe quel nombre d'arguments. Il est recommandé de typer tous les arguments ainsi que de préciser le type de retour.

Le nom du pipe doit être en lowerCamelCase. C'est une bonne pratique de le faire commencer par les initiales de votre application, tout comme pour le sélecteur de vos composants.

Comme toute autre classe, les pipes peuvent bénéficier de l'injection de dépendances. Il est possible d'injecter un autre pipe par exemple. Ceci est particulièrement utile lorsqu'un pipe intégré doit être utilisé dans toute l'application avec les mêmes paramètres. Un pipe personnalisé peut servir de wrapper afin de simplifier l'utilisation d'un pipe intégré.

Dans l'exemple suivant, le prix remisé est calculé en fonction d'un taux de remise. Aucune donnée du catalogue dans le composant n'est mutée pour afficher le nouveau prix.

<iframe height='500' width='100%' src="https://stackblitz.com/fork/github/ocunidee/atpw-custom-pipe/tree/master?ctl=1&embed=1&file=src/app/discounted.pipe.ts&hideNavigation=1&title=Custom%20pipe"></iframe>

## Utiliser un pipe en dehors d'un template

Il est également possible d'utiliser des pipes dans une classe de composant en l'injectant et en appelant sa méthode transform. Le pipe doit alors être ajouté aux providers du composant ou de l'*ApplicationConfig*. Lorsqu'un pipe n'est pas utilisé dans le template, il n'a pas besoin d'être présent dans le tableau des imports du composant.

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
## TP : Format du score
1. Créez un pipe `starRating` à l'aide du CLI dans le dossier `app/pipes`.
2. Implémentez l'intérieur de la méthode transform de sorte que le métascore d'un film s'affiche avec une note de ★ à cinq ★★★★★. Modifier la signature de la méthode transform pour qu'elle soit plus spécifique à votre cas.
3. Utilisez ce pipe dans le template du `LoginFormComponent`.
4. Commitez

::: details Résultat attendu
![Résultat visuel du TP sur les pipes 1](../assets/visual-1.png)

![Résultat visuel du TP sur les pipes 2](../assets/visual-3.png)
:::


## Pour aller plus loin
La différence entre les [pipes purs et impurs](https://medium.com/@ghoul.ahmed5/pure-vs-impure-pipe-in-angular-2152cf073e4d)