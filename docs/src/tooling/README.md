# Tooling

::: tip
If it is allowed by your local security policy, you can work under a Linux VM, for example [Dev-Box MTS](https://dev-box.gitlab-pages.kazan.myworldline.com/documentation/), to get a better development experience. This is not mandatory for this training though.
:::

## Prerequisites
To install Angular on your local system, you need the following:

### Node.js
Angular requires a [current, active LTS, or maintenance LTS version](https://nodejs.org/en/about/releases/) of Node.js. For Angular 11, node 10.13.0 is the minimal supported version. For more information on installing Node.js, see [nodejs.org](https://nodejs.org/en/).

::: tip
If you are unsure about what version of Node.js runs on your system, run `node -v` in a terminal window.
:::

### npm package manager
Angular, the Angular CLI, and Angular applications depend on [npm packages](https://docs.npmjs.com/about-npm) for many features and functions. To download and install npm packages, you need an npm package manager. This guide uses the [npm client](https://docs.npmjs.com/cli/v7/commands/npm-install) command line interface, which is installed with Node.js by default.

::: tip
To check that you have the npm client installed, run `npm -v` in a terminal window.
:::

Alternatively, [yarn](https://classic.yarnpkg.com/en/docs/install/) can be used as an npm package manager.

## Angular CLI
You use the Angular CLI to create projects, generate application and library code, and perform a variety of ongoing development tasks such as testing, bundling, and deployment.

To install the Angular CLI, open a terminal window and run the following command:
```sh
npm install -g @angular/cli@11.1.3
```

The `ng` command is now accessible from the terminal. Try it to check the installation and to have more information about the available commands. You can also check the [documentation](https://angular.io/cli#command-overview).
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
During the training you will need a solid JavaScript code editor. We recommend [Visual Studio Code](https://code.visualstudio.com/), a fairly lightweight free editor that is now very popular in the JavaScript community. VS Code has many extensions to enrich the experience. You can access the marketplace for them directly in VS Code in the Extensions tab of the left sidebar.

First, install the linter [TSLint](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin). Even though it is now deprecated, the Angular CLI is still using it by default.

You then have two choices:
- For a smooth experience, install [John Papa's package](https://marketplace.visualstudio.com/items?itemName=johnpapa.angular-essentials)

OR

- For a lighter installation, install only [Angular language service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template). This extension will provide autocompletion, among other things.

## Practical work: Create your first project
Go into the folder where you store your git repositories, open a terminal there and type the following command:

```sh
ng new search-films
```

**search-films** being the name of the directory in which our project will be created.
Choose the following configuration:

```sh
? Do you want to enforce stricter type checking and stricter bundle budgets in the workspace?
  This setting helps improve maintainability and catch bugs ahead of time.
  For more information, see https://angular.io/strict Yes
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? SCSS   [ https://sass-lang.com/documentation/syntax#scss ]
```

The first question influences the options in the `tsconfig.json` and `angular.json` files. Notably it sets the `strict` flag to true inside the TSConfig file which enables a wide range of type checking behavior that results in stronger guarantees of program correctness. Turning it on is equivalent to enabling all of the strict mode family options: `strictBindCallApply`, `strictFunctionTypes`, `strictNullChecks` and `strictPropertyInitialization`. It also sets to true the three following `angularCompilerOptions`: `strictInjectionParameters`, `strictInputAccessModifiers` and `strictTemplates`. These options configure the AOT (*Ahead-of-Time*) template compiler.

The second question adds an app-routing.module.ts file which imports the RouterModule. In Angular, the best practice is to load and configure the router in a separate, top-level module that is dedicated to routing and imported by the root `AppModule`.

The last question makes you choose the stylesheet format. This format will be used in two places: for the top `styles` file and for each generated component. The SCSS format enables you to write standard CSS and gives you the opportunity to leverage the power of Sass if you choose to do so.

Once the project has finished being generated, open the project folder with VS Code. (either right-click on the folder or via VSCode File > Open Folder...)

### Work in developer mode
To work on the application and test it live, run the following command in the project's directory (`cd search-films` if necessary):
```sh
npm start
```
Your application is accessible on localhost:4200 (default port if available). It will recompile automatically after each file save.

### Build for production
You can, at any time, package your project for production by running:
```sh
npm run build --prod
```
This command will compile your project using **Webpack** in production mode. Webpack is a *bundler*, a tool that will transform your sources into a small number of *bundles*, optimized and compressed JS and CSS files, and put them in the `/dist` folder of your project. You can then deploy this folder on a file server such as Apache or nginx.

:::tip
Basic Angular CLI commands are listed in the README.md generated at the root of the project
:::

## Going further
- [Intro to the TSConfig Reference: tsconfig.json](https://www.typescriptlang.org/tsconfig/)
- [Angular compiler options](https://angular.io/guide/angular-compiler-options)
- [Ahead-of-time (AOT) compilation](https://angular.io/guide/aot-compiler)
- [Angular workspace configuration: angular.json](https://angular.io/guide/workspace-config)