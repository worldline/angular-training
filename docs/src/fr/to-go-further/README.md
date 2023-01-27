# Pour aller plus loin

## Lazy loading [doc](https://angular.io/guide/lazy-loading-ngmodules)
Par défaut, tous les `NgModule`s sont chargés au démarrage de l'application (eagerly-loaded). Pour les grosses applications, ceci n'est pas optimal car des modules qui peuvent ne pas être nécessaires à l'utilisateur sont chargés, ralentissant le temps de démarrage de l'application. Le lazy-loading est un design pattern qui permet aux développeurs de déclarer des routes de manière à ce que le routeur ne charge les modules de fonctionnalités que si l'utilisateur y accède. Le lazy-loading peut également être utilisé à des fins de sécurité : il n'est pas toujours souhaitable que le code des zones sécurisées soit chargé dès le démarrage de l'application.

## Directives d'attributs personnalisées [doc](https://angular.io/guide/attribute-directives#building-an-attribute-directive) et structurel [doc](https://angular.io/guide/structural-directives#creating-a-structural-directive)
Les directives intégrées répondent à de nombreux cas d'utilisation, mais vous pouvez rencontrer des situations où vous devrez créer les vôtres. Un cas d'utilisation assez courant est une directive structurelle pour masquer les éléments DOM en fonction des autorisations dont dispose l'utilisateur.

## Les form arrays [doc](https://angular.io/guide/reactive-forms#creating-dynamic-forms)
Nous avons déjà parlé de `FormGroup` et `FormControl`. Ces deux classes héritent d'`AbstractControl`. Une troisième classe en hérite : `FormArray`. C'est le troisième élément constitutif des reactive forms. Le but de `FormArray` est de suivre la valeur et la validité d'un tableau d'`AbstractControl`s. C'est particulièrement utile lorsque le nombre de controls n'est pas connu au moment de la construction, par exemple, ils sont basés sur des données renvoyées par le backend ou, l'utilisateur a la possibilité de les ajouter dynamiquement. Prenez par exemple un formulaire qui vous permet de déclarer n'importe quel nombre d'adresses e-mail de backup pour votre compte, vous ne pouvez pas lier les form controls via leur nom aux inputs dans le template au moment du build de l'application.

## Gestion des erreurs [Article de blog](https://www.tektutorialshub.com/angular/error-handling-in-angular-applications/)
Une bonne gestion des erreurs est un aspect important d'une application bien conçue. Angular fournit deux blocs de construction pour traiter les erreurs : des intercepteurs pour traiter les erreurs reçues du backend et un `GlobalErrorHandler` pour traiter les erreurs côté client. L'article détaille une stratégie pour traiter les deux types d'erreurs.

## Les resolvers [Article de blog](https://javascript.plainenglish.io/angular-resolver-for-prefetching-data-angular-guards-resolve-40fda257d666)
Il existe principalement deux manières de traiter une page fortement dépendante des données reçues du backend. Soit charger les données après le chargement de la page, ce qui nécessitera que la page ait un design pour l'état de chargement et un pour l'état d'erreur, au cas où les données ne seraient jamais reçues. Ou charger les données avant de naviguer vers la page. Cette alternative a l'avantage de simplifier l'interface utilisateur et le code. C'est assez facile à implémenter avec le routeur Angular : un resolver doit être passé à l'attribut `resolve` de la route. L'article explique la mise en œuvre en détail.

## Traduction
Il est assez fréquent que les applications soient soit affichées dans la langue du navigateur, soit laissent le choix de la langue à l'utilisateur via un sélecteur (ou les deux). Angular fournit un moyen de gérer les traductions avec sa librairie d'internationalisation : `@angular/localize`. Voici la [documentation complète](https://angular.io/guide/i18n) sur la façon de localiser une application à l'aide de la méthode officielle.

Une autre solution avec une implémentation plus simple existe : utiliser la librairie `ngx-translate`. Voici un [article de blog](https://www.codeandweb.com/babeledit/tutorials/how-to-translate-your-angular-app-with-ngx-translate) bien détaillé à ce sujet.

## Testing
Vous vous êtes peut-être rendu compte que lors de la génération de classes avec le CLI (si le flag `--skipTests` n'est pas fourni), elles sont générées avec un fichier de test companion. La documentation Angular fournit plusieurs guides sur la façon de gérer les tests.
- [Introduction](https://angular.io/guide/testing)
- [Tester les services](https://angular.io/guide/testing-services)
- [Tester les composants](https://angular.io/guide/testing-components-basics)
- [Tester les directives](https://angular.io/guide/testing-attribute-directives)
- [Tester les pipes](https://angular.io/guide/testing-pipes)

## Mettre à jour une application Angular
L'équipe Angular fournit un site Web fantastique (le [Guide de mise à jour d'Angular](https://update.angular.io/)) pour mettre à jour les applications Angular. Après avoir choisi la version actuelle de votre application et la version cible, une liste détaillée de toutes les étapes nécessaires pour effectuer une mise à jour réussie est fournie.