import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Label, MultiDataSet } from 'ng2-charts';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgresoModel } from 'src/app/models/ingreso-egreso.model';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [
  ]
})
export class EstadisticaComponent implements OnInit {

  ingresos      = 0;
  egresos       = 0;
  totalIngresos = 0;
  totalEgresos  = 0;
  // Doughnut
  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: MultiDataSet = [ [] ];

  

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.select('ingresosEgresos')
    .subscribe( ({ items }) => this.generarEstdistica( items ))
  }



  generarEstdistica( items : IngresoEgresoModel[] ){

    this.totalEgresos   = 0;
    this.totalIngresos  = 0;
    this.ingresos       = 0;
    this.egresos        = 0;

    for (const item of items) {
      if( item.tipo === 'ingreso' ){
        this.totalIngresos += item.monto;
        this.ingresos ++;
      }
      else{
        this.totalEgresos += item.monto;
        this.egresos ++;
      }
    }

    this.doughnutChartData = [[ this.totalIngresos ,this.totalEgresos]]
  }

}
