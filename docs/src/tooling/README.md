# Tooling

::: tip
If it is allowed by your local security policy, you can work under a Linux VM, to get a better development experience. This is not mandatory for this training though.
:::

## Prerequisites
To install Angular on your local system, you need the following:

### Node.js
Angular requires a [current, active LTS, or maintenance LTS version](https://nodejs.org/en/about/releases/) of Node.js. For Angular 12, Node 12.14.0 is the minimal version and Node 16 is too high.
There is a compatibility table [maintained by LayZeeDK](https://gist.github.com/LayZeeDK/c822cc812f75bb07b7c55d07ba2719b3)
For more information on installing Node.js, see [nodejs.org](https://nodejs.org/en/).

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
npm install -g @angular/cli@12.2.11
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

You then have two choices:
- For a smooth experience, install [John Papa's package](https://marketplace.visualstudio.com/items?itemName=johnpapa.angular-essentials)

OR

- For a lighter installation, install only [Angular language service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template).
This extension will provide autocompletion, among other things.
Then, install the linter [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint). 
Wikipedia describes a [linter](https://en.wikipedia.org/wiki/Lint_%28software%29) as a tool that allows to flag programming errors, bugs, stylistic errors and suspicious constructs.

::: tip WSL
In case you intend to develop in WSL, Node and the Angular CLI need to be installed on your linux subsystem and Visual Studio Code on Windows with the [Remote - WSL extension](https://code.visualstudio.com/docs/remote/wsl).
:::

## Practical work: Create your first project

### Generate the Angular project
Go into the folder where you store your git repositories, open a terminal there and type the following command:

```sh
ng new search-films
```

::: warning WSL
If you are using WSL, the repo needs to be stored on the WSL side to avoid big performance issues. For instance, run the `ng new` command in the `~/repo` directory.
:::

**search-films** being the name of the directory in which our project will be created.
Choose the following configuration:

```sh
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? SCSS   [ https://sass-lang.com/documentation/syntax#scss ]
```

The first question adds an app-routing.module.ts file which imports the RouterModule. In Angular, the best practice is to load and configure the router in a separate, top-level module that is dedicated to routing and imported by the root `AppModule`.

The second question makes you choose the stylesheet format. This format will be used in two places: for the top `styles` file and for each generated component. The SCSS format enables you to write standard CSS and gives you the opportunity to leverage the power of Sass if you choose to do so.

Since the Angular 12 version, the CLI generates the project in strict mode. Notably, it sets the `strict` flag to true inside the `tsconfig.json` file which enables a wide range of type checking behavior that results in stronger guarantees of program correctness. Turning it on is equivalent to enabling all of the strict mode family options: `strictBindCallApply`, `strictFunctionTypes`, `strictNullChecks` and `strictPropertyInitialization`. It also sets to true the three following `angularCompilerOptions`: `strictInjectionParameters`, `strictInputAccessModifiers` and `strictTemplates`. These options configure the AOT (*Ahead-of-Time*) template compiler.

We're then going to install the linter ESLint:

```sh
cd search-films
ng add @angular-eslint/schematics
```

### Open the project in VSCode

Once the project has finished being generated and the linter is installed, open the project in VSCode by typing the following command in the folder of the search-films app:

```sh
code .
```

::: tip WSL
Once you have opened VSCode via the terminal, you should see at its bottom left corner the linux subsystem it uses.
:::

### Work in developer mode
To work on the application and test it live, run the following command in the project's directory (`cd search-films` if necessary):
```sh
npm start
```
Your application is accessible on localhost:4200 (default port if available). It will recompile automatically after each file save.

### Build for production
You can, at any time, package your project for production by running:
```sh
npm run build
```
This command will build your project using **Webpack** in production mode. Webpack is a *bundler*, a tool that will transform your sources into a small number of *bundles*, optimized and compressed JS and CSS files, and put them in the `/dist` folder of your project. You can then deploy this folder on a file server such as Apache or nginx.

:::tip
Basic Angular CLI commands are listed in the README.md generated at the root of the project
:::

### Debugging
#### Debug with your browser's Developer Tools
The Developer Tools can be invoked by pressing F12 on your keyboard and offer a panel of features such as a JS console, network request traces and so on. 

The *Sources* tab of the Developer Tools enable you to open any source file by name (Ctrl + P) as long as you are not in a production build where files are minified. This is where you can place breakpoints.

Alternatively, Angular provides a browser extension for Chrome called [Angular DevTools](https://angular.io/guide/devtools). It adds Angular specific debugging and profiling capabilities. The following screenshot illustrates the component tree feature of Angular DevTools. When the developer clicks on the "<>" button surrounded in red, he gets access to the source code of the component where he can place breakpoints.

![Angular DevTools component tree](../assets/devtools-component-tree.png)

![Component source in Chrome DevTools](../assets/devtools-component-source.png)

#### Debug with VSCode (only for locally served application)
VSCode allows you to natively debug your development application on Chrome or Edge. To do that, you first need to create a launch configuration for debugging. VSCode can create such a file automatically by following these steps:

- Press *F5* on your keyboard or clic on *create a launch.json file* in the debug panel (left sidebar).
- After a quick scan of the projet, VSCode will suggest relevent debug configurations. Choose *Chrome*.
- A new file located in *.vscode/launch.json* will be created.
- Open that file and change the port from the default value to the one used by the development server (4200 is the common value).

Here is a sample *.vscode/launch.json*:

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

Once you have a launch configuration and a running development server, press *F5*. This will open your app in a new browser window and enable debugging features in VSCode. To verify that, please add a breakpoint in the app component and launch a debug session. The debugger should break on your breakpoint.

![debug vscode](../assets/vscode-breakpoint.png)

## Going further
- [Intro to the TSConfig Reference: tsconfig.json](https://www.typescriptlang.org/tsconfig/)
- [Angular compiler options](https://angular.io/guide/angular-compiler-options)
- [Ahead-of-time (AOT) compilation](https://angular.io/guide/aot-compiler)
- [Angular workspace configuration: angular.json](https://angular.io/guide/workspace-config)
