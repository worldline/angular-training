# Premiers pas 

Nous venons d'utiliser la commande Angular CLI `ng new <my-project>`. Cette commande crée un espace de travail avec une application de niveau racine nommée *my-project* et installe les packages Angular npm nécessaires dans le nouvel espace de travail. Le dossier racine de l'espace de travail contient divers fichiers de support et de configuration.

La création d'un squelette d'application initial au niveau racine de l'espace de travail avec ses tests de bout en bout est le comportement par défaut de la commande `ng new`. Ce comportement convient à un style de développement **multi-repo** où chaque application réside dans son propre espace de travail. C'est également la voie recommandée pour les utilisateurs débutants et intermédiaires.

Angular prend également en charge les espaces de travail avec plusieurs projets. Ceci est approprié pour un style de développement **monorepo** où il y a un seul référentiel et une configuration globale pour tous les projets Angular qu'il contient. Il convient également aux utilisateurs avancés qui, par exemple, développent des bibliothèques partageables.

Pour commencer à développer avec un espace de travail multi-projets, la génération initiale de l'application au niveau racine doit être ignorée.

``` bash
ng new my-workspace --create-application false
```

Vous pouvez ensuite générer des applications et des bibliothèques avec des noms uniques dans l'espace de travail.

``` bash
cd my-workspace
ng generate application my-first-app
```
Les applications générées vont dans le dossier `projects/` au lieu d'un dossier `src` de niveau supérieur.

## Structure des fichiers

Notre projet précédemment créé contient les dossiers et fichiers suivants :
- `tslint.json`: la configuration TSLint par défaut de l'espace de travail
- `tsconfig.json`: la configuration TypeScript de base pour les projets dans l'espace de travail
- `tsconfig.app.json`: le fichier de configuration TypeScript de l'application racine qui hérite de celui de base
- `tsconfig.spec.json`: le fichier de configuration TypeScript des tests e2e qui hérite de celui de base
- `README.md`: documentation d'introduction pour l'application racine
- `package.json`: cconfigure les dépendances des packages npm qui sont disponibles pour tous les projets de l'espace de travail
- `package-lock.json`: fournit des informations de version pour tous les packages installés dans node_modules par le client npm
- `karma.conf.js`: Configuration Karma
- `angular.json`: Configuration CLI, y compris les options de configuration pour les outils de génération, de service et de test utilisés par la CLI
- `.gitignore`: Spécifie intentionnellement les fichiers non suivis que Git doit ignorer
- `.editorconfig`: Configuration pour les éditeurs de code
- `.browserlistrc`: Configuration pour partager les navigateurs cibles
- `src`: Fichiers sources pour le projet d'application de niveau racine
- `node_modules`: Fournit des packages npm à l'ensemble de l'espace de travail
- `e2e`: SFichiers sources pour un ensemble de tests de bout en bout qui correspondent à l'application de niveau racine, ainsi que des fichiers de configuration spécifiques aux tests

:::tip
Pour s'assurer que tous les développeurs travaillant sur un projet utilisent les mêmes versions de bibliothèque, il est possible de [bloquer les numéros de version](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#dependencies) via le fichier `package.json`.
:::

Le dossier `src` contient :
- `test.ts`: 	Le point d'entrée principal pour vos tests unitaires, avec une configuration spécifique à Angular. Vous n'avez généralement pas besoin de modifier ce fichier.
- `styles.scss`: Liste les fichiers CSS qui fournissent des styles pour un projet. L'extension reflète le préprocesseur de style que vous avez configuré pour le projet.
- `polyfill.ts`: Fournit des scripts polyfill pour la prise en charge du navigateur
- `main.ts`: Le point d'entrée principal de votre application
- `index.html`: a page HTML principale qui est diffusée lorsqu'un internaute visite votre site. La CLI ajoute automatiquement tous les fichiers JavaScript et CSS lors de la création de votre application, vous n'avez donc généralement pas besoin d'ajouter manuellement les balises `<script>` ou `<link>` ici.
- `favicon.ico`: Une icône à utiliser pour cette application dans la barre de favoris
- `environments`: Contient des options de configuration de build pour des environnements cibles particuliers
- `assets`: Contient des images et d'autres fichiers d'actifs à copier tels quels lorsque vous créez votre application
- `app`: Contient les fichiers de composants dans lesquels la logique et les données de votre application sont définies

