# Forms

Forms allow the web app to get user input.
A form is generally composed of a form element (`<form></form>`) that contains input elements (`<input />`) and a submit button (`<button type="submit"></button>`).
When the user submits the form, it is processed locally by the webapp. The latter can choose to send data to the server using the HTTP Client.

:::warning
In a Single Page Application, forms do not redirect to a server page when the user posts them (as in PHP for example). However, the SPA can retrieve the form data from the template and send it to the server if necessary using an async HTTP call.
:::

Angular simplifies the common tasks related to creating and processing forms, such as data-binding, validation and sending the data to the server.
This is possible using either one of those two types of forms:

- Template-driven forms: simple to use but far less scalable than reactive forms and are a good fit for simple forms of one or two inputs with little to no validation rules.
- Reactive forms: has a steep learning curve but offer more advantages in terms of management of complex use cases, scalability, reusability and testability. Their implementation is based on RxJS.

## Template-driven forms

As their name suggests, template-driven forms are fully defined in the template of the component.
User input can be retrieved in the component class thanks to the `NgModel` directive. As you may remember, we have used it in the *Empower your HTML* chapter to order ice-creams.

Here is an example that uses `[(ngModel)]` to bind an `input` and `select` fields.
It also shows how to get a reference to the form field (`#nameRef="ngModel"`). This allows to obtain some properties on the form field such as its validity status (`nameRef.valid`).

<iframe height='500' width='100%' src="https://stackblitz.com/github/worldline/atpw-template-driven-form/tree/master?startScript=start&title=Template-Driven Form&ctl=1&embed=1&file=src/app/app.component.ts"></iframe>

:::warning
Do not forget to import `FormsModule` when using template-driven forms
:::

If you group the form fields in a `form` element (which you definitely should), you can take advantage of these nice possibilities:

- Get a reference to the whole form by capturing `ngForm` (example: `#formRef="ngForm"`). This allows, for example, to get the validity status of the whole form
- Listen to the submit event of the form using `(ngSubmit)`

:::tip
Prefer listening to `(ngSubmit)` on the `<form>` tag rather than the `(click)` on the submit button because the former supports the submission via the *enter* key on the keyboard and increases the accessibility of the form.
:::

The following project illustrates the usage of `ngForm` and `(ngSubmit)`

<iframe height='500' width='100%' src="https://stackblitz.com/github/worldline/atpw-template-driven-form/tree/submit-exemple?startScript=start&title=Template-Driven Form&ctl=1&embed=1&file=src/app/app.component.ts"></iframe>

**Exercise: add an input field that must have a minimum length of 5 characters. Show the content of this field when the form is submitted**

## Reactive forms

Reactive forms allow to bind the whole HTML form element to its counterpart in the component class.
This allows to combine the features of `ngModel` and form field references into a single concept which is a `FormControl` for a single form field and a `FormGroup` for a group of form fields.
Please note that `FormControl`, `FormGroup` and other reactive form elements are defined in the `ReactiveFormsModule`.

### Form control

A `FormControl` is a class that wraps the value as well as other information of a form field.

The following project rewrites the first example of the previous section using Reactive forms. Here, we define `FormControl` objects and link them with their counterpart on the template with `[formControl]`.
The value of the attribute must have the same name as the property in the component.
As you may note in the template, the value and the valid status of form inputs are obtained directly from the form control instance.

:::warning
Note that using FormControls outside of a FormGroup is very unusual.
:::

<iframe height='500' width='100%' src="https://stackblitz.com/github/worldline/atpw-template-driven-form/tree/reactive-form-transformation?startScript=start&title=FormControl&ctl=1&embed=1&file=src/app/app.component.ts"></iframe>

:::warning
Do not forget to import the `ReactiveFormsModule` when using reactive forms
:::

### Form Group

A `FormGroup` is a collection of form controls that are grouped together. It consists of a `FormGroup` instance that is bound in the template to a `<form>` tag via the `[formGroup]` attribute.
Please note that child controls and groups use the attributes `formControlName` and `formGroupName` respectively in the template.

