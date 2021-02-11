import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgresoModel } from '../models/ingreso-egreso.model';

@Pipe({
  name: 'ordenIngreso'
})
export class OrdenIngresoPipe implements PipeTransform {

  transform( items: IngresoEgresoModel[] ): IngresoEgresoModel[] {
        
    return [...items].sort( (a, b) => {
      if( a.tipo === 'ingreso'){
        return -1;
      }
      else {
        return 1;
      }
    })
  }

}
