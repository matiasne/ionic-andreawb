import { Localizacion } from './localizacion';

export class Usuario{
    
    public id = "";
    public gender = "";
    public date_of_birth = "";
    public address:Localizacion;
    public phone = "";
    public email = "";

	constructor(
		
		){
    }
    
    public asignarValores(init?: Partial<Usuario>) {
        Object.assign(this, init);
    } 
}