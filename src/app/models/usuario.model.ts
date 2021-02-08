export class UsuarioModel {

    static fromFirebase ({ email, uid_, nombre}){
        return new UsuarioModel( uid_, nombre, email );
    }
    constructor(
        public uid_: string,
        public nombre : string,
        public email : string
    ){
        
    }
}