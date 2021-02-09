import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
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

    delete ingresoEgreso.uid;
    
    return this.firestore.doc(`${uid}/ingresos-egresos`)
    .collection('items')
    .add({ ...ingresoEgreso })
  }

  initIngresoEgresoListener( uid: string ){
    return this.firestore.collection(`${uid}/ingresos-egresos/items`)
    .snapshotChanges()
    .pipe(
      map( snapshot => {
        return snapshot.map( doc => {
          return {
            uid: doc.payload.doc.id,
            ...doc.payload.doc.data() as any
          }
        })
      })
    );
  }
}