Le dossier `app` contient :
- `app.module.ts`: Définit le module racine, nommé AppModule, qui indique à Angular comment assembler l'application. Déclare initialement uniquement le `AppComponent`. Au fur et à mesure que vous ajoutez d'autres composants à l'application, ils doivent être déclarés ici.
- `app-routing.module.ts`: Définit un module de routage pour le `AppModule`
- `app.component.html`: Définit le modèle HTML associé à la racine `AppComponent`
- `app.component.scss`: Définit la feuille de style de base pour la racine `AppComponent`
- `app.component.ts`: Définit la logique du composant racine de l'application, nommé `AppComponent`. La vue associée à ce composant racine est la racine de la hiérarchie des vues.
- `app.component.spec.ts`: Définit un test unitaire pour la racine `AppComponent`


## Interpolation de texte dans les templates

Comme tout autre composant, le shell AppComponent est réparti sur trois fichiers.
Ouvrez le fichier de classe de composant (`app.component.ts`) et modifiez la valeur de la propriété title en 'Search films'

```typescript
// app.component.ts
import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Search Films'
}
```

Ouvrez le fichier de modèle de composant (`app.component.html`) et supprimez le modèle par défaut généré par Angular CLI. Remplacez-le par la ligne HTML suivante.
```html
<!-- app.component.html -->
<h1>{{title}}</h1>
```
Les accolades doubles sont la *syntaxe de liaison d'interpolation* d'Angular. Cette liaison d'interpolation présente la valeur de la propriété title du composant à l'intérieur de la balise d'en-tête HTML.

Le navigateur s'actualise et affiche le nouveau titre de l'application.

