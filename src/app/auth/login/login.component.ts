import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  cargando : boolean = false;




  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({      
      correo:     ['', [ Validators.required, Validators.email ] ],
      password:   ['', [ Validators.required ] ],
    })
  }


  login() {

    if( this.loginForm.invalid) { return }

    const { correo, password } = this.loginForm.value;
    
    this.cargando = true;
    this.authSvc.login(correo, password)
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
