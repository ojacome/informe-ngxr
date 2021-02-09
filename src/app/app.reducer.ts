import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducers';
import * as auth from './auth/auth.reducer'
import * as ingresosEgresos from './ingreso-egreso/ingreso-egreso.reducer';




export interface AppState {
   ui:               ui.State,
   user:             auth.State
   ingresosEgresos:  ingresosEgresos.State
}



export const appReducers: ActionReducerMap<AppState> = {
   ui:                  ui.uiReducer,
   user:                auth.authReducer,
   ingresosEgresos:     ingresosEgresos.ingresoEgresoReducer
}

