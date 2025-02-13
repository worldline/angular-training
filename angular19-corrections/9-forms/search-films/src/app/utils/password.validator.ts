import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms'

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
