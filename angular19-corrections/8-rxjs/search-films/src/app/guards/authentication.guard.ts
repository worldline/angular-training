import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { AuthenticationService } from '@services/authentication.service'

export const authenticationGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService)
  if (authenticationService.loggedIn) {
    return true
  } else {
    return inject(Router).createUrlTree(['/login'], { queryParams: { returnUrl: state.url }})
  }
}
