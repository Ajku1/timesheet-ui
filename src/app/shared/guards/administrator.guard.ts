import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Route} from 'src/app/route.enum';
import {UserService} from '../services/user.service';

@Injectable({providedIn: 'root'})
export class AdministratorGuard implements CanActivate {
  constructor(private readonly userService: UserService,
              private readonly router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedInUserAdministrator = this.userService.isLoggedInUserAdministrator();
    if (!isLoggedInUserAdministrator) {
      this.router.navigate([Route.TimeEntries]);
      return false;
    }

    const isUserLoggedIn = this.userService.isUserLoggedIn();
    if (!isUserLoggedIn) {
      this.router.navigate([Route.Login]);
      return false;
    }

    return true;
  }

}