The following component defines a `FormGroup` that contains some form controls and another form group. It illustrates many uses cases related to forms: getting the form value, its status, defining validators on the form control or in the template, and accessing child controls and groups using the [get](https://angular.io/api/forms/AbstractControl#get) method.

<iframe height='500' width='100%' src="https://stackblitz.com/github/worldline/atpw-reactive-form/tree/master?startScript=start&title=FormGroup&ctl=1&embed=1&file=src/app/app.component.ts"></iframe>

### Form builder
Angular `ReactiveFormsModule` provides a simpler API for creating FormGroups and FormControls via the `FormBuilder` service.
The following code snippet shows how to convert the previous FormGroup declaration using the `FormBuilder` API.

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
readonly iceCreamForm = this.fb.group({
  customerName: 'Charlotte Smith',
  flavor: ['', Validators.required],
  toppings: this.fb.group({
    first: 'Whipped cream',
    second: 'Chocolate sauce'
  })
})

constructor(private fb: NonNullableFormBuilder) {} //do not forget to inject the service
```

Please find below a complete example that uses the `FormBuilder` API.

<iframe height='500' width='100%' src="https://stackblitz.com/github/worldline/atpw-reactive-form/tree/form-builder?startScript=start&title=FormBuilder&ctl=1&embed=1&file=src/app/app.component.ts"></iframe>

### Reactive Form validation
The `ReactiveFormsModule` allows to define validators in the component code or using HTML5 validation attributes such as `required` and `minlength`. Angular provides built-in validators such as `Validators.required`, `Validators.min`, `Validators.pattern`, you can find a complete list [here](https://angular.io/api/forms/Validators). You can also define custom validators ([tutorial](https://angular.io/guide/form-validation#defining-custom-validators)).

:::warning
When using HTML5 validators, Angular recommends to combine them with built-in `@angular/forms` validators.
:::

The following component illustrates the usage of multiple validators on a form control as well as the use of a custom validator.

<iframe height='500' width='100%' src="https://stackblitz.com/github/worldline/atpw-reactive-form/tree/validation?startScript=start&title=Form Validation&ctl=1&embed=1&file=src/app/app.component.ts"></iframe>

## Angular-managed CSS classes

Angular automatically adds and removes specific styles based on the status of the form. For example, when a form control/group is invalid, Angular adds to its HTML element the `.ng-invalid` class. When the form control/group becomes valid, Angular removes the `.ng-invalid` class from it and adds the `.ng-valid` class to it.

:::warning
When a form control becomes invalid, both the control and its parent controls will get the `.ng-invalid` class. If this behavior is unwanted, you can use pseudo-classes such as `:not`.
:::

The following component shows an example of how to take advantage of:
- `.ng-invalid` and `.ng-dirty` classes
- `:not` pseudo-class to target only the control.

<iframe height='500' width='100%' src="https://stackblitz.com/github/worldline/atpw-reactive-form/tree/css-classes?startScript=start&title=Angular-managed CSS classes&ctl=1&embed=1&file=src/app/app.component.ts"></iframe>

You can find an updated list of classes [here](https://angular.io/guide/form-validation#control-status-css-classes).

## Practical work: Login and registration with reactive forms
1. Implement the login / registration form using reactive forms and the form builder: replace the `[(ngModel)]` in the template and delete the `email` and `password` from the class of the `LoginFormComponent`.

2. Add the required validator (`Validators.required`) to both email and password fields. Show the text `"This field is required"` under each field if the form is dirty and that field has the error `required`:

```html
<small>This field is required</small>
```

::: tip Hint
- You can get a specific form control using the `get('form control name')` method of a form group.
- You can check if a form control has a specific error by using the `hasError('error name')` method of form controls.
:::

3. Style the label and error text of each field with the `.ng-invalid` class when the form is dirty and that field is invalid (remember the `[class]` attribute). Be careful to target only those two elements (you can use the `+` CSS selector to that purpose).

::: details Hint
```scss
label.ng-invalid, input.ng-invalid.ng-dirty + small {
  color: red;
}
```
:::

4. Disable the Login and Register buttons using the `[disabled]` attribute if the form is invalid.

5. Define a custom validator for the password field that refuses weak passwords. We will consider that a password is strong if it satisfies all of these requirements:
- Contains at least one uppercase character (regex `/^.*[A-Z]+.*$/`)
- Contains at least one lowercase character (regex `/^.*[a-z]+.*$/`)
- Has at least one non-alphanumeric character (regex `/^.*\W+.*$/`)
- Minimum length of 8 characters

Put that validator in `app/utils` and name it `password.validator.ts`. Here is its basic implementation:

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

You can use the `test` method on each pattern and pass it the value of the control to check if the pattern exists in it. Add an error text via the `<small>` tag on the password field that shows if the form is dirty and the field has the `password.pattern` error.

## Sources
- [Angular official forms documentation](https://angular.io/guide/forms-overview)
