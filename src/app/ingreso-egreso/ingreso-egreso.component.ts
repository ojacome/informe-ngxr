import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { IngresoEgresoModel } from '../models/ingreso-egreso.model'
import { isLoading, stopLoading } from '../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoForm: FormGroup;
  tipo : string = 'ingreso';
  cargando: boolean;
  isLoadingSub: Subscription;



  constructor(
    private fb: FormBuilder,
    private ingresoEgresoSvc : IngresoEgresoService,
    private store: Store<AppState>
  ) { }
  
  ngOnInit(): void {
    
    this.crearFormulario();
    this.cargarStore();
  }
  ngOnDestroy(): void {
    this.isLoadingSub.unsubscribe();
  }
  


  cargarStore(){
    this.isLoadingSub = this.store.select('ui')
    .subscribe( ({ isLoading }) => this.cargando = isLoading )
  }

  crearFormulario(){
    this.ingresoForm = this.fb.group({
      description:  ['', Validators.required ],
      monto:        ['', Validators.required ]
    })
  }

  guardar(){  
    const { description, monto } = this.ingresoForm.value;
    const ingresoEgreso = new IngresoEgresoModel( description, monto, this.tipo );
    this.store.dispatch( isLoading() );
    this.ingresoEgresoSvc.crearIngresoegreso( ingresoEgreso )    
    .then( () => {
      this.store.dispatch( stopLoading() );
      this.ingresoForm.reset();
      Swal.fire(' Registro Creado', description , 'success');
    } )
    .catch( err => {
      this.store.dispatch( stopLoading() );      
      console.warn(err)
    } )
  }
}
