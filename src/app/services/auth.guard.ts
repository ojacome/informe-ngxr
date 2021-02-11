import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private authSvc: AuthService,
    private router: Router
  ){

  }

  
  canActivate(): Observable<boolean> {
    return this.authSvc.isAuth()
    .pipe(
      tap( estado => {
        if( !estado ) { this.router.navigateByUrl('/login') }
      })
    );
  }

  canLoad(): Observable<boolean> {
    return this.authSvc.isAuth()
    .pipe(
      tap( estado => {
        if( !estado ) { this.router.navigateByUrl('/login') }
      }),
      take(1)
    );
  }
}
