import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import { isLoading, stopLoading } from 'src/app/shared/ui.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy{

  registroForm : FormGroup;
  cargando : boolean = false;
  uiSubscription: Subscription;
  

  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  ngOnInit(): void {

    this.registroForm = this.fb.group({
      nombre:     ['', [ Validators.required, Validators.minLength(3) ] ],
      correo:     ['', [ Validators.required, Validators.email ] ],
      password:   ['', [ Validators.required, Validators.minLength(6) ] ],
    })
    this.uiSubscription = this.store.select('ui')
    .subscribe( ui => this.cargando = ui.isLoading )
  }



  guardar(){
    
    if( this.registroForm.invalid ) { return }

    const { nombre, correo, password } = this.registroForm.value;
    this.store.dispatch( isLoading() )

    this.authSvc.crearUsuario(nombre, correo, password)
    .then( credenciales => {
      
      this.store.dispatch( stopLoading() )
      this.router.navigateByUrl('/dashboard');
    } )   
    .catch( error => {
    this.store.dispatch( stopLoading() )
      Swal.fire({
        icon: 'error',
        title: 'Ups!!',
        text: error.message        
      })
    } ) 
  }
}
