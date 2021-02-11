import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgresoModel } from 'src/app/models/ingreso-egreso.model';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppStateIngreso } from '../ingreso-egreso.reducer';

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
    private store: Store<AppStateIngreso>,
    private ingresoEgresoSvc : IngresoEgresoService
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
    Swal.fire({
      title: '¿Seguro de eliminar?',
      text: 'No podrás recuperar la información.',      
      showCancelButton: true,
      confirmButtonText: `Eliminar`,      
    }).then((result) => {
      
      if (result.isConfirmed) {

        this.ingresoEgresoSvc.borrarIngresoEgreso( uid )
        .then( () => Swal.fire('Eliminado!', '', 'success'))
        .catch( error => console.info(error))
      } 
    })
  }
}
