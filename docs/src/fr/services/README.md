# Services

Avec les composants et les directives, les services sont l'un des principaux blocs de construction d'une application Angular.

La seule préoccupation d'un composant devrait être d'afficher des données et non de les gérer. Les services sont là où l'équipe Angular préconise de placer la logique métier et la gestion des données de l'application. Avoir une séparation claire entre la couche de présentation et les autres traitements de l'application augmente la réutilisabilité et la modularité.

La création d'un service avec le CLI se fait comme suit :
```sh
ng generate service services/example
```

Cela créera le service et sa classe de test associée dans le dossier `app/services`. Il est courant de placer les services dans un dossier de services, le CLI créera le dossier s'il n'existe pas déjà.

Le contenu suivant est généré automatiquement dans le fichier `example.service.ts` :
```ts
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class ExampleService {

}
```

Lorsqu'un composant nécessite un service, le service doit être ajouté à son constructeur de la manière suivante :

```ts{9}
import { Component } from '@angular/core'
import { ExampleService } from '@services/example.service'

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html'
})
export class ExampleComponent {
  constructor(private exampleService: ExampleService) {}
}
```

:::tip
Déclarez toujours une dépendance à un service comme privée. En effet le template ne devrait jamais accéder directement à un service mais toujours passer par une propriété ou une méthode exposée par la classe composant.
:::

## Dependency Injection

Dans le chapitre précédent, nous avons injecté des services fournis par la librairie `@angular/router` dans les composants qui en ont besoin. Si vous êtes familier avec Spring, vous n'y avez peut-être pas beaucoup réfléchi car c'est l'un des mécanismes du framework.

Au démarrage, Angular crée un injecteur à l'échelle de l'application. Si d'autres injecteurs sont nécessaires, Angular les créera en cours de route. L'injecteur crée des dépendances (le plus souvent sous forme de services) et maintient un conteneur d'instances de dépendances qu'il réutilise si possible. L'injecteur obtient les informations sur la façon de créer ou de récupérer une dépendance auprès d'un fournisseur (provider). Un service agit généralement comme son propre fournisseur.

Vous ne l'avez peut-être pas réalisé, mais nous avons déjà fait appel à des fournisseurs. Dans le chapitre sur les pipes, pour utiliser le `UpperCasePipe` dans la classe du composant plutôt que dans le template, nous l'avons ajouté au tableau des providers du composant.

Lorsque Angular découvre qu'un composant dépend d'un service, il vérifie d'abord si l'injecteur a une instance existante de ce service. Si une instance du service demandé n'existe pas encore, l'injecteur en crée une à l'aide du provider enregistré et l'ajoute à l'injecteur avant de renvoyer le service à Angular. Lorsque tous les services demandés ont été résolus et renvoyés, Angular peut appeler le constructeur du composant avec ces services comme arguments.

Les dépendances peuvent être fournies à trois niveaux :
- **au niveau root:** c'est le comportement par défaut lors de la création d'un service avec le CLI. C'est ce que signifie `providedIn: 'root'`. La *même instance* de la dépendance est injectée partout où elle est nécessaire comme s'il s'agissait d'un singleton.
- **au niveau du module:** la dépendance est ajoutée au tableau de providers du `NgModule`. Le module obtient sa propre instance de la dépendance
- **au niveau du composant:** la dépendance est ajoutée au tableau des providers du composant. Chaque instance de ce composant obtient sa propre instance de la dépendance.

## TP : Gestion de l'État
1. Générez un `AuthenticationService` avec le CLI dans le dossier `app/services`
::: tip Alias
Au fur et à mesure que la complexité de la structure des dossiers de l'application augmente, il est recommandé d'ajouter des alias dans le fichier `tsconfig.json`
```json
"paths": {
  "@models/*": ["src/app/models/*"],
  "@services/*": ["src/app/services/*"],
  "@guards/*": ["src/app/guards/*"],
  "@pipes/*": ["src/app/pipes/*"],
  "@components/*": ["src/app/components/*"]
}
```
VsCode utilisera automatiquement ces chemins pour les imports au lieu de ceux relatifs qui peuvent être difficiles à lire ou à débuguer.
:::
2. Déplacez la logique du `loggedIn` de l'`AppComponent` vers le service
3. Injectez le service dans le `LoginFormComponent` et utilisez-le.
4. Implémentez une méthode de déconnexion dans le service d'authentification et ajoutez un bouton de déconnexion dans l'`AppComponent` qui l'appelle et provoque une navigation vers le `LoginFormComponent`. Voici l'html et le css :

