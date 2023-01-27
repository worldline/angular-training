# Pipes

Les pipes sont des **fonctions de transformation de données** utilisables directement depuis le template afin de transformer les données à afficher au moment du binding. Ils sont intéressants de deux manières principales :
- ils ne nécessitent pas de modifier les données dans le composant pour qu'elles s'affichent de manière user-friendly
- ils sont déclarés une seule fois et peuvent être réutilisés dans autant de composants que nécessaire car ils en sont indépendants
  
## Syntaxe

La syntaxe des pipes Angular est inspirée de celle du shell Unix

```html
<div>{{ user.lastName | uppercase  }}</div>
```

Des paramètres peuvent être passés aux pipes. Ils sont placés après le nom du pipe et séparés par des deux-points :

```html
<div>{{ user.registrationDate | date:'dd/MM/yyyy' }}</div>
<div>{{ user.registrationDate | date:'dd/MM/yyyy hh:mm':'UTC' }}</div>
<div>{{ user.registrationDate | date:'dd/MM/yyyy hh:mm':'+0200':'fr' }}</div>
```

Les pipes peuvent être enchaînés :
```html
<div>{{ user.birthDate | date | uppercase }}</div>
```

## Pipes intégrés

Angular fournit plus d'une [douzaine de pipes intégrés](https://angular.io/api?type=pipe) pour couvrir les cas d'utilisation courants. Voici leur liste complète :
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

**Exercice : Formatez le prix (en EUR) et la date ('EEEE dd MMMM y'), tous deux en français**
<iframe height='500' width='100%' src="https://stackblitz.com/edit/angular-currency-pipe-training-example?ctl=1&embed=1&file=src/app/app.component.html&hideNavigation=1"></iframe>

## Custom pipe

Si les pipes intégrés ne couvrent pas un cas d'utilisation que vous rencontrez, Angular vous donne la possibilité d'en créer un personnalisé.

Pour créer un Pipe personnalisé, vous devez :
- créer une classe qui implémente l'interface `PipeTransform`
- décorez-la avec le décorateur `@Pipe()`
- l'ajouter aux `declarations` (et `exports` si besoin) de son module associé

Le CLI s'occupera de ces trois points pour nous via la [commande suivante](https://angular.io/cli/generate#pipe):

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

Comme toute autre classe, les pipes peuvent utiliser leur constructeur pour bénéficier de l'injection de dépendances. Il est possible d'injecter un autre pipe par exemple. Ceci est particulièrement utile lorsqu'un pipe intégré doit être utilisé dans toute l'application avec les mêmes paramètres. Un pipe personnalisé peut servir de wrapper afin de simplifier l'utilisation d'un pipe intégré.

Dans l'exemple suivant, le prix remisé est calculé en fonction d'un taux de remise. Aucune donnée du catalogue dans le composant n'est mutée pour afficher le nouveau prix.

<iframe height='500' width='100%' src="https://stackblitz.com/edit/angular-pipe-exemple?embed=1&file=src/app/discounted.pipe.ts&ctl=1&hideNavigation=1"></iframe>

## Utiliser un pipe en dehors d'un template

Il est également possible d'utiliser des pipes dans une classe de composant en l'injectant dans son constructeur et en appelant sa méthode transform. Le pipe doit être importé dans le module auquel appartient le composant et ajouté aux providers du composant ou du module (à privilégier).

```ts
import { Component } from '@angular/core'
import { UpperCasePipe } from '@angular/common'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ UpperCasePipe ]
})
export class AppComponent {

  constructor(private upperCasePipe: UpperCasePipe) {}

  title = this.upperCasePipe.transform('title')
}
```
## TP : Format du score
1. Créez un pipe `starRating` à l'aide du CLI dans le dossier `app/pipes`.
2. Implémentez l'intérieur de la méthode transform de sorte que le métascore d'un film s'affiche avec une note de ★ à cinq ★★★★★.
3. Utilisez ce pipe dans le template du `LoginFormComponent`.
4. Commitez

::: details Résultat attendu
![Résultat visuel du TP sur les pipes 1](../../assets/visual-1.png)

![Résultat visuel du TP sur les pipes 2](../../assets/visual-3.png)
:::


## Pour aller plus loin
La différence entre les [pipes purs et impurs](https://medium.com/@ghoul.ahmed5/pure-vs-impure-pipe-in-angular-2152cf073e4d)