import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ActivateGameGuard implements CanActivate {
    constructor(
        private router: Router,
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (sessionStorage.getItem('currentGameCode')) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/start-screen'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}