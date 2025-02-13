# Tooling

::: tip
If it is allowed by your local security policy, you can work under a Linux VM, to get a better development experience. This is not mandatory for this training though.
:::

## Prerequisites
To install Angular on your local system, you need the following:

### Node.js
Angular requires a [current, active LTS, or maintenance LTS version](https://nodejs.org/en/about/releases/) of Node.js.
An Angluar <-> Node compatibility table is available [here](https://angular.dev/reference/versions#actively-supported-versions).

To install node.js, you can follow one of the following approach:
- For macOS or Linux or WSL based installations, it is preferable to use [nvm](https://github.com/nvm-sh/nvm) instead of a standalone node.js installation.
- For Windows, you can use [nvm-windows](https://github.com/coreybutler/nvm-windows) instead of a standalone node.js installation. 
- For more information on downloading, installing and using a standalone Node.js, see [nodejs.org](https://nodejs.org/en/).

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
npm install -g @angular/cli@19.0.6
```

::: tip Powershell
The execution of Powershell scripts is not enabled by default but it is necessary for global npm binaries. To enable it, it is required to set the following execution policy (read the instructions diplayed after the execution of the command carefully):
```sh
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```
:::

The `ng --help` command is now accessible from the terminal. Try it to check the installation and to have more information about the available commands. You can also check the [documentation](https://angular.dev/cli#command-overview).
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
? Which stylesheet format would you like to use? Sass (SCSS) [ https://sass-lang.com/documentation/syntax#scss ]
? Do you want to enable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering)? N
```

The first question makes you choose the stylesheet format. This format will be used in two places: for the top `styles` file and for each generated component. The SCSS format enables you to write standard CSS and gives you the opportunity to leverage the power of Sass if you choose to do so.

The second question is for more advanced use cases than what the training requires.

Since the Angular 12 version, the CLI generates the project in strict mode. Notably, it sets the `strict` flag to true inside the `tsconfig.json` file which enables a wide range of type checking behavior that results in stronger guarantees of program correctness. Turning it on is equivalent to enabling all of the strict mode family options: `strictBindCallApply`, `strictFunctionTypes`, `strictNullChecks` and `strictPropertyInitialization`. It also sets to true the three following `angularCompilerOptions`: `strictInjectionParameters`, `strictInputAccessModifiers` and `strictTemplates`. These options configure the AOT (*Ahead-of-Time*) template compiler.



We're then going to install the linter ESLint:

```sh
cd search-films
ng add @angular-eslint/schematics
...
Would you like to proceed? Y
```

This has installed dependencies and created an `eslint.config.js` file at the root of you project, we will replace its content shortly.


### Open the project in VSCode

Once the project has finished being generated and the linter is installed, open the project in VSCode by typing the following command in the folder of the search-films app:

```sh
code .
```

::: tip WSL
Once you have opened VSCode via the terminal, you should see at its bottom left corner the linux subsystem it uses.
:::

Let's now configure the linter. Open the `eslint.config.js` file I use [here](https://worldline.github.io/angular-training/eslint.txt) and replace the content of the `eslint.config.js` at the root of the project by the content of that file.

Fix automatically all the existing issues by running:
```sh
ng lint --fix
```

Don't hesitate to run this command as often as necessary during the training.

The Angular CLI created a git repository when it generated the project. Commit your projet regularly all throughout the training:
```sh
git add .
git commit -m "Add ESLint"
```

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
This command will build your project in production mode and put the geenrated sources in the `/dist` folder of your project. You can then deploy this folder on a file server such as Apache or nginx.

:::tip
Basic Angular CLI commands are listed in the README.md generated at the root of the project
:::

### Debugging
#### Debug with your browser's Developer Tools
The Developer Tools can be invoked by pressing F12 on your keyboard and offer a panel of features such as a JS console, network request traces and so on. 

The *Sources* tab of the Developer Tools enable you to open any source file by name (Ctrl + P) as long as you are not in a production build where files are minified. This is where you can place breakpoints.

Alternatively, Angular provides a browser extension for Chrome called [Angular DevTools](https://angular.dev/tools/devtools#). It adds Angular specific debugging and profiling capabilities. The following screenshot illustrates the component tree feature of Angular DevTools. When the developer clicks on the "<>" button surrounded in red, he gets access to the source code of the component where he can place breakpoints.

![Angular DevTools component tree](../assets/devtools-component-tree.png)

![Component source in Chrome DevTools](../assets/devtools-component-source.png)

#### Debug with VSCode (only for locally served application)
VSCode allows you to natively debug your development application on Chrome or Edge. To do that, you first need to create a launch configuration for debugging. VSCode can create such a file automatically by pressing *F5*. A new file located in *.vscode/launch.json* will be created. If need be, open that file and change the port from the default value to the one used by the development server (4200 is the common value).

Here is a sample *.vscode/launch.json*:

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

Pressing *F5* will have opened your app in a new browser window and enabled debugging features in VSCode. To verify that, please add a breakpoint in the app component and launch a debug session. The debugger should break on your breakpoint. In case you already had an instance running on port 4200, VSCode will offer to start this new isntance on a different port. Either stop the previous instance or accept VSCode's proposition.

![debug vscode](../assets/vscode-breakpoint.png)

## Going further
- [Intro to the TSConfig Reference: tsconfig.json](https://www.typescriptlang.org/tsconfig/)
- [Angular compiler options](https://angular.dev/reference/configs/angular-compiler-options)
- [Ahead-of-time (AOT) compilation](https://angular.dev/tools/cli/aot-compiler)
- [Angular workspace configuration: angular.json](https://angular.dev/reference/configs/workspace-config)
