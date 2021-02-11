import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { setItems } from '../ingreso-egreso/ingreso-egreso.actions';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSub :Subscription;
  ingresoSub: Subscription;



  constructor(
    private store: Store<AppState>,
    private ingresoEgresoSvc : IngresoEgresoService
  ) { }
  
  ngOnInit(): void {
    this.cargarStore();
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.ingresoSub?.unsubscribe();
  }



  cargarStore() {
    this.userSub = this.store.select('user')
    .pipe(
      filter( auth => auth.user != null )
    )
    .subscribe( ({user}) => {
      this.ingresoSub = this.ingresoEgresoSvc.initIngresoEgresoListener( user.uid_ )
      .subscribe( ingresosEgresos => {
        
        this.store.dispatch( setItems( { items: ingresosEgresos }))
      })
    })
  }

  
}
