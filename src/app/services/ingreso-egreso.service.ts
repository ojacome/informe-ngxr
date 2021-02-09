import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) { }



  crearIngresoegreso( ingresoEgreso ){
    const uid = this.authService.user.uid_;

    return this.firestore.doc(`${uid}/ingresos-egresos`)
    .collection('items')
    .add({ ...ingresoEgreso })
  }
}
