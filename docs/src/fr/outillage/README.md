# Outillage

::: tip
Si cela est autorisé par votre politique de sécurité locale, vous pouvez travailler sous une machine virtuelle Linux, pour obtenir une meilleure expérience de développement. Ce n'est cependant pas obligatoire pour cette formation.
:::

## Prérequis
Pour installer Angular sur votre système local, vous avez besoin des éléments suivants :

### Node.js
Angular nécessite une [version LTS actuelle, active ou LTS de maintenance](https://nodejs.org/en/about/releases/) de Node.js. Pour Angular 11, Node 10.13.0 est la version minimale prise en charge. Pour plus d'informations sur l'installation de Node.js, consultez [nodejs.org](https://nodejs.org/en/).

::: tip
Si vous n'êtes pas sûr de la version de Node.js qui s'exécute sur votre système, exécutez la commande `node -v` dans une fenêtre de terminal.
:::

### npm package manager
Angular, le CLI Angular et les applications Angular dépendent de [packages npm](https://docs.npmjs.com/about-npm) pour de nombreuses fonctionnalités et fonctions. Pour télécharger et installer des packages npm, vous aurez besoin d'un gestionnaire de packages npm. Ce guide utilise l'interface en ligne de commande du [npm client](https://docs.npmjs.com/cli/v7/commands/npm-install), qui est installée avec Node.js par défaut.

::: tip
Pour vérifier que le client npm est installé, exécutez `npm -v` dans une fenêtre de terminal.
:::

Comme alternative, [yarn](https://classic.yarnpkg.com/en/docs/install/) peut être utilisé comme gestionnaire de packages npm.

## Angular CLI
Vous utiliserez le CLI Angular pour créer des projets, générer du code dans vos applications et librairies et effectuer diverses tâches de développement telles que les tests, le bundling et le déploiement.

Pour installer le CLI Angular, ouvrez une fenêtre de terminal et exécutez la commande suivante :
```sh
npm install -g @angular/cli@11.1.3
```

La commande `ng` est maintenant accessible depuis le terminal. Essayez-la pour vérifier l'installation et avoir plus d'informations sur les commandes disponibles. Vous pouvez également jeter un coup d’œil à la [documentation](https://angular.io/cli#command-overview).
```
$ ng
Available Commands:
  add Adds support for an external library to your project.
  analytics Configures the gathering of Angular CLI usage metrics. See https://angular.io/cli/usage-analytics-gathering.
  build (b) Compiles an Angular app into an output directory named dist/ at the given output path. Must be executed from within a workspace directory.
  deploy Invokes the deploy builder for a specified project or for the default project in the workspace.
  config Retrieves or sets Angular configuration values in the angular.json file for the workspace.
  doc (d) Opens the official Angular documentation (angular.io) in a browser, and searches for a given keyword.
  e2e (e) Builds and serves an Angular app, then runs end-to-end tests using Protractor.
  extract-i18n (i18n-extract, xi18n) Extracts i18n messages from source code.
  generate (g) Generates and/or modifies files based on a schematic.
  help Lists available commands and their short descriptions.
  lint (l) Runs linting tools on Angular app code in a given project folder.
  new (n) Creates a new workspace and an initial Angular application.
  run Runs an Architect target with an optional custom builder configuration defined in your project.
  serve (s) Builds and serves your app, rebuilding on file changes.
  test (t) Runs unit tests in a project.
  update Updates your application and its dependencies. See https://update.angular.io/
  version (v) Outputs Angular CLI version.

For more detailed help run "ng [command name] --help"
```

## Visual Studio Code
Pendant la formation, vous aurez besoin d'un éditeur de code JavaScript solide. Nous recommandons [Visual Studio Code](https://code.visualstudio.com/), un éditeur gratuit assez léger qui est maintenant très populaire dans la communauté JavaScript. VS Code dispose de nombreuses extensions pour enrichir l'expérience. Vous pouvez accéder au marché pour les avoir, directement dans VS Code dans l'onglet Extensions de la barre latérale gauche.

Tout d'abord, installez le linter [TSLint](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin). Même s'il est maintenant déprécié, le CLI Angular l'utilise toujours par défaut.

Vous avez alors deux choix :
- Pour une expérience fluide, installez [John Papa's package](https://marketplace.visualstudio.com/items?itemName=johnpapa.angular-essentials)

OU

- Pour une installation plus légère, installez uniquement l'[Angular language service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template). Cette extension fournira, entre autres, l'autocomplétion.

## TP: Création de votre premier projet
Placez-vous dans le dossier où vous stockez vos dépôts git, ouvrez-y un terminal et tapez la commande suivante :

```sh
ng new search-films
```

**search-films** étant le nom du répertoire dans lequel notre projet sera créé.
Choisissez la configuration suivante :

```sh
? Do you want to enforce stricter type checking and stricter bundle budgets in the workspace?
  This setting helps improve maintainability and catch bugs ahead of time.
  For more information, see https://angular.io/strict Yes
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? SCSS   [ https://sass-lang.com/documentation/syntax#scss ]
```

La première question influence les options des fichiers `tsconfig.json` et `angular.json`. Notamment, il définit le flag `strict` à true dans le fichier TSConfig, ce qui active un large éventail de fonctionnalités de vérification de type qui se traduisent par de meilleures garanties d'exactitude du programme. L'activer équivaut à activer toutes les options de la famille en mode strict : `strictBindCallApply`, `strictFunctionTypes`, `strictNullChecks` et `strictPropertyInitialization`. Il définit également sur true les trois `angularCompilerOptions` suivantes : `strictInjectionParameters`, `strictInputAccessModifiers` et `strictTemplates`. Ces options configurent le compilateur de template AOT (*Ahead-of-Time*).

La deuxième question ajoute un fichier app-routing.module.ts qui importe le RouterModule. En Angular, une bonne pratique consiste à charger et à configurer le routeur dans un module distinct, dédié au routage et importé par le module root `AppModule`.

La dernière question vous fait choisir le format des feuilles de style. Ce format sera utilisé à deux endroits : pour le fichier global `styles` et pour chaque composant généré. Le format SCSS vous permet d'écrire du CSS standard et vous donne la possibilité de tirer parti de la puissance de Sass si vous choisissez de le faire.

Une fois que le projet a fini d'être généré, ouvrez le dossier du projet avec VS Code. (soit un clic droit sur le dossier soit via VSCode: Fichier > Ouvrir le dossier...)

### Mode développeur
Pour travailler sur l'application et la tester en direct, exécutez la commande suivante dans le répertoire du projet (`cd search-films` si nécessaire) :
```sh
npm start
```
Votre application est accessible sur localhost:4200 (port par défaut si disponible). Elle se recompilera automatiquement après chaque sauvegarde de fichier.

### Mode production
Vous pouvez, à tout moment, packager votre projet pour la production en exécutant:
```sh
npm run build --prod
```
Cette commande compilera votre projet à l'aide de **Webpack** en mode production. Webpack est un *bundler*, un outil qui va transformer vos sources en un petit nombre de *bundles*, des fichiers JS et CSS optimisés et compressés, et les mettre dans le dossier `/dist` de votre projet. Vous pouvez ensuite déployer ce dossier sur un serveur de fichiers tel que Apache ou nginx.

:::tip
Les commandes de base du CLI Angular CLI répertoriées dans le fichier README.md généré à la racine du projet
:::

## Aller plus loin
- [Intro à la référence TSConfig: tsconfig.json](https://www.typescriptlang.org/tsconfig/)
- [Options du compilateur Angular](https://angular.io/guide/angular-compiler-options)
- [Compilation Ahead-of-time (AOT)](https://angular.io/guide/aot-compiler)
- [Configuration de l'espace de travail Angular: angular.json](https://angular.io/guide/workspace-config)
