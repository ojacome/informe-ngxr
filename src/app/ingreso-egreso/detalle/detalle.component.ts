import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgresoModel } from 'src/app/models/ingreso-egreso.model';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosEgresos: IngresoEgresoModel[] = [];
  ingresosSub : Subscription;



  constructor(
    private store: Store<AppState>
  ) { 
  }
  
  ngOnInit(): void {    
    this.cargarStorage();
  }
  ngOnDestroy(): void {
    this.ingresosSub.unsubscribe();
  }


  cargarStorage(){
    this.ingresosSub = this.store.select('ingresosEgresos')
    .subscribe( ({ items}) => this.ingresosEgresos = items )
  }

  borrar(uid : string){    
    console.info( uid );
  }
}