:::tip
Soit dit en passant, les points-virgules sont facultatifs, si vous choisissez de ne pas les utiliser, vous pouvez le faire. Vous pouvez appliquer une règle à ce sujet via le [linter](https://palantir.github.io/tslint/rules/) en remplaçant `always` par `never`:
```json
"semicolon": {
  "options": [
    "always"
  ]
},
```
et corrigez automatiquement tous les endroits où les points-virgules sont déjà utilisés en exécutant :
```bash
ng lint --fix
```
Vous pouvez télécharger le fichier tslint.json que j'utilise habituellement [ici](https://worldline.github.io/angular-training/tslint.json)
:::

::: v-pre
Le moyen le plus simple d'insérer des données de manière dynamique dans vos composants consiste à interpoler du texte, en utilisant la syntaxe `{{myVariable}}`. À l'intérieur des accolades doubles, vous pouvez spécifier n'importe quelle expression JavaScript valide qui n'a pas ou ne favorise pas d'effets secondaires.
:::

Les expressions JavaScript qui ont ou favorisent des effets secondaires incluent :
- affectations (`=`, `+=`, ...)
- opérateurs tels que `new`, `typeof` ou `instanceof`
- les opérateurs d'incrémentation et de décrémentation `++` et `--`

Ajoutez deux champs après la variable de titre dans le fichier `app.component.ts` :
```typescript
// app.component.ts
title = 'Search Films'
orderReference = 'ABCXYZ'
price = 17.3
```

Dans le template:
```html
<!--app.component.html-->
<h1>{{title}}</h1>
<p>Order ref. {{ orderReference }} - Total: {{ price.toFixed(2) + "€" }}</p>
```

Le template a accès à tous les membres non privés de la classe du composant. Changer la visibilité de `price` en `private` produira cette erreur: *Property 'price' is private and only accessible within class 'AppComponent'.*

L'interpolation ne fonctionne que sur le contenu textuel des éléments. Vous ne pouvez pas l'utiliser pour modifier la valeur des attributs HTML ou pour insérer du code HTML. Pour cela, vous devrez recourir à des directives, que nous verrons plus tard dans la formation.

Dans cet exemple, nous avons formaté le prix manuellement. Nous verrons plus tard que Angular fournit un moyen de déclarer des formateurs réutilisables : **pipes**.


## Travailler avec des composants

Le `AppComponent` n'est que le composant racine d'une application Angular. Une application Web est constituée de petits composants réutilisables, intégrés dans des composants de niveau supérieur pour former la mise en page, la disposition de vos éléments sur la page. Cette structure peut être décrite comme une arborescence de composants. Angular crée, met à jour et détruit les composants au fur et à mesure que l'utilisateur se déplace dans l'application. L'application peut agir à chaque instant de ce cycle de vie via des crochets de cycle de vie facultatifs, comme `ngOnInit()`.

![Component tree](../../assets/tree.png)

Créons un second composant. Il est conseillé de générer des composants en utilisant [Angular CLI](https://angular.io/cli/generate#component).

```bash
ng g c child #shorthand for ng generate component child
```

La commande `ng g c` a ajouté un dossier `child` contenant les fichiers `ChildComponent` dans le dossier `app`.

```typescript
// child.component.ts
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
```

Pour lier les composants entre eux, les composants enfants sont déclarés dans le modèle de composant de leur parent, en utilisant leur sélecteur comme balise. Un composant peut être réutilisé autant de fois que souhaité. Le sélecteur de `ChildComponent` est `app-child`. L'inclusion de ce composant en tant qu'enfant du `AppComponent` se fait comme suit :

```html
<!-- app.component.html -->
<h1>{{title}}</h1>
<app-child></app-child>
```

:::tip
Angular préfixe automatiquement les sélecteurs afin que les composants importés de bibliothèques externes soient plus faciles à repérer. Par exemple, les composants de la bibliothèque Material Angular sont tous préfixés par `mat-`. Vous pouvez modifier le préfixe de l'application dans le fichier de configuration « angular.json » afin qu'il reflète le nom de votre application.
:::

## NgModules
En coulisse, la commande `ng g c` a également déclaré le composant `Child` dans `AppModule`.

```typescript {12}
// app.module.ts
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ChildComponent } from './child/child.component'

@NgModule({
  declarations: [
    AppComponent,
    ChildComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Un NgModule est défini par une classe décorée avec `@NgModule()`. Le décorateur `@NgModule()` est une fonction qui prend un seul objet de métadonnées, dont les propriétés décrivent le module. Les propriétés les plus importantes sont les suivantes :

- `declarations`: Les composants, directives et pipes qui appartiennent à ce NgModule.
- `exports`: Le sous-ensemble de déclarations qui doit être visible et utilisable dans les modèles de composants d'autres NgModules. (le `AppModule` n'a aucune raison d'exporter quoi que ce soit car les autres modules n'ont pas besoin d'importer le NgModule racine)
- `imports`: D'autres modules dont les classes exportées sont nécessaires aux modèles de composants déclarés dans ce NgModule.
- `providers`: Créateurs de services que ce NgModule contribue à la collection globale de services ; ils deviennent accessibles dans toutes les parties de l'application. (Vous pouvez également spécifier des fournisseurs au niveau du composant.)
- `bootstrap`: La vue principale de l'application, appelée composant racine, qui héberge toutes les autres vues de l'application. Seul le NgModule racine doit définir la propriété bootstrap.

Bien qu'une petite application puisse n'avoir qu'un seul NgModule, au fur et à mesure que l'application grandit, il est recommandé de refactoriser le module racine en modules de fonctionnalités qui représentent des collections de fonctionnalités associées. Vous importez ensuite ces modules dans le module racine (chargé avec impatience) ou les charger de manière asynchrone via le routeur.

## Organiser vos fichiers
Voici la structure de dossiers que nous nous efforcerons d'atteindre dans l'application Search Films :

![Mono module folder structure](../../assets/folder-structure.png)

Cette structure de dossiers est la mieux adaptée aux projets simples qui n'ont qu'un seul module, le `AppModule`. Au fur et à mesure qu'un projet grandit, des modules de fonctionnalités seront introduits et la structure peut évoluer vers ceci :

![Multi module folder structure](../../assets/folder-structure-multi-module.png)

:::tip
Par défaut, la CLI sera toujours générée dans le dossier `app`. Vous pouvez lui dire de générer dans un autre dossier en passant le chemin avant le nom de l'élément que vous souhaitez qu'il génère. Par exemple, `ng generate component components/test` générera les fichiers `TestComponent` 4 dans `app/components/test`. Le dossier `components` est créé par la CLI s'il n'existe pas déjà, ainsi que le dossier `test`.
:::

## TP: Premier composant

1. La plupart des applications s'efforcent d'avoir une apparence cohérente sur l'ensemble de l'application. La CLI a généré un `styles.scss` vide à cet effet. Copiez coller le contenu de la feuille de style SCSS qui servira de base à tous les travaux pratiques, téléchargeable ici : [styles.scss](https://worldline.github.io/angular-training/styles.scss) in it.

2. Créer un nouveau composant login-form contenant le formulaire d'authentification suivant :
```html
<div id="login-form">
  <form>
    <h1>Authentication</h1>
    <p>Fill out this form to login.</p>
    <hr />

    <label for="email"><b>Email</b></label>
    <input type="text" placeholder="Enter your email" id="email" name="email" required/>

    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter your password" id="psw" name="psw" required/>

    <p><button type="submit">Login</button></p>
  </form>
</div>
```

3. Supprimez le contenu existant du modèle `AppComponent` et affichez le `LoginFormComponent` à la place avec `<app-login-form></app-login-form>`. Vérifiez que la CLI a ajouté le `LoginFormComponent` aux listes de `déclarations` dans le `AppModule`.

4. Complétez le fichier `login-form.component.ts` : ajoutez un champ contenant une propriété de titre. Ensuite, utilisez l'interpolation de texte dans le modèle pour passer le titre du formulaire à la balise h1.
