# Premiers pas 

Nous venons d'utiliser la commande du CLI Angular `ng new <my-project>`. Cette commande crée un workspace nommé *my-project* avec une application dans le dossier src et installe les packages Angular npm nécessaires dans le nouveau workspace. Le dossier racine du workspace contient divers fichiers de support et de configuration.

La création initiale d'un squelette d'application à la racine du workspace avec ses tests de bout en bout est le comportement par défaut de la commande `ng new`. Ce comportement convient à un style de développement **multi-repo** où chaque application réside dans son propre workspace. C'est également la façon de faire recommandée pour les utilisateurs débutants et intermédiaires.

Angular prend également en charge les workspaces avec plusieurs projets. Ceci est approprié pour un style de développement **monorepo** où il y a un seul dépôt git et une configuration globale pour tous les projets Angular qu'il contient. Il convient également aux utilisateurs avancés qui, par exemple, développent des librairies à partager.

Pour commencer à développer avec un workspace multi-projets, la génération initiale de l'application à la racine doit être ignorée.

``` bash
ng new my-workspace --create-application false
```

Vous pouvez ensuite générer des applications et des librairies avec des noms uniques dans le workspace.

``` bash
cd my-workspace
ng generate application my-first-app
```
Les applications générées vont dans le dossier `projects/` au lieu d'un dossier `src` à la racine.

## Structure des fichiers

Notre projet précédemment créé contient les dossiers et fichiers suivants :
- `.eslintrc.json`: la configuration ESLint par défaut du workspace
- `tsconfig.json`: la configuration TypeScript de base pour les projets dans le workspace
- `tsconfig.app.json`: le fichier de configuration TypeScript de l'application racine qui hérite de celui de base
- `tsconfig.spec.json`: le fichier de configuration TypeScript des tests e2e qui hérite de celui de base
- `README.md`: documentation d'introduction pour l'application racine
- `package.json`: cconfigure les dépendances des packages npm qui sont disponibles pour tous les projets de l'espace de travail
- `package-lock.json`: fournit des informations de version pour tous les packages installés dans node_modules par le client npm
- `karma.conf.js`: Configuration Karma
- `angular.json`: Configuration du CLI, y compris des options de configuration pour les commandes build, serve et pour les outils de tests utilisés par le CLI
- `.gitignore`: Spécifie les fichiers intentionnellement non suivis que Git doit ignorer
- `.editorconfig`: Configuration pour les éditeurs de code
- `.browserlistrc`: Configuration pour partager les navigateurs cibles
- `src`: Fichiers sources pour l'application racine
- `node_modules`: Fournit des packages npm à l'ensemble du workspace
- `e2e`: Fichiers sources pour l'ensemble de tests de bout en bout de l'application racine, ainsi que des fichiers de configuration spécifiques aux tests

:::tip
Pour s'assurer que tous les développeurs travaillant sur un projet utilisent les mêmes versions de librairies, il est possible de [bloquer les numéros de version](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#dependencies) via le fichier `package.json`.
:::

Le dossier `src` contient :
- `test.ts`: 	Le point d'entrée principal pour vos tests unitaires, avec une configuration spécifique à Angular. Vous n'avez généralement pas besoin de modifier ce fichier.
- `styles.scss`: Liste les fichiers CSS qui fournissent des styles pour un projet. L'extension reflète le préprocesseur de style que vous avez configuré pour le projet.
- `polyfill.ts`: Fournit des scripts polyfill pour la prise en charge de navigateur
- `main.ts`: Le point d'entrée principal de votre application
- `index.html`: La page HTML principale qui est diffusée lorsqu'un internaute visite votre site. Le CLI ajoute automatiquement tous les fichiers JavaScript et CSS lors de la création de votre application, vous n'avez donc généralement pas besoin d'ajouter manuellement de balises `<script>` ou `<link>` ici.
- `favicon.ico`: Une icône à utiliser pour cette application dans la barre de favoris
- `environments`: Contient des options de configuration de build pour des environnements cibles particuliers
- `assets`: Contient des images et d'autres fichiers d'assets à copier tels quels lors du build de votre application
- `app`: Contient les fichiers de composants dans lesquels la logique et les données de votre application sont définies

