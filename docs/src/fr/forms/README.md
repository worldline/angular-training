# Formulaires

Les formulaires permettent à l'application Web d'obtenir des entrées utilisateur.
Un formulaire est généralement composé d'un élément de formulaire (`<form></form>`) qui contient des éléments d'entrée (`<input />`) et d'un bouton d'envoi (`<button type="submit"></button> `).
Lorsque l'utilisateur soumet le formulaire, il est traité localement par l'application Web. Celle-ci peut choisir d'envoyer des données au serveur à l'aide du client HTTP.

:::warning
Dans une SPA, les formulaires ne redirigent pas vers une page serveur lorsque l'utilisateur les publie (comme en PHP par exemple). Cependant, la SPA peut récupérer les données du formulaire à partir du template et les envoyer au serveur si nécessaire à l'aide d'un appel HTTP asynchrone.
:::

Angular simplifie les tâches courantes liées à la création et au traitement des formulaires, telles que le data-binding entre le template et la classe du composant, la validation et l'envoi des données au serveur.
Ceci est possible en utilisant l'un ou l'autre de ces deux types de formulaires :

- Template-driven forms : simples à utiliser mais beaucoup moins scalables  que les formulaires réactifs et conviennent parfaitement aux formulaires simples avec peu d'inputs et peu ou pas de règles de validation.
- Reactive forms : ont une courbe d'apprentissage abrupte mais offrent plus d'avantages en termes de gestion de cas d'utilisation complexes, de scalabilité, de réutilisabilité et de testabilité. Leur implémentation est basée sur RxJS.

## Template-driven forms

Comme leur nom l'indique, les formulaires Template-driven sont entièrement définis dans le template du composant.
La valeur de l'input peut être récupérée dans la classe du composant grâce à la directive `NgModel`. Comme vous vous en souvenez peut-être, nous l'avons utilisé dans le chapitre *Dynamisez votre HTML* pour commander des glaces.


Voici un exemple qui utilise `[(ngModel)]` pour récupérer les valeurs d'un champ `input` et d'un champ `select`.
Il montre également comment obtenir une référence au champ de formulaire (`#nameRef="ngModel"`). Cela permet d'obtenir certaines propriétés sur le champ du formulaire comme son statut de validité (`nameRef.valid`).

<iframe height='500' width='100%' src="https://stackblitz.com/github/worldline/atpw-template-driven-form/tree/master?startScript=start&title=Template-Driven Form&ctl=1&embed=1&file=src/app/app.component.ts"></iframe>

:::warning
N'oubliez pas d'importer `FormsModule` lors de l'utilisation des template-driven forms
:::

Si vous regroupez les champs du formulaire dans un élément `form` (ce que vous devriez absolument faire), vous pourrez profiter de ces possibilités :

- Obtenir une référence à l'ensemble du formulaire en capturant `ngForm` (exemple : `#formRef="ngForm"`). Cela permet, par exemple, d'obtenir le statut de validité de l'ensemble du formulaire
- Écouter l'événement de soumission du formulaire en utilisant `(ngSubmit)`

:::tip
Préférez écouter `(ngSubmit)` sur la balise `<form>` plutôt que le `(click)` sur le bouton de soumission car le premier prend en charge la soumission via la touche *entrer* du clavier et augmente l'accessibilité du formulaire .
:::

Le projet suivant illustre l'utilisation de `ngForm` et `(ngSubmit)`

<iframe height='500' width='100%' src="https://stackblitz.com/github/worldline/atpw-template-driven-form/tree/submit-exemple?startScript=start&title=Template-Driven Form&ctl=1&embed=1&file=src/app/app.component.ts"></iframe>

**Exercice : ajoutez un champ de saisie qui doit avoir une longueur minimale de 5 caractères. Affichez le contenu de ce champ lors de la soumission du formulaire**

## Reactive forms

Les reactive forms permettent de lier l'ensemble de l'élément de formulaire HTML à son homologue dans la classe du composant.
Cela permet de combiner les fonctionnalités de `ngModel` et des références de champs de formulaire en un seul concept qui est un `FormControl` pour un seul champ de formulaire et un `FormGroup` pour un groupe de champs de formulaire.
Veuillez noter que `FormControl`, `FormGroup` et d'autres éléments des reactive forms sont définis dans le `ReactiveFormsModule`.

### Form control

Un `FormControl` est une classe qui enveloppe la valeur ainsi que d'autres informations d'un champ de formulaire.

