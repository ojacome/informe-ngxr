import { createAction, props } from '@ngrx/store';
import { IngresoEgresoModel } from '../models/ingreso-egreso.model';

export const unSetItems = createAction('[IngresoEgreso] Unset Items');
export const setItems = createAction(
    '[IngresoEgreso] set Items',
    props<{ items: IngresoEgresoModel[] }>()
    );