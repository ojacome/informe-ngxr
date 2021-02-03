import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) { }



  initAuthListener() {
    this.auth.authState.subscribe( fuser => {
      console.info(fuser);
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
