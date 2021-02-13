import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit ,OnDestroy {
  userSub: Subscription;  
  nombre: string;



  constructor(
    private store : Store<AppState>
  ) { }


  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  ngOnInit(): void {
    this.userSub = this.store.select('user')
    .pipe(
      filter( ({ user }) => user != null )
      )
      .subscribe( ({user}) => this.nombre = user.nombre )
  }

}
