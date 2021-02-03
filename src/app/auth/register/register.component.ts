import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  registroForm : FormGroup;
  cargando : boolean = false;


  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.registroForm = this.fb.group({
      nombre:     ['', [ Validators.required, Validators.minLength(3) ] ],
      correo:     ['', [ Validators.required, Validators.email ] ],
      password:   ['', [ Validators.required, Validators.minLength(6) ] ],
    })
  }



  guardar(){
    
    if( this.registroForm.invalid ) { return }

    const { nombre, correo, password } = this.registroForm.value;
    this.cargando = true;
    this.authSvc.crearUsuario(nombre, correo, password)
    .then( credenciales => {
      console.info(credenciales);
      this.cargando = false;
      this.router.navigateByUrl('/');
    } )   
    .catch( error => {
      this.cargando = false;
      Swal.fire({
        icon: 'error',
        title: 'Ups!!',
        text: error.message        
      })
    } ) 
  }
}
