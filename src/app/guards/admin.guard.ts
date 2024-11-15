// src/app/guards/admin.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Check if the current user is an admin
    if (this.authService.isAdmin()) {
      return true;
    } else {
      // Redirect to a different page if the user is not an admin
      this.router.navigate(['/']); // You can change this route as needed
      return false;
    }
  }
}
