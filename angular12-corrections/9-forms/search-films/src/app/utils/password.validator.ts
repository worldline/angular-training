import { ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms'

export function password(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value == null || control.value === '') {
      return null
    }

    const lowercasePattern = /^.*[a-z]+.*$/
    const uppercasePattern = /^.*[A-Z]+.*$/
    const nonAlphanumericPattern = /^.*\W+.*$/
    const minLength = 8
    const passwordValue = control.value as string
    let matchingConstraints = 0
    if (lowercasePattern.test(passwordValue)) {
      matchingConstraints += 1
    }
    if (uppercasePattern.test(passwordValue)) {
      matchingConstraints += 1
    }
    if (nonAlphanumericPattern.test(passwordValue)) {
      matchingConstraints += 1
    }
    if (matchingConstraints == 3 && passwordValue.length >= minLength) {
      return null
    }

    return {'password.pattern': true}
  }
}