Le projet suivant réécrit le premier exemple de la section précédente à l'aide d'un reactive form. Ici, nous définissons les objets `FormControl` et les lions à leur contrepartie dans le template avec `[formControl]`.
La valeur de l'attribut doit avoir le même nom que la propriété dans le composant.
Comme vous pouvez le constater dans le template, la valeur et le statut valide des champs de formulaire sont obtenus directement à partir de l'instance de form control.

:::warning
Notez que l'utilisation de FormControls en dehors d'un FormGroup est très inhabituelle.
:::

<iframe height='500' width='100%' src="https://stackblitz.com/github/worldline/atpw-template-driven-form/tree/reactive-form-transformation?startScript=start&title=FormControl&ctl=1&embed=1&file=src/app/app.component.ts"></iframe>

:::warning
N'oubliez pas d'importer le `ReactiveFormsModule` lors de l'utilisation des reactive forms
:::

### Form group

Un `FormGroup` est une collection de form controls regroupés. Il se compose d'une instance `FormGroup` qui est liée dans le template à une balise `<form>` via l'attribut `[formGroup]`.
Veuillez noter que les contrôles et les groupes enfants utilisent respectivement les attributs `formControlName` et `formGroupName` dans le template.

Le composant suivant définit un `FormGroup` qui contient des form controls et un autre form group. Il illustre de nombreux cas d'utilisation liés aux formulaires : obtenir la valeur du formulaire, son statut, définir des validateurs sur le form control ou dans le template, et accéder aux form group enfants à l'aide de la propriété `controls`.

<iframe height='500' width='100%' src="https://stackblitz.com/github/worldline/atpw-reactive-form/tree/master?startScript=start&title=FormGroup&ctl=1&embed=1&file=src/app/app.component.ts"></iframe>

### Form builder
Le `ReactiveFormsModule` d'Angular fournit une API plus simple pour créer des FormGroups et des FormControls via le service `FormBuilder`.
L'extrait de code suivant montre comment convertir la déclaration du FormGroup précédente à l'aide de l'API `FormBuilder`.

```typescript
// before
readonly iceCreamForm = new FormGroup({
  customerName: new FormControl('Charlotte Smith'),
  flavor: new FormControl('', Validators.required),
  toppings: new FormGroup({
    first: new FormControl('Whipped cream'),
    second: new FormControl('Chocolate sauce')
  })
})

//after
private fb = inject(NonNullableFormBuilder) //do not forget to inject the service

readonly iceCreamForm = this.fb.group({
  customerName: 'Charlotte Smith',
  flavor: ['', Validators.required],
  toppings: this.fb.group({
    first: 'Whipped cream',
    second: 'Chocolate sauce'
  })
})
```

Veuillez trouver ci-dessous un exemple complet utilisant l'API `FormBuilder`.

<iframe height='500' width='100%' src="https://stackblitz.com/github/worldline/atpw-reactive-form/tree/form-builder?startScript=start&title=FormBuilder&ctl=1&embed=1&file=src/app/app.component.ts"></iframe>

