# Pour aller plus loin

## Lazy loading [doc](https://angular.io/guide/lazy-loading-ngmodules)
Par défaut, tous les `NgModule`s sont chargés avec impatience au démarrage de l'application. Pour les grandes applications, ce n'est pas optimal car des modules qui peuvent même ne pas être nécessaires pour l'utilisateur seront chargés, ralentissant le temps de démarrage de l'application. Le lazy-loading est un modèle de conception qui permet aux développeurs de déclarer des routes de manière à ce que le routeur ne charge les modules de fonctionnalités que si l'utilisateur y accède. Le lazy-loading peut également être utilisé à des fins de sécurité : il n'est pas toujours souhaitable que le code des zones réglementées soit chargé avec empressement.

## Directives d'attributs personnalisé [doc](https://angular.io/guide/attribute-directives#building-an-attribute-directive) et structurel [doc](https://angular.io/guide/structural-directives#creating-a-structural-directive)
Les directives intégrées répondent à de nombreux cas d'utilisation, mais vous pouvez rencontrer des situations où vous devrez créer les vôtres. Un cas d'utilisation assez courant est une directive structurelle pour masquer les éléments DOM en fonction des autorisations dont dispose l'utilisateur.

## Les tableaux de formulaires [doc](https://angular.io/guide/reactive-forms#creating-dynamic-forms)
Nous avons déjà parlé de `FormGroup` et `FormControl`. Ces deux classes héritent de `AbstractControl`. Une troisième classe en hérite : `FormArray`. C'est le troisième élément constitutif des formes réactives. Le but de `FormArray` est de suivre la valeur et la validité d'un tableau de `AbstractControl`s. C'est particulièrement utile lorsque le nombre de contrôles n'est pas connu au moment de la construction, par exemple, ils sont basés sur des données renvoyées par le backend ou l'utilisateur a la possibilité de les ajouter dynamiquement. Prenez un formulaire qui vous permet de déclarer n'importe quel nombre d'adresses e-mail de sauvegarde pour votre compte. Vous ne pouvez pas lier les contrôles de formulaire via leurs noms aux entrées dans le modèle au moment de la génération.

## Gestion des erreurs [Article de blog](https://www.tektutorialshub.com/angular/error-handling-in-angular-applications/)
Une bonne gestion des erreurs est un aspect important d'une application bien conçue. Angular fournit deux blocs de construction pour traiter les erreurs : des intercepteurs pour traiter les erreurs reçues du backend et un `GlobalErrorHandler` pour traiter les erreurs côté client. L'article détaille une stratégie pour traiter les deux types d'erreurs.

## Les résolveurs [Article de blog](https://javascript.plainenglish.io/angular-resolver-for-prefetching-data-angular-guards-resolve-40fda257d666)
Il existe principalement deux manières de traiter une page fortement dépendante des données reçues du backend. Soit charger les données après le chargement de la page, ce qui nécessitera une conception de chargement et une conception d'erreur pour la page, au cas où les données ne seraient jamais reçues. Ou chargez les données avant d'acheminer vers la page. Cette alternative a l'avantage de simplifier l'interface utilisateur et le code. C'est assez facile à implémenter avec le routeur Angular : un résolveur doit être passé à l'attribut `resolve` de la route. L'article explique la mise en œuvre en détail.

## Traduction
Il est assez fréquent que les applications soient soit affichées dans la langue du navigateur, soit laissent le choix de la langue à l'utilisateur via un sélecteur (ou les deux). Angular fournit un moyen de gérer les traductions avec sa bibliothèque d'internationalisation : `@angular/localize`. Voici la [documentation complète](https://angular.io/guide/i18n) sur la façon de localiser une application à l'aide de la méthode officielle.

Une autre solution avec une implémentation plus simple existe : utiliser la bibliothèque `ngx-translate`. Voici un [blog d'article](https://www.codeandweb.com/babeledit/tutorials/how-to-translate-your-angular-app-with-ngx-translate) bien détaillé à ce sujet.

## Testing
Vous vous êtes peut-être rendu compte que lors de la génération de classes avec CLI (si le flag `--skipTests` n'est pas fourni), elles sont livrées avec un fichier de test équivalent. La documentation Angular fournit plusieurs guides sur la façon de gérer les tests.
- [Introduction](https://angular.io/guide/testing)
- [Tester les services](https://angular.io/guide/testing-services)
- [Tester les composants](https://angular.io/guide/testing-components-basics)
- [Tester les directives](https://angular.io/guide/testing-attribute-directives)
- [Tester les pipes](https://angular.io/guide/testing-pipes)

## Mettre à jour une application Angular
L'équipe Angular fournit un site Web fantastique (le [Guide de mise à jour de Angular](https://update.angular.io/)) pour mettre à jour les applications Angular. Après avoir choisi la version actuelle de votre application et la version ciblée, une liste de contrôle détaillée de toutes les étapes nécessaires pour effectuer une mise à jour réussie est fournie.