import { createAction, props } from '@ngrx/store';
import { UsuarioModel } from '../models/usuario.model';



export const setUser = createAction(
    '[Auth setUser] setUser',
    props<{ user: UsuarioModel }>()
    );

export const unSetUser = createAction('[Auth] unSetUser');