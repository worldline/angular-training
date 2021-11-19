# Formulaires

Les formulaires permettent à l'application Web d'obtenir des entrées utilisateur.
Un formulaire est généralement composé d'un élément de formulaire (`<form></form>`) qui contient des éléments d'entrée (`<input />`) et d'un bouton d'envoi (`<button type="submit"></button> `).
Lorsque l'utilisateur soumet le formulaire, il est traité localement par l'application Web. Celle-ci peut choisir d'envoyer des données au serveur à l'aide du client HTTP.

:::warning
Dans une SPA, les formulaires ne redirigent pas vers une page serveur lorsque l'utilisateur les publie (comme en PHP par exemple). Cependant, la SPA peut récupérer les données du formulaire à partir du template et les envoyer au serveur si nécessaire à l'aide d'un appel HTTP asynchrone.
:::

Angular simplifie les tâches courantes liées à la création et au traitement des formulaires, telles que le data-binding entre le template et la classe du composant, la validation et l'envoi des données au serveur.
Ceci est possible en utilisant l'un ou l'autre de ces deux types de formulaires :

- Template-driven forms : simples à utiliser mais beaucoup moins scalables  que les formulaires réactifs et conviennent parfaitement aux formulaires simples à un ou deux inputs avec peu ou pas de règles de validation.
- Reactive forms : ont une courbe d'apprentissage abrupte mais offrent plus d'avantages en termes de gestion de cas d'utilisation complexes, de scalabilité, de réutilisabilité et de testabilité. Leur implémentation est basée sur RxJS.

## Template-driven forms

Comme leur nom l'indique, les formulaires Template-driven sont entièrement définis dans le template du composant.
La valeur de l'input peut être récupérée dans la classe du composant grâce à la directive `NgModel`. Comme vous vous en souvenez peut-être, nous l'avons utilisé dans le chapitre *Dynamisez votre HTML* pour commander des glaces.


Voici un exemple qui utilise `[(ngModel)]` pour récupérer les valeurs d'un champ `input` et d'un champ `select`.
Il montre également comment obtenir une référence au champ de formulaire (`#nameRef="ngModel"`). Cela permet d'obtenir certaines propriétés sur le champ du formulaire comme son statut de validité (`nameRef.valid`).

<iframe height='500' width='100%' src="https://stackblitz.com/edit/yos-template-form-simple?ctl=1&embed=1&file=src/app/app.component.ts"></iframe>

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

<iframe height='500' width='100%' src="https://stackblitz.com/edit/yos-template-form-group?ctl=1&embed=1&file=src/app/app.component.ts"></iframe>

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

<iframe height='500' width='100%' src="https://stackblitz.com/edit/angular-ivy-qtsmx2?ctl=1&embed=1&file=src/app/app.component.ts"></iframe>

:::warning
N'oubliez pas d'importer le `ReactiveFormsModule` lors de l'utilisation des reactive forms
:::

### Form group

Un `FormGroup` est une collection de form controls regroupés. Il se compose d'une instance `FormGroup` qui est liée dans le template à une balise `<form>` via l'attribut `[formGroup]`.
Veuillez noter que les contrôles et les groupes enfants utilisent respectivement les attributs `formControlName` et `formGroupName` dans le template.