<code-group>
<code-block title="app.component.html">

```html
<div class="logout-container">
  <button>Logout</button>
</div>
<router-outlet></router-outlet>
```
</code-block>
<code-block title="app.component.scss">

```scss
.logout-container {
  display: flex;
  justify-content: flex-end;

  button {
    margin: 0;
    font-size: 1em;
  }
}
```
</code-block>
</code-group>

5. Afficher conditionnellement le bouton Logout en fonction du statut `loggedIn` de l'utilisateur
6. Utilisez un navigation guard pour rediriger l'utilisateur qui souhaite accéder à la page de recherche de films vers `/login` s'il n'est pas authentifié (rendez le CanActivate vrai si la route est accessible sinon retournez un `UrlTree` via la méthode `createUrlTree` du service `Router`). Pour prendre en considération des cas d'usage futur, ajoutez un returnUrl en tant que queryParam au `UrlTree` renvoyé afin que le `LoginFormComponent` sache où revenir après l'authentification et modifiez le `LoginFormComponent` en conséquence. Pour générer le navigation guard, utilisez la commande du CLI suivante :

```sh
ng generate guard guards/authentication
# ? Which interfaces would you like to implement? CanActivate
```

::: details Aide pour l'UrlTree
```ts
this.router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url }})
```
:::

## Le HttpClient

Dans une Single Page Application (SPA), la communication avec le serveur se fait via des requêtes HTTP asynchrones (AJAX) ou des protocoles plus spécialisés tels que WebSocket. Nous allons voir comment faire ces requêtes réseau depuis une application Angular.

Angular fournit un module, le `HttpClientModule`, pour effectuer des appels HTTP. Le module fournit un service injectable, le `HttpClient`, pour faire des requêtes GET, POST, PATCH, DELETE et PUT. Pour injecter le `HttpClient` dans un service, ajoutez d'abord le `HttpClientModule` au tableau `imports` de `AppModule`.

Voici quelques exemples:

<code-group>
<code-block title="Service">

```ts
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { User } from '@models/user/user'
import { UserCreation } from '@models/user/user-creation'
import { UserEdition } from '@models/user/user-edition'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'api/backoffice/users'

  constructor(private httpClient: HttpClient) {}

  public create(user: UserCreation): Observable<User> {
    return this.httpClient.post<User>(this.baseUrl, user)
  }

  public update(ref: string, user: UserEdition): Observable<User> {
    return this.httpClient.put<User>(`${this.baseUrl}/${ref}`, user)
  }

  public getByUserReference(ref: string): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/${ref}`)
  }
}
```
</code-block>
<code-block title="Component">

```ts
import { Component } from '@angular/core'
import { User } from '@models/user/user'
import { UserService } from '@services/user.service'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent {
  user: User | null = null
  reference = ''

  constructor(private userService: UserService) {}

  getUser(): void {
    this.userService.getByUserReference(this.reference))
      .subscribe(user => this.user = user)
  }
}
```
</code-block>
</code-group>

Les méthodes du service `HttpClient` renvoient des Observables. Ils seront traités dans le prochain chapitre sur la librairie RxJS. Un Observable n'est exécuté qu'une fois souscrit via la méthode `subscribe`. La méthode subscribe s'attend à ce qu'au moins une callback lui soit passé. La callback est le plus souvent fournie sous forme d'une fonction flèche (arrow function).

## TP : Appeler un backend

Nous utiliserons une API (le *backend*) pour authentifier les utilisateurs et rechercher des films. Ce backend a déjà été développé et déployé sur Heroku.

::: tip
Le contrat d'interface backend est disponible ici : [api-docs](https://vue-js-backend.herokuapp.com/api-docs)
:::

1. Ajoutez au dossier `src` soit le fichier `proxy.conf.json` si vous n'êtes pas derrière un proxy d'entreprise, soit le fichier `proxy.conf.js`.

<code-group>
<code-block title="proxy.conf.json">

```json
{
  "/api/*": {
    "target": "https://vue-js-backend.herokuapp.com",
    "changeOrigin": true,
    "pathRewrite": {
      "^/api": ""
    }
  }
}

