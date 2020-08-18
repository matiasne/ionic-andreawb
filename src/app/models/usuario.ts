import { Localizacion } from './localizacion';

export class Usuario{
    
    public id = "";
    public gender = "";
    public dateOfBirth = "";
    public address:Localizacion;
    public phone = "";
    public email = "";
    public rolAgente = false;
    public rolAdmin = false;

	constructor(){
    }
    
    public asignarValores(init?: Partial<Usuario>) {
        Object.assign(this, init);
    } 
}