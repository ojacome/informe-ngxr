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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit , OnDestroy {

  loginForm : FormGroup;
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
    this.loginForm = this.fb.group({      
      correo:     ['', [ Validators.required, Validators.email ] ],
      password:   ['', [ Validators.required ] ],
    })

    this.uiSubscription = this.store.select('ui')
    .subscribe( ui => this.cargando = ui.isLoading )
  }


  login() {

    if( this.loginForm.invalid) { return }

    const { correo, password } = this.loginForm.value;
    
    this.store.dispatch( isLoading() )

    this.authSvc.login(correo, password)
    .then( credenciales => {
      console.info(credenciales);
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