```
</code-block>
<code-block title="proxy.conf.js">

```js
var HttpsProxyAgent = require('https-proxy-agent')
var proxyConfig = [{
  context: '/api',
  target: 'https://vue-js-backend.herokuapp.com',
  changeOrigin: true,
  pathRewrite: {
    "^/api": ""
  }
}]

function setupForCorporateProxy(proxyConfig) {
  var proxyServer = process.env.http_proxy || process.env.HTTP_PROXY
  if (proxyServer) {
    var agent = new HttpsProxyAgent(proxyServer);
    console.log('Using corporate proxy server: ' + proxyServer)
    proxyConfig.forEach(function(entry) {
      entry.agent = agent
    })
  }
  return proxyConfig
}

module.exports = setupForCorporateProxy(proxyConfig)

```
</code-block>
</code-group>

Le proxy détournera tous les appels à l'URL commençant par http://localhost:4200/api vers le serveur disponible à l'adresse https://vue-js-backend.herokuapp.com. Cela garantit également que nous ne rencontrerons aucun problème lié aux CORS. Cette configuration concerne uniquement le serveur de développement webpack fourni par le CLI pour exécuter l'application sur votre machine dans un environnement de développement. Ce ne sera pas la configuration utilisée en production.

2. Installez la dépendance suivante uniquement si vous êtes derrière un proxy d'entreprise
```sh
npm install --save-dev https-proxy-agent
```

3. Dans le fichier de configuration CLI - `angular.json` - ajoutez l'option `proxyConfig` à la target serve :

```json{5,6,7}
...
"serve": {
  "builder": "@angular-devkit/build-angular:dev-server",
  ...
  "options": {
    "proxyConfig": "src/proxy.conf.json" // or "src/proxy.conf.js"
  },
  "defaultConfiguration": "development"
},
...
```

4. Ajoutez le `HttpClientModule` au tableau `imports` de `AppModule`. Si VSCode ne parvient pas à trouver l'importation, ajoutez la ligne suivante manuellement en haut du fichier `app.module.ts` :
```ts
import { HttpClientModule } from '@angular/common/http'
```

5. Créez les interfaces/classes pour les modèles utilisés par le backend, ajoutez un fichier par modèle dans le dossier `models/authentication` :

<code-group>
<code-block title="registration-request.ts">

```ts
export class RegistrationRequest {
  constructor(
    public email: string,
    public password: string,
    public firstname: string,
    public lastname: string
  ) {}
}
```
</code-block>
<code-block title="login-request.ts">

```ts
export class LoginRequest {
  constructor(
    public email: string,
    public password: string
  ) {}
}
```
</code-block>
<code-block title="user-response.ts">

```ts
export class UserResponse {
  constructor(
    public user: User,
    public token: string
  ) {}
}

export class User {
  constructor(
    public id: number,
    public firstname: string,
    public lastname: string,
    public email: string,
    public created_at: string,
    public update_at: string
  ) {}
}
```
</code-block>
</code-group>

Prenez note du token dans la `UserResponse`, il servira à authentifier l'utilisateur via l'entête Authorization : `Authorization: Bearer <token>`. Apprenez-en plus sur les JWT [ici](https://jwt.io/introduction).

6. Implémentez les méthodes `register` et `login` dans `AuthenticationService` comme suit :

<code-group>
<code-block title="authentication.service.ts">

```ts
private baseUrl = 'api/user'

constructor(private httpClient: HttpClient) {}

login(loginRequest: LoginRequest): Observable<UserResponse> {
  return this.httpClient.post<UserResponse>(this.baseUrl + '/login', loginRequest)
}

register(loginRequest: LoginRequest): Observable<UserResponse> {
  const registrationRequest = new RegistrationRequest(
    loginRequest.email,
    loginRequest.password,
    'John',
    'Smith'
  )
  return this.httpClient.post<UserResponse>(this.baseUrl + '/register', registrationRequest)
}
```
</code-block>
</code-group>

7. La modification de la signature d'appel de la méthode `login` va nécessiter un peu de refactorisation dans le `LoginFormComponent` :

<code-group>
<code-block title="login-form.component.ts">

```ts
login(): void {
  this.authenticationService.login(this.loginRequest)
    .subscribe(response => {
      const returnUrl = this.route.snapshot.paramMap.get('returnUrl')
      this.router.navigateByUrl(returnUrl ? `/${returnUrl}` : '')
    })
}

