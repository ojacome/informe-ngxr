import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {

  cargando: boolean = false;
  nombre: string;
  userSub: Subscription;



  constructor(
    private authSvc: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  
  ngOnInit(): void {
    this.userSub = this.store.select('user')
    .pipe(
      filter( ({ user }) => user != null )
      )
      .subscribe( ({user}) => this.nombre = user.nombre )
  }
    
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }


  
  logout() {
    this.cargando = true;
    this.authSvc.logout()
    .then( () => {
      this.cargando = false;
      this.router.navigateByUrl('login');
    })
    .catch( error => {
      this.cargando = false;
      console.info(error);
    })
  }
}