Le dossier `app` contient :
- `app.module.ts`: Définit le module racine, nommé AppModule, qui indique à Angular comment assembler l'application. Déclare initialement uniquement l'`AppComponent`. Au fur et à mesure que vous ajoutez d'autres composants à l'application, ils doivent être déclarés ici.
- `app-routing.module.ts`: Définit un module de routage pour l'`AppModule`
- `app.component.html`: Définit le template HTML associé au composant racine `AppComponent`
- `app.component.scss`: Définit la feuille de style de base pour le composant racine `AppComponent`
- `app.component.ts`: Définit la logique du composant racine de l'application, nommé `AppComponent`. La vue associée à ce composant racine est la racine de la hiérarchie des vues.
- `app.component.spec.ts`: Définit un test unitaire pour le composant racine `AppComponent`


## Interpolation de texte dans les templates

Comme tout autre composant, le shell AppComponent est réparti sur trois fichiers.
Ouvrez le fichier de classe du composant (`app.component.ts`) et modifiez la valeur de la propriété title en 'Search films'

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

Ouvrez le fichier de template du composant (`app.component.html`) et supprimez le modèle par défaut généré par le CLI Angular. Remplacez-le par la ligne d'HTML suivante.
```html
<!-- app.component.html -->
<h1>{{title}}</h1>
```
Les doubles accolades sont la *syntaxe d'interpolation binding* d'Angular. Cet interpolation binding présente la valeur de la propriété title du composant à l'intérieur de la balise h1.

Le navigateur s'actualise et affiche le nouveau titre de l'application.