### Validation de reactive form
Le `ReactiveFormsModule` permet de définir des validateurs dans le code du composant ou en utilisant des attributs de validation HTML5 tels que `required` et `minlength`. Angular fournit des validateurs intégrés tels que `Validators.required`, `Validators.min`, `Validators.pattern`, vous pouvez trouver une liste complète [ici] (https://angular.dev/api/forms/Validators). Vous pouvez également définir des validateurs personnalisés ([tutoriel](https://angular.dev/guide/forms/form-validation#defining-custom-validators)).

:::warning
Lorsque vous utilisez des validateurs HTML5, Angular recommande de les combiner avec les validateurs fournis par `@angular/forms`.
:::

Le composant suivant illustre l'utilisation de plusieurs validateurs sur un form control ainsi que l'utilisation d'un validateur personnalisé.

<iframe height='500' width='100%' src="https://stackblitz.com/github/worldline/atpw-reactive-form/tree/validation?startScript=start&title=Form Validation&ctl=1&embed=1&file=src/app/app.component.ts"></iframe>

## Classes CSS gérées par Angular

Angular ajoute et supprime automatiquement des styles spécifiques en fonction de l'état du formulaire. Par exemple, lorsqu'un form control/group est invalide, Angular ajoute à son élément HTML la classe `.ng-invalid`. Lorsque le form control/group devient valide, Angular remplace la classe `.ng-invalid` par la classe `.ng-valid`.

:::warning
Lorsqu'un form control devient invalide, lui et ses controls parent se voient attribuer la classe `.ng-invalid`. Si ce comportement n'est pas souhaité, vous pouvez utiliser des pseudo-classes telles que `:not`.
:::

Le composant suivant montre comment tirer parti :
- des classes `.ng-invalid` et `.ng-dirty`
- de la `:not` pseudo-classe pour cibler uniquement le form control.

<iframe height='500' width='100%' src="https://stackblitz.com/github/worldline/atpw-reactive-form/tree/css-classes?startScript=start&title=Angular-managed CSS classes&ctl=1&embed=1&file=src/app/app.component.ts"></iframe>

Vous pouvez trouver une liste à jour des classes [ici](https://angular.dev/guide/forms/form-validation#control-status-css-classes).

## TP : Connexion et inscription avec des reactive forms
1. Implémentez le formulaire de connexion / inscription à l'aide de reactive forms et du form builder : remplacez le `[(ngModel)]` dans le template et supprimez les propriétés `email` et `mot de passe` de la classe du `LoginFormComponent` et déclarez un `FormGroup` et nommez le `loginForm`.

2. Ajoutez le validateur required (`Validators.required`) aux deux champs et affichez le texte `"Ce champ est requis"` sous chaque champ si le formulaire a un statut dirty et que ce champ a l'erreur `required` :

```html
<small>This field is required</small>
```

::: tip Hint
- Il est possible de récupérer la référence à une instance d'un `FormControl` en utilisant la propriété `controls` du `FormGroup` le contenant. Par exemple pour un `FormGroup` nommé *myFormGroup* et un `FormControl` nommé *myControl*:
```ts
myFormGroup.controls.myControl.touched
```
- Il est possible de vérifier si un `FormControl` (ou plus généralement un `AbstractControl`) a une erreur spécifique en appelant la méthode `hasError('error name')` de la classe `FormControl`.Par exemple pour un `FormGroup` nommé *myFormGroup*, un `FormControl` nommé *myControl* et une erreur *required* :
```ts
myFormGroup.controls.myControl.hasError('required')
```
:::

3. Stylisez le label et le texte d'erreur de chaque input s'étant fait attribuer la classe `.ng-invalid` par angular mais uniquement lorsque le formulaire a la classe `ng-dirty`. Faites attention à ne bien styliser que ces deux éléments pour chaque input (vous pouvez utiliser le combinateur CSS `+` et la pseudo-classe `has()` à cet effet).

::: details Aide
- [has() pseudo classe](https://developer.mozilla.org/en-US/docs/Web/CSS/:has)
- [+ combinateur](https://developer.mozilla.org/en-US/docs/Web/CSS/Next-sibling_combinator)
:::

::: details Correction
```css
form.ng-dirty label:has(+ input.ng-invalid), form.ng-dirty input.ng-invalid + small {
  color: red;
}
```
:::

4. Désactivez les boutons Connexion et Inscription à l'aide de l'attribut `[disabled]` si le formulaire est *invalid* et *dirty*.

5. Définissez un validateur personnalisé pour le champ de mot de passe qui refuse les mots de passe faibles. Nous considérerons qu'un mot de passe est fort s'il satisfait à toutes ces exigences :
- Contient au moins un caractère majuscule (regex `/^.*[A-Z]+.*$/`)
- Contient au moins un caractère minuscule (regex `/^.*[a-z]+.*$/`)
- Possède au moins un caractère non alphanumérique (regex `/^.*\W+.*$/`)
- Longueur minimale de 8 caractères

Vous pouvez utiliser la méthode `test` sur chaque pattern/regex et leur passer la valeur du form control pour vérifier si le pattern y est présent. 

Mettez ce validateur dans `app/utils` et nommez-le `password.validator.ts`.

::: details Aide
Voici son implémentation de base :

```ts
export function password(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const uppercasePattern = /^.*[A-Z]+.*$/
    const lowercasePattern = /^.*[a-z]+.*$/
    const specialCharPattern = /^.*\W+.*$/

    if (control.value === '') {
      return null
    }

    if (
      uppercasePattern.test(control.value) &&
      lowercasePattern.test(control.value) &&
      specialCharPattern.test(control.value) &&
      control.value.length > 8
    ) {
      return null
    }

    return { 'password.pattern': 'Password format is incorrect' }
  }
}
```
:::

Ajoutez un texte d'erreur (`Mot de passe invalide`) via la balise `<small>` en dessous de l'input du mot de passe qui s'affiche si le formulaire est invalide et que l'input a l'erreur `password.pattern`.

## Sources
- [Documentation officielle des formulaires Angular](https://angular.dev/guide/forms)