Le composant suivant définit un `FormGroup` qui contient des form controls et un autre form group. Il illustre de nombreux cas d'utilisation liés aux formulaires : obtenir la valeur du formulaire, son statut, définir des validateurs sur le form control ou dans le template, et accéder aux form group enfants à l'aide de la méthode [get](https://angular.io/api/forms/AbstractControl#get).

<iframe src="https://codesandbox.io/embed/reactive-form-group-e89g6?fontsize=14&hidenavigation=1&module=%2Fsrc%2Fapp%2Fapp.component.ts&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="reactive-form-group"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### Form builder
Le `ReactiveFormsModule` d'Angular fournit une API plus simple pour créer des FormGroups et des FormControls via le service `FormBuilder`.
L'extrait de code suivant montre comment convertir la déclaration du FormGroup précédente à l'aide de l'API `FormBuilder`.

```typescript
// before
readonly mainForm = new FormGroup({
    name: new FormControl("", Validators.required),
    flavor: new FormControl(""),
    extras: new FormGroup({
      firstExtra: new FormControl("cheese"),
      secondExtra: new FormControl("ketchup")
    })
});

//after
readonly mainForm = this.fb.group({
    name: ["", Validators.required],
    flavor: "",
    extras: this.fb.group({
      firstExtra: "cheese",
      secondExtra: "ketchup"
    })
});

constructor(private fb: FormBuilder) {} //do not forget to inject the service
```

Veuillez trouver ci-dessous un exemple complet utilisant l'API `FormBuilder`.

<iframe src="https://codesandbox.io/embed/reactive-form-builder-0uzfv?fontsize=14&hidenavigation=1&module=%2Fsrc%2Fapp%2Fapp.component.ts&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="reactive-form-builder"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### Validation de reactive form
Le `ReactiveFormsModule` permet de définir des validateurs dans le code du composant ou en utilisant des attributs de validation HTML5 tels que `required` et `minlength`. Angular fournit des validateurs intégrés tels que `Validators.required`, `Validators.min`, `Validators.pattern`, vous pouvez trouver une liste complète [ici] (https://angular.io/api/forms/Validators). Vous pouvez également définir des validateurs personnalisés ([tutoriel](https://angular.io/guide/form-validation#defining-custom-validators)).

:::warning
Lorsque vous utilisez des validateurs HTML5, Angular recommande de les combiner avec les validateurs fournis par `@angular/forms`.
:::

Le composant suivant illustre l'utilisation de plusieurs validateurs sur un form control ainsi que l'utilisation d'un validateur personnalisé.

<iframe src="https://codesandbox.io/embed/reactive-form-validation-1orvs?fontsize=14&hidenavigation=1&module=%2Fsrc%2Fapp%2Fapp.component.ts&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="reactive-form-validation"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

## Classes CSS gérées par Angular

Angular ajoute et supprime automatiquement des styles spécifiques en fonction de l'état du formulaire. Par exemple, lorsqu'un form control/group est invalide, Angular ajoute à son élément HTML la classe `.ng-invalid`. Lorsque le form control/group devient valide, Angular remplace la classe `.ng-invalid` par la classe `.ng-valid`.

:::warning
Lorsqu'un form control devient invalide, lui et ses controls parent se voient attribuer la classe `.ng-invalid`. Si ce comportement n'est pas souhaité, vous pouvez utiliser des pseudo-classes telles que `:not`.
:::

Le composant suivant montre comment tirer parti :
- des classes `.ng-invalid` et `.ng-dirty`
- de la `:not` pseudo-classe pour cibler uniquement le form control.

<iframe src="https://codesandbox.io/embed/reactive-form-classes-y1ewk?fontsize=14&hidenavigation=1&module=%2Fsrc%2Fapp%2Fapp.component.css&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="reactive-form-classes"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

Vous pouvez trouver une liste à jour des classes [ici](https://angular.io/guide/form-validation#control-status-css-classes).

## TP : Connexion et inscription avec des reactive forms
1. Implémentez le formulaire de connexion / inscription à l'aide dereactive forms et du form builder : remplacez le `[(ngModel)]` dans le template et supprimez les propriétés `email` et `mot de passe` de la classe du `LoginFormComponent`.

2. Ajoutez le validateur required (`Validators.required`) aux deux champs et affichez le texte `"Ce champ est requis"` à côté de chaque champ si le formulaire a un statut dirty et que ce champ a l'erreur `required` :
```html
<small>
  This field is required
</small>
```

3. Stylisez le label et le texte d'erreur de chaque champ avec la classe `.error` lorsque le formulaire est invalide et que ce champ n'est pas valide (rappelez-vous l'attribut `[class]`)

4. Désactivez les boutons Connexion et Inscription à l'aide de l'attribut `[disabled]` si le formulaire n'est pas valide.

5. Définissez un validateur personnalisé pour le champ de mot de passe qui refuse les mots de passe faibles. Nous considérerons qu'un mot de passe est fort s'il satisfait à toutes ces exigences :
- Contient au moins un caractère majuscule (regex `/^.*[A-Z]+.*$/`)
- Contient au moins un caractère minuscule (regex `/^.*[a-z]+.*$/`)
- Possède au moins un caractère non alphanumérique (regex `/^.*\W+.*$/`)
- Longueur minimale de 8 caractères

Mettez ce validateur dans `app/utils` et nommez-le `password.validator.ts`. Voici son implémentation de base :
```ts
export function password(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // TODO
    return {'password.pattern': true}
  }
}
```

Vous pouvez utiliser la méthode `test` sur chaque pattern/regex et leur passer la valeur du form control pour vérifier si le pattern y est présent. Ajoutez un texte d'erreur via la balise `<small>` dans le champ du mot de passe qui indique si le formulaire est invalide et si le champ contient l'erreur `password.pattern`.

## Sources
- [Documentation officielle des formulaires Angular](https://angular.io/guide/forms-overview)
