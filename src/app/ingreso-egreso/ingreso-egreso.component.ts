import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { IngresoEgresoModel } from '../models/ingreso-egreso.model'
import Swal from 'sweetalert2';
@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit {

  ingresoForm: FormGroup;
  tipo : string = 'ingreso';



  constructor(
    private fb: FormBuilder,
    private ingresoEgresoSvc : IngresoEgresoService
  ) { }

  ngOnInit(): void {

    this.crearFormulario();
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
    this.ingresoEgresoSvc.crearIngresoegreso( ingresoEgreso )    
    .then( () => {
      this.ingresoForm.reset();
      Swal.fire(' Registro Creado', description , 'success');
    } )
    .catch( err => console.warn(err) )
  }
}
