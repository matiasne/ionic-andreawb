import { Localizacion } from './localizacion';
import { UsuarioService } from '../Services/usuario.service';

export class Client{
    public id ="";
    public agentId="";
    public firstName = "";
    public lastName = "";
    public gender = "";
    public dateOfBirth = "";
    public address: Localizacion;
    public phone = "";
    public altphone = "";
    public email = "";
    
    public usCitizen ="";
    public document ="";
    public maritalStatus = "";
 

	constructor(
		
		){
            this.address = new Localizacion();
    }
    
    public asignarValores(init?: Partial<Client>) {
        Object.assign(this, init);
    } 
}