:::tip
Soit dit en passant, les points-virgules sont facultatifs, si vous choisissez de ne pas les utiliser, vous pouvez le faire. Vous pouvez appliquer une règle à ce sujet via le [linter](https://eslint.org/docs/rules/) en remplaçant `always` par `never`:
```json
"overrides": [{
  "rules": {
    ...,s
    "semi": ["error", "never"],
    ...
  }
}]
```
et corrigez automatiquement tous les endroits où les points-virgules sont déjà utilisés en exécutant :
```bash
ng lint --fix
```
Vous pouvez télécharger le fichier .eslintrc.json que j'utilise habituellement [ici](https://worldline.github.io/angular-training/.eslintrc.json)
:::

::: v-pre
Le moyen le plus simple d'insérer des données de manière dynamique dans vos composants consiste à interpoler du texte, en utilisant la syntaxe `{{myVariable}}`. À l'intérieur des accolades doubles, vous pouvez spécifier n'importe quelle expression JavaScript valide qui n'a pas ou ne favorise pas d'effets secondaires.
:::

Les expressions JavaScript qui ont ou favorisent des effets secondaires incluent :
- les affectations (`=`, `+=`, ...)
- les opérateurs tels que `new`, `typeof` ou `instanceof`
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

Dans cet exemple, nous avons formaté le prix manuellement. Nous verrons plus tard qu'Angular fournit un moyen de déclarer des formateurs réutilisables : les **pipes**.


## Travailler avec des composants

L'`AppComponent` n'est que le composant racine d'une application Angular. Une application Web est constituée de petits composants réutilisables, intégrés dans des composants de niveau supérieur pour former la mise en page, la disposition de vos éléments sur la page. Cette structure peut être décrite comme une arborescence de composants. Angular crée, met à jour et détruit les composants au fur et à mesure que l'utilisateur se déplace dans l'application. L'application peut agir à chaque instant de ce cycle de vie via des hooks de cycle de vie facultatifs, comme `ngOnInit()`.

![Component tree](../../assets/tree.png)

Créons un second composant. Il est conseillé de générer les composants en utilisant le [CLI Angular](https://angular.io/cli/generate#component).

```bash
ng g c child #shorthand for ng generate component child
```

La commande `ng g c` a ajouté un dossier `child` contenant les fichiers du composant `ChildComponent` dans le dossier `app`.

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

Pour lier les composants entre eux, les composants enfants sont déclarés dans le template de leur composant parent, en utilisant leur sélecteur comme balise. Un composant peut être réutilisé autant de fois que souhaité. Le sélecteur de `ChildComponent` est `app-child`. L'inclusion de ce composant en tant qu'enfant de l'`AppComponent` se fait comme suit :

```html
<!-- app.component.html -->
<h1>{{title}}</h1>
<app-child></app-child>
```

:::tip
Angular préfixe automatiquement les sélecteurs afin que les composants importés de librairies externes soient plus faciles à repérer. Par exemple, les composants de la librairie Material Angular sont tous préfixés par `mat-`. Vous pouvez modifier le préfixe de l'application dans le fichier de configuration « angular.json » afin qu'il reflète le nom de votre application.
:::

## NgModules
En coulisse, la commande `ng g c` a également déclaré le composant `Child` dans l'`AppModule`.

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
- `exports`: Le sous-ensemble de déclarations qui doit être visible et utilisable dans les templates des composants d'autres NgModules. (l'`AppModule` n'a aucune raison d'exporter quoi que ce soit car les autres modules n'ont pas besoin d'importer le NgModule racine)
- `imports`: D'autres modules dont les classes exportées sont nécessaires aux template des composants déclarés dans ce NgModule.
- `providers`: Créateurs de services que ce NgModule contribue à la collection globale de services ; ils deviennent accessibles dans toutes les parties de l'application. (Vous pouvez également spécifier des providers au niveau du composant.)
- `bootstrap`: La vue principale de l'application, appelée composant racine, qui héberge toutes les autres vues de l'application. Seul le NgModule racine doit définir la propriété bootstrap.

Bien qu'une petite application puisse n'avoir qu'un seul NgModule, au fur et à mesure que l'application grandit, il est recommandé de refactoriser le module racine en modules de fonctionnalités qui représentent des collections de fonctionnalités connexes. Vous pouvez ensuite soit importer ces modules dans le module racine (eagerly loaded) ou les charger de manière asynchrone via le routeur (lazily loaded).

## Organiser vos fichiers
Voici la structure de dossiers que nous nous efforcerons d'atteindre dans l'application Search Films :

![Mono module folder structure](../../assets/folder-structure.png)

Cette structure de dossiers est la mieux adaptée aux projets simples qui n'ont qu'un seul module, l'`AppModule`. Au fur et à mesure qu'un projet grandit, des modules de fonctionnalités seront introduits et la structure peut évoluer vers ceci :

![Multi module folder structure](../../assets/folder-structure-multi-module.png)

:::tip
Par défaut, le CLI toujours générera toujours dans le dossier `app`. Vous pouvez lui dire de générer dans un autre dossier en passant le chemin avant le nom de l'élément que vous souhaitez qu'il génère. Par exemple, `ng generate component components/test` générera les quatre fichiers du composant `TestComponent` dans `app/components/test`. Le dossier `components` est créé par le CLI s'il n'existait pas déjà, ainsi que le dossier `test`.
:::

## TP: Premier composant

1. La plupart des applications s'efforcent d'avoir une apparence cohérente sur l'ensemble de l'application. Le CLI a généré un `styles.scss` vide à cet effet. Copiez coller dedans le contenu de la feuille de style SCSS qui servira de base à tous les travaux pratiques, téléchargeable ici : [styles.scss](https://worldline.github.io/angular-training/styles.scss).

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

3. Supprimez le contenu existant du template de composant `AppComponent` et affichez le `LoginFormComponent` à la place avec `<app-login-form></app-login-form>`. Vérifiez que le CLI a ajouté le `LoginFormComponent` à la liste de `déclarations` dans l'`AppModule`.

4. Complétez le fichier `login-form.component.ts` : ajoutez un champ contenant une propriété title. Ensuite, utilisez l'interpolation binding dans le template pour passer le titre du formulaire à la balise h1.
