# Pour aller plus loin

## Lazy loading [doc](https://angular.dev/guide/routing/common-router-tasks#lazy-loading)
Pour mettre en œuvre le lazy loading des standalone components, les routes peuvent être définies en utilisant des dynamic imports au sein du Angular Router. En spécifiant une route pointant vers un standalone component, l'application ne chargera le code de ce composant que lorsque l'utilisateur navigue vers la route correspondante. Cette approche minimise la taille du bundle initial, entraînant des temps de chargement plus rapides, car les ressources sont récupérées uniquement au besoin. Ce modèle favorise une meilleure organisation du code et facilite le chargement des dépendances à la demande, améliorant ainsi l'efficacité globale des applications plus importantes.

## Les form arrays [doc](https://angular.dev/api/forms/FormArray)
Nous avons déjà parlé de `FormGroup` et `FormControl`. Ces deux classes héritent d'`AbstractControl`. Une troisième classe en hérite : `FormArray`. C'est le troisième élément constitutif des reactive forms. Le but de `FormArray` est de suivre la valeur et la validité d'un tableau d'`AbstractControl`s. C'est particulièrement utile lorsque le nombre de controls n'est pas connu au moment de la construction, par exemple, ils sont basés sur des données renvoyées par le backend ou, l'utilisateur a la possibilité de les ajouter dynamiquement. Prenez par exemple un formulaire qui vous permet de déclarer n'importe quel nombre d'adresses e-mail de backup pour votre compte, vous ne pouvez pas lier les form controls via leur nom aux inputs dans le template au moment du build de l'application.

## Gestion des erreurs [Article de blog](https://www.tektutorialshub.com/angular/error-handling-in-angular-applications/)
Une bonne gestion des erreurs est un aspect important d'une application bien conçue. Angular fournit deux blocs de construction pour traiter les erreurs : des intercepteurs pour traiter les erreurs reçues du backend et un `GlobalErrorHandler` pour traiter les erreurs côté client. L'article détaille une stratégie pour traiter les deux types d'erreurs.

## Les resolvers [Article de blog](https://javascript.plainenglish.io/angular-resolver-for-prefetching-data-angular-guards-resolve-40fda257d666)
Il existe principalement deux manières de traiter une page fortement dépendante des données reçues du backend. Soit charger les données après le chargement de la page, ce qui nécessitera que la page ait un design pour l'état de chargement et un pour l'état d'erreur, au cas où les données ne seraient jamais reçues. Ou charger les données avant de naviguer vers la page. Cette alternative a l'avantage de simplifier l'interface utilisateur et le code. C'est assez facile à implémenter avec le routeur Angular : un resolver doit être passé à l'attribut `resolve` de la route. L'article explique la mise en œuvre en détail.

## Traduction
Il est assez fréquent que les applications soient soit affichées dans la langue du navigateur, soit laissent le choix de la langue à l'utilisateur via un sélecteur (ou les deux). Angular fournit un moyen de gérer les traductions avec sa librairie d'internationalisation : `@angular/localize`. Voici la [documentation complète](https://angular.dev/guide/i18n) sur la façon de localiser une application à l'aide de la méthode officielle.

Une autre solution avec une implémentation plus simple existe : utiliser la librairie `ngx-translate`. Voici un [article de blog](https://www.codeandweb.com/babeledit/tutorials/how-to-translate-your-angular-app-with-ngx-translate) bien détaillé à ce sujet.

## Testing
Vous vous êtes peut-être rendu compte que lors de la génération de classes avec le CLI (si le flag `--skipTests` n'est pas fourni), elles sont générées avec un fichier de test companion. La documentation Angular fournit plusieurs guides sur la façon de gérer les tests.
- [Introduction](https://angular.dev/guide/testing)
- [Tester les services](https://angular.dev/guide/testing/services)
- [Tester les composants](https://angular.dev/guide/testing/components-basics)
- [Tester les directives](https://angular.dev/guide/testing/attribute-directives)
- [Tester les pipes](https://angular.dev/guide/testing/pipes)

## Mettre à jour une application Angular
L'équipe Angular fournit un site Web fantastique (le [Guide de mise à jour d'Angular](https://update.angular.dev/)) pour mettre à jour les applications Angular. Après avoir choisi la version actuelle de votre application et la version cible, une liste détaillée de toutes les étapes nécessaires pour effectuer une mise à jour réussie est fournie.