register(): void {
  this.authenticationService.register(this.loginRequest)
    .subscribe(response => {})
}

get loginRequest(): LoginRequest {
  return new LoginRequest(this.email, this.password)
}
```
</code-block>
</code-group>

8. Une refactorisation est également nécessaire pour que `AuthenticationGuard` continue de fonctionner. Faites en sorte que le booléen `loggedIn` dans `AuthenticationService` dépende d'un champ `token` et faites en sorte que le `LoginFormComponent` sauvegarde le token qu'il obtient de l'appel de connexion dans ce champ.

<code-group>
<code-block title="authentication.service.ts">

```ts
token: string | null = null

get loggedIn(): boolean {
  return this.token != null
}
```
</code-block>

<code-block title="login-form.component.ts">

```ts{4}
login(): void {
  this.authenticationService.login(this.loginRequest)
    .subscribe(response => {
      this.authenticationService.token = response.token
      const returnUrl = this.route.snapshot.paramMap.get('returnUrl')
      this.router.navigateByUrl(returnUrl ? `/${returnUrl}` : '')
    })
}
```
</code-block>
</code-group>

9. Ajoutez un bouton d'enregistrement à côté du bouton de connexion dans le `LoginFormComponent`, donnez-lui l'attribut `type="button"` afin qu'Angular sache que ce n'est pas ce bouton qui déclenche l'événement `ngSubmit` sur le formulaire et faites-lui appeler le méthode d'enregistrement. Vous devriez maintenant pouvoir enregistrer un utilisateur et vous connecter.

10. Il est temps de gérer les erreurs. La méthode subscribe peut prendre un objet qui propose trois callbacks: une *next*, une *error* et une *complete* (nous verrons cela plus en détail dans le chapitre suivant). Déclarer un champ `errorMessage` sur le `LoginFormComponent` et le mettre à jour en vous servant de l'argument renvoyé par la callback `error`. Afficher le message d'erreur sur le formulaire. Vérifier que le message d'erreur s'affiche bien lorsqu'on saisit des identifiants incorrects.

```ts
private errorHandler(errorResponse: HttpErrorResponse): void {
  this.errorMessage = errorResponse.error.error ?? `${error.status} - ${error.statusText}`
}

// subscribe syntax
this.authenticationService.login(this.loginRequest)
  .subscribe({
    next: (userResponse) => { /*  */},
    error: (errorResponse) => { /*  */ }
  })
```

::: tip hint
Pour une meilleure UX (User eXperience), penser à vider le champ `errorMessage` soit avant de lancer une nouvelle requête d'authentification ou d'enregistrement, soit dès que celles-ci se terminent en succès.
:::

11. Appelons maintenant le backend pour obtenir la liste des films. La route est sécurisée, ce qui signifie que le passage du token dans l'en-tête est nécessaire. Angular fournit un mécanisme - les intercepteurs http - pour intercepter systématiquement les requêtes http, permettant de définir les en-têtes en un seul endroit.

a. Utilisez le CLI pour en générer un : `ng generate interceptor interceptors/authentication`.

b. Voici son implémentation :

```ts
@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authenticationService.token
    if (token) {
      const cloned = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${this.authenticationService.token}`)
      })
      return next.handle(cloned)
    }

    return next.handle(request)
  }
}
```

S'il y a un token dans l'`AuthenticationService`, l'intercepteur l'ajoutera aux en-têtes de la requête http.

c. Ajouter l'intercepteur aux providers de l'`AppModule`

```ts
providers: [
  { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }
],
```

12. Créez un `FilmService` à l'aide du CLI et implémentez l'appel au endpoint `api/movies/search`. Notez que le queryParam `title` n'est pas facultatif. Pour ajouter des query params à une requête, utilisez le paramètre `options` de la méthode get.

```ts
const options = {
  params: new HttpParams().set('title', title)
}
```

13. Apportez des modifications au `FilmSearchComponent` pour appeler ce nouveau service avec le titre renseigné par l'utilisateur, enregistrez la réponse dans le champ `films` du `FilmSearchComponent`.

14. Vérifiez que le token est envoyé sous forme d'en-tête HTTP via les outils de développement de votre navigateur.

15. **Bonus :** Modifiez la méthode de déconnexion `AuthenticationService` pour qu'elle passe le token à `null`.