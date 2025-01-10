# Outillage

::: tip
Si cela est autorisé par votre politique de sécurité locale, vous pouvez travailler sous une machine virtuelle Linux, pour obtenir une meilleure expérience de développement. Ce n'est cependant pas obligatoire pour cette formation.
:::

## Prérequis
Pour installer Angular sur votre système local, vous avez besoin des éléments suivants :

### Node.js
Angular nécessite une [version LTS actuelle, active ou LTS de maintenance](https://nodejs.org/en/about/releases/) de Node.js. Une table de compatibilité Node <-> Angular est disponible [ici](https://angular.dev/reference/versions#actively-supported-versions). Pour plus d'informations sur l'installation de Node.js, consultez [nodejs.org](https://nodejs.org/en/).

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
npm install -g @angular/cli@19.0.6
```

::: tip Powershell
L'exécution des scripts Powershell n'est pas activée par défaut mais elle est nécessaire pour les binaires globaux npm. Pour l'activer, il faut setter la police d'exécution suivante (bien lire les instructions affichées après l'exécution de la commande):
```sh
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```
:::

La commande `ng --help` est maintenant accessible depuis le terminal. Essayez-la pour vérifier l'installation et avoir plus d'informations sur les commandes disponibles. Vous pouvez également jeter un coup d’œil à la [documentation](https://angular.dev/cli#command-overview).
```
$ ng --help
ng <command>

Commands:
  ng add <collection>            Adds support for an external library to your project.
  ng analytics                   Configures the gathering of Angular CLI usage metrics.
  ng build [project]             Compiles an Angular application or library into an output directory named dist/ at the given output path.            [aliases: b]
  ng cache                       Configure persistent disk cache and retrieve cache statistics.
  ng completion                  Set up Angular CLI autocompletion for your terminal.
  ng config [json-path] [value]  Retrieves or sets Angular configuration values in the angular.json file for the workspace.
  ng deploy [project]            Invokes the deploy builder for a specified project or for the default project in the workspace.
  ng e2e [project]               Builds and serves an Angular application, then runs end-to-end tests.                                                [aliases: e]
  ng extract-i18n [project]      Extracts i18n messages from source code.
  ng generate                    Generates and/or modifies files based on a schematic.                                                                [aliases: g]
  ng lint [project]              Runs linting tools on Angular application code in a given project folder.
  ng new [name]                  Creates a new Angular workspace.                                                                                     [aliases: n]
  ng run <target>                Runs an Architect target with an optional custom builder configuration defined in your project.
  ng serve [project]             Builds and serves your application, rebuilding on file changes.                                                      [aliases: s]
  ng test [project]              Runs unit tests in a project.                                                                                        [aliases: t]
  ng update [packages..]         Updates your workspace and its dependencies. See https://update.angular.dev/.
  ng version                     Outputs Angular CLI version.                                                                                         [aliases: v]

Options:
  --help  Shows a help message for this command in the console.

For more information, see https://angular.dev/cli/.
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
ng new search-films
```

::: warning WSL
Si vous utilisez WSL, le repo git doit être stocké du côté WSL pour éviter de gros problèmes de performance. Par exemple, lancez la commande `ng new` dans le répertoire `~/repo`.
:::

**search-films** étant le nom du répertoire dans lequel notre projet sera créé.
Choisissez la configuration suivante :

```sh
? Which stylesheet format would you like to use? Sass (SCSS)   [ https://sass-lang.com/documentation/syntax#scss ]
? Do you want to enable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering)? N
```

La première question vous fait choisir le format des feuilles de style. Ce format sera utilisé à deux endroits : pour le fichier global `styles` et pour chaque composant généré. Le format SCSS vous permet d'écrire du CSS standard et vous donne la possibilité de tirer parti de la puissance de Sass si vous choisissez de le faire.

La seconde question permet de configurer le projet pour des cas d'usages plus compliqués que ce que la formation requiert.

Depuis la version 12 d'Angular, le CLI génère les nouveaux projets en mode strict. Notamment, il définit le flag `strict` à true dans le fichier `tsconfig.json`, ce qui active un large éventail de fonctionnalités de vérification de type qui se traduisent par de meilleures garanties d'exactitude du programme. L'activer équivaut à activer toutes les options de la famille en mode strict : `strictBindCallApply`, `strictFunctionTypes`, `strictNullChecks` et `strictPropertyInitialization`. Il définit également sur true les trois `angularCompilerOptions` suivantes : `strictInjectionParameters`, `strictInputAccessModifiers` et `strictTemplates`. Ces options configurent le compilateur de template AOT (*Ahead-of-Time*).

Nous allons maintenant installer le linter ESLint:

```sh
cd search-films
ng add @angular-eslint/schematics
...
Would you like to proceed? Y
```

Cette commande a installé les dépendances strictement nécessaires au linter et a aussi créé le fichier `.eslintrc.json` à la racine du projet. On remplacera son contenu dans la prochaine section.


### Ouverture du projet dans VSCode

Une fois que le projet a fini d'être généré et que le linter est installé, ouvrez le projet dans VSCode en tappant la commande suivante dans le dossier de l'app search-films:
```sh
code .
```

::: tip WSL
Une fois le projet ouvert dans VSCode via la ligne de commande, vous devriez apercevoir le sous-système utilisé dans le coin bas gauche de l'IDE.
:::

Configurons maintenant le linter. Ouvrez le fichier `eslint.config.js` que j'utilise [ici](https://worldline.github.io/angular-training/eslint.txt) et remplacer le contenu du fichier `eslint.config.js` à la racine du projet par le contenu de ce fichier.

Corrigez automatiquement tous les problèmes existants en exécutant :
```bash
ng lint --fix
```

N'hésitez à utiliser cette commande aussi souvent que nécessaire tout au long de la formation.

le CLI d'Angular a créé un repo git en générant le projet. Commitez votre projet régulièrement tout au long de la formation:
```sh
git add .
git commit -m "Add ESLint"
```

### Mode développeur
Pour travailler sur l'application et la tester en direct, exécutez la commande suivante dans le répertoire du projet (`cd search-films` si nécessaire) :
```sh
npm start
```
Votre application est accessible sur localhost:4200 (port par défaut si disponible). Elle se recompilera automatiquement après chaque sauvegarde de fichier.

### Mode production
Vous pouvez, à tout moment, packager votre projet pour la production en exécutant:
```sh
npm run build
```
Cette commande buildera votre projet en mode production et mettre les sources générées dans le dossier `/dist` de votre projet. Vous pouvez ensuite déployer ce dossier sur un serveur de fichiers tel que Apache ou nginx.

:::tip
Les commandes de base du CLI Angular CLI répertoriées dans le fichier README.md généré à la racine du projet
:::

### Déboguer
#### Via les Developer Tools du navigateur
Les Developer Tools du navigateur peuvent être affichés via la touche F12. Ils offrent un panel de fonctionnalités telles qu'une console JS (onglet *Console*), un outil de traçage réseau (onglet *Network*) etc... 

L'onglet *Sources* des Developer Tools permet d'ouvrir les fichiers sources de votre application et y placer des breakpoints. Vous pouvez les chercher par nom en utilisant `Ctrl + P`. Cela marche tant que vous n'êtes pas dans le cas d'un build de production pour lequel les fichiers source sont minimifiés. 

Alternativement, Angular fournit une extention pour Chrome [Angular DevTools](https://angular.dev/guide/devtools) qui permet d'accéder à des fonctionnalités de débogage et de profiling spécifiques à Angular. L'imprimécran suivant illustre la fonctionnalité de visualisation de l'arbre des composants. En cliquant sur le bouton *<>*, vous pouvez accéder au code source du composant concerné et y placer des breakpoints.

![Angular DevTools component tree](../../assets/devtools-component-tree.png)

![Component source in Chrome DevTools](../../assets/devtools-component-source.png)

#### Via VSCode (uniquement en local)
VSCode permet de débugguer les applications sur Chrome ou Edge sans avoir recours au Developer Tools du navigateur. Pour cela, il faut tout d'abord créer un configuration de lancement du débogage. VSCode est capable de créer le fichier de configuration lui-même en suivant. Pour cela, appuyer sur *F5*. Après un scan rapide du projet, VSCode va créer un nouveau fichier *.vscode/launch.json*. Si besoin, ouvrir ce fichier et changer le port par défaut (4200 est la valeur commune pour les applications Angular). 
Voici un exemple de fichier *.vscode/launch.json*:

```json
{
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "name": "ng serve",
      "type": "chrome",
      "request": "launch",
      "preLaunchTask": "npm: start",
      "url": "http://localhost:4200/"
    },
    {
      "name": "ng test",
      "type": "chrome",
      "request": "launch",
      "preLaunchTask": "npm: test",
      "url": "http://localhost:9876/debug.html"
    }
  ]
}

```
Le F5 va aussi démarrer l'application. Si une instance tourne déjà sur le port 4200, VSCode proposera de démarrer une nouvelle instance sur un autre port. Cette instance démarrée via l'usage de  F5 active les fonctionnalités de débogage directement dans VSCode. Pour vérifier cela, il est possible de mettre un breakpoint dans l'AppComponent et de lancer une session de débogage. Le debugger devrait s'arrêter dessus.

![debug vscode](../../assets/vscode-breakpoint.png)

## Aller plus loin
- [Intro à la référence TSConfig: tsconfig.json](https://www.typescriptlang.org/tsconfig/)
- [Options du compilateur Angular](https://angular.dev/reference/configs/angular-compiler-options)
- [Compilation Ahead-of-time (AOT)](https://angular.dev/tools/cli/aot-compiler)
- [Configuration de l'espace de travail Angular: angular.json](https://angular.dev/reference/configs/workspace-config)
