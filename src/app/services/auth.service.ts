import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { setUser, unSetUser } from '../auth/auth.actions';
import { unSetItems } from '../ingreso-egreso/ingreso-egreso.actions';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription;
  private _user: UsuarioModel;


  get user() {
    return this._user;
  }

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>
  ) { }


  isAuth() {
    return this.auth.authState.pipe(
      map( fbUser => fbUser != null )
    );
  }

  initAuthListener() {
    this.auth.authState.subscribe( fuser => {      

      if( fuser ){
        this.userSubscription = this.firestore.doc(`${fuser.uid}/usuario`).valueChanges()
        .subscribe( (firestoreUser: any) => {
          
          const user = UsuarioModel.fromFirebase( firestoreUser );                    
          this._user = user;
          this.store.dispatch( setUser({ user }) );          
        })
      }
      else {        
        this._user = null;
        this.userSubscription?.unsubscribe();
        this.store.dispatch( unSetUser() );
        this.store.dispatch( unSetItems() );
      }
    })  
  }

  crearUsuario( nombre: string, email: string, password: string ) {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then( ({ user }) => {
        const newUser = new UsuarioModel( user.uid, nombre, email);

        return this.firestore.doc(`${user.uid}/usuario`)
        .set( {...newUser} )
      })    
  }

  login( email: string, password: string ) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }
}
