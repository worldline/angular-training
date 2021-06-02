# Forms

Forms allow the web app to get user input.
A form is generally composed of a form element that contains input elements and a submit button.
When the user validates the form, it is processed locally by the webapp.
The latter can eventually choose to send data to the server using the HTTP Client.

:::warning
In a Single Page Application, forms do not redirect to a server page  when the user posts them (as in PHP for example).
However, the SPA can retrieve the form data and send it to the server if necessary using an async HTTP call.
:::

Angular simplifies the common tasks related to creating and processing forms, such as data-binding, validation and sending the data to the server.
This is possible using either one of those two types of forms:

- Template driven forms: simple to use but less scalable than reactive forms and are a good fit for simple forms.
- Reactive forms: require more learning effort but offer more advantages in terms of scalability, reusability and testability. Their implementation is based on RxJS.

## Template driven forms

As their name suggests, template-driven forms are fully defined in the template of the component.
User input can be retrieved in the component class thanks to the two-way data binding provided by the `[(ngModel)]` attribute.
This directive is defined in the `FormModule` module.

Here is an example that uses `[(ngModel)]` to bind an `input` and `select` fields.
It also shows how to use get a reference to to the form field (`#nameRef="ngModel"`). This allows to obtain some properties on the form field such as its validity status (`nameRef.valid`).

<iframe height='500' width='100%' src="https://stackblitz.com/edit/yos-template-form-simple?ctl=1&embed=1&file=src/app/app.component.ts"></iframe>

:::warning
Do not forget to import `FormsModule` when using template-driven forms
:::

If you group the form fields in a `form` element, you can take advantage of these nice possibilities:

- Get a reference to the whole form by capturing `ngForm` (example: `#formRef="ngForm"`). This allows for example to get validity status of the whole form
- Listen to the submit event of the form using `(ngSubmit)`

:::tip
Prefer listening to `(ngSubmit)` rather than the `(click)` on the submit button because the former supports the submission via the *enter* key on the keyboard.
:::

The following project illustrates the usage of `ngForm` and ̀`ngSubmit`.

<iframe height='500' width='100%' src="https://stackblitz.com/edit/yos-template-form-group?ctl=1&embed=1&file=src/app/app.component.ts"></iframe>

**Exercise: add an input field that must have a minimum length of 5 characters. Show the content of this field when the form is submitted**

## Reactive forms

Reactive forms allow to bind the whole form field to its counterpart in the component class.
This allows to combine the features of `ngModel` and form field references into a single concept which is a `FormControl` for a single form field and a `FormGroup` for a group of form fields.
Please note that `FormControl`, `FormGroup` and Reactive forms are defined in the `ReactiveForms` module.

### Form control

A `FormControl` is a class that wraps the value as well other information of a form field.

The following project rewrites the first example of the previous section using Reactive forms.
Here, we define `FormControl` objects and link them with their counterpart on the template with `[formControl]`.
The value of the attribute must have the same name as the property in the component.
As you may note in the template, the value and the valid status of form controls are obtained directly from the form control instance.

<iframe height='500' width='100%' src="https://stackblitz.com/edit/angular-ivy-qtsmx2?ctl=1&embed=1&file=src/app/app.component.ts"></iframe>

:::warning
Do not forget to import `FormsModule` when using template-driven forms
:::

### Form Group

A `FormGroup` is a collection of form controls that are grouped together.
In the component side a `FormGroup` instance and on the template using any element that has the `[formGroup]` attribute.
Please note that child controls and groups use the attributes `formControlName` and `formGroupName` respectively in the template.

The following component defines a `FormGroup` that contains some form controls and a another form group.
It illustrates many uses cases related to forms: getting the form value, its status, defining validators on the form control or in the template, and accessing children controls and groups using the [get](https://angular.io/api/forms/AbstractControl#get) method.

<iframe src="https://codesandbox.io/embed/reactive-form-group-e89g6?fontsize=14&hidenavigation=1&module=%2Fsrc%2Fapp%2Fapp.component.ts&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="reactive-form-group"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### Form builder

Angular reactive forms provides a simpler api for creating form groups and form controls thanks to the `FormBuilder` service.
The following code snippet shows how to convert the previous form group into the the `FormBuilder` api.

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

Please find below a complete example that uses the `FormBuilder` api.

<iframe src="https://codesandbox.io/embed/reactive-form-builder-0uzfv?fontsize=14&hidenavigation=1&module=%2Fsrc%2Fapp%2Fapp.component.ts&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="reactive-form-builder"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### Reactive Form validation

Reactive forms allow to define validators in the component code or using HTML5 validation attributes such as `required` and `minlength`.
Reactive forms provide many build-in validators to use in the component code such as `Validators.required`.
It also allows the developer to define new validators.

:::warning
When using HTML5 validators, Angular recommends to combine them with built-in reactive forms validators.
:::

The following component illustrates the usage of multiple validators on a form control as well as the usage of a custom validator.

<iframe src="https://codesandbox.io/embed/reactive-form-validation-1orvs?fontsize=14&hidenavigation=1&module=%2Fsrc%2Fapp%2Fapp.component.ts&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="reactive-form-validation"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

## Angular-managed CSS classes

Angular automatically adds and removes specific styles based on the status of the form. For example, when a form control/group is invalid, Angular adds to its element the `.ng-invalid` class. When the form control/group becomes valid, Angular removes the `.ng-invalid` class from it and adds the `.ng-valid` class to it.

:::warning
When a form control becomes invalid, both the control and its parent controls will get the `.ng-invalid` class. If this behavior is unwanted, you can use pseudo-classes such as `:not`.
:::

The following component shows an example of how to take advantage of:

- `.ng-invalid` and `.ng-dirty` classes
- `:not` pseudo-class to target only the control.

<iframe src="https://codesandbox.io/embed/reactive-form-classes-y1ewk?fontsize=14&hidenavigation=1&module=%2Fsrc%2Fapp%2Fapp.component.css&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="reactive-form-classes"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

You can find an updated list of classes [here](https://angular.io/guide/form-validation#control-status-css-classes).

## Practical work: Login and registration with reactive forms

Implement the login and registration forms using reactive forms.

Define a custom validator on the password field of the registration form that refuses weak passwords. We will consider that a password is string if it satisfies all of these requirements:

- Contains at least one uppercase character ( regex /[A-Z]/ )
- Contains at least one lowercase character ( regex /[a-z]/ )
- Have at least a digit ( regex /[0-9]/ )
- Minimum length of 8 characters

## Sources

- [Angular official documentation](https://angular.io/guide/forms-overview)
