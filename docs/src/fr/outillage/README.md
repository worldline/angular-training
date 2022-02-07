# Outillage

::: tip
Si cela est autorisé par votre politique de sécurité locale, vous pouvez travailler sous une machine virtuelle Linux, pour obtenir une meilleure expérience de développement. Ce n'est cependant pas obligatoire pour cette formation.
:::

## Prérequis
Pour installer Angular sur votre système local, vous avez besoin des éléments suivants :

### Node.js
Angular nécessite une [version LTS actuelle, active ou LTS de maintenance](https://nodejs.org/en/about/releases/) de Node.js. Pour Angular 12, Node 12.14.0 est la version minimale prise en charge. Une table de compatibilité est disponible [ici](https://gist.github.com/LayZeeDK/c822cc812f75bb07b7c55d07ba2719b3). Pour plus d'informations sur l'installation de Node.js, consultez [nodejs.org](https://nodejs.org/en/).

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
npm install -g @angular/cli@12.2.11
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

- Pour une installation plus légère, installez uniquement l'[Angular language service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template). Cette extension fournira, entre autres, l'autocomplétion. Installer ensuite le linter [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

::: tip WSL
Dans le cas où vous souhaiteriez développer dans WSL, Node et le CLI Angular doivent être installés dans le sous-système linux et Visual Studio Code dans Windows avec l'extension [Remote - WSL extension](https://code.visualstudio.com/docs/remote/wsl).
:::

## TP: Création de votre premier projet

### Génération du projet Angular
Placez-vous dans le dossier où vous stockez vos repos git, ouvrez-y un terminal et tapez la commande suivante :

```sh
ng new --collection=@angular-eslint/schematics search-films
# which is equivalent to:
# ng new search-films
# ng add @angular-eslint/schematics
```

::: warning WSL
Si vous utilisez WSL, le repo git doit être stocké du côté WSL pour éviter de gros problèmes de performance. Par exemple, lancez la commande `ng new` dans le répertoire `~/repo`.
:::

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

### Ouverture du projet dans VSCode

Une fois que le projet a fini d'être généré, ouvrez le projet dans VSCode en tappant les commandes suivantes:
```sh
cd search-films
code .
```

::: tip WSL
Une fois le projet ouvert dans VSCode via la ligne de commande, vous devriez apercevoir le sous-système utilisé dans le coin bas gauche de l'IDE.
:::

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

### Déboguer
#### Via les Developer Tools du navigateur
Les Developer Tools du navigateur peuvent être affichés via la touche F12. Ils offrent un panel de fonctionnalités telles qu'une console JS (onglet *Console*), un outil de traçage réseau (onglet *Network*) etc... 

L'onglet *Sources* des Developer Tools permet d'ouvrir les fichiers sources de votre application et y placer des breakpoints. Vous pouvez les chercher par nom en utilisant `Ctrl + P`. Cela marche tant que vous n'êtes pas dans le cas d'un build de production pour lequel les fichiers source sont minimifiés. 

Alternativement, Angular fournit une extention pour Chrome [Angular DevTools](https://angular.io/guide/devtools) qui permet d'accéder à des fonctionnalités de débogage et de profiling spécifiques à Angular. L'imprimécran suivant illustre la fonctionnalité de visualisation de l'arbre des composants. En cliquant sur le bouton *<>*, vous pouvez accéder au code source du composant concerné et y placer des breakpoints.

![Angular DevTools component tree](../../assets/devtools-component-tree.png)

![Component source in Chrome DevTools](../../assets/devtools-component-source.png)

#### Via VSCode (uniquement en local)
VSCode permet de débugguer les applications sur Chrome ou Edge sans avoir recours au Developer Tools du navigateur. Pour cela, il faut tout d'abord créer un configuration de lancement du débogage. VSCode est capable de créer le fichier de configuration lui-même en suivant les étapes ci-dessous:

- Appuyer sur *F5* puis choisir *create a launch.json file* dans le panel de gauche.
- Après un scan rapide du projet, VSCode va proposer une configuration adéquate. Choisir Chrome.
- Un nouveau fichier *.vscode/launch.json* est généré.
- Ouvrir ce fichier et changer le port par défaut (4200 est la valeur commune pour les applications Angular)

Voici un exemple de fichier *.vscode/launch.json*:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "pwa-chrome",
      "request": "launch",
      "name": "Launch Chrome against localhost",
      "url": "http://localhost:4200",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```
Une fois la configuration générée et une application servie localement (via *ng serve*), appuyer sur F5. Cela ouvrira l'application dans une nouvelle fenêtre du navigateur et activer les fonctionnalités de débogage directement dans VSCode. Pour vérifier cela, il est possible de mettre un breakpoint dans l'AppComponent et de lancer une session de débogage. Le debugger devrait s'arrêter dessus.

![debug vscode](../../assets/vscode-breakpoint.png)

## Aller plus loin
- [Intro à la référence TSConfig: tsconfig.json](https://www.typescriptlang.org/tsconfig/)
- [Options du compilateur Angular](https://angular.io/guide/angular-compiler-options)
- [Compilation Ahead-of-time (AOT)](https://angular.io/guide/aot-compiler)
- [Configuration de l'espace de travail Angular: angular.json](https://angular.io/guide/workspace-config